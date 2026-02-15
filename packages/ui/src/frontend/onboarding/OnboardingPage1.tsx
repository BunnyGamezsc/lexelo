import React, { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const OnboardingPage1 = ({ setGoBack, goNext, goBack }) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  return (
    <div
      className={`text-center z-10 animate-slideInUp mt-auto ${goBack ? "animate-bounceOut" : ""}`}
    >
      <div className="mb-2 animate-bounceIn flex justify-center items-end">
        <Image
          alt="Lexelo Logo"
          src="/lexeloclear.svg"
          width="112"
          height="112"
        />
      </div>

      <h1 className="text-5xl font-bold text-[var(--lexelo-page-fg)] mb-6 animate-fadeInUp">
        Welcome to Lexelo!
      </h1>

      <p className="text-xl text-[var(--lexelo-muted-fg)] mb-8 max-w-md mx-auto animate-fadeInUp animation-delay-300">
        Your Latin learning journey begins here. Get ready to master the
        language of scholars!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-500">
        <button
          className="px-8 py-3 bg-[var(--lexelo-inverse-bg)] text-[var(--lexelo-light)] rounded-lg font-semibold hover:bg-[var(--lexelo-muted-fg)] transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
          onClick={goNext}
        >
          Continue Learning <ArrowRight className="w-4 h-4" />
        </button>
        <button
          className="flex items-center gap-2 px-8 py-3 border-2 border-[var(--lexelo-inverse-bg)] text-[var(--lexelo-page-fg)] rounded-lg font-semibold hover:bg-[var(--lexelo-inverse-bg)] hover:text-[var(--lexelo-light)] transition-all duration-300 hover:scale-105"
          onClick={() => {
            setGoBack(true);
            setTimeout(() => {
              router.push("/");
            }, 750);
          }}
        >
          <ArrowLeft />
          Back
        </button>
      </div>
    </div>
  );
};

export default OnboardingPage1;
