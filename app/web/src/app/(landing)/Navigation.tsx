'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import {ArrowBigRight, ArrowRight} from "lucide-react";
import TransitionOverlay from "@/app/(landing)/TransitionOverlay";

interface NavigationProps {
  scrolled: boolean;
  onGetStarted: () => void;
}

export default function Navigation({ lexeloLogo }) {

  const [transitioning, setTransitioning] = useState(false);

  if (transitioning) return <TransitionOverlay />;

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-[20px] transition-all duration-300 
      bg-[rgba(245,240,230,0.95)] border-b border-[rgba(212,185,150,0.3)]
      `}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
            {lexeloLogo}

            <span className="text-xl font-bold text-(--lingua-grey)">Lexelo</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[#5A5A5A] font-medium text-sm relative transition-all duration-300 hover:text-(--lingua-grey) after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-0.5 after:bg-[#B8945F] after:transition-all after:duration-300 hover:after:w-full">
              Features
            </a>
            <a href="" className="text-[#5A5A5A] font-medium text-sm relative transition-all duration-300 hover:text-(--lingua-grey) after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-0.5 after:bg-[#B8945F] after:transition-all after:duration-300 hover:after:w-full">
              Contribute
            </a>
            <a href="" className="text-[#5A5A5A] font-medium text-sm relative transition-all duration-300 hover:text-(--lingua-grey) after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-0.5 after:bg-[#B8945F] after:transition-all after:duration-300 hover:after:w-full">
              About
            </a>
            <a href="" className="text-[#5A5A5A] font-medium text-sm relative transition-all duration-300 hover:text-(--lingua-grey) after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-0.5 after:bg-[#B8945F] after:transition-all after:duration-300 hover:after:w-full">
              Resources
            </a>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setTransitioning(true)}
              className="flex gap-2 items-center px-9 py-2 bg-(--lingua-grey) text-[#F5F0E6] font-semibold text-sm rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all hover:scale-105 active:scale-95"
            >
              <span className="ml-1">Get Started</span> <ArrowRight/>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 