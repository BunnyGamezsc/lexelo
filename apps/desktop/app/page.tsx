'use client'
import Login from "#/frontend/Login";
import { invoke } from '@tauri-apps/api/core';
import { ModeToggle } from "#/frontend/ModeToggle";
import {useEffect, useState} from "react";
import {listen, UnlistenFn} from "@tauri-apps/api/event";

type Auth0Response = {
  access_token: string
  refresh_token: string
  id_token: string
  scope: string
  expires_in: number
  token_type: string
}
function isAuth0Response(obj: any): obj is Auth0Response {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.access_token === 'string' &&
    typeof obj.refresh_token === 'string' &&
    typeof obj.id_token === 'string' &&
    typeof obj.scope === 'string' &&
    typeof obj.expires_in === 'number' &&
    typeof obj.token_type === 'string'
  );
}

export default function Page() {
    const [settings, setSettings] = useState("NULL");
    async function loginWithAuth0() {
        await invoke("login")
    }

    useEffect(() => {
        let unListenfn: UnlistenFn;
        const setupListener = async () => {
            unListenfn = await listen<string>('authenticate-store', (event) => {
                console.log('Authenticate store: ', event);
                console.log(JSON.stringify(event.payload));
                const authResponse = JSON.parse(event.payload as string)
                // const authResponse = {}
                console.log(authResponse);
                // check if authResponse is type of Auth0Response
                if (isAuth0Response(authResponse)){
                  setSettings("Valid Auth0 Response Received");
                } else{
                  //TODO: ERROR TOAST - INVALID AUTH0 RESPONSE (Someone might be intercepting the data)
                }
                // CHECK IF VALID JSON
                // TODO: INIT STRONGHOLD (IF NOT INITIALIZED YET) and SAVE THIS DATA
            })
        }

        setupListener();

        return () => {
            if (unListenfn){
                unListenfn();
            }
        }
    })

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="w-full max-w-sm">
          <h1>{settings}</h1>
        <Login loginWithAuth0={loginWithAuth0}></Login>
      </div>
    </div>
  );
}
