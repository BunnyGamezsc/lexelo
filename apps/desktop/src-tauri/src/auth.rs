use base64::{engine::general_purpose::STANDARD_NO_PAD, Engine as _};
use clerk_fapi_rs::{
    apis::{CreateSignInError, Error as ClerkApiError},
    models::{
        client_sign_in::Status as SignInStatus,
        stubs_sign_in_factor::Strategy as SignInFactorStrategy, ClientSignIn,
        ClientSignInFirstFactorVerification, ClientUser,
    },
};
use rand::random;
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::{
    env, fs,
    path::Path,
    sync::Mutex,
    time::{Instant, SystemTime, UNIX_EPOCH},
};
use tauri::{Emitter, Manager, State};
use tauri_plugin_clerk::ClerkExt;
use tauri_plugin_keyring::KeyringExt;
use tauri_plugin_stronghold::stronghold::Stronghold;
use tokio::{
    sync::oneshot,
    time::{sleep, timeout, Duration},
};
use url::{form_urlencoded, Url};

const KEYRING_SERVICE: &str = "lexelo-desktop";
const KEYRING_USER_STRONGHOLD_PASSWORD: &str = "stronghold-password";
const STRONGHOLD_SNAPSHOT_FILE: &str = "auth.stronghold";
const STRONGHOLD_CLIENT_ID: &[u8] = b"lexelo-auth";
const STRONGHOLD_AUTH_STATE_KEY: &[u8] = b"auth-state";
const OAUTH_PENDING_TTL_MS: u64 = 10 * 60 * 1000;
const DESKTOP_DEEP_LINK_SCHEME_DEFAULT: &str = "lexelo";
const STRONGHOLD_OP_TIMEOUT_MS: u64 = 1500;
const STRONGHOLD_BOOTSTRAP_TIMEOUT_MS: u64 = 5000;
const AUTH_STATE_EVENT: &str = "lexelo://auth-state";
const AUTH_ERROR_CODE_KEYCHAIN_ACCESS_REQUIRED: &str = "KEYCHAIN_ACCESS_REQUIRED";
const AUTH_ERROR_CODE_CREATE_SIGN_IN_404: &str = "CLERK_CREATE_SIGN_IN_404";
const AUTH_ERROR_CODE_TICKET_EXCHANGE_404: &str = "CLERK_TICKET_EXCHANGE_404";
const AUTH_PHASE_WAITING_FOR_SECURE_STORAGE: &str = "waiting_for_secure_storage";
const AUTH_PHASE_RESOLVING_AUTH: &str = "resolving_auth";
const AUTH_PHASE_READY: &str = "ready";

#[derive(Default)]
struct PendingSignInState {
    sign_in_id: Mutex<Option<String>>,
}

#[derive(Default)]
struct PendingOAuthState {
    request: Mutex<Option<PendingOAuthRequest>>,
}

#[derive(Default)]
struct SecureStateHydration {
    hydrated: Mutex<bool>,
}

#[derive(Default)]
struct SecureStorageRuntime {
    keyring_lock: Mutex<()>,
    stronghold_password_cache: Mutex<Option<String>>,
}

