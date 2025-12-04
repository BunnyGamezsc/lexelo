"use client";

import React, { useState } from "react";
import TransitionOverlay from "./TransitionOverlay";

export default function CTA() {
  const [transitioning, setTransitioning] = useState(false);

  if (transitioning) return <TransitionOverlay />;

  return (
    <section className="py-32 bg-gradient-to-b from-[#fbfcfd] via-[#f5f0e6] to-[#f5f0e6]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="bg-(--lingua-grey) rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(212,185,150,0.1)] to-transparent animate-ctaShine"></div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F0E6] mb-8 animate-zoomIn">
            Ready to Transform Your Latin Studies?
          </h2>
          <p className="text-lg sm:text-xl text-[rgba(245,240,230,0.8)] mb-12 max-w-3xl mx-auto relative z-10 animate-fadeInUp">
            Be one of the first students to master Latin through intelligent,
            engaging practice designed for real understanding and lasting
            retention.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 relative z-10">
            <button
              onClick={() => setTransitioning(true)}
              className="bg-(--lingua-grey) text-[#F5F0E6] px-9 py-4 rounded-full font-semibold text-lg text-center transition-all duration-300 hover:translate-y-[-3px] hover:shadow-xl relative overflow-hidden group border-2 border-[#F5F0E6] hover-scale hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 px-3">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            </button>
            <a
              href="#"
              className="bg-transparent text-[#F5F0E6] px-9 py-4 border-2 border-[#D4B896] rounded-full font-semibold text-lg text-center transition-all duration-300 hover:bg-[#D4B896] hover:text-(--lingua-grey) hover:translate-y-[-2px] hover-scale"
            >
              Contribute
            </a>
          </div>

          <p className="text-[rgba(245,240,230,0.6)] relative z-10 text-sm sm:text-base">
            Completely Free • Available Online and Offline
          </p>
        </div>
      </div>
    </section>
  );
}
