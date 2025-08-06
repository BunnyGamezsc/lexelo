'use client'

import Image from "next/image";
import {invoke} from "@tauri-apps/api/core";
import {useEffect} from "react";
import Home from "@lingua/frontend/Home"
import {backendInit} from "@lingua/frontend/utils/backend";
import '@lingua/frontend/style.css'

export default function App() {

    useEffect(() => {
        backendInit()
    })

  return (
    <>
    
      <Home>
        
      </Home>
      
      <div className="bg-green-100">
        <h1>Hello</h1>
      </div>
    </>
  );
}
