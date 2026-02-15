import Link from "next/link";
import { landingInternalLinks } from "../content/links";

const cardClass =
  "rounded-2xl border border-[rgba(212,185,150,0.35)] bg-white/70 dark:bg-[#2a2a2a]/80 backdrop-blur-[12px] p-6";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--lingua-light)] text-[var(--lingua-grey)] dark:bg-[#1f1f1f] dark:text-[#F5F0E6] pt-28 pb-20">
      <section className="max-w-7xl mx-auto px-8">
        <p className="uppercase tracking-[0.2em] text-xs text-[#8A8A8A] dark:text-[#D4B896] mb-4">
          About Lexelo
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Learning Latin should feel clear, modern, and accessible.
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-[#5A5A5A] dark:text-[#E8DCC0]">
          Lexelo exists to make serious language learning available to everyone
          without locking core progress behind paywalls. We combine grammar
          depth, spaced repetition, and practical practice loops so learners
          build long-term mastery.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-8 mt-14 grid md:grid-cols-3 gap-6">
        <article className={cardClass}>
          <h2 className="text-xl font-semibold mb-3">Free-First Learning</h2>
          <p className="text-[#5A5A5A] dark:text-[#E8DCC0]">
            Core learning features stay free so students can focus on learning,
            not subscriptions.
          </p>
        </article>
        <article className={cardClass}>
          <h2 className="text-xl font-semibold mb-3">Grammar Depth</h2>
          <p className="text-[#5A5A5A] dark:text-[#E8DCC0]">
            We go beyond flashcards with verb systems, syntax patterns, and
            context-rich exercises.
          </p>
        </article>
        <article className={cardClass}>
          <h2 className="text-xl font-semibold mb-3">Retention by Design</h2>
          <p className="text-[#5A5A5A] dark:text-[#E8DCC0]">
            Repetition, feedback, and progression loops are designed for memory
            that sticks.
          </p>
        </article>
      </section>

      <section className="max-w-7xl mx-auto px-8 mt-14">
        <div className={cardClass}>
          <h2 className="text-2xl font-semibold mb-6">Roadmap Snapshot</h2>
          <ol className="grid md:grid-cols-3 gap-4">
            <li className="rounded-xl bg-[var(--lingua-light)] dark:bg-[#232323] p-4 border border-[rgba(212,185,150,0.25)]">
              <p className="text-sm text-[#8A8A8A] mb-2">Now</p>
              <p className="font-medium">Core flashcards + grammar practice</p>
            </li>
            <li className="rounded-xl bg-[var(--lingua-light)] dark:bg-[#232323] p-4 border border-[rgba(212,185,150,0.25)]">
              <p className="text-sm text-[#8A8A8A] mb-2">Next</p>
              <p className="font-medium">Expanded lesson sets and contributor tools</p>
            </li>
            <li className="rounded-xl bg-[var(--lingua-light)] dark:bg-[#232323] p-4 border border-[rgba(212,185,150,0.25)]">
              <p className="text-sm text-[#8A8A8A] mb-2">Later</p>
              <p className="font-medium">More languages and adaptive study paths</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 mt-14">
        <div className="rounded-2xl bg-[var(--lingua-grey)] text-[#F5F0E6] p-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Start learning or help build Lexelo.</h2>
            <p className="text-[#E8DCC0] mt-2">
              Use the app today, or collaborate with us to make it stronger.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={landingInternalLinks.onboarding}
              className="px-5 py-3 rounded-lg bg-[#F5F0E6] text-[var(--lingua-grey)] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896]"
            >
              Get Started
            </Link>
            <Link
              href={landingInternalLinks.contribute}
              className="px-5 py-3 rounded-lg border border-[#D4B896] text-[#F5F0E6] font-semibold hover:bg-[#D4B896] hover:text-[var(--lingua-grey)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896]"
            >
              Contribute
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
