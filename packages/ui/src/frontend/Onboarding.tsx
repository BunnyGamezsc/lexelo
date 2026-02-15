"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import OnboardingPage1 from "#/frontend/onboarding/OnboardingPage1";
import OnboardingPageDemo from "#/frontend/onboarding/OnboardingPageDemo";
import OnboardingPageDemo2 from "#/frontend/onboarding/OnboardingPageDemo2";
import OnboardingPageWDYW from "#/frontend/onboarding/OnboardingPageWDYW";
import OnboardingPageComplete from "#/frontend/onboarding/OnboardingPageComplete";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const [currentPage, setCurrentPage] = useState(1);
  const [goBack, setGoBack] = useState(false);
  const totalPages = 5;

  const percentageDone = (currentPage / totalPages) * 100;
  const router = useRouter();

  const goNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (currentPage >= totalPages) {
      router.push("/app/login");
    }
  };

  const goPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle back button animation
  useEffect(() => {
    if (goBack) {
      const timer = setTimeout(() => {
        goPrevious();
        setGoBack(false);
      }, 750); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [goBack]);

  const renderCurrentPage = () => {
    const pageProps = {
      setGoBack,
      goNext,
      goBack,
    };

    switch (currentPage) {
      case 1:
        return <OnboardingPage1 {...pageProps} />;
      case 2:
        return <OnboardingPageDemo {...pageProps} />;
      case 3:
        return <OnboardingPageDemo2 {...pageProps} />;
      case 4:
        return <OnboardingPageWDYW {...pageProps} />;
      case 5:
        return <OnboardingPageComplete {...pageProps} />;
      default:
        return <OnboardingPage1 {...pageProps} />;
    }
  };

  return (
    <div
      className={`transition-all duration-300 min-h-screen bg-gradient-to-br from-[var(--lexelo-light)] via-[var(--lexelo-semi)] to-[var(--lexelo-dark)] dark:from-background dark:via-card dark:to-muted flex flex-col items-center justify-center relative overflow-hidden`}
    >
      {/* Main content */}
      <div className={`${goBack ? "animate-bounceOut" : ""} mt-auto`}>
        {renderCurrentPage()}
      </div>

      {/* Progress Bar */}
      <div
        className={`${goBack ? "animate-bounceOut" : "animate-slideInUp"} w-120 h-2 overflow-hidden rounded-xl bg-[var(--lexelo-surface-glass-strong)] dark:bg-[var(--lexelo-surface-glass)] mb-6 mt-auto`}
      >
        <div
          className={`transition-all duration-500 ease-out bg-[var(--lexelo-inverse-bg)] dark:bg-primary h-2 rounded-sm`}
          style={{ width: `${percentageDone}%` }}
        ></div>
      </div>
    </div>
  );
}
