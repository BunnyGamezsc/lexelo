"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TransitionOverlay from "./TransitionOverlay";
interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero() {
  const [transitioning, setTransitioning] = useState(false);

  if (transitioning) return <TransitionOverlay />;

  return (
    <>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#D4B896] to-[#E8DCC0] opacity-10 top-[10%] -right-[150px] animate-float"></div>
        <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-br from-[#D4B896] to-[#E8DCC0] opacity-10 bottom-[20%] -left-[100px] animate-float-delayed"></div>
        <div className="absolute w-[150px] h-[150px] rounded-full bg-gradient-to-br from-[#D4B896] to-[#E8DCC0] opacity-10 top-1/2 left-[20%] animate-float-delayed-2"></div>
      </div>

      {/* Hero Section */}
      {/*#e8dcc0*/}
      {/*#d4b997*/}
      {/*#fbfcfd*/}

      <section className="h-2 pb-10 lg:pb-0 h-min flex relative pt-28 bg-gradient-to-br from-[#F5F0E6] via-[#E8DCC0] to-[#D4B896]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-[20px] px-4 py-2 rounded-full shadow-md mb-6">
                <span className="text-xl">🎓</span>
                <span className="text-sm text-[#5A5A5A] font-medium">
                  Trusted by 1 language learner (the dev btw)
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-(--lingua-grey) leading-tight mb-8">
                Master Latin Grammar & Vocabulary
                <span className="block bg-gradient-to-r from-[#B8945F] via-[#D4B896] to-[#B8945F] bg-clip-text text-transparent animate-textShimmer bg-[length:200%_auto]">
                  the Smart Way
                </span>
              </h1>
              <p className="text-xl text-[#5A5A5A] mb-12 leading-relaxed max-w-2xl">
                Transform your Latin learning with in-depth practice,
                intelligent flashcards, and spaced repetition. From quick vocab
                to conjugations and more, see lasting progress towards your
                studies.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <button
                  onClick={() => {
                    setTransitioning(true);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-(--lingua-grey) text-[#F5F0E6] font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all hover-scale hover:scale-105 active:scale-95"
                >
                  Start Learning Now
                  <ArrowRight />
                </button>
                <button className="inline-flex items-center px-6 py-3 bg-white text-[#5A5A5A] font-semibold border-2 border-[#D4B896] rounded-lg hover:border-[#B8945F] hover:text-(--lingua-grey) transition-all hover-scale">
                  <svg
                    className="mr-2 w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Watch Demo
                </button>
              </div>
              <div className="flex gap-12">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#B8945F] to-[#D4B896] bg-clip-text text-transparent">
                    0
                  </div>
                  <div className="text-sm text-[#8A8A8A]">
                    Flashcards Reviewed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#B8945F] to-[#D4B896] bg-clip-text text-transparent">
                    100%
                  </div>
                  <div className="text-sm text-[#8A8A8A]">Retention Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#B8945F] to-[#D4B896] bg-clip-text text-transparent">
                    5★
                  </div>
                  <div className="text-sm text-[#8A8A8A]">User Rating</div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white/90 backdrop-blur-[20px] rounded-3xl p-10 shadow-2xl border border-[rgba(212,185,150,0.3)] max-w-md mx-auto top-[-2rem] md:top-0 scale-92 md:scale-100 relative overflow-hidden animate-cardFloat">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(212,185,150,0.1)] to-transparent translate-x-[-100%] animate-cardShimmer"></div>
                <div className="bg-(--lingua-grey) rounded-2xl p-6 mb-8">
                  <h3 className="text-[#F5F0E6] font-semibold mb-4">
                    Daily Latin Practice
                  </h3>
                  <div className="bg-[rgba(245,240,230,0.15)] rounded-xl p-4 border border-[rgba(212,185,150,0.3)]">
                    <p className="text-[#F5F0E6] italic mb-2">
                      "appropinquaverant"
                    </p>
                    <p className="text-[#D4B896] text-sm">
                      They had approached
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-[rgba(245,240,230,0.5)] rounded-xl hover:translate-x-2 transition-all duration-300">
                    <span className="text-[#5A5A5A] font-medium">
                      Subjunctive Mastery
                    </span>
                    <span className="font-bold text-lg text-[#10b981]">
                      85%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[rgba(245,240,230,0.5)] rounded-xl hover:translate-x-2 transition-all duration-300">
                    <span className="text-[#5A5A5A] font-medium">
                      Chapter 6 Set
                    </span>
                    <span className="font-bold text-lg text-[#3b82f6]">
                      92% Complete
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[rgba(245,240,230,0.5)] rounded-xl hover:translate-x-2 transition-all duration-300">
                    <span className="text-[#5A5A5A] font-medium">
                      Chapter 5 Practice Test #1
                    </span>
                    <span className="font-bold text-lg text-[#8b5cf6]">
                      18/20
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
