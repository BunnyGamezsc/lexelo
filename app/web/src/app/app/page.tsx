import React from 'react';
import LexeloApp from "@/app/app/LexeloApp";
import {allowedDisplayValues} from "next/dist/compiled/@next/font/dist/constants";
import {redirect} from "next/navigation";

const Page = () => {
    const onboarded = false

    if (!onboarded) {
        redirect("/app/onboarding")
        return (
            <></>
        )
    } else {
        return (
            <LexeloApp></LexeloApp>

        )
    }
};

export default Page;