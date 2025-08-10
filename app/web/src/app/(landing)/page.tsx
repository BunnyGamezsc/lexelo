
import React from "react";
import '#/style.css'
import Hero from "@/app/(landing)/Hero";
import Features from "@/app/(landing)/Features";
import HowItWorks from "@/app/(landing)/HowItWorks";
import Languages from "@/app/(landing)/Languages";
import CTA from "@/app/(landing)/CTA";
import Footer from "@/app/(landing)/Footer";
export default function App() {


  return (
    <>
        <div className="relative overflow-hidden">
            {/* Main landing page content */}
            <div className={`min-h-screen bg-[#F5F0E6] text-[#2C2C2C] transition-all duration-800 ease-in-out`}>
                <Hero/>
                <Features />
                <HowItWorks />
                <Languages />
                <CTA/>
                <Footer />
            </div>

        </div>
    </>
  );
}
