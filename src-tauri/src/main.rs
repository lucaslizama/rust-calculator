#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use rsc::eval;
use serde::Serialize;
use tauri::{command, generate_context, generate_handler};

#[derive(Debug, serde::Serialize)]
enum CalculateError {
    EvalError,
}

#[command]
fn calculate(formula: String) -> Result<f64, CalculateError> {
    println!("La Belen!!!!!");
    eval::<f64>(&formula).or_else(|_| Err(CalculateError::EvalError))
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(generate_handler![calculate])
        .run(generate_context!())
        .expect("error while running tauri application");
}
