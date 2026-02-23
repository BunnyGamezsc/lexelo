"use client";

import React from "react";
import Navigation from "./Navigation";
import Image from "next/image";
import LandingRoutePrefetch from "./LandingRoutePrefetch";
import Footer from "./Footer";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation
        lexeloLogo={
          <Image
            src="/lexeloclear.svg"
            alt={"Lexelo Logo"}
            width={48}
            height={48}
          />
        }
      ></Navigation>
      <LandingRoutePrefetch />
      {children}
      <Footer />
    </>
  );
};

export default LandingLayout;
