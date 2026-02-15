"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TransitionOverlay from "./TransitionOverlay";
import { landingInternalLinks, landingNavLinks } from "./content/links";

export default function Navigation({ lexeloLogo }) {
  const [transitioning, setTransitioning] = useState(false);

  if (transitioning) return <TransitionOverlay />;

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-[20px] transition-all duration-300 
      bg-gradient-to-r from-[#2f2f33] via-[#3a3a3a] to-[#2f2f33] border-b border-[rgba(212,185,150,0.25)]
      `}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between py-3">
          <Link
            href={landingInternalLinks.home}
            className="flex items-center gap-3 hover:scale-105 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896] rounded-md"
          >
            {lexeloLogo}
            <span className="text-xl font-bold text-[#F5F0E6]">
              Lexelo
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {landingNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#E8DCC0] font-medium text-sm relative transition-all duration-300 hover:text-[#F5F0E6] after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-0.5 after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896] rounded-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setTransitioning(true)}
              className="flex gap-2 items-center px-9 py-2 bg-[#3B3B40] text-[#F5F0E6] font-semibold text-sm rounded-lg border border-[#D4B896]/20 origin-center transform-gpu hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <span className="ml-1">Get Started</span> <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
