// Prevents additional console window on Windows in release, DO NOT REMOVE!!
// #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#[path = "env/env.rs"]
mod env;
fn main() {
    env::env();
    app_lib::run();
}