#[derive(Debug, Clone)]
struct PendingOAuthRequest {
    state: String,
    created_at_ms: u64,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct SecureAuthState {
    authorization_header: Option<String>,
    session_id: Option<String>,
    user_id: Option<String>,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct AuthStatusPayload {
    is_signed_in: bool,
    session_id: Option<String>,
    user_id: Option<String>,
    display_name: Option<String>,
    bootstrap_phase: Option<String>,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct SecondFactorPayload {
    strategy: String,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct AuthFlowPayload {
    status: String,
    is_signed_in: bool,
    second_factors: Vec<SecondFactorPayload>,
    oauth_redirect_url: Option<String>,
    session_id: Option<String>,
}

#[derive(Debug, Clone)]
struct DesktopAuthCallbackPayload {
    ticket: String,
    state: Option<String>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let clerk_publishable_key = get_env("PUBLISHABLE_KEY");

    let mut builder = tauri::Builder::default().plugin(tauri_plugin_http::init());

    #[cfg(desktop)]
    {
        builder = builder.plugin(tauri_plugin_single_instance::init(|_app, _argv, _cwd| {
            // when defining deep link schemes at runtime, you must also check `argv` here
        }));
    }

    builder = builder
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_keyring::init())
        .plugin(
            tauri_plugin_stronghold::Builder::new(|password| password.as_bytes().to_vec()).build(),
        )
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(
            tauri_plugin_clerk::ClerkPluginBuilder::new()
                .publishable_key(clerk_publishable_key)
                // .domain("lexelo://auth")
                // .proxy("lexelo://auth")
                .with_tauri_store()
                .build(),
        )
        .setup(|app| {
            app.manage(PendingSignInState::default());
            app.manage(PendingOAuthState::default());
            app.manage(SecureStateHydration::default());
            app.manage(SecureStorageRuntime::default());
            Ok(())
        });

    builder = builder.invoke_handler(tauri::generate_handler![
        auth_bootstrap,
        auth_cached_status,
        auth_status,
        auth_sign_in_password,
        auth_prepare_second_factor,
        auth_attempt_second_factor,
        auth_start_web_sign_in,
        auth_handle_callback_url,
        auth_sign_out
    ]);

    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

pub fn get_env(key: &str) -> String {
    let key = env::var(key);
    match key {
        Ok(val) => val,
        Err(_e) => String::from("Not Found"),
    }
}

fn get_env_opt(key: &str) -> Option<String> {
    env::var(key).ok().and_then(|value| {
        if value.trim().is_empty() {
            None
        } else {
            Some(value)
        }
    })
}

fn auth_log(op: &str, step: &str) {
    println!("AUTH_LOG: {} - {}", op, step);
}

fn auth_log_elapsed(op: &str, step: &str, started_at: Instant) {
    println!(
        "AUTH_LOG_ELAPSED: {} - {} ({}ms)",
        op,
        step,
        started_at.elapsed().as_millis()
    );
}

fn format_auth_error(code: &str, detail: &str) -> String {
    format!("AUTH_ERROR|code={code}|detail={detail}")
}

fn auth_error_has_code(message: &str, code: &str) -> bool {
    message.contains(&format!("AUTH_ERROR|code={code}|"))
}

fn keychain_access_required_error(detail: &str) -> String {
    format_auth_error(AUTH_ERROR_CODE_KEYCHAIN_ACCESS_REQUIRED, detail)
}

fn is_keychain_access_required_error(error: &str) -> bool {
    auth_error_has_code(error, AUTH_ERROR_CODE_KEYCHAIN_ACCESS_REQUIRED)
}

fn is_keychain_access_blocked_message(message: &str) -> bool {
    let normalized = message.to_lowercase();
    normalized.contains("user interaction is not allowed")
        || normalized.contains("interaction not allowed")
        || normalized.contains("authorization denied")
        || normalized.contains("authorization was denied")
        || normalized.contains("operation not permitted")
        || normalized.contains("access denied")
        || normalized.contains("permission denied")
        || normalized.contains("errsecinteractionnotallowed")
        || normalized.contains("errsecauthfailed")
        || normalized.contains("cancelled by user")
        || normalized.contains("user canceled")
        || normalized.contains("user cancelled")
        || normalized.contains("cancelled")
        || normalized.contains("canceled")
}

fn is_keychain_item_already_exists_message(message: &str) -> bool {
    message
        .to_lowercase()
        .contains("already exists in the keychain")
}

fn map_keyring_error(action: &str, error: impl std::fmt::Display) -> String {
    let detail = format!("{action}: {error}");
    if is_keychain_access_blocked_message(&detail) {
        return keychain_access_required_error(&detail);
    }
    detail
}

fn auth_status_with_phase(payload: AuthStatusPayload, phase: &str) -> AuthStatusPayload {
    AuthStatusPayload {
        bootstrap_phase: Some(phase.to_string()),
        ..payload
    }
}

fn emit_auth_phase(app: &tauri::AppHandle, op: &str, phase: &str) {
    let payload = AuthStatusPayload {
        is_signed_in: false,
        session_id: None,
        user_id: None,
        display_name: None,
        bootstrap_phase: Some(phase.to_string()),
    };
    emit_auth_state(app, op, &payload);
}

fn create_sign_in_entity_errors(
    entity: &CreateSignInError,
) -> Option<&clerk_fapi_rs::models::ClerkErrors> {
    match entity {
        CreateSignInError::Status400(errors)
        | CreateSignInError::Status403(errors)
        | CreateSignInError::Status404(errors)
        | CreateSignInError::Status409(errors)
        | CreateSignInError::Status422(errors) => Some(errors),
        CreateSignInError::UnknownValue(_) => None,
    }
}

fn describe_create_sign_in_error(error: &ClerkApiError<CreateSignInError>) -> String {
    match error {
        ClerkApiError::ResponseError(response) => {
            if let Some(entity) = &response.entity {
                if let Some(errors) = create_sign_in_entity_errors(entity) {
                    if let Some(first_error) = errors.errors.first() {
                        return format!(
                            "status={} clerk_code={} message={}",
                            response.status.as_u16(),
                            first_error.code,
                            first_error.long_message
                        );
                    }
                }
            }
            format!("status={}", response.status.as_u16())
        }
        _ => error.to_string(),
    }
}

fn extract_clerk_create_sign_in_404_code(
    error: &ClerkApiError<CreateSignInError>,
) -> Option<String> {
    match error {
        ClerkApiError::ResponseError(response) if response.status.as_u16() == 404 => {
            match &response.entity {
                Some(CreateSignInError::Status404(clerk_errors)) => clerk_errors
                    .errors
                    .first()
                    .map(|entry| entry.code.clone())
                    .or_else(|| Some("unknown".to_string())),
                _ => Some("unknown".to_string()),
            }
        }
        _ => None,
    }
}

fn build_complete_auth_payload(session_id: String) -> AuthFlowPayload {
    AuthFlowPayload {
        status: "complete".to_string(),
        is_signed_in: true,
        second_factors: Vec::new(),
        oauth_redirect_url: None,
        session_id: Some(session_id),
    }
}

async fn complete_if_runtime_session_exists(
    app: &tauri::AppHandle,
    op: &str,
) -> Result<Option<AuthFlowPayload>, String> {
    let session_id = app
        .clerk()
        .session()
        .map_err(|e| format!("Session read failed: {e}"))?
        .map(|session| session.id);

    let Some(session_id) = session_id else {
        return Ok(None);
    };

    auth_log(op, "runtime_session_present_short_circuit");
    let app_handle = app.clone();
    tauri::async_runtime::spawn(async move {
        let _ = persist_runtime_auth_state(&app_handle).await;
    });

    Ok(Some(build_complete_auth_payload(session_id)))
}

fn now_ms() -> Result<u64, String> {
    let duration = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_err(|e| format!("Clock error: {e}"))?;
    Ok(duration.as_millis() as u64)
}

fn create_auth_state() -> String {
    let bytes = random::<[u8; 16]>();
    STANDARD_NO_PAD.encode(bytes)
}

fn desktop_deep_link_scheme() -> String {
    get_env_opt("DESKTOP_DEEP_LINK_SCHEME")
        .or_else(|| get_env_opt("NEXT_PUBLIC_DESKTOP_DEEP_LINK_SCHEME"))
        .unwrap_or_else(|| DESKTOP_DEEP_LINK_SCHEME_DEFAULT.to_string())
}

fn desktop_callback_url(state: &str) -> String {
    let query = format!("state={}&flow=v2", urlencoding::encode(state));
    format!("{}://auth?{query}", desktop_deep_link_scheme())
}

fn set_pending_oauth_request(
    pending_oauth: &State<'_, PendingOAuthState>,
    state: String,
) -> Result<(), String> {
    let mut lock = pending_oauth
        .request
        .lock()
        .map_err(|_| "Pending OAuth lock poisoned".to_string())?;
    *lock = Some(PendingOAuthRequest {
        state,
        created_at_ms: now_ms()?,
    });
    Ok(())
}

fn clear_pending_oauth_request(pending_oauth: &State<'_, PendingOAuthState>) -> Result<(), String> {
    let mut lock = pending_oauth
        .request
        .lock()
        .map_err(|_| "Pending OAuth lock poisoned".to_string())?;
    *lock = None;
    Ok(())
}

fn stronghold_snapshot_path(app: &tauri::AppHandle) -> Result<std::path::PathBuf, String> {
    let base_dir = app
        .path()
        .app_local_data_dir()
        .map_err(|e| format!("Failed to resolve app data dir: {e}"))?;
    fs::create_dir_all(&base_dir).map_err(|e| format!("Failed to create app data dir: {e}"))?;
    Ok(base_dir.join(STRONGHOLD_SNAPSHOT_FILE))
}

fn cleanup_stronghold_snapshot_files(snapshot_path: &Path) {
    let Some(parent_dir) = snapshot_path.parent() else {
        return;
    };
    let Some(snapshot_name) = snapshot_path.file_name().and_then(|name| name.to_str()) else {
        return;
    };

    if let Ok(entries) = fs::read_dir(parent_dir) {
        let sidecar_prefix = format!("{snapshot_name}.");
        for entry in entries.flatten() {
            let entry_path = entry.path();
            if !entry_path.is_file() {
                continue;
            }
            let Some(file_name) = entry_path.file_name().and_then(|name| name.to_str()) else {
                continue;
            };
            if file_name == snapshot_name || !file_name.starts_with(&sidecar_prefix) {
                continue;
            }
            let _ = fs::remove_file(entry_path);
        }
    }
}

fn cached_stronghold_password(app: &tauri::AppHandle) -> Result<Option<String>, String> {
    let runtime = app.state::<SecureStorageRuntime>();
    let guard = runtime
        .stronghold_password_cache
        .lock()
        .map_err(|_| "Secure storage cache lock poisoned".to_string())?;
    Ok(guard.clone())
}

fn set_cached_stronghold_password(
    app: &tauri::AppHandle,
    password: Option<String>,
) -> Result<(), String> {
    let runtime = app.state::<SecureStorageRuntime>();
    let mut guard = runtime
        .stronghold_password_cache
        .lock()
        .map_err(|_| "Secure storage cache lock poisoned".to_string())?;
    *guard = password;
    Ok(())
}

fn get_or_create_stronghold_password(app: &tauri::AppHandle) -> Result<String, String> {
    auth_log("get_or_create_stronghold_password", "start");
    let runtime = app.state::<SecureStorageRuntime>();
    let _keyring_guard = runtime
        .keyring_lock
        .lock()
        .map_err(|_| "Secure storage keyring lock poisoned".to_string())?;
    if let Some(cached) = cached_stronghold_password(app)? {
        auth_log("get_or_create_stronghold_password", "cache_hit");
        return Ok(cached);
    }

    auth_log("get_or_create_stronghold_password", "keyring_read_start");
    if let Some(password) = app
        .keyring()
        .get_password(KEYRING_SERVICE, KEYRING_USER_STRONGHOLD_PASSWORD)
        .map_err(|e| map_keyring_error("Keyring read failed", e))?
    {
        let _ = set_cached_stronghold_password(app, Some(password.clone()));
        auth_log("get_or_create_stronghold_password", "keyring_read_hit");
        return Ok(password);
    }

    let bytes = random::<[u8; 32]>();
    let password = STANDARD_NO_PAD.encode(bytes);
    auth_log("get_or_create_stronghold_password", "keyring_write_start");
    if let Err(error) =
        app.keyring()
            .set_password(KEYRING_SERVICE, KEYRING_USER_STRONGHOLD_PASSWORD, &password)
    {
        let mapped_error = map_keyring_error("Keyring write failed", error);
        if is_keychain_item_already_exists_message(&mapped_error) {
            auth_log(
                "get_or_create_stronghold_password",
                "keychain_item_already_exists_retrying_read",
            );
            if let Some(existing_password) = app
                .keyring()
                .get_password(KEYRING_SERVICE, KEYRING_USER_STRONGHOLD_PASSWORD)
                .map_err(|e| map_keyring_error("Keyring read after existing-item failed", e))?
            {
                let _ = set_cached_stronghold_password(app, Some(existing_password.clone()));
                return Ok(existing_password);
            }
            // tauri-plugin-keyring's `get_password()` can return `Ok(None)` when the OS denies
            // access. If the key already exists but read still yields None, treat this as
            // "waiting for keychain access" so bootstrap remains in the secure-storage phase.
            return Err(keychain_access_required_error(
                "Keyring item exists but cannot be read yet. Approve Keychain access and choose Always Allow.",
            ));
        }
        return Err(mapped_error);
    }
    let _ = set_cached_stronghold_password(app, Some(password.clone()));
    auth_log("get_or_create_stronghold_password", "done");
    Ok(password)
}

fn stronghold_key_from_password_string(password: &str) -> Vec<u8> {
    if let Ok(decoded) = STANDARD_NO_PAD.decode(password) {
        if decoded.len() == 32 {
            return decoded;
        }
    }

    // Backward-compatible fallback for legacy/non-base64 values.
    // Stronghold's key provider requires 32-byte key material.
    Sha256::digest(password.as_bytes()).to_vec()
}

fn initialize_stronghold_with_recovery_internal(
    app: &tauri::AppHandle,
    mut stronghold_open_started_tx: Option<oneshot::Sender<()>>,
) -> Result<Stronghold, String> {
    auth_log("initialize_stronghold_with_recovery", "start");
    let snapshot_path = stronghold_snapshot_path(app)?;
    auth_log(
        "initialize_stronghold_with_recovery",
        "snapshot_path_resolved",
    );
    let password = get_or_create_stronghold_password(app)?;
    let key = stronghold_key_from_password_string(&password);
    auth_log(
        "initialize_stronghold_with_recovery",
        "stronghold_new_start",
    );

    // Immediately resolve UI state based on current runtime cache.
    // If runtime session exists, we know we are signed in and the caller is saving.
    let runtime_user = app.clerk().user().ok().flatten();
    let runtime_session = app.clerk().session().ok().flatten();
    if runtime_session.is_some() {
        let result = AuthStatusPayload {
            is_signed_in: true,
            session_id: runtime_session.map(|s| s.id),
            user_id: runtime_user.as_ref().map(|current| current.id.clone()),
            display_name: runtime_user
                .as_ref()
                .and_then(|current| derive_user_display_name(current)),
            bootstrap_phase: Some(AUTH_PHASE_READY.to_string()),
        };
        emit_auth_state(app, "stronghold_new_start", &result);
    }

    if let Some(tx) = stronghold_open_started_tx.take() {
        let _ = tx.send(());
    }

    match Stronghold::new(snapshot_path.clone(), key) {
        Ok(stronghold) => {
            auth_log("initialize_stronghold_with_recovery", "stronghold_new_done");
            println!("STRONGHOLD INITIALIZED SUCCESSFULLY (KEYCHAIN UNLOCKED)");
            Ok(stronghold)
        }
        Err(first_error) => {
            // Corrupted snapshot and/or stale password can make Stronghold unopenable.
            // Reset both once and retry so auth can recover without manual cleanup.
            let _ = fs::remove_file(&snapshot_path);
            let _ = app
                .keyring()
                .delete_password(KEYRING_SERVICE, KEYRING_USER_STRONGHOLD_PASSWORD);
            let _ = set_cached_stronghold_password(app, None);

            let retry_password = get_or_create_stronghold_password(app)?;
            let retry_key = stronghold_key_from_password_string(&retry_password);
            auth_log(
                "initialize_stronghold_with_recovery",
                "stronghold_retry_new_start",
            );
            Stronghold::new(snapshot_path, retry_key).map_err(|retry_error| {
                format!(
                    "Stronghold init failed after recovery (first: {first_error}; retry: {retry_error})"
                )
            })
        }
    }
}

fn initialize_stronghold_with_recovery(app: &tauri::AppHandle) -> Result<Stronghold, String> {
    initialize_stronghold_with_recovery_internal(app, None)
}

fn load_secure_auth_state_internal(
    app: &tauri::AppHandle,
    stronghold_open_started_tx: Option<oneshot::Sender<()>>,
) -> Result<Option<SecureAuthState>, String> {
    let started_at = Instant::now();
    auth_log("load_secure_auth_state", "start");
    let snapshot_path = stronghold_snapshot_path(app)?;
    auth_log("load_secure_auth_state", "snapshot_path_resolved");
    if !snapshot_path.exists() {
        auth_log("load_secure_auth_state", "snapshot_missing");
    } else {
        auth_log("load_secure_auth_state", "snapshot_present");
    }
    let stronghold = initialize_stronghold_with_recovery_internal(app, stronghold_open_started_tx)?;
    auth_log("load_secure_auth_state", "stronghold_ready");

    let client_id = STRONGHOLD_CLIENT_ID.to_vec();
    let client = match stronghold.get_client(client_id.clone()) {
        Ok(client) => client,
        Err(_) => {
            stronghold
                .create_client(client_id.clone())
                .map_err(|e| format!("Stronghold client create failed: {e}"))?;
            stronghold
                .get_client(client_id)
                .map_err(|e| format!("Stronghold client load failed: {e}"))?
        }
    };

    let stored = client
        .store()
        .get(STRONGHOLD_AUTH_STATE_KEY)
        .map_err(|e| format!("Stronghold read failed: {e}"))?;

    match stored {
        Some(bytes) => {
            let state: SecureAuthState =
                serde_json::from_slice(&bytes).map_err(|e| format!("State parse failed: {e}"))?;
            auth_log_elapsed("load_secure_auth_state", "state_found", started_at);
            Ok(Some(state))
        }
        None => {
            auth_log_elapsed("load_secure_auth_state", "state_missing", started_at);
            Ok(None)
        }
    }
}

fn load_secure_auth_state(app: &tauri::AppHandle) -> Result<Option<SecureAuthState>, String> {
    load_secure_auth_state_internal(app, None)
}

fn save_secure_auth_state(app: &tauri::AppHandle, state: &SecureAuthState) -> Result<(), String> {
    let started_at = Instant::now();
    auth_log("save_secure_auth_state", "start");
    let stronghold = initialize_stronghold_with_recovery(app)?;

    let client_id = STRONGHOLD_CLIENT_ID.to_vec();
    let client = match stronghold.get_client(client_id.clone()) {
        Ok(client) => client,
        Err(_) => {
            stronghold
                .create_client(client_id.clone())
                .map_err(|e| format!("Stronghold client create failed: {e}"))?;
            stronghold
                .get_client(client_id)
                .map_err(|e| format!("Stronghold client load failed: {e}"))?
        }
    };

    let payload = serde_json::to_vec(state).map_err(|e| format!("State serialize failed: {e}"))?;
    client
        .store()
        .insert(STRONGHOLD_AUTH_STATE_KEY.to_vec(), payload, None)
        .map_err(|e| format!("Stronghold write failed: {e}"))?;
    stronghold
        .save()
        .map_err(|e| format!("Stronghold save failed: {e}"))?;
    auth_log_elapsed("save_secure_auth_state", "done", started_at);
    Ok(())
}

fn clear_secure_auth_state(app: &tauri::AppHandle) -> Result<(), String> {
    let started_at = Instant::now();
    auth_log("clear_secure_auth_state", "start");
    let stronghold = initialize_stronghold_with_recovery(app)?;

    let client_id = STRONGHOLD_CLIENT_ID.to_vec();
    let client = match stronghold.get_client(client_id.clone()) {
        Ok(client) => client,
        Err(_) => {
            stronghold
                .create_client(client_id.clone())
                .map_err(|e| format!("Stronghold client create failed: {e}"))?;
            stronghold
                .get_client(client_id)
                .map_err(|e| format!("Stronghold client load failed: {e}"))?
        }
    };

    let _ = client
        .store()
        .delete(STRONGHOLD_AUTH_STATE_KEY)
        .map_err(|e| format!("Stronghold delete failed: {e}"))?;
    stronghold
        .save()
        .map_err(|e| format!("Stronghold save failed: {e}"))?;
    auth_log_elapsed("clear_secure_auth_state", "done", started_at);
    Ok(())
}

async fn load_secure_auth_state_with_timeout(
    app: &tauri::AppHandle,
    op: &str,
) -> Option<SecureAuthState> {
    let started_at = Instant::now();
    let app_handle = app.clone();
    let load_task = tokio::task::spawn_blocking(move || load_secure_auth_state(&app_handle));

    match timeout(Duration::from_millis(STRONGHOLD_OP_TIMEOUT_MS), load_task).await {
        Ok(Ok(Ok(state))) => {
            auth_log_elapsed(op, "load_secure_auth_state_with_timeout_done", started_at);
            state
        }
        Ok(Ok(Err(error))) => {
            auth_log(op, &format!("load_secure_auth_state_error={error}"));
            None
        }
        Ok(Err(error)) => {
            auth_log(op, &format!("load_secure_auth_state_join_error={error}"));
            None
        }
        Err(_) => {
            auth_log_elapsed(op, "load_secure_auth_state_timeout", started_at);
            if let Ok(snapshot_path) = stronghold_snapshot_path(app) {
                let _ = fs::remove_file(&snapshot_path);
                cleanup_stronghold_snapshot_files(&snapshot_path);
            }
            None
        }
    }
}

async fn load_secure_auth_state_without_timeout(
    app: &tauri::AppHandle,
    op: &str,
) -> Result<Option<SecureAuthState>, String> {
    let started_at = Instant::now();
    let (stronghold_open_started_tx, stronghold_open_started_rx) = oneshot::channel::<()>();
    let app_handle = app.clone();
    let load_task = tokio::task::spawn_blocking(move || {
        load_secure_auth_state_internal(&app_handle, Some(stronghold_open_started_tx))
    });

    let stronghold_open_started = stronghold_open_started_rx.await.is_ok();

    if stronghold_open_started {
        auth_log(op, "stronghold_open_started_emitting_resolving");
        emit_auth_phase(app, op, AUTH_PHASE_RESOLVING_AUTH);
    }

    if !stronghold_open_started {
        return match load_task.await {
            Ok(Ok(state)) => {
                auth_log_elapsed(
                    op,
                    "load_secure_auth_state_without_timeout_done",
                    started_at,
                );
                Ok(state)
            }
            Ok(Err(error)) => Err(error),
            Err(error) => Err(format!("Secure state load join error: {error}")),
        };
    }

    match timeout(
        Duration::from_millis(STRONGHOLD_BOOTSTRAP_TIMEOUT_MS),
        load_task,
    )
    .await
    {
        Ok(Ok(Ok(state))) => {
            auth_log_elapsed(
                op,
                "load_secure_auth_state_without_timeout_done",
                started_at,
            );
            Ok(state)
        }
        Ok(Ok(Err(error))) => Err(error),
        Ok(Err(error)) => Err(format!("Secure state load join error: {error}")),
        Err(_) => {
            auth_log_elapsed(op, "load_secure_auth_state_bootstrap_timeout", started_at);
            if let Ok(snapshot_path) = stronghold_snapshot_path(app) {
                let _ = fs::remove_file(&snapshot_path);
                cleanup_stronghold_snapshot_files(&snapshot_path);
            }
            Err(format!(
                "Secure state load timed out after {}ms after stronghold start",
                STRONGHOLD_BOOTSTRAP_TIMEOUT_MS
            ))
        }
    }
}

async fn save_secure_auth_state_without_timeout(
    app: &tauri::AppHandle,
    state: SecureAuthState,
    op: &str,
) -> Result<(), String> {
    let started_at = Instant::now();
    let app_handle = app.clone();
    let save_task =
        tokio::task::spawn_blocking(move || save_secure_auth_state(&app_handle, &state));

    match save_task.await {
        Ok(Ok(())) => {
            auth_log_elapsed(
                op,
                "save_secure_auth_state_without_timeout_done",
                started_at,
            );
            Ok(())
        }
        Ok(Err(error)) => {
            auth_log(op, &format!("save_secure_auth_state_error={error}"));
            Err(error)
        }
        Err(join_err) => {
            auth_log(op, &format!("save_secure_auth_state_join_error={join_err}"));
            Err(format!("Secure state save task failed: {}", join_err))
        }
    }
}

async fn clear_secure_auth_state_without_timeout(app: &tauri::AppHandle) -> Result<(), String> {
    let started_at = Instant::now();
    let app_handle = app.clone();
    let clear_task = tokio::task::spawn_blocking(move || clear_secure_auth_state(&app_handle));

    match clear_task.await {
        Ok(Ok(())) => {
            auth_log_elapsed(
                "auth_sign_out",
                "clear_secure_auth_state_without_timeout_done",
                started_at,
            );
            Ok(())
        }
        Ok(Err(error)) => {
            auth_log("auth_sign_out", &format!("clear_secure_auth_state_error={error}"));
            Err(error)
        }
        Err(join_err) => {
            auth_log(
                "auth_sign_out",
                &format!("clear_secure_auth_state_join_error={join_err}"),
            );
            Err(format!("Secure state clear task failed: {join_err}"))
        }
    }
}

async fn ensure_clerk_ready(
    app: &tauri::AppHandle,
    hydration: &State<'_, SecureStateHydration>,
    hydrate_from_secure_state: bool,
) -> Result<Option<SecureAuthState>, String> {
    let started_at = Instant::now();
    auth_log("ensure_clerk_ready", "start");
    if hydrate_from_secure_state {
        emit_auth_phase(app, "ensure_clerk_ready", AUTH_PHASE_RESOLVING_AUTH);
    }
    let should_hydrate = if hydrate_from_secure_state {
        let mut guard = hydration
            .hydrated
            .lock()
            .map_err(|_| "Hydration lock poisoned".to_string())?;
        if *guard {
            false
        } else {
            *guard = true;
            true
        }
    } else {
        false
    };
    auth_log("ensure_clerk_ready", "ensure_clerk_initialized_start");
    if let Err(error) = app.ensure_clerk_initialized().await {
        if should_hydrate {
            if let Ok(mut guard) = hydration.hydrated.lock() {
                *guard = false;
            }
        }
        return Err(error);
    }
    auth_log("ensure_clerk_ready", "ensure_clerk_initialized_done");

    let has_runtime_session = app
        .clerk()
        .session()
        .map_err(|e| format!("Session read failed: {e}"))?
        .is_some();

    let hydrated_state: Option<SecureAuthState> = if should_hydrate && !has_runtime_session {
        auth_log("ensure_clerk_ready", "hydrating_from_secure_state");
        emit_auth_phase(
            app,
            "ensure_clerk_ready",
            AUTH_PHASE_WAITING_FOR_SECURE_STORAGE,
        );
        let loaded = match load_secure_auth_state_without_timeout(app, "ensure_clerk_ready").await {
            Ok(loaded) => loaded,
            Err(error) => {
                if let Ok(mut guard) = hydration.hydrated.lock() {
                    *guard = false;
                }
                return Err(format!("Secure state hydration failed: {error}"));
            }
        };
        emit_auth_phase(app, "ensure_clerk_ready", AUTH_PHASE_RESOLVING_AUTH);
        if let Some(stored) = loaded.as_ref() {
            app.clerk()
                .set_client_authorization_header(stored.authorization_header.clone());
            auth_log(
                "ensure_clerk_ready",
                "ensure_clerk_initialized_after_hydration_start",
            );
            if let Err(error) = app.ensure_clerk_initialized().await {
                if let Ok(mut guard) = hydration.hydrated.lock() {
                    *guard = false;
                }
                return Err(error);
            }
            auth_log(
                "ensure_clerk_ready",
                "ensure_clerk_initialized_after_hydration_done",
            );
        }
        loaded
    } else {
        None
    };

    auth_log_elapsed("ensure_clerk_ready", "done", started_at);
    Ok(hydrated_state)
}

async fn persist_runtime_auth_state(app: &tauri::AppHandle) -> Result<(), String> {
    let started_at = Instant::now();
    auth_log("persist_runtime_auth_state", "start");
    let clerk = app.clerk();
    let session_id = clerk
        .session()
        .map_err(|e| format!("Session read failed: {e}"))?
        .map(|session| session.id);
    let user_id = clerk
        .user()
        .map_err(|e| format!("User read failed: {e}"))?
        .map(|user| user.id);

    let result = save_secure_auth_state_without_timeout(
        app,
        SecureAuthState {
            authorization_header: clerk.get_client_authorization_header(),
            session_id,
            user_id,
        },
        "persist_runtime_auth_state",
    )
    .await;
    auth_log_elapsed("persist_runtime_auth_state", "done", started_at);
    result
}

async fn wait_for_active_session(
    app: &tauri::AppHandle,
    expected_session_id: &str,
) -> Result<(), String> {
    let started_at = Instant::now();
    auth_log("wait_for_active_session", "start");
    for _ in 0..10 {
        let session_id = app
            .clerk()
            .session()
            .map_err(|e| format!("Session read failed: {e}"))?
            .map(|session| session.id);

        if session_id.as_deref() == Some(expected_session_id) {
            auth_log_elapsed(
                "wait_for_active_session",
                "active_session_found",
                started_at,
            );
            return Ok(());
        }

        sleep(Duration::from_millis(120)).await;
    }

    auth_log_elapsed("wait_for_active_session", "timed_out", started_at);
    Err("Timed out waiting for active session state.".to_string())
}

async fn persist_runtime_auth_state_after_active(
    app: &tauri::AppHandle,
    expected_session_id: &str,
) -> Result<(), String> {
    let started_at = Instant::now();
    auth_log("persist_runtime_auth_state_after_active", "start");
    wait_for_active_session(app, expected_session_id).await?;

    let clerk = app.clerk();
    let session_id = clerk
        .session()
        .map_err(|e| format!("Session read failed: {e}"))?
        .map(|session| session.id);
    let user_id = clerk
        .user()
        .map_err(|e| format!("User read failed: {e}"))?
        .map(|user| user.id);

    let result = save_secure_auth_state_without_timeout(
        app,
        SecureAuthState {
            authorization_header: clerk.get_client_authorization_header(),
            session_id,
            user_id,
        },
        "persist_runtime_auth_state_after_active",
    )
    .await;
    auth_log_elapsed(
        "persist_runtime_auth_state_after_active",
        "done",
        started_at,
    );
    result
}

fn configured_web_auth_base_url() -> Result<Url, String> {
    let configured = get_env_opt("WEB_AUTH_BASE_URL")
        .or_else(|| get_env_opt("NEXT_PUBLIC_WEB_AUTH_BASE_URL"))
        .ok_or_else(|| "Missing WEB_AUTH_BASE_URL configuration".to_string())?;
    let parsed = Url::parse(&configured)
        .map_err(|e| format!("Invalid WEB_AUTH_BASE_URL configuration: {e}"))?;
    if parsed.scheme() != "https" {
        return Err("WEB_AUTH_BASE_URL must use https".to_string());
    }
    if parsed.host_str().is_none() {
        return Err("WEB_AUTH_BASE_URL must include a host".to_string());
    }
    Ok(parsed)
}

fn validate_web_sign_in_url(sign_in_url: &str) -> Result<Url, String> {
    let parsed = Url::parse(sign_in_url).map_err(|e| format!("Invalid sign-in URL: {e}"))?;
    if parsed.scheme() != "https" {
        return Err("Sign-in URL must use https".to_string());
    }
    if !parsed.username().is_empty() || parsed.password().is_some() {
        return Err("Sign-in URL must not include credentials".to_string());
    }
    if parsed.fragment().is_some() {
        return Err("Sign-in URL must not include a fragment".to_string());
    }

    let base = configured_web_auth_base_url()?;
    let parsed_host = parsed
        .host_str()
        .ok_or_else(|| "Sign-in URL must include a host".to_string())?;
    let base_host = base
        .host_str()
        .ok_or_else(|| "WEB_AUTH_BASE_URL must include a host".to_string())?;
    let parsed_port = parsed.port_or_known_default();
    let base_port = base.port_or_known_default();
    if !parsed_host.eq_ignore_ascii_case(base_host) || parsed_port != base_port {
        return Err("Sign-in URL origin does not match WEB_AUTH_BASE_URL".to_string());
    }

    let base_path = base.path().trim_end_matches('/');
    let expected_sign_in_prefix = if base_path.is_empty() {
        "/sign-in".to_string()
    } else {
        format!("{base_path}/sign-in")
    };
    if !parsed.path().starts_with(&expected_sign_in_prefix) {
        return Err(
            "Sign-in URL path must start with '/sign-in' under WEB_AUTH_BASE_URL".to_string(),
        );
    }

    Ok(parsed)
}

fn default_web_sign_in_url() -> Result<Url, String> {
    let mut base = configured_web_auth_base_url()?;
    let base_path = base.path().trim_end_matches('/');
    let sign_in_path = if base_path.is_empty() {
        "/sign-in".to_string()
    } else {
        format!("{base_path}/sign-in")
    };
    base.set_path(&sign_in_path);
    base.set_query(None);
    base.set_fragment(None);
    Ok(base)
}

fn resolve_web_sign_in_url(sign_in_url: Option<&str>) -> Result<Url, String> {
    match sign_in_url {
        Some(url) => validate_web_sign_in_url(url),
        None => default_web_sign_in_url(),
    }
}

fn sign_in_status(status: SignInStatus) -> String {
    match status {
        SignInStatus::Abandoned => "abandoned",
        SignInStatus::NeedsIdentifier => "needs_identifier",
        SignInStatus::NeedsFirstFactor => "needs_first_factor",
        SignInStatus::NeedsSecondFactor => "needs_second_factor",
        SignInStatus::NeedsNewPassword => "needs_new_password",
        SignInStatus::Complete => "complete",
    }
    .to_string()
}

fn extract_second_factors(sign_in: &ClientSignIn) -> Vec<SecondFactorPayload> {
    sign_in
        .supported_second_factors
        .clone()
        .unwrap_or_default()
        .into_iter()
        .filter_map(|factor| match factor.strategy {
            SignInFactorStrategy::EmailCode => Some(SecondFactorPayload {
                strategy: "email_code".to_string(),
            }),
            SignInFactorStrategy::Totp => Some(SecondFactorPayload {
                strategy: "totp".to_string(),
            }),
            SignInFactorStrategy::BackupCode => Some(SecondFactorPayload {
                strategy: "backup_code".to_string(),
            }),
            _ => None,
        })
        .collect()
}

fn extract_oauth_redirect_url(sign_in: &ClientSignIn) -> Option<String> {
    if let Some(verification) = &sign_in.first_factor_verification {
        if let ClientSignInFirstFactorVerification::StubsVerificationOauth(details) =
            &**verification
        {
            if let Some(Some(url)) = details.external_verification_redirect_url.clone() {
                return Some(url);
            }
        }
    }

    for factor in sign_in.supported_first_factors.clone().unwrap_or_default() {
        if let Some(Some(url)) = factor.external_verification_redirect_url {
            return Some(url);
        }
    }

    None
}

fn is_desktop_auth_callback_url(url: &Url) -> bool {
    let normalized_path = url.path().trim_end_matches('/');
    let host_path = format!("{}{}", url.host_str().unwrap_or_default(), normalized_path);

    if host_path == "auth/v2" || url.path() == "/auth/v2" {
        return true;
    }

    if host_path == "auth" || url.path() == "/auth" || url.host_str() == Some("auth") {
        return true;
    }

    false
}

fn parse_desktop_auth_callback_url(raw_url: &str) -> Option<DesktopAuthCallbackPayload> {
    let parsed = Url::parse(raw_url).ok()?;
    let parsed_scheme = parsed.scheme();
    if parsed_scheme != desktop_deep_link_scheme() {
        return None;
    }

    if !is_desktop_auth_callback_url(&parsed) {
        return None;
    }
    let mut callback_pairs: Vec<(String, String)> = parsed
        .query_pairs()
        .map(|(k, v)| (k.into_owned(), v.into_owned()))
        .collect();
    if let Some(fragment) = parsed.fragment() {
        callback_pairs.extend(
            form_urlencoded::parse(fragment.as_bytes())
                .map(|(k, v)| (k.into_owned(), v.into_owned())),
        );
    }

    let ticket = callback_pairs.iter().find_map(|(k, v)| match k.as_str() {
        "ticket" | "__clerk_ticket" | "token" => Some(v.clone()),
        _ => None,
    })?;
    let state = callback_pairs.iter().find_map(|(k, v)| match k.as_str() {
        "state" | "__clerk_state" => Some(v.clone()),
        _ => None,
    });

    Some(DesktopAuthCallbackPayload { ticket, state })
}

fn validate_pending_oauth(
    pending_oauth: &State<'_, PendingOAuthState>,
    callback: &DesktopAuthCallbackPayload,
) -> Result<(), String> {
    let now = now_ms()?;
    let mut lock = pending_oauth
        .request
        .lock()
        .map_err(|_| "Pending OAuth lock poisoned".to_string())?;
    let request = lock
        .as_ref()
        .ok_or_else(|| "No pending OAuth request found".to_string())?;

    if now.saturating_sub(request.created_at_ms) > OAUTH_PENDING_TTL_MS {
        *lock = None;
        return Err("OAuth callback is stale. Please start sign-in again.".to_string());
    }

    if let Some(callback_state) = callback.state.as_ref() {
        if request.state != *callback_state {
            return Err("Invalid OAuth callback state.".to_string());
        }
    } else {
        return Err("Invalid OAuth callback state.".to_string());
    }

    *lock = None;
    Ok(())
}

async fn map_sign_in_response(
    app: &tauri::AppHandle,
    pending: &State<'_, PendingSignInState>,
    sign_in: ClientSignIn,
) -> Result<AuthFlowPayload, String> {
    let started_at = Instant::now();
    let status = sign_in_status(sign_in.status);
    auth_log("map_sign_in_response", &format!("start status={status}"));
    let session_id = sign_in.created_session_id.clone();
    let second_factors = extract_second_factors(&sign_in);
    let oauth_redirect_url = extract_oauth_redirect_url(&sign_in);

    match status.as_str() {
        "complete" => {
            if let Some(created_session_id) = sign_in.created_session_id.clone() {
                auth_log(
                    "map_sign_in_response",
                    &format!("complete created_session_id={created_session_id}"),
                );
                let app_handle = app.clone();
                tauri::async_runtime::spawn(async move {
                    let async_started = Instant::now();
                    auth_log("map_sign_in_response_async", "set_active_start");
                    let set_active_result = app_handle
                        .clerk()
                        .set_active(Some(created_session_id.clone()), None)
                        .await;

                    if set_active_result.is_ok() {
                        auth_log("map_sign_in_response_async", "set_active_ok");
                        let persist_result = persist_runtime_auth_state_after_active(
                            &app_handle,
                            &created_session_id,
                        )
                        .await;
                        if let Err(error) = persist_result {
                            auth_log(
                                "map_sign_in_response_async",
                                &format!("persist_after_active_error={error}"),
                            );
                            if is_keychain_access_required_error(&error) {
                                emit_auth_phase(
                                    &app_handle,
                                    "map_sign_in_response_async",
                                    AUTH_PHASE_WAITING_FOR_SECURE_STORAGE,
                                );
                                auth_log_elapsed(
                                    "map_sign_in_response_async",
                                    "waiting_for_secure_storage",
                                    async_started,
                                );
                                return;
                            }
                        }
                        let runtime_payload = auth_status_payload_from_runtime(&app_handle);
                        emit_auth_state(
                            &app_handle,
                            "map_sign_in_response_async",
                            &runtime_payload,
                        );
                    } else {
                        auth_log("map_sign_in_response_async", "set_active_failed");
                        let runtime_payload = auth_status_payload_from_runtime(&app_handle);
                        emit_auth_state(
                            &app_handle,
                            "map_sign_in_response_async",
                            &runtime_payload,
                        );
                        let _ = persist_runtime_auth_state(&app_handle).await;
                    }
                    auth_log_elapsed("map_sign_in_response_async", "done", async_started);
                });
            } else {
                auth_log(
                    "map_sign_in_response",
                    "complete_without_created_session_id",
                );
                let app_handle = app.clone();
                tauri::async_runtime::spawn(async move {
                    let async_started = Instant::now();
                    let persist_result = persist_runtime_auth_state(&app_handle).await;
                    if let Err(error) = persist_result {
                        auth_log(
                            "map_sign_in_response_async",
                            &format!("persist_runtime_auth_state_error={error}"),
                        );
                        if is_keychain_access_required_error(&error) {
                            emit_auth_phase(
                                &app_handle,
                                "map_sign_in_response_async",
                                AUTH_PHASE_WAITING_FOR_SECURE_STORAGE,
                            );
                            auth_log_elapsed(
                                "map_sign_in_response_async",
                                "persist_without_session_waiting_for_secure_storage",
                                async_started,
                            );
                            return;
                        }
                    }
                    let runtime_payload = auth_status_payload_from_runtime(&app_handle);
                    emit_auth_state(&app_handle, "map_sign_in_response_async", &runtime_payload);
                    auth_log_elapsed(
                        "map_sign_in_response_async",
                        "persist_without_session_done",
                        async_started,
                    );
                });
            }
            {
                let mut lock = pending
                    .sign_in_id
                    .lock()
                    .map_err(|_| "Pending state lock poisoned".to_string())?;
                *lock = None;
            }
            Ok(AuthFlowPayload {
                status,
                is_signed_in: true,
                second_factors,
                oauth_redirect_url,
                session_id,
            })
        }
        "needs_second_factor" => {
            {
                let mut lock = pending
                    .sign_in_id
                    .lock()
                    .map_err(|_| "Pending state lock poisoned".to_string())?;
                *lock = Some(sign_in.id.clone());
            }
            Ok(AuthFlowPayload {
                status,
                is_signed_in: false,
                second_factors,
                oauth_redirect_url,
                session_id: None,
            })
        }
        _ => {
            let mut lock = pending
                .sign_in_id
                .lock()
                .map_err(|_| "Pending state lock poisoned".to_string())?;
            *lock = Some(sign_in.id.clone());
            Ok(AuthFlowPayload {
                status,
                is_signed_in: false,
                second_factors,
                oauth_redirect_url,
                session_id: None,
            })
        }
    }
    .inspect(|_| auth_log_elapsed("map_sign_in_response", "done", started_at))
}

fn auth_status_payload_from_stored(stored: Option<SecureAuthState>) -> AuthStatusPayload {
    let session_id = stored.as_ref().and_then(|state| state.session_id.clone());
    let user_id = stored.as_ref().and_then(|state| state.user_id.clone());
    AuthStatusPayload {
        is_signed_in: session_id.is_some(),
        session_id,
        user_id,
        display_name: None,
        bootstrap_phase: None,
    }
}

fn auth_status_payload_from_runtime(app: &tauri::AppHandle) -> AuthStatusPayload {
    let session_id = app
        .clerk()
        .session()
        .ok()
        .and_then(|session| session.map(|current| current.id));
    let runtime_user = app.clerk().user().ok().flatten();
    let user_id = runtime_user.as_ref().map(|current| current.id.clone());
    let display_name = runtime_user
        .as_ref()
        .and_then(|current| derive_user_display_name(current));

    AuthStatusPayload {
        is_signed_in: session_id.is_some(),
        session_id,
        user_id,
        display_name,
        bootstrap_phase: None,
    }
}

fn emit_auth_state(app: &tauri::AppHandle, op: &str, payload: &AuthStatusPayload) {
    if let Err(error) = app.emit(AUTH_STATE_EVENT, payload.clone()) {
        auth_log(op, &format!("emit_auth_state_error={error}"));
    } else {
        auth_log(op, "emit_auth_state_ok");
    }
}

fn derive_user_display_name(user: &ClientUser) -> Option<String> {
    if let Some(username) = user.username.as_ref().and_then(|name| {
        let trimmed = name.trim();
        if trimmed.is_empty() {
            None
        } else {
            Some(trimmed.to_string())
        }
    }) {
        return Some(username);
    }

    let full_name = format!(
        "{} {}",
        user.first_name.as_deref().unwrap_or("").trim(),
        user.last_name.as_deref().unwrap_or("").trim()
    )
    .trim()
    .to_string();
    if !full_name.is_empty() {
        return Some(full_name);
    }

    if let Some(primary_email_id) = user.primary_email_address_id.as_ref() {
        if let Some(primary_email) = user
            .email_addresses
            .iter()
            .find(|address| &address.id == primary_email_id)
            .map(|address| address.email_address.trim().to_string())
            .filter(|email| !email.is_empty())
        {
            return Some(primary_email);
        }
    }

    user.email_addresses
        .first()
        .map(|address| address.email_address.trim().to_string())
        .filter(|email| !email.is_empty())
}

#[tauri::command]
async fn auth_bootstrap(
    app: tauri::AppHandle,
    hydration: State<'_, SecureStateHydration>,
) -> Result<AuthStatusPayload, String> {
    let started_at = Instant::now();
    auth_log("auth_bootstrap", "start");
    emit_auth_phase(&app, "auth_bootstrap", AUTH_PHASE_RESOLVING_AUTH);
    let hydrated_state = match ensure_clerk_ready(&app, &hydration, true).await {
        Ok(state) => state,
        Err(error) => {
            auth_log(
                "auth_bootstrap",
                &format!("ensure_clerk_ready_error={error}"),
            );
            if is_keychain_access_required_error(&error) {
                let waiting = AuthStatusPayload {
                    is_signed_in: false,
                    session_id: None,
                    user_id: None,
                    display_name: None,
                    bootstrap_phase: Some(AUTH_PHASE_WAITING_FOR_SECURE_STORAGE.to_string()),
                };
                emit_auth_state(&app, "auth_bootstrap", &waiting);
                auth_log_elapsed(
                    "auth_bootstrap",
                    "ensure_clerk_ready_waiting_for_secure_storage",
                    started_at,
                );
                return Ok(waiting);
            }
            auth_log_elapsed(
                "auth_bootstrap",
                "ensure_clerk_ready_failed_using_stored",
                started_at,
            );
            let fallback = auth_status_payload_from_stored(
                load_secure_auth_state_with_timeout(&app, "auth_bootstrap").await,
            );
            emit_auth_state(&app, "auth_bootstrap", &fallback);
            return Ok(fallback);
        }
    };

    let runtime_user = app.clerk().user().ok().flatten();
    let runtime_session_id = app
        .clerk()
        .session()
        .ok()
        .and_then(|session| session.map(|current| current.id));
    let runtime_user_id = runtime_user.as_ref().map(|current| current.id.clone());
    let runtime_display_name = runtime_user
        .as_ref()
        .and_then(|current| derive_user_display_name(current));

    if runtime_session_id.is_none()
        && hydrated_state
            .as_ref()
            .and_then(|state| state.session_id.as_ref())
            .is_some()
    {
        auth_log("auth_bootstrap", "hydrated_session_present_runtime_missing");
        auth_log_elapsed("auth_bootstrap", "returning_hydrated_state", started_at);
        let fallback = auth_status_with_phase(
            auth_status_payload_from_stored(hydrated_state),
            AUTH_PHASE_READY,
        );
        emit_auth_state(&app, "auth_bootstrap", &fallback);
        return Ok(fallback);
    }

    if runtime_session_id.is_some() {
        auth_log("auth_bootstrap", "runtime_session_present");
        if let Err(error) = persist_runtime_auth_state(&app).await {
            auth_log(
                "auth_bootstrap",
                &format!("persist_runtime_auth_state_error={error}"),
            );
            if is_keychain_access_required_error(&error) {
                let waiting = AuthStatusPayload {
                    is_signed_in: false,
                    session_id: None,
                    user_id: None,
                    display_name: None,
                    bootstrap_phase: Some(AUTH_PHASE_WAITING_FOR_SECURE_STORAGE.to_string()),
                };
                emit_auth_state(&app, "auth_bootstrap", &waiting);
                auth_log_elapsed(
                    "auth_bootstrap",
                    "persist_runtime_auth_state_waiting_for_secure_storage",
                    started_at,
                );
                return Ok(waiting);
            }
        }
    }

    let result = AuthStatusPayload {
        is_signed_in: runtime_session_id.is_some(),
        session_id: runtime_session_id,
        user_id: runtime_user_id,
        display_name: runtime_display_name,
        bootstrap_phase: Some(AUTH_PHASE_READY.to_string()),
    };
    emit_auth_state(&app, "auth_bootstrap", &result);
    auth_log_elapsed("auth_bootstrap", "done", started_at);
    Ok(result)
}

#[tauri::command]
async fn auth_status(
    app: tauri::AppHandle,
    hydration: State<'_, SecureStateHydration>,
) -> Result<AuthStatusPayload, String> {
    let started_at = Instant::now();
    auth_log("auth_status", "start");
    let _ = ensure_clerk_ready(&app, &hydration, true).await?;
    let session_id = app
        .clerk()
        .session()
        .map_err(|e| format!("Session read failed: {e}"))?
        .map(|session| session.id);
    let runtime_user = app
        .clerk()
        .user()
        .map_err(|e| format!("User read failed: {e}"))?;
    let user_id = runtime_user.as_ref().map(|user| user.id.clone());
    let display_name = runtime_user.as_ref().and_then(derive_user_display_name);

    let result = AuthStatusPayload {
        is_signed_in: session_id.is_some(),
        session_id,
        user_id,
        display_name,
        bootstrap_phase: Some(AUTH_PHASE_READY.to_string()),
    };
    emit_auth_state(&app, "auth_status", &result);
    auth_log_elapsed("auth_status", "done", started_at);
    Ok(result)
}

#[tauri::command]
async fn auth_cached_status(app: tauri::AppHandle) -> Result<AuthStatusPayload, String> {
    let started_at = Instant::now();
    auth_log("auth_cached_status", "start");
    let stored = load_secure_auth_state_with_timeout(&app, "auth_cached_status").await;
    let session_id = stored.as_ref().and_then(|state| state.session_id.clone());
    let user_id = stored.as_ref().and_then(|state| state.user_id.clone());

    let result = AuthStatusPayload {
        is_signed_in: session_id.is_some(),
        session_id,
        user_id,
        display_name: None,
        bootstrap_phase: Some(AUTH_PHASE_READY.to_string()),
    };
    emit_auth_state(&app, "auth_cached_status", &result);
    auth_log_elapsed("auth_cached_status", "done", started_at);
    Ok(result)
}

#[tauri::command]
async fn auth_sign_in_password(
    app: tauri::AppHandle,
    identifier: String,
    password: String,
    hydration: State<'_, SecureStateHydration>,
    pending: State<'_, PendingSignInState>,
) -> Result<AuthFlowPayload, String> {
    let started_at = Instant::now();
    auth_log("auth_sign_in_password", "start");
    let _ = ensure_clerk_ready(&app, &hydration, false).await?;
    if let Some(existing) =
        complete_if_runtime_session_exists(&app, "auth_sign_in_password").await?
    {
        auth_log_elapsed("auth_sign_in_password", "done_existing_session", started_at);
        return Ok(existing);
    }
    auth_log("auth_sign_in_password", "create_sign_in_start");
    let sign_in = app
        .clerk()
        .get_fapi_client()
        .create_sign_in(
            None,
            Some("password"),
            Some(&identifier),
            Some(&password),
            None,
            None,
            None,
            None,
            None,
            None,
            None,
            None,
        )
        .await;
    let sign_in = match sign_in {
        Ok(sign_in) => sign_in,
        Err(error) => {
            if let Some(existing) =
                complete_if_runtime_session_exists(&app, "auth_sign_in_password_error").await?
            {
                auth_log_elapsed(
                    "auth_sign_in_password",
                    "done_error_recovered_from_session",
                    started_at,
                );
                return Ok(existing);
            }

            if let Some(clerk_code) = extract_clerk_create_sign_in_404_code(&error) {
                auth_log(
                    "auth_sign_in_password",
                    &format!("create_sign_in_status404 clerk_code={clerk_code}"),
                );
                return Err(format_auth_error(
                    AUTH_ERROR_CODE_CREATE_SIGN_IN_404,
                    &format!("clerk_code={clerk_code}"),
                ));
            }

            let detail = describe_create_sign_in_error(&error);
            return Err(format!("Password sign-in failed: {detail}"));
        }
    };
    auth_log("auth_sign_in_password", "create_sign_in_done");

    let result = map_sign_in_response(&app, &pending, sign_in).await;
    auth_log_elapsed("auth_sign_in_password", "done", started_at);
    result
}

#[tauri::command]
async fn auth_prepare_second_factor(
    app: tauri::AppHandle,
    strategy: String,
    hydration: State<'_, SecureStateHydration>,
    pending: State<'_, PendingSignInState>,
) -> Result<AuthFlowPayload, String> {
    let started_at = Instant::now();
    auth_log(
        "auth_prepare_second_factor",
        &format!("start strategy={strategy}"),
    );
    let _ = ensure_clerk_ready(&app, &hydration, false).await?;
    let sign_in_id = {
        let lock = pending
            .sign_in_id
            .lock()
            .map_err(|_| "Pending state lock poisoned".to_string())?;
        lock.clone()
            .ok_or_else(|| "No pending sign-in challenge found".to_string())?
    };

    if strategy == "email_code" {
        auth_log(
            "auth_prepare_second_factor",
            "prepare_sign_in_factor_two_start",
        );
        let sign_in = app
            .clerk()
            .get_fapi_client()
            .prepare_sign_in_factor_two(&sign_in_id, Some("email_code"), None)
            .await
            .map_err(|e| format!("Second-factor prepare failed: {e}"))?;
        auth_log(
            "auth_prepare_second_factor",
            "prepare_sign_in_factor_two_done",
        );
        let result = map_sign_in_response(&app, &pending, sign_in).await;
        auth_log_elapsed("auth_prepare_second_factor", "done", started_at);
        return result;
    }

    auth_log("auth_prepare_second_factor", "get_sign_in_start");
    let sign_in = app
        .clerk()
        .get_fapi_client()
        .get_sign_in(&sign_in_id)
        .await
        .map_err(|e| format!("Sign-in state refresh failed: {e}"))?;
    auth_log("auth_prepare_second_factor", "get_sign_in_done");
    let result = map_sign_in_response(&app, &pending, sign_in).await;
    auth_log_elapsed("auth_prepare_second_factor", "done", started_at);
    result
}

#[tauri::command]
async fn auth_attempt_second_factor(
    app: tauri::AppHandle,
    strategy: String,
    code: String,
    hydration: State<'_, SecureStateHydration>,
    pending: State<'_, PendingSignInState>,
) -> Result<AuthFlowPayload, String> {
    let started_at = Instant::now();
    auth_log(
        "auth_attempt_second_factor",
        &format!("start strategy={strategy}"),
    );
    let _ = ensure_clerk_ready(&app, &hydration, false).await?;
    let sign_in_id = {
        let lock = pending
            .sign_in_id
            .lock()
            .map_err(|_| "Pending state lock poisoned".to_string())?;
        lock.clone()
            .ok_or_else(|| "No pending sign-in challenge found".to_string())?
    };

    auth_log(
        "auth_attempt_second_factor",
        "attempt_sign_in_factor_two_start",
    );
    let sign_in = app
        .clerk()
        .get_fapi_client()
        .attempt_sign_in_factor_two(&sign_in_id, Some(&strategy), Some(&code))
        .await
        .map_err(|e| format!("Second-factor verification failed: {e}"))?;
    auth_log(
        "auth_attempt_second_factor",
        "attempt_sign_in_factor_two_done",
    );

    let result = map_sign_in_response(&app, &pending, sign_in).await;
    auth_log_elapsed("auth_attempt_second_factor", "done", started_at);
    result
}

#[tauri::command]
async fn auth_start_web_sign_in(
    _app: tauri::AppHandle,
    sign_in_url: Option<String>,
    pending_oauth: State<'_, PendingOAuthState>,
) -> Result<(), String> {
    let started_at = Instant::now();
    auth_log("auth_start_web_sign_in", "start");
    let state = create_auth_state();
    let callback_url = desktop_callback_url(&state);
    set_pending_oauth_request(&pending_oauth, state)?;

    let mut auth_url: String = resolve_web_sign_in_url(sign_in_url.as_deref())?.into();
    let encoded_url = urlencoding::encode(&callback_url);
    let separator = if auth_url.contains('?') { "&" } else { "?" };
    auth_url.push_str(&format!("{separator}redirect_url={encoded_url}"));

    tauri_plugin_opener::open_url(&auth_url, None::<&str>).map_err(|e| {
        let _ = clear_pending_oauth_request(&pending_oauth);
        format!("Failed to open sign-in URL: {e}")
    })?;
    auth_log_elapsed("auth_start_web_sign_in", "done", started_at);
    Ok(())
}

#[tauri::command]
async fn auth_handle_callback_url(
    app: tauri::AppHandle,
    url: String,
    hydration: State<'_, SecureStateHydration>,
    pending: State<'_, PendingSignInState>,
    pending_oauth: State<'_, PendingOAuthState>,
) -> Result<Option<AuthFlowPayload>, String> {
    let started_at = Instant::now();
    auth_log("auth_handle_callback_url", "start");
    let Some(callback) = parse_desktop_auth_callback_url(&url) else {
        auth_log_elapsed(
            "auth_handle_callback_url",
            "ignored_non_auth_url",
            started_at,
        );
        return Ok(None);
    };

    validate_pending_oauth(&pending_oauth, &callback)?;
    let _ = ensure_clerk_ready(&app, &hydration, false).await?;
    if let Some(existing) =
        complete_if_runtime_session_exists(&app, "auth_handle_callback_url").await?
    {
        auth_log_elapsed(
            "auth_handle_callback_url",
            "done_existing_session",
            started_at,
        );
        return Ok(Some(existing));
    }
    auth_log("auth_handle_callback_url", "ticket_exchange_start");
    let sign_in = app
        .clerk()
        .get_fapi_client()
        .create_sign_in(
            None,
            Some("ticket"),
            None,
            None,
            Some(&callback.ticket),
            None,
            None,
            None,
            None,
            None,
            None,
            None,
        )
        .await;
    let sign_in = match sign_in {
        Ok(sign_in) => sign_in,
        Err(error) => {
            if let Some(existing) =
                complete_if_runtime_session_exists(&app, "auth_handle_callback_url_error").await?
            {
                auth_log_elapsed(
                    "auth_handle_callback_url",
                    "done_error_recovered_from_session",
                    started_at,
                );
                return Ok(Some(existing));
            }

            if let Some(clerk_code) = extract_clerk_create_sign_in_404_code(&error) {
                auth_log(
                    "auth_handle_callback_url",
                    &format!("ticket_exchange_status404 clerk_code={clerk_code}"),
                );
                return Err(format_auth_error(
                    AUTH_ERROR_CODE_TICKET_EXCHANGE_404,
                    &format!("clerk_code={clerk_code}"),
                ));
            }

            let detail = describe_create_sign_in_error(&error);
            return Err(format!("Ticket exchange failed: {detail}"));
        }
    };
    auth_log("auth_handle_callback_url", "ticket_exchange_done");

    let result = map_sign_in_response(&app, &pending, sign_in)
        .await
        .map(Some);
    auth_log_elapsed("auth_handle_callback_url", "done", started_at);
    result
}

#[tauri::command]
async fn auth_sign_out(
    app: tauri::AppHandle,
    pending: State<'_, PendingSignInState>,
    pending_oauth: State<'_, PendingOAuthState>,
) -> Result<AuthStatusPayload, String> {
    let started_at = Instant::now();
    auth_log("auth_sign_out", "start");

    if let Err(error) = app.ensure_clerk_initialized().await {
        auth_log(
            "auth_sign_out",
            &format!("ensure_clerk_initialized_error={error}"),
        );
    } else if let Err(error) = app.clerk().sign_out(None).await {
        auth_log("auth_sign_out", &format!("clerk_sign_out_error={error}"));
    } else {
        auth_log("auth_sign_out", "clerk_sign_out_done");
    }

    app.clerk().set_client_authorization_header(None);
    clear_secure_auth_state_without_timeout(&app).await?;
    {
        let mut lock = pending
            .sign_in_id
            .lock()
            .map_err(|_| "Pending state lock poisoned".to_string())?;
        *lock = None;
    }
    clear_pending_oauth_request(&pending_oauth)?;
    let result = AuthStatusPayload {
        is_signed_in: false,
        session_id: None,
        user_id: None,
        display_name: None,
        bootstrap_phase: Some(AUTH_PHASE_READY.to_string()),
    };
    emit_auth_state(&app, "auth_sign_out", &result);
    auth_log_elapsed("auth_sign_out", "done", started_at);
    Ok(result)
}
