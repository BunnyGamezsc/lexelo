import React, { useEffect } from "react";
import { getRandomIntRange } from "#/frontend/utils/utils";
import { useRouter } from "next/navigation";

const TransitionOverlay = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/app");

    // After slide animation completes, show the empty page
    setTimeout(
      () => {
        router.push("/app");
      },
      10 * (getRandomIntRange(9, 13) * 10),
    );
  });

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-r from-[var(--lingua-grey)] via-[#5A5A5A] to-[var(--lingua-grey)] flex items-center justify-center">
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-2 h-2 bg-[#F5F0E6] rounded-full top-1/4 left-1/4 animate-ping"></div>
        <div className="absolute w-3 h-3 bg-[#D4B896] rounded-full top-3/4 left-3/4 animate-ping animation-delay-200"></div>
        <div className="absolute w-1 h-1 bg-[#B8945F] rounded-full top-1/2 left-1/2 animate-ping animation-delay-400"></div>
        <div className="absolute w-2 h-2 bg-[#F5F0E6] rounded-full top-1/3 right-1/4 animate-ping animation-delay-600"></div>
      </div>

      {/* Loading content */}
      <div className="text-center animate-slideInFromRight">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-[#F5F0E6] border-t-transparent animate-spin"></div>
        <h2 className="text-3xl font-bold text-[#F5F0E6] mb-2 animate-pulse">
          Launching Lexelo
        </h2>
        <p className="text-[#D4B896] animate-fadeInUp animation-delay-300">
          Preparing your learning experience...
        </p>
      </div>
    </div>
  );
};

export default TransitionOverlay;
