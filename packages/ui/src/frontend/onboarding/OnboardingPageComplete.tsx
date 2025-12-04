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
          <Trophy className="w-20 h-20 text-[#D4B896]" />
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-8 h-8 text-(--lingua-grey) animate-pulse" />
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-(--lingua-grey) mb-4 animate-fadeInUp">
        You're all set!
      </h1>

      <p className="text-lg text-[#5A5A5A] mb-8 max-w-md mx-auto animate-fadeInUp animation-delay-300">
        Your personalized Latin learning journey is ready to begin. Let's start
        building your vocabulary!
      </p>

      <div className="max-w-md mx-auto mb-8 animate-fadeInUp animation-delay-500">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-(--lingua-grey) mb-4">
            What's next?
          </h3>
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-(--lingua-grey)">
                Start with your first lesson
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-(--lingua-grey)">
                Practice with interactive flashcards
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-(--lingua-grey)">
                Track your progress daily
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-(--lingua-grey)">Unlock achievements</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-700">
        <button
          className="px-8 py-3 bg-(--lingua-grey) text-[#F5F0E6] rounded-lg font-semibold hover:bg-[#5A5A5A] transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
          onClick={goNext}
        >
          Start Learning <ArrowRight className="w-4 h-4" />
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

export default OnboardingPageComplete;
