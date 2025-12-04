"use client";

import React from "react";
import { useState, useEffect } from "react";

export default function LandingPage4() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="landing-container">
        {/* Navigation */}
        <nav
          className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 transition-all duration-300 ${
            scrolled
              ? "py-3 border-b border-gray-200 shadow-sm"
              : "py-4 border-b border-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Lexelo
                </span>
                <span className="text-xs text-gray-600 -mt-1">
                  Master Latin & Beyond
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
                >
                  How it Works
                </a>
                <a
                  href="#languages"
                  className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
                >
                  Languages
                </a>
                <a
                  href="#pricing"
                  className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#resources"
                  className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
                >
                  Resources
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-5 py-2.5 text-gray-700 font-semibold border-2 border-gray-300 rounded-lg hover:border-purple-600 hover:text-purple-600 transition-all">
                  Log In
                </button>
                <button className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Get Started Free
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative mt-20 pt-16 pb-24 bg-gradient-to-br from-slate-50 to-purple-50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6">
                  <span className="text-xl">🎓</span>
                  <span className="text-sm text-gray-600 font-medium">
                    Trusted by 50,000+ language learners
                  </span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  Master Latin Grammar & Vocabulary
                  <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                    {" "}
                    the Smart Way
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform your Latin learning with interactive lessons,
                  intelligent flashcards, and spaced repetition. From
                  conjugations to complex texts, build lasting fluency with our
                  scientifically-proven approach.
                </p>
                <div className="flex flex-wrap gap-4 mb-12">
                  <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    Start Learning Free
                    <svg
                      className="ml-2 w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-semibold border-2 border-gray-300 rounded-lg hover:border-purple-600 hover:text-purple-600 transition-all">
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
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                      2M+
                    </div>
                    <div className="text-sm text-gray-600">
                      Flashcards Reviewed
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                      95%
                    </div>
                    <div className="text-sm text-gray-600">Retention Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                      4.9★
                    </div>
                    <div className="text-sm text-gray-600">User Rating</div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <div className="relative w-full h-96">
                  <div className="absolute top-0 left-10 w-80 bg-white rounded-xl shadow-2xl p-6 animate-float">
                    <div className="font-semibold text-gray-600 pb-3 mb-4 border-b-2 border-gray-200">
                      Grammar Exercise
                    </div>
                    <div className="text-lg text-gray-800 mb-4">
                      Translate: "The soldiers were fighting bravely"
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 border-2 border-green-400 rounded-lg text-green-700">
                        Milites fortiter pugnabant ✓
                      </div>
                      <div className="p-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-gray-600">
                        Milites fortiter pugnat
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-5 right-0 bg-white rounded-lg shadow-xl px-4 py-3 flex items-center gap-3 animate-float-delayed">
                    <span className="text-xl">📚</span>
                    <span className="text-sm text-gray-600">
                      Dictionary: 5000+ words
                    </span>
                  </div>
                  <div className="absolute bottom-10 left-0 bg-white rounded-lg shadow-xl px-4 py-3 flex items-center gap-3 animate-float-delayed-2">
                    <span className="text-xl">🔄</span>
                    <span className="text-sm text-gray-600">
                      Spaced Repetition Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Master Latin
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive tools designed for effective language learning
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-8 bg-white border border-gray-200 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-7 h-7 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Interactive Grammar Lessons
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Master declensions, conjugations, and syntax through engaging
                  exercises that adapt to your learning pace and provide instant
                  feedback.
                </p>
              </div>
              <div className="p-8 bg-white border border-gray-200 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-7 h-7 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Smart Flashcards
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Create custom decks or use pre-built sets. Our intelligent
                  system tracks your progress and schedules reviews for optimal
                  retention.
                </p>
              </div>
              <div className="p-8 bg-white border border-gray-200 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-7 h-7 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Spaced Repetition
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Scientifically-proven algorithm ensures you review vocabulary
                  at the perfect intervals to move words from short to long-term
                  memory.
                </p>
              </div>
              <div className="p-8 bg-white border border-gray-200 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-7 h-7 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Built-in Dictionary
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Access our comprehensive Latin dictionary with detailed
                  definitions, conjugations, declensions, and etymology for over
                  5,000 words.
                </p>
              </div>
              <div className="p-8 bg-white border border-gray-200 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-7 h-7 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Progress Tracking
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Monitor your learning journey with detailed analytics, streak
                  tracking, and personalized insights to keep you motivated.
                </p>
              </div>
              <div className="p-8 bg-white border border-gray-200 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-7 h-7 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Study Groups
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Join or create study groups, share flashcard decks, and
                  collaborate with fellow learners to enhance your learning
                  experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="py-24 bg-gradient-to-br from-slate-50 to-purple-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                How Lexelo Works
              </h2>
              <p className="text-xl text-gray-600">
                Your journey to Latin mastery in four simple steps
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-4">
                  01
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Choose Your Path
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Select your learning goals and current level. Whether you're
                    a complete beginner or advancing your skills, we'll
                    customize your experience.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-4">
                  02
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Learn Interactively
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Engage with dynamic lessons that adapt to your pace.
                    Practice grammar, expand vocabulary, and build confidence
                    through varied exercises.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-4">
                  03
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Review & Retain
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our spaced repetition system ensures you review material at
                    optimal intervals, moving knowledge from short-term to
                    long-term memory.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-4">
                  04
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Track Progress
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Monitor your improvement with detailed analytics, celebrate
                    milestones, and stay motivated with streaks and
                    achievements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Features */}
        <section id="languages" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Expanding Your Language Journey
              </h2>
              <p className="text-xl text-gray-600">
                More languages and features coming soon
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="relative p-8 bg-white border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-purple-600 hover:-translate-y-1 transition-all">
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-xs font-semibold rounded-full">
                  Coming Soon
                </div>
                <div className="text-5xl mb-4">🇪🇸</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Spanish Support
                </h3>
                <p className="text-gray-600">
                  Complete Spanish curriculum with native audio pronunciation
                  and cultural context.
                </p>
              </div>
              <div className="relative p-8 bg-white border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-purple-600 hover:-translate-y-1 transition-all">
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-xs font-semibold rounded-full">
                  Coming Soon
                </div>
                <div className="text-5xl mb-4">🇫🇷</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  French Support
                </h3>
                <p className="text-gray-600">
                  Comprehensive French learning path from basics to advanced
                  conversation.
                </p>
              </div>
              <div className="relative p-8 bg-white border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-purple-600 hover:-translate-y-1 transition-all">
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-xs font-semibold rounded-full">
                  In Development
                </div>
                <div className="text-5xl mb-4">📖</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Reading Comprehension
                </h3>
                <p className="text-gray-600">
                  Practice with authentic texts, interactive quizzes, and
                  difficulty progression.
                </p>
              </div>
              <div className="relative p-8 bg-white border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-purple-600 hover:-translate-y-1 transition-all">
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-xs font-semibold rounded-full">
                  In Development
                </div>
                <div className="text-5xl mb-4">🔄</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Translation Tools
                </h3>
                <p className="text-gray-600">
                  AI-powered translation assistance with grammar explanations
                  and alternatives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Loved by Language Learners
              </h2>
              <p className="text-xl text-gray-600">
                See what our users say about their experience with Lexelo
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
                <p className="text-gray-600 italic mb-6 leading-relaxed">
                  "Lexelo transformed my Latin studies. The spaced repetition
                  system is incredibly effective, and I've retained more
                  vocabulary than with any other method."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-white font-semibold">
                    SK
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah K.</div>
                    <div className="text-sm text-gray-600">
                      University Student
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
                <p className="text-gray-600 italic mb-6 leading-relaxed">
                  "As a Latin teacher, I recommend Lexelo to all my students.
                  The grammar exercises are perfectly structured and the
                  progress tracking keeps them motivated."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-white font-semibold">
                    MP
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Marcus P.</div>
                    <div className="text-sm text-gray-600">Latin Teacher</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
                <p className="text-gray-600 italic mb-6 leading-relaxed">
                  "The flashcard system is genius! I love how it adapts to my
                  learning pace and focuses on the words I struggle with most."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-white font-semibold">
                    JL
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Jessica L.
                    </div>
                    <div className="text-sm text-gray-600">
                      Graduate Student
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Choose Your Learning Plan
              </h2>
              <p className="text-xl text-gray-600">
                Start free and upgrade when you're ready
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative p-8 bg-white border-2 border-gray-200 rounded-xl">
                <div className="text-center pb-8 border-b border-gray-200 mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Free
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl text-gray-600">$</span>
                    <span className="text-5xl font-bold text-gray-900">0</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">
                      Basic grammar exercises
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">100 flashcards/month</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">
                      Limited dictionary access
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">
                      Basic progress tracking
                    </span>
                  </li>
                </ul>
                <button className="w-full py-3 px-6 text-gray-700 font-semibold border-2 border-gray-300 rounded-lg hover:border-purple-600 hover:text-purple-600 transition-all">
                  Get Started
                </button>
              </div>
              <div className="relative p-8 bg-white border-2 border-purple-600 rounded-xl transform scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-sm font-semibold rounded-full">
                  Most Popular
                </div>
                <div className="text-center pb-8 border-b border-gray-200 mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Pro
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl text-gray-600">$</span>
                    <span className="text-5xl font-bold text-gray-900">9</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">All grammar exercises</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">Unlimited flashcards</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">
                      Full dictionary access
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">Spaced repetition</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">Offline mode</span>
                  </li>
                </ul>
                <button className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Start Free Trial
                </button>
              </div>
              <div className="relative p-8 bg-white border-2 border-gray-200 rounded-xl">
                <div className="text-center pb-8 border-b border-gray-200 mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Team
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl text-gray-600">$</span>
                    <span className="text-5xl font-bold text-gray-900">19</span>
                    <span className="text-gray-600">/user/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">Everything in Pro</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">Team collaboration</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">
                      Shared flashcard decks
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">Admin dashboard</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">Priority support</span>
                  </li>
                </ul>
                <button className="w-full py-3 px-6 text-gray-700 font-semibold border-2 border-gray-300 rounded-lg hover:border-purple-600 hover:text-purple-600 transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-4">Ready to Master Latin?</h2>
            <p className="text-xl mb-8 opacity-95">
              Join thousands of learners who've transformed their language
              skills with Lexelo
            </p>
            <div className="flex justify-center mb-4">
              <button className="inline-flex items-center px-8 py-4 bg-white text-purple-700 font-semibold rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                Start Learning Free
                <svg
                  className="ml-2 w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <p className="text-sm opacity-80">
              No credit card required • 14-day free trial of Pro features
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
              <div className="lg:col-span-1">
                <div className="mb-4">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                    Lexelo
                  </span>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Your comprehensive platform for mastering Latin and expanding
                  to new languages.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="GitHub"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#features"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Desktop App
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Mobile App
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Browser Extension
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Latin Guide
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Study Tips
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Community
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Help Center
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Press
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Partners
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Cookie Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      GDPR
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>&copy; 2024 Lexelo. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
