import React from 'react';
import Navigation from "@/app/(landing)/Navigation";
import Image from "next/image";

const LandingLayout = ({ children }) => {

    return (
        <>
            <Navigation lexeloLogo={<Image src={'lexeloclear.svg'} alt={'Lexelo Logo'} width={48} height={48}/>}></Navigation>
            {children}
        </>
    );
};

export default LandingLayout;
