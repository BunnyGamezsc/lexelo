"use client";

import React from "react";
import { BookOpenText, RefreshCcw } from "lucide-react";

export default function Languages() {
  return (
    <section
      id="languages"
      className="pb-2 pt-18"
      style={{ backgroundColor: "#fbfcfd" }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-10 animate-fadeInUp">
          <h2 className="text-4xl font-bold text-[var(--lingua-grey)] mb-6">
            Expanding Your Language Journey
          </h2>
          <p className="text-xl text-[#5A5A5A] max-w-3xl mx-auto leading-relaxed">
            More languages and features coming soon
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[auto_auto_auto_auto_auto] gap-8">
          <div className="relative xl:w-60 md:h-60 lg:h-auto p-8 bg-white/70 backdrop-blur-[20px] border-2 border-dashed border-[#D4B896] rounded-xl text-center hover:border-[#B8945F] hover:-translate-y-1 transition-all">
            <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-[#B8945F] to-[#D4B896] text-white text-xs font-semibold rounded-full">
              Coming Soon
            </div>
            <div className="text-3xl font-semibold mb-4 mt-4">ES</div>
            <h3 className="text-xl font-semibold text-[var(--lingua-grey)] mb-2">
              Spanish Support
            </h3>
            <p className="text-[#5A5A5A]">
              Complete Spanish curriculum with native audio pronunciation and
              cultural context.
            </p>
          </div>
          <div className="relative xl:w-60 md:h-60 lg:h-auto p-8 bg-white/70 backdrop-blur-[20px] border-2 border-dashed border-[#D4B896] rounded-xl text-center hover:border-[#B8945F] hover:-translate-y-1 transition-all">
            <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-[#B8945F] to-[#D4B896] text-white text-xs font-semibold rounded-full">
              Coming Soon
            </div>
            <div className="text-3xl font-semibold mb-4 mt-4">FR</div>
            <h3 className="text-xl font-semibold text-[var(--lingua-grey)] mb-2">
              French Support
            </h3>
            <p className="text-[#5A5A5A]">
              Comprehensive French learning path from basics to advanced
              conversation.
            </p>
          </div>
          <div className="hidden lg:flex bg-[var(--lingua-grey)] w-1 rounded-3xl"></div>

          <div className="xl:hidden w-auto md:col-span-2">
            <hr className="border-[2px] border-[var(--lingua-grey)] rounded-3xl" />
          </div>

          <div className="relative xl:w-60 md:h-60 lg:h-auto p-8 bg-white/70 backdrop-blur-[20px] border-2 border-dashed border-[#D4B896] rounded-xl text-center hover:border-[#B8945F] hover:-translate-y-1 transition-all">
            <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-[#B8945F] to-[#D4B896] text-white text-xs font-semibold rounded-full">
              In Development
            </div>
            <div className="text-5xl mb-2 flex justify-center mt-4">
              <BookOpenText size="40" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--lingua-grey)] mb-2">
              Reading Comprehension
            </h3>
            <p className="text-[#5A5A5A]">
              Practice with authentic texts, interactive quizzes, and difficulty
              progression.
            </p>
          </div>
          <div className="relative xl:w-60 md:h-60 lg:h-auto p-8 bg-white/70 backdrop-blur-[20px] border-2 border-dashed border-[#D4B896] rounded-xl text-center hover:border-[#B8945F] hover:-translate-y-1 transition-all">
            <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-[#B8945F] to-[#D4B896] text-white text-xs font-semibold rounded-full">
              In Development
            </div>
            <div className="text-5xl mb-2 flex justify-center mt-4">
              <RefreshCcw size="40" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--lingua-grey)] mb-2">
              Translation Practice
            </h3>
            <p className="text-[#5A5A5A]">
              AI-powered translation practice with grammar explanations and
              fixes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
