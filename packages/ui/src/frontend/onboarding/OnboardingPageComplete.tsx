import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Trophy,
} from "lucide-react";

const OnboardingPageComplete = ({ setGoBack, goNext, goBack }) => {
  return (
    <div
      className={`text-center z-10 animate-slideInUp mt-auto ${goBack ? "animate-bounceOut" : ""}`}
    >
      <div className="mb-6 animate-bounceIn flex justify-center items-center">
        <div className="relative">
          <Trophy className="w-20 h-20 text-[var(--lexelo-dark)]" />
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-8 h-8 text-[var(--lexelo-page-fg)] animate-pulse" />
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-[var(--lexelo-page-fg)] mb-4 animate-fadeInUp">
        You're all set!
      </h1>

      <p className="text-lg text-[var(--lexelo-muted-fg)] mb-8 max-w-md mx-auto animate-fadeInUp animation-delay-300">
        Your personalized Latin learning journey is ready to begin. Let's start
        building your vocabulary!
      </p>

      <div className="max-w-md mx-auto mb-8 animate-fadeInUp animation-delay-500">
        <div className="bg-[var(--lexelo-surface-glass-strong)]/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-[var(--lexelo-page-fg)] mb-4">
            What's next?
          </h3>
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-[var(--lexelo-page-fg)]">
                Start with your first lesson
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-[var(--lexelo-page-fg)]">
                Practice with interactive flashcards
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-[var(--lexelo-page-fg)]">
                Track your progress daily
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-[var(--lexelo-page-fg)]">Unlock achievements</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-700">
        <button
          className="px-8 py-3 bg-[var(--lexelo-inverse-bg)] text-[var(--lexelo-light)] rounded-lg font-semibold hover:bg-[var(--lexelo-muted-fg)] transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
          onClick={goNext}
        >
          Start Learning <ArrowRight className="w-4 h-4" />
        </button>
        <button
          className="flex items-center gap-2 px-8 py-3 border-2 border-[var(--lexelo-inverse-bg)] text-[var(--lexelo-page-fg)] rounded-lg font-semibold hover:bg-[var(--lexelo-inverse-bg)] hover:text-[var(--lexelo-light)] transition-all duration-300 hover:scale-105"
          onClick={() => setGoBack(true)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>
    </div>
  );
};

export default OnboardingPageComplete;
