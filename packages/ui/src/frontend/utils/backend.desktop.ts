// Desktop (Tauri) implementation of backend
import {invoke} from "@tauri-apps/api/core";


export function backendInit(...args: any[]) {
  console.warn('SUCCESS: Desktop Backend Loaded (Hope you\'re not on web!');
  // @ts-ignore
  getAppInfo({name: "name", email: "email"})
  // Implement your Tauri logic here
  return 'desktop result';
}

function getAppInfo(args:{}){
    invoke('greet', args).then(result => {console.log(result);});
}