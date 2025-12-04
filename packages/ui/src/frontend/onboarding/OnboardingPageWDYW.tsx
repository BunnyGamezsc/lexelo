import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  GraduationCap,
  CheckCircle,
  Globe,
  Crown,
} from "lucide-react";

const OnboardingPageWDYW = ({ setGoBack, goNext, goBack }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    guided: false,
    scholar: false,
  });
  const [selectedLanguages, setSelectedLanguages] = useState({
    latin: false,
    english: false,
  });
  const [latinLevel, setLatinLevel] = useState("beginner");

  const handleOptionToggle = (option) => {
    // Don't allow guided learning or scholar if only English is selected
    if (
      (option === "guided" || option === "scholar") &&
      selectedLanguages.english &&
      !selectedLanguages.latin
    ) {
      return;
    }

    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleLanguageToggle = (language) => {
    setSelectedLanguages((prev) => {
      const newLanguages = {
        ...prev,
        [language]: !prev[language],
      };

      // If deselecting Latin and only English will be selected, also deselect both learning styles
      if (
        language === "latin" &&
        prev.latin &&
        newLanguages.english &&
        !newLanguages.latin
      ) {
        setSelectedOptions((prevOptions) => ({
          ...prevOptions,
          guided: false,
          scholar: false,
        }));
      }

      return newLanguages;
    });
  };

  // Check if learning styles should be disabled (only English selected)
  const isLearningStyleDisabled =
    selectedLanguages.english && !selectedLanguages.latin;

  const canContinue =
    (selectedLanguages.latin && selectedOptions.scholar) ||
    (!selectedLanguages.latin && selectedLanguages.english) ||
    (selectedLanguages.latin && selectedOptions.guided);
  return (
    <div
      className={`text-center z-10 animate-slideInUp mt-auto ${goBack ? "animate-bounceOut" : ""}`}
    >
      <div className="mb-6 animate-bounceIn flex justify-center items-center">
        <GraduationCap className="w-16 h-16 text-(--lingua-grey)" />
      </div>

      <h1 className="text-4xl font-bold text-(--lingua-grey) mb-4 animate-fadeInUp">
        What do you want to learn?
      </h1>

      <p className="text-lg text-[#5A5A5A] mb-8 max-w-2xl mx-auto animate-fadeInUp animation-delay-300">
        Choose your learning preferences to customize your experience.
      </p>

      <div className="max-w-4xl mx-auto mb-8 animate-fadeInUp animation-delay-500">
        {/* Learning Style and Language sections side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Learning Style Options */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-(--lingua-grey) text-left">
              Learning Style
            </h3>

            <div
              className={`flex items-center gap-4 p-4 h-20 rounded-lg border-2 transition-all duration-300 ${
                isLearningStyleDisabled
                  ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50"
                  : selectedOptions.guided
                    ? "border-(--lingua-grey) bg-(--lingua-grey)/10 cursor-pointer"
                    : "border-gray-300 hover:border-[#5A5A5A] cursor-pointer"
              }`}
              onClick={() =>
                !isLearningStyleDisabled && handleOptionToggle("guided")
              }
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  isLearningStyleDisabled
                    ? "border-gray-300 bg-gray-100"
                    : selectedOptions.guided
                      ? "border-(--lingua-grey) bg-(--lingua-grey)"
                      : "border-gray-300"
                }`}
              >
                {selectedOptions.guided && !isLearningStyleDisabled && (
                  <CheckCircle className="w-4 h-4 text-white" />
                )}
              </div>
              <BookOpen
                className={`w-6 h-6 flex-shrink-0 ${isLearningStyleDisabled ? "text-gray-400" : "text-(--lingua-grey)"}`}
              />

              <div className="text-left">
                <div
                  className={`font-semibold ${isLearningStyleDisabled ? "text-gray-400" : "text-(--lingua-grey)"}`}
                >
                  Guided Learning
                  {isLearningStyleDisabled && (
                    <span className="text-xs ml-2">(Latin only)</span>
                  )}
                </div>
                <div
                  className={`text-sm ${isLearningStyleDisabled ? "text-gray-400" : "text-[#5A5A5A]"}`}
                >
                  Structured lessons with step-by-step guidance
                </div>
              </div>
            </div>

            <div
              className={`flex items-center gap-4 p-4 h-20 rounded-lg border-2 transition-all duration-300 ${
                isLearningStyleDisabled
                  ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50"
                  : selectedOptions.scholar
                    ? "border-(--lingua-grey) bg-(--lingua-grey)/10 cursor-pointer"
                    : "border-gray-300 hover:border-[#5A5A5A] cursor-pointer"
              }`}
              onClick={() =>
                !isLearningStyleDisabled && handleOptionToggle("scholar")
              }
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  isLearningStyleDisabled
                    ? "border-gray-300 bg-gray-100"
                    : selectedOptions.scholar
                      ? "border-(--lingua-grey) bg-(--lingua-grey)"
                      : "border-gray-300"
                }`}
              >
                {selectedOptions.scholar && !isLearningStyleDisabled && (
                  <CheckCircle className="w-4 h-4 text-white" />
                )}
              </div>
              <Crown
                className={`w-6 h-6 flex-shrink-0 ${isLearningStyleDisabled ? "text-gray-400" : "text-(--lingua-grey)"}`}
              />

              <div className="text-left">
                <div
                  className={`font-semibold ${isLearningStyleDisabled ? "text-gray-400" : "text-(--lingua-grey)"}`}
                >
                  Already a Scholar
                  {isLearningStyleDisabled && (
                    <span className="text-xs ml-2">(Latin only)</span>
                  )}
                </div>
                <div
                  className={`text-sm ${isLearningStyleDisabled ? "text-gray-400" : "text-[#5A5A5A]"}`}
                >
                  Self-paced learning with flashcards and practice
                </div>
              </div>
            </div>
          </div>

          {/* Language Selector */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-(--lingua-grey) text-left flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Language
            </h3>
            <div className="space-y-3">
              <div
                className={`flex items-center gap-4 p-4 h-20 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  selectedLanguages.latin
                    ? "border-(--lingua-grey) bg-(--lingua-grey)/10"
                    : "border-gray-300 hover:border-[#5A5A5A]"
                }`}
                onClick={() => handleLanguageToggle("latin")}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedLanguages.latin
                      ? "border-(--lingua-grey) bg-(--lingua-grey)"
                      : "border-gray-300"
                  }`}
                >
                  {selectedLanguages.latin && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-(--lingua-grey)">
                    Latin
                  </div>
                  <div className="text-sm text-[#5A5A5A]">
                    Classical language learning
                  </div>
                </div>
              </div>

              <div
                className={`flex items-center gap-4 p-4 h-20 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  selectedLanguages.english
                    ? "border-(--lingua-grey) bg-(--lingua-grey)/10"
                    : "border-gray-300 hover:border-[#5A5A5A]"
                }`}
                onClick={() => handleLanguageToggle("english")}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedLanguages.english
                      ? "border-(--lingua-grey) bg-(--lingua-grey)"
                      : "border-gray-300"
                  }`}
                >
                  {selectedLanguages.english && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-(--lingua-grey)">
                    Other Flashcards
                  </div>
                  <div className="text-sm text-[#5A5A5A]">
                    Custom study sets and vocabulary
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latin Level Selector - only shows when Latin is selected AND Guided Learning is selected */}
        {selectedLanguages.latin && selectedOptions.guided && (
          <div className="mt-8 space-y-4 animate-fadeInUp">
            <h3 className="text-xl font-semibold text-(--lingua-grey) text-center">
              What's your Latin level?
            </h3>
            <div className="max-w-md mx-auto">
              <select
                value={latinLevel}
                onChange={(e) => setLatinLevel(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-(--lingua-grey) focus:outline-none bg-white text-(--lingua-grey)"
              >
                <option value="beginner">Beginner - I'm just starting</option>
                <option value="elementary">
                  Elementary - I know basic words
                </option>
                <option value="intermediate">
                  Intermediate - I can read simple texts
                </option>
                <option value="advanced">
                  Advanced - I'm comfortable with grammar
                </option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col mb-6 sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-700">
        <button
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 ${
            canContinue
              ? "bg-(--lingua-grey) text-[#F5F0E6] hover:bg-[#5A5A5A]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={canContinue ? goNext : undefined}
          disabled={!canContinue}
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

export default OnboardingPageWDYW;
