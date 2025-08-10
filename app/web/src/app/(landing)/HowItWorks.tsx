'use client';

import React from 'react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="pb-2 pt-5" style={{ backgroundColor: '#fbfcfd' }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-10 animate-fadeInUp">
          <h2 className="text-4xl font-bold text-(--lingua-grey) mb-6">
            Your Own Path to Language Mastery
          </h2>
          <p className="text-xl text-[#5A5A5A] max-w-3xl mx-auto leading-relaxed">
You can also learn Latin on your own with our self-paced curriculum that builds knowledge systematically and ensures long-term retention.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center group hover:translate-y-[-5px] transition-all duration-300">
            <div className="w-20 h-20 bg-(--lingua-grey) rounded-full flex items-center justify-center text-[#F5F0E6] font-bold text-2xl mx-auto mb-8 animate-stepPulse">
              1
            </div>
            <h3 className="text-xl font-bold text-(--lingua-grey) mb-4">Start with Foundations</h3>
            <p className="text-[#5A5A5A] leading-relaxed">
              Begin with essential grammar concepts and core vocabulary through guided lessons and interactive exercises that build your Latin foundation.
            </p>
          </div>
          
          <div className="text-center group hover:translate-y-[-5px] transition-all duration-300">
            <div className="w-20 h-20 bg-(--lingua-grey) rounded-full flex items-center justify-center text-[#F5F0E6] font-bold text-2xl mx-auto mb-8 animate-stepPulse animation-delay-1300">
              2
            </div>
            <h3 className="text-xl font-bold text-(--lingua-grey) mb-4">Practice Actively</h3>
            <p className="text-[#5A5A5A] leading-relaxed">
              Reinforce learning through spaced-repetition vocabulary training and personalized grammar exercises that adapt to your progress.
            </p>
          </div>
          
          <div className="text-center group hover:translate-y-[-5px] transition-all duration-300">
            <div className="w-20 h-20 bg-(--lingua-grey) rounded-full flex items-center justify-center text-[#F5F0E6] font-bold text-2xl mx-auto mb-8 animate-stepPulse animation-delay-2600">
              3
            </div>
            <h3 className="text-xl font-bold text-(--lingua-grey) mb-4">Master & Expand</h3>
            <p className="text-[#5A5A5A] leading-relaxed">
              Track your progress and supplement with custom flashcards for comprehensive understanding and long-term retention.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 