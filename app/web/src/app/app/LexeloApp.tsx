"use client"

import {useEffect} from "react";
import {useRouter} from "next/navigation";

function LexeloApp() {
    const router = useRouter();

    useEffect(() => {
        if (true){
            router.push("/app/onboarding");
        }
    })
    return (
        <>App</>
    )
}

export default LexeloApp;