use base64::{engine::general_purpose::URL_SAFE_NO_PAD, Engine as _};
use rand::RngCore;
use sha2::{Digest, Sha256};
use std::env;
use tauri_plugin_deep_link::DeepLinkExt;
use tauri_plugin_opener::OpenerExt;
use std::sync::OnceLock;
use tauri::{AppHandle, Emitter};


static APP_HANDLE: OnceLock<AppHandle> = OnceLock::new();



#[tauri::command]
fn login() {
    let auth_url = get_auth_url();
    println!("{}", auth_url);
    let _ = tauri_plugin_opener::open_url(&auth_url, None::<&str>);
}
/// Generate a random PKCE code verifier (base64-url encoded, 32 bytes)
fn generate_code_verifier() -> String {
    let mut rng = rand::thread_rng();
    let mut random_bytes = [0u8; 32];
    rng.fill_bytes(&mut random_bytes);

    URL_SAFE_NO_PAD.encode(&random_bytes)
}

/// Compute SHA-256 hash of the verifier and return base64-url encoded challenge
fn generate_code_challenge(verifier: &str) -> String {
    let hash = Sha256::digest(verifier.as_bytes());
    URL_SAFE_NO_PAD.encode(hash)
}

fn app_handle<'a>() -> &'a AppHandle {
    APP_HANDLE.get().unwrap()
}
// --url 'https://{yourDomain}/oauth/token' \
//   --header 'content-type: application/x-www-form-urlencoded' \
//   --data grant_type=authorization_code \
//   --data 'client_id={yourClientId}' \
//   --data 'client_secret={yourClientSecret}' \
//   --data 'code=yourAuthorizationCode}' \
//   --data 'redirect_uri={https://yourApp/callback}'
fn post_auth0( code: &str, code_verifier: &str) {
    let client_id = get_env("CLIENT_ID");
    let auth0_domain = get_env("AUTH0_DOMAIN");
    let redirect_uri = get_env("REDIRECT_URI");
    let url = format!("https://{auth0_domain}/oauth/token");
    let client = reqwest::blocking::Client::new();
    println!("code_verifier: {}", code_verifier);
    let params = [
        ("grant_type", "authorization_code"),
        ("client_id", &client_id),
        ("code_verifier", &code_verifier),
        ("code", code),
        ("redirect_uri", &redirect_uri),
    ];
    let res = client.post(&url).form(&params).send();

    match res {
        Ok(response) => {
            if response.status().is_success() {
                match response.text() {
                    Ok(text) => handle_auth_storage(text),
                    Err(e) => eprintln!("Failed to read response text: {}", e),
                }
            } else {
                eprintln!("Request failed with status: {}", response.status());
            }
        }
        Err(e) => eprintln!("Request error: {}", e),
    }
}

fn handle_auth_storage(auth_json: String){
    let app_handle = app_handle();
    app_handle.emit("authenticate-store", auth_json).unwrap();
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut builder = tauri::Builder::default().plugin(tauri_plugin_opener::init());

    #[cfg(desktop)]
    {
        builder = builder.plugin(tauri_plugin_single_instance::init(|_app, argv, _cwd| {
              println!("a new app instance was opened with {argv:?} and the deep link event was already triggered");
              // when defining deep link schemes at runtime, you must also check `argv` here
            }));
    }

    builder = builder.plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_keyring::init());
    builder = builder
        .invoke_handler(tauri::generate_handler![login])
        .setup(|app| {
            // tauri_plugin_opener::open_url("https://github.com", None::<&str>);
            APP_HANDLE.set(app.handle().clone()).unwrap();
            #[cfg(desktop)]
            {
                #[cfg(any(target_os = "linux", all(_assertions, windows)))]
                {
                    use tauri_plugin_deep_link::DeepLinkExt;
                    app.deep_link().register_all()?;
                }
                // Note that get_current's return value will also get updated every time on_open_url gets triggered.
                let start_urls = app.deep_link().get_current()?;
                
                if let Some(urls) = start_urls {
                    // app was likely started by a deep link
                    println!("deep link URLs: {:?}", urls);
                }
                
                app.deep_link().on_open_url(|event| {
                    use std::collections::HashMap;
                    let urls = event.urls();
                    println!("deep link URLs: {:?}", urls);
                    for url in urls {
                        if let Some(host) = url.host_str() {
                            println!("host: {}", host);
                        }

                        let params: HashMap<String, String> =
                            url.query_pairs().into_owned().collect();

                        if let Some(query) = url.query() {
                            println!("query: {}", query);
                        }

                        if let Some(state) = params.get("state") {
                            if state != &get_env("AUTH_STATE") {
                                println!("Invalid state parameter");
                                continue;
                            }
                        }

                        if let Some(code) = params.get("code") {
                            println!("code: {}", code);
                            let code_verifier = get_env("CODE_VERIFIER");
                            post_auth0(code, &code_verifier);
                        }
                    }
                });
            }
            println!("{}", get_auth_url());
            Ok(())
        });
    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

pub fn get_auth_url() -> String {
    let auth0_domain = get_env("AUTH0_DOMAIN");
    let client_id = get_env("CLIENT_ID");
    let redirect_uri = get_env("REDIRECT_URI");
    let random_state = generate_code_verifier();
    std::env::set_var("AUTH_STATE", &random_state);

    let code_verifier = generate_code_verifier();
    let code_challenge = generate_code_challenge(&code_verifier);
    std::env::set_var("CODE_VERIFIER", code_verifier);
    //     let audience: String = urlencoding::encode(&api_identifier).into_owned();
    let scope: String = urlencoding::encode("openid profile offline_access").into_owned();
    let redirect_uri_encoded: String = urlencoding::encode(&redirect_uri).into_owned();
    format!("https://{auth0_domain}/authorize?response_type=code&code_challenge={code_challenge}&code_challenge_method=S256&client_id={client_id}&scope={scope}&redirect_uri={redirect_uri_encoded}&state={random_state}")
}

pub fn get_env(key: &str) -> String {
    let key = env::var(key);
    match key {
        Ok(val) => val,
        Err(_e) => String::from("Not Found"),
    }
}
