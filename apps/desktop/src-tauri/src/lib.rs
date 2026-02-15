use std::env;
use tauri_plugin_clerk::ClerkExt;


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let clerk_publishable_key = get_env("PUBLISHABLE_KEY");

    let mut builder = tauri::Builder::default().plugin(tauri_plugin_http::init());

    #[cfg(desktop)]
    {
        builder = builder.plugin(tauri_plugin_single_instance::init(|_app, argv, _cwd| {
              println!("a new app instance was opened with {argv:?} and the deep link event was already triggered");
              // when defining deep link schemes at runtime, you must also check `argv` here
            }));
    }

    builder = builder
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_keyring::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(
            tauri_plugin_clerk::ClerkPluginBuilder::new()
                .publishable_key(clerk_publishable_key)
                // .domain("lexelo://auth")
                // .proxy("lexelo://auth")
                // Optional if one wants to persist the auth state
                .with_tauri_store()
                .build(),
        );
    builder = builder.invoke_handler(tauri::generate_handler![open_sign_in]);
    // .setup(|app| {
    //     // tauri_plugin_opener::open_url("https://github.com", None::<&str>);
    //     APP_HANDLE.set(app.handle().clone()).unwrap();
    //     #[cfg(desktop)]
    //     {
    //         #[cfg(any(target_os = "linux", all(_assertions, windows)))]
    //         {
    //             use tauri_plugin_deep_link::DeepLinkExt;
    //             app.deep_link().register_all()?;
    //         }
    //         // Note that get_current's return value will also get updated every time on_open_url gets triggered.
    //         let start_urls = app.deep_link().get_current()?;

    //         if let Some(urls) = start_urls {
    //             // app was likely started by a deep link
    //             println!("deep link URLs: {:?}", urls);
    //         }

    //         app.deep_link().on_open_url(|event| {
    //             use std::collections::HashMap;
    //             let urls = event.urls();
    //             println!("deep link URLs: {:?}", urls);
    //             for url in urls {
    //                 // Nothing TODO
    //             }
    //         });
    //     }
    //     Ok(())
    // });
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

#[tauri::command]
fn open_sign_in(app: tauri::AppHandle, redirect_url: Option<String>, sign_in_url: Option<String>) {
    let clerk = app.clerk();
    let domain = sign_in_url.unwrap();
    println!("Domain: {}", domain);

    let f = clerk.config().base_url();
    println!("Base URL: {}", f);
    let g = clerk.config().instance_type();
    println!("Instance Type: {}", g);
    // let i = clerk.environment().unwrap().auth_config;
    // match i {
    //     Some(value) => {
    //         let j = *value;
    //         j.username
    //     },
    //     None => println!("No value found, handling the error gracefully"),
    // }

    // Mimics Clerk JS buildSignInUrl:
    // Base: {domain}/sign-in
    // Params: redirect_url (if provided)

    let mut auth_url = format!("{}", domain);

    if let Some(url) = redirect_url {
        // Simple query param appending.
        // In a real implementation use a URL builder to handle existing params/encoding
        use urlencoding::encode;
        let encoded_url = encode(&url);
        let separator = if auth_url.contains('?') { "&" } else { "?" };
        auth_url.push_str(&format!("{separator}redirect_url={encoded_url}"));
    }
    println!("Auth URL: {}", auth_url);

    let _ = tauri_plugin_opener::open_url(&auth_url, None::<&str>);
}
