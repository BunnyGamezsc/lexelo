"use client";

import React from "react";
import { useState, useEffect } from "react";

export default function LandingPage2() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F0E6] font-['Inter'] text-[#2C2C2C] overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#D4B896] to-[#E8DCC0] opacity-10 top-[10%] -right-[150px] animate-float"></div>
        <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-br from-[#D4B896] to-[#E8DCC0] opacity-10 bottom-[20%] -left-[100px] animate-float-delayed"></div>
        <div className="absolute w-[150px] h-[150px] rounded-full bg-gradient-to-br from-[#D4B896] to-[#E8DCC0] opacity-10 top-1/2 left-[20%] animate-float-delayed-2"></div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 backdrop-blur-[20px] transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(245,240,230,0.95)] border-b border-[rgba(212,185,150,0.3)]"
            : "bg-[rgba(245,240,230,0.9)] border-b border-[rgba(212,185,150,0.2)]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-(--lingua-grey) rounded-xl flex items-center justify-center text-[#F5F0E6] font-bold text-2xl font-['Playfair_Display'] shadow-lg hover:rotate-y-180 transition-all duration-300">
                L
              </div>
              <span className="text-2xl font-bold text-(--lingua-grey) font-['Playfair_Display']">
                Lexelo
              </span>
            </div>

            <div className="hidden md:flex items-center gap-12">
              <a
                href="#features"
                className="text-[#5A5A5A] font-medium relative transition-all duration-300 hover:text-(--lingua-grey) after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-0 after:h-0.5 after:bg-[#B8945F] after:transition-all after:duration-300 hover:after:w-full"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-[#5A5A5A] font-medium relative transition-all duration-300 hover:text-(--lingua-grey) after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-0 after:h-0.5 after:bg-[#B8945F] after:transition-all after:duration-300 hover:after:w-full"
              >
                How It Works
              </a>
              <a
                href="#roadmap"
                className="text-[#5A5A5A] font-medium relative transition-all duration-300 hover:text-(--lingua-grey) after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-0 after:h-0.5 after:bg-[#B8945F] after:transition-all after:duration-300 hover:after:w-full"
              >
                Roadmap
              </a>
              <a
                href="#"
                className="bg-(--lingua-grey) text-[#F5F0E6] px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:bg-[#2C2C2C]"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative pt-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slideUp">
              <h1 className="text-5xl lg:text-6xl font-bold text-(--lingua-grey) leading-tight mb-8 font-['Playfair_Display']">
                Master Latin Through
                <span className="block bg-gradient-to-br from-[#B8945F] to-[#D4B896] bg-clip-text text-transparent animate-shimmer">
                  Interactive Learning
                </span>
              </h1>
              <p className="text-xl text-[#5A5A5A] mb-12 leading-relaxed max-w-2xl">
                Transform your Latin studies with Lexelo's comprehensive
                platform featuring grammar exercises, spaced-repetition
                vocabulary training, and intelligent flashcards designed for
                active retention.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href="#"
                  className="bg-(--lingua-grey) text-[#F5F0E6] px-9 py-4 rounded-full font-semibold text-lg text-center transition-all duration-300 hover:translate-y-[-3px] hover:shadow-xl relative overflow-hidden group"
                >
                  <span className="relative z-10">Download for Desktop</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                </a>
                <a
                  href="#"
                  className="bg-transparent text-[#5A5A5A] px-9 py-4 border-2 border-[#D4B896] rounded-full font-semibold text-lg text-center transition-all duration-300 hover:bg-[#D4B896] hover:text-(--lingua-grey) hover:translate-y-[-2px]"
                >
                  Try Web Version
                </a>
              </div>
              <div className="flex gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></div>
                  <span className="text-[#8A8A8A]">Available Now</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#B8945F] animate-pulse"></div>
                  <span className="text-[#8A8A8A]">Cross-platform</span>
                </div>
              </div>
            </div>

            <div className="animate-slideUp animation-delay-300">
              <div className="bg-white/90 backdrop-blur-[20px] rounded-3xl p-10 shadow-2xl border border-[rgba(212,185,150,0.3)] max-w-md mx-auto relative overflow-hidden animate-cardFloat">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(212,185,150,0.1)] to-transparent translate-x-[-100%] animate-cardShimmer"></div>
                <div className="bg-(--lingua-grey) rounded-2xl p-6 mb-8">
                  <h3 className="text-[#F5F0E6] font-semibold mb-4">
                    Daily Latin Practice
                  </h3>
                  <div className="bg-[rgba(245,240,230,0.15)] rounded-xl p-4 border border-[rgba(212,185,150,0.3)]">
                    <p className="text-[#F5F0E6] italic mb-2">
                      "Agricola in agro laborat"
                    </p>
                    <p className="text-[#D4B896] text-sm">
                      The farmer works in the field
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-[rgba(245,240,230,0.5)] rounded-xl hover:translate-x-2 transition-all duration-300">
                    <span className="text-[#5A5A5A] font-medium">
                      Grammar Mastery
                    </span>
                    <span className="font-bold text-lg text-[#10b981]">
                      85%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[rgba(245,240,230,0.5)] rounded-xl hover:translate-x-2 transition-all duration-300">
                    <span className="text-[#5A5A5A] font-medium">
                      Vocabulary Retained
                    </span>
                    <span className="font-bold text-lg text-[#3b82f6]">
                      92%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[rgba(245,240,230,0.5)] rounded-xl hover:translate-x-2 transition-all duration-300">
                    <span className="text-[#5A5A5A] font-medium">
                      Study Streak
                    </span>
                    <span className="font-bold text-lg text-[#8b5cf6]">
                      12 days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-(--lingua-grey) mb-6 font-['Playfair_Display']">
              Everything You Need to{" "}
              <span className="bg-gradient-to-br from-[#B8945F] to-[#D4B896] bg-clip-text text-transparent">
                Excel in Latin
              </span>
            </h2>
            <p className="text-xl text-[#5A5A5A] max-w-3xl mx-auto leading-relaxed">
              Our comprehensive platform combines proven learning methodologies
              with modern technology to make Latin accessible and engaging for
              students of all levels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/70 backdrop-blur-[20px] rounded-2xl p-8 border border-[rgba(212,185,150,0.3)] transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B8945F] to-[#D4B896] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <div className="w-15 h-15 bg-(--lingua-grey) rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 group-hover:rotate-y-180">
                <svg
                  className="w-7 h-7 text-[#F5F0E6]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-(--lingua-grey) mb-4">
                Interactive Grammar Exercises
              </h3>
              <p className="text-[#5A5A5A] leading-relaxed mb-6">
                Master Latin grammar through engaging, hands-on exercises that
                adapt to your learning pace and provide instant feedback on your
                progress.
              </p>
              <div className="text-[#5A5A5A] leading-relaxed">
                ✓ Declensions & Conjugations
                <br />
                ✓ Syntax Analysis Tools
                <br />✓ Progressive Difficulty Scaling
              </div>
            </div>

            <div className="bg-[rgba(245,240,230,0.9)] backdrop-blur-[20px] rounded-2xl p-8 border border-[rgba(212,185,150,0.3)] transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B8945F] to-[#D4B896] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <div className="w-15 h-15 bg-(--lingua-grey) rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 group-hover:rotate-y-180">
                <svg
                  className="w-7 h-7 text-[#F5F0E6]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-(--lingua-grey) mb-4">
                Spaced-Repetition Vocabulary
              </h3>
              <p className="text-[#5A5A5A] leading-relaxed mb-6">
                Built-in dictionary with intelligent spaced-repetition system
                that ensures you remember words precisely when you need them
                most.
              </p>
              <div className="text-[#5A5A5A] leading-relaxed">
                ✓ Smart Review Scheduling
                <br />
                ✓ Etymology Connections
                <br />✓ Contextual Usage Examples
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-[20px] rounded-2xl p-8 border border-[rgba(212,185,150,0.3)] transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B8945F] to-[#D4B896] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <div className="w-15 h-15 bg-(--lingua-grey) rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 group-hover:rotate-y-180">
                <svg
                  className="w-7 h-7 text-[#F5F0E6]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-(--lingua-grey) mb-4">
                Flexible Flashcards
              </h3>
              <p className="text-[#5A5A5A] leading-relaxed mb-6">
                Create custom flashcard decks for any additional study needs,
                from vocabulary to historical facts and cultural context.
              </p>
              <div className="text-[#5A5A5A] leading-relaxed">
                ✓ Custom Deck Creation
                <br />
                ✓ Multimedia Support
                <br />✓ Detailed Progress Tracking
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-(--lingua-grey) mb-6 font-['Playfair_Display']">
              Your Path to Latin Mastery
            </h2>
            <p className="text-xl text-[#5A5A5A] max-w-3xl mx-auto leading-relaxed">
              A carefully designed learning journey that builds knowledge
              systematically and ensures long-term retention.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group hover:translate-y-[-5px] transition-all duration-300">
              <div className="w-20 h-20 bg-(--lingua-grey) rounded-full flex items-center justify-center text-[#F5F0E6] font-bold text-2xl mx-auto mb-8 animate-stepPulse">
                1
              </div>
              <h3 className="text-xl font-bold text-(--lingua-grey) mb-4">
                Start with Foundations
              </h3>
              <p className="text-[#5A5A5A] leading-relaxed">
                Begin with essential grammar concepts and core vocabulary
                through guided lessons and interactive exercises that build your
                Latin foundation.
              </p>
            </div>

            <div className="text-center group hover:translate-y-[-5px] transition-all duration-300">
              <div className="w-20 h-20 bg-(--lingua-grey) rounded-full flex items-center justify-center text-[#F5F0E6] font-bold text-2xl mx-auto mb-8 animate-stepPulse animation-delay-1300">
                2
              </div>
              <h3 className="text-xl font-bold text-(--lingua-grey) mb-4">
                Practice Actively
              </h3>
              <p className="text-[#5A5A5A] leading-relaxed">
                Reinforce learning through spaced-repetition vocabulary training
                and personalized grammar exercises that adapt to your progress.
              </p>
            </div>

            <div className="text-center group hover:translate-y-[-5px] transition-all duration-300">
              <div className="w-20 h-20 bg-(--lingua-grey) rounded-full flex items-center justify-center text-[#F5F0E6] font-bold text-2xl mx-auto mb-8 animate-stepPulse animation-delay-2600">
                3
              </div>
              <h3 className="text-xl font-bold text-(--lingua-grey) mb-4">
                Master & Expand
              </h3>
              <p className="text-[#5A5A5A] leading-relaxed">
                Track your progress and supplement with custom flashcards for
                comprehensive understanding and long-term retention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-(--lingua-grey) mb-6 font-['Playfair_Display']">
              The Future of{" "}
              <span className="bg-gradient-to-br from-[#B8945F] to-[#D4B896] bg-clip-text text-transparent">
                Language Learning
              </span>
            </h2>
            <p className="text-xl text-[#5A5A5A] max-w-3xl mx-auto leading-relaxed">
              Exciting features and expansions coming to transform your language
              learning journey beyond Latin.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="flex items-start gap-6 p-6 rounded-2xl transition-all duration-300 hover:bg-white/50 hover:translate-x-4">
                <div className="w-12 h-12 bg-[#10b981] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-360">
                  <svg
                    className="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-(--lingua-grey) mb-2">
                    Multi-Language Support
                  </h3>
                  <p className="text-[#5A5A5A] leading-relaxed">
                    Expand beyond Latin with Spanish and French, using the same
                    proven methodology that makes Latin learning effective and
                    engaging.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 rounded-2xl transition-all duration-300 hover:bg-white/50 hover:translate-x-4">
                <div className="w-12 h-12 bg-[#3b82f6] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-360">
                  <svg
                    className="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-(--lingua-grey) mb-2">
                    Translation Helper Tools
                  </h3>
                  <p className="text-[#5A5A5A] leading-relaxed">
                    Intelligent translation assistance that guides rather than
                    simply provides answers, helping you develop true
                    comprehension skills.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 rounded-2xl transition-all duration-300 hover:bg-white/50 hover:translate-x-4">
                <div className="w-12 h-12 bg-[#8b5cf6] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-360">
                  <svg
                    className="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-(--lingua-grey) mb-2">
                    Reading Comprehension
                  </h3>
                  <p className="text-[#5A5A5A] leading-relaxed">
                    Interactive texts with built-in quizzes to test
                    understanding and context, bringing Latin literature to life
                    through guided analysis.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 rounded-2xl transition-all duration-300 hover:bg-white/50 hover:translate-x-4">
                <div className="w-12 h-12 bg-[#f59e0b] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-360">
                  <svg
                    className="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-(--lingua-grey) mb-2">
                    Advanced Review Modes
                  </h3>
                  <p className="text-[#5A5A5A] leading-relaxed">
                    Sophisticated algorithms that adapt to your unique learning
                    patterns for optimal retention and accelerated mastery.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-[20px] rounded-3xl p-12 border border-[rgba(212,185,150,0.3)]">
              <h3 className="text-3xl font-bold text-(--lingua-grey) mb-6 font-['Playfair_Display']">
                Complete Language Platform
              </h3>
              <p className="text-[#5A5A5A] leading-relaxed mb-8">
                Our vision is to create the most comprehensive multi-language
                study platform, starting with Latin's rich foundation and
                expanding to modern languages with the same attention to detail
                and proven learning science.
              </p>

              <div className="bg-[#F5F0E6] rounded-2xl p-8 shadow-lg">
                <h4 className="font-semibold text-(--lingua-grey) mb-6">
                  Coming in 2025
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-[rgba(212,185,150,0.2)]">
                    <span className="text-[#5A5A5A]">Spanish Support</span>
                    <span className="font-semibold text-sm text-[#2563eb]">
                      Q2 2025
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[rgba(212,185,150,0.2)]">
                    <span className="text-[#5A5A5A]">
                      Reading Comprehension
                    </span>
                    <span className="font-semibold text-sm text-[#059669]">
                      Q3 2025
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-[#5A5A5A]">French Integration</span>
                    <span className="font-semibold text-sm text-[#7c3aed]">
                      Q4 2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-(--lingua-grey) rounded-3xl p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(212,185,150,0.1)] to-transparent animate-ctaShine"></div>
            <h2 className="text-4xl font-bold text-[#F5F0E6] mb-8 font-['Playfair_Display']">
              Ready to Transform Your Latin Studies?
            </h2>
            <p className="text-xl text-[rgba(245,240,230,0.8)] mb-12 max-w-3xl mx-auto relative z-10">
              Join thousands of students who are mastering Latin through
              intelligent, engaging practice designed for real understanding and
              lasting retention.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 relative z-10">
              <a
                href="#"
                className="bg-(--lingua-grey) text-[#F5F0E6] px-9 py-4 rounded-full font-semibold text-lg text-center transition-all duration-300 hover:translate-y-[-3px] hover:shadow-xl relative overflow-hidden group border-2 border-[#F5F0E6]"
              >
                <span className="relative z-10">Download Free Trial</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
              </a>
              <a
                href="#"
                className="bg-transparent text-[#F5F0E6] px-9 py-4 border-2 border-[#D4B896] rounded-full font-semibold text-lg text-center transition-all duration-300 hover:bg-[#D4B896] hover:text-(--lingua-grey) hover:translate-y-[-2px]"
              >
                View Live Demo
              </a>
            </div>

            <p className="text-[rgba(245,240,230,0.6)] relative z-10">
              Free 14-day trial • No credit card required • Available on all
              platforms
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C2C2C] text-[#F5F0E6] py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-(--lingua-grey) rounded-xl flex items-center justify-center text-[#F5F0E6] font-bold text-2xl font-['Playfair_Display']">
                  L
                </div>
                <span className="text-2xl font-bold text-[#F5F0E6] font-['Playfair_Display']">
                  Lexelo
                </span>
              </div>
              <p className="text-[rgba(245,240,230,0.7)] leading-relaxed">
                Making Latin accessible through modern technology and proven
                learning methods that ensure lasting comprehension and
                retention.
              </p>
            </div>

            <div>
              <h4 className="text-[#F5F0E6] font-semibold mb-6">Product</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#features"
                    className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#roadmap"
                    className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Roadmap
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Updates
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#F5F0E6] font-semibold mb-6">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#F5F0E6] font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[rgba(245,240,230,0.7)] hover:text-[#F5F0E6] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-[#D4B896] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[rgba(245,240,230,0.1)] text-center text-[rgba(245,240,230,0.5)]">
            <p>&copy; 2025 Lexelo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
