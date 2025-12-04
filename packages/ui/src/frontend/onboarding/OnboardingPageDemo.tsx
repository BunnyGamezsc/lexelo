import React from "react";
import { ArrowLeft, ArrowRight, BookOpen, Brain } from "lucide-react";

const OnboardingPageDemo = ({ setGoBack, goNext, goBack }) => {
  return (
    <div
      className={`text-center z-10 animate-slideInUp mt-auto ${goBack ? "animate-bounceOut" : ""}`}
    >
      <div className="mb-6 animate-bounceIn flex justify-center items-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <BookOpen className="w-16 h-16 text-(--lingua-grey) mx-auto mb-4" />
          <div className="bg-gradient-to-r from-(--lingua-grey) to-[#5A5A5A] text-white rounded-lg p-4 max-w-sm">
            <div className="text-left space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-80">Latin Word</span>
                <Brain className="w-4 h-4 opacity-60" />
              </div>
              <div className="text-2xl font-bold">Amor</div>
              <div className="text-sm opacity-90">Love, affection</div>
              <div className="mt-3 pt-3 border-t border-white/20">
                <div className="text-xs opacity-70">Example:</div>
                <div className="text-sm italic">"Amor vincit omnia"</div>
                <div className="text-xs opacity-70">Love conquers all</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-(--lingua-grey) mb-4 animate-fadeInUp">
        Interactive Learning
      </h1>

      <p className="text-lg text-[#5A5A5A] mb-8 max-w-md mx-auto animate-fadeInUp animation-delay-300">
        Learn Latin through interactive flashcards with detailed explanations,
        examples, and pronunciation guides.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-500">
        <button
          className="px-8 py-3 bg-(--lingua-grey) text-[#F5F0E6] rounded-lg font-semibold hover:bg-[#5A5A5A] transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
          onClick={goNext}
        >
          Continue <ArrowRight className="w-4 h-4" />
        </button>
        <button
          className="flex items-center gap-2 px-8 py-3 border-2 border-(--lingua-grey) text-(--lingua-grey) rounded-lg font-semibold hover:bg-(--lingua-grey) hover:text-[#F5F0E6] transition-all duration-300 hover:scale-105"
          onClick={() => setGoBack(true)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>
    </div>
  );
};

export default OnboardingPageDemo;
