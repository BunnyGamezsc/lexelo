"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navigation from "../../web/src/app/(landing)/Navigation";
import Hero from "../../web/src/app/(landing)/Hero";
import Features from "../../web/src/app/(landing)/Features";
import HowItWorks from "../../web/src/app/(landing)/HowItWorks";
import Languages from "../../web/src/app/(landing)/Languages";
import CTA from "../../web/src/app/(landing)/CTA";
import Footer from "../../web/src/app/(landing)/Footer";
import Onboarding from "../Onboarding";
import { getRandomIntRange } from "#/utils/utils";
import TransitionOverlay from "@lingua/web/src/app/(landing)/TransitionOverlay";

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Main landing page content */}
      <div
        className={`min-h-screen bg-[#F5F0E6] text-[#2C2C2C] transition-all duration-800 ease-in-out`}
      >
        <Hero />
        <Features />
        <HowItWorks />
        <Languages />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
