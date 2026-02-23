"use client";

import React from "react";

export default function Features() {
  return (
    <section
      id="features"
      className="min-h-fit pb-15 pt-18 relative overflow-hidden bg-gradient-to-r from-[#E8DCC0] to-[#D4B997] before:content-[''] before:absolute before:inset-0 before:bg-[#FBFCFD] before:[mask-image:linear-gradient(to_bottom,transparent,black)] dark:bg-gradient-to-r dark:from-[#1f1b16] dark:to-[#2d251c] dark:before:bg-[#1a1a1a]"
    >
      {/* Decorative background elements */}
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-20 animate-fadeInUp">
          <h2 className="text-4xl font-bold text-[var(--lingua-grey)] mb-6 dark:text-[#F1E7D2]">
            Everything You Need to{" "}
            <span className="bg-gradient-to-br from-[#a88862] to-[#af801b] bg-clip-text text-transparent">
              Excel in Latin
            </span>
          </h2>
          <p className="text-xl text-[#5A5A5A] max-w-3xl mx-auto leading-relaxed dark:text-[#D4B896]">
            Our comprehensive platform combines proven learning methodologies
            with modern technology to make Latin accessible and engaging for
            students of all levels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/70 backdrop-blur-[20px] rounded-2xl p-8 border border-[rgba(212,185,150,0.3)] transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl relative overflow-hidden group hover-scale dark:bg-[rgba(20,20,20,0.78)] dark:border-[rgba(212,185,150,0.2)]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B8945F] to-[#D4B896] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            <div className="w-15 h-15 bg-[var(--lingua-grey)] rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 group-hover:rotate-y-180 animate-pulse">
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
            <h3 className="text-xl font-bold text-[var(--lingua-grey)] mb-4 animate-slideInLeft dark:text-[#F1E7D2]">
              Advanced Grammar Exercises
            </h3>
            <p className="text-[#5A5A5A] leading-relaxed mb-6 dark:text-[#D4B896]">
              Master Latin grammar through our learning path that adapts to your
              pace or create your own custom practice lessons.
            </p>
            <div className="text-[#5A5A5A] leading-relaxed dark:text-[#E8DCC0]">
              ✓ Declensions & Conjugations
              <br />
              ✓ Mood, Tense, Voice
              <br />✓ Progressive Difficulty Scaling
            </div>
          </div>

          <div className="bg-[rgba(245,240,230,0.9)] backdrop-blur-[20px] rounded-2xl p-8 border border-[rgba(212,185,150,0.3)] transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl relative overflow-hidden group shadow-xl hover-scale dark:bg-[rgba(33,28,21,0.82)] dark:border-[rgba(212,185,150,0.24)]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B8945F] to-[#D4B896] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            <div className="w-15 h-15 bg-[var(--lingua-grey)] rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 group-hover:rotate-y-180 animate-pulse">
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
            <h3 className="text-xl font-bold text-[var(--lingua-grey)] mb-4 animate-slideInRight dark:text-[#F1E7D2]">
              Spaced-Repetition Vocabulary
            </h3>
            <p className="text-[#5A5A5A] leading-relaxed mb-6 dark:text-[#D4B896]">
              Learn Vocabulary with our intelligent spaced-repetition system and
              reference the built-in dictionary.
            </p>
            <div className="text-[#5A5A5A] leading-relaxed dark:text-[#E8DCC0]">
              ✓ Smart Review Scheduling
              <br />
              ✓ Practice Tests Built for Language
              <br />✓ Multiple Question Types
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-[20px] rounded-2xl p-8 border border-[rgba(212,185,150,0.3)] transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl relative overflow-hidden group hover-scale dark:bg-[rgba(20,20,20,0.78)] dark:border-[rgba(212,185,150,0.2)]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B8945F] to-[#D4B896] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            <div className="w-15 h-15 bg-[var(--lingua-grey)] rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 group-hover:rotate-y-180 animate-pulse">
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
            <h3 className="text-xl font-bold text-[var(--lingua-grey)] mb-4 animate-zoomIn dark:text-[#F1E7D2]">
              Customizable Learning Flashcards
            </h3>
            <p className="text-[#5A5A5A] leading-relaxed mb-6 dark:text-[#D4B896]">
              Create custom flashcard decks for any additional study needs, from
              vocabulary to historical facts and cultural context.
            </p>
            <div className="text-[#5A5A5A] leading-relaxed dark:text-[#E8DCC0]">
              ✓ Custom Deck Creation
              <br />
              ✓ Multimedia Support
              <br />✓ Detailed Progress Tracking
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
