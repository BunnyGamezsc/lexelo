import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Target,
  CheckCircle,
  XCircle,
} from "lucide-react";

const OnboardingPageDemo2 = ({ setGoBack, goNext, goBack }) => {
  return (
    <div
      className={`text-center z-10 animate-slideInUp mt-auto ${goBack ? "animate-bounceOut" : ""}`}
    >
      <div className="mb-6 animate-bounceIn flex justify-center items-center">
        <div className="bg-[var(--lexelo-surface-glass-strong)]/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-md">
          <Target className="w-12 h-12 text-[var(--lexelo-page-fg)] mx-auto mb-4" />
          <div className="bg-gradient-to-r from-[var(--lexelo-inverse-bg)] to-[var(--lexelo-muted-fg)] text-white rounded-lg p-4">
            <div className="text-left space-y-3">
              <div className="text-lg font-semibold">
                What does "Veritas" mean?
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-green-500/20 rounded border border-green-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Truth</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-[var(--lexelo-surface-glass-strong)]/10 rounded">
                  <XCircle className="w-4 h-4 text-gray-400" />
                  <span className="text-sm opacity-70">Beauty</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-[var(--lexelo-surface-glass-strong)]/10 rounded">
                  <XCircle className="w-4 h-4 text-gray-400" />
                  <span className="text-sm opacity-70">Wisdom</span>
                </div>
              </div>
              <div className="text-xs text-green-400 pt-2 border-t border-white/20">
                ✓ Correct! Great job!
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-[var(--lexelo-page-fg)] mb-4 animate-fadeInUp">
        Test Your Knowledge
      </h1>

      <p className="text-lg text-[var(--lexelo-muted-fg)] mb-8 max-w-md mx-auto animate-fadeInUp animation-delay-300">
        Challenge yourself with quizzes and track your progress as you master
        Latin vocabulary and grammar.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-500">
        <button
          className="px-8 py-3 bg-[var(--lexelo-inverse-bg)] text-[var(--lexelo-light)] rounded-lg font-semibold hover:bg-[var(--lexelo-muted-fg)] transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
          onClick={goNext}
        >
          Continue <ArrowRight className="w-4 h-4" />
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

export default OnboardingPageDemo2;
