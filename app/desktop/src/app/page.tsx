'use client'

import Image from "next/image";
import {invoke} from "@tauri-apps/api/core";
import {useEffect} from "react";
import Home from "@lingua/frontend/Home"
import {backendInit} from "@lingua/frontend/utils/backend";


export default function App() {

    useEffect(() => {
        backendInit()
    })

  return (
    <>
      <Home>

      </Home>
    </>
  );
}
