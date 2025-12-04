import React from "react";
import "#/frontend/style.css";
import Hero from "./Hero";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Languages from "./Languages";
import CTA from "./CTA";
import Footer from "./Footer";
export default function App() {
  return (
    <>
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
    </>
  );
}
