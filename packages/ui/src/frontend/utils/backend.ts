import * as desktopUtils from 'utils/backend.desktop'
import * as webUtils from 'utils/backend.web'
export function backendInit() {
    console.warn('Make sure to use "config.resolve.extensions = \'.desktop.ts\' OR \'.web.ts\'" in webpack config');
    console.error("Invalid Backend Implementation! (Use backend.desktop or backend.web)");
    if (isTauri()){
        desktopUtils.backendInit()
    } else {
        webUtils.backendInit()
    }
}

/**
 * Checks if the app is running in a Tauri desktop environment.
 * - Uses window.__TAURI__ (universal)
 */
export function isTauri(): boolean {
    // Check for Tauri global object
    if (typeof window !== "undefined" && (window as any).__TAURI__) {
        return true;
    }
    return false;
}


export * from './backend';
