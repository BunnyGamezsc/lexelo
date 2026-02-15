import Link from "next/link";
import { landingExternalLinks, landingInternalLinks } from "../content/links";

const cardClass =
  "rounded-2xl border border-[rgba(212,185,150,0.35)] bg-white/70 dark:bg-[#2a2a2a]/80 backdrop-blur-[12px] p-6";

export default function ContributePage() {
  return (
    <main className="min-h-screen bg-[var(--lingua-light)] text-[var(--lingua-grey)] dark:bg-[#1f1f1f] dark:text-[#F5F0E6] pt-28 pb-20">
      <section className="max-w-7xl mx-auto px-8">
        <p className="uppercase tracking-[0.2em] text-xs text-[#8A8A8A] dark:text-[#D4B896] mb-4">
          Contribute
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Help build the best open learning experience for Latin.
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-[#5A5A5A] dark:text-[#E8DCC0]">
          Lexelo is growing quickly. Whether you are a developer, educator, or
          language learner, your contribution can improve learning quality for
          everyone.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-8 mt-14 grid md:grid-cols-3 gap-6">
        <article className={cardClass}>
          <h2 className="text-xl font-semibold mb-3">Content & Linguistics</h2>
          <p className="text-[#5A5A5A] dark:text-[#E8DCC0]">
            Improve lesson clarity, add grammar examples, and refine question
            quality.
          </p>
        </article>
        <article className={cardClass}>
          <h2 className="text-xl font-semibold mb-3">Frontend & UX</h2>
          <p className="text-[#5A5A5A] dark:text-[#E8DCC0]">
            Polish interactions, improve accessibility, and evolve the learning
            flow across web and desktop.
          </p>
        </article>
        <article className={cardClass}>
          <h2 className="text-xl font-semibold mb-3">Backend & Tooling</h2>
          <p className="text-[#5A5A5A] dark:text-[#E8DCC0]">
            Help with APIs, data models, and developer tooling that keeps the
            platform stable and fast.
          </p>
        </article>
      </section>

      <section className="max-w-7xl mx-auto px-8 mt-14">
        <div className={cardClass}>
          <h2 className="text-2xl font-semibold mb-6">How to contribute</h2>
          <ol className="space-y-4 list-decimal pl-6 text-[#5A5A5A] dark:text-[#E8DCC0]">
            <li>
              Review open issues and active priorities on{" "}
              <a
                href={landingExternalLinks.github}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[#B8945F] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896]"
              >
                GitHub
              </a>
              .
            </li>
            <li>
              Join discussions to propose ideas, feature direction, and
              educational improvements.
            </li>
            <li>
              Submit PRs in focused chunks with clear context and testing notes.
            </li>
          </ol>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={landingExternalLinks.issues}
              target="_blank"
              rel="noreferrer noopener"
              className="px-5 py-3 rounded-lg bg-[var(--lingua-grey)] text-[#F5F0E6] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896]"
            >
              View Issues
            </a>
            <a
              href={landingExternalLinks.discussions}
              target="_blank"
              rel="noreferrer noopener"
              className="px-5 py-3 rounded-lg border border-[#D4B896] font-semibold hover:bg-[#D4B896] hover:text-[var(--lingua-grey)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896]"
            >
              Join Discussions
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="max-w-7xl mx-auto px-8 mt-14 scroll-mt-32">
        <div className="rounded-2xl bg-[var(--lingua-grey)] text-[#F5F0E6] p-8">
          <h2 className="text-2xl font-semibold mb-3">Contact & Support</h2>
          <p className="text-[#E8DCC0] mb-6">
            Need direction before contributing? Start in discussions and we will
            point you to the best next step.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={landingExternalLinks.discussions}
              target="_blank"
              rel="noreferrer noopener"
              className="px-5 py-3 rounded-lg bg-[#F5F0E6] text-[var(--lingua-grey)] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896]"
            >
              Open Community Thread
            </a>
            <Link
              href={landingInternalLinks.resourcesHelp}
              className="px-5 py-3 rounded-lg border border-[#D4B896] text-[#F5F0E6] font-semibold hover:bg-[#D4B896] hover:text-[var(--lingua-grey)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896]"
            >
              Go to Help Center
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
