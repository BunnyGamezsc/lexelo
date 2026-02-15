import Link from "next/link";
import { landingExternalLinks, landingInternalLinks } from "../content/links";

const sectionCard =
  "rounded-2xl border border-[rgba(212,185,150,0.35)] bg-white/70 dark:bg-[#2a2a2a]/80 backdrop-blur-[12px] p-6 scroll-mt-32";

const actionClass =
  "inline-flex items-center px-5 py-3 rounded-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896]";

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[var(--lingua-light)] text-[var(--lingua-grey)] dark:bg-[#1f1f1f] dark:text-[#F5F0E6] pt-28 pb-20">
      <section className="max-w-7xl mx-auto px-8">
        <p className="uppercase tracking-[0.2em] text-xs text-[#8A8A8A] dark:text-[#D4B896] mb-4">
          Resources
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Everything you need to get started with Lexelo.
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-[#5A5A5A] dark:text-[#E8DCC0]">
          Download options, pricing expectations, documentation, and support are
          all in one place.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-8 mt-14 grid gap-6">
        <article id="download" className={sectionCard}>
          <h2 className="text-2xl font-semibold mb-4">Download</h2>
          <p className="text-[#5A5A5A] dark:text-[#E8DCC0] mb-5">
            Use Lexelo on web instantly, or run desktop builds from official
            releases.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={landingInternalLinks.app}
              className={`${actionClass} bg-[var(--lingua-grey)] text-[#F5F0E6]`}
            >
              Open Web App
            </Link>
            <a
              href={landingExternalLinks.releases}
              target="_blank"
              rel="noreferrer noopener"
              className={`${actionClass} border border-[#D4B896] hover:bg-[#D4B896] hover:text-[var(--lingua-grey)] transition-colors`}
            >
              Desktop Releases
            </a>
          </div>
        </article>

        <article id="pricing" className={sectionCard}>
          <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
          <p className="text-[#5A5A5A] dark:text-[#E8DCC0]">
            Lexelo is currently free to use. We may introduce optional premium
            features later, but core learning workflows are intended to remain
            accessible.
          </p>
        </article>

        <article id="docs" className={sectionCard}>
          <h2 className="text-2xl font-semibold mb-4">Documentation</h2>
          <p className="text-[#5A5A5A] dark:text-[#E8DCC0] mb-5">
            Project setup, architecture details, and contribution guidance are
            documented in the repository.
          </p>
          <a
            href={landingExternalLinks.readme}
            target="_blank"
            rel="noreferrer noopener"
            className={`${actionClass} border border-[#D4B896] hover:bg-[#D4B896] hover:text-[var(--lingua-grey)] transition-colors`}
          >
            Read Documentation
          </a>
        </article>

        <article id="help" className={sectionCard}>
          <h2 className="text-2xl font-semibold mb-4">Help Center</h2>
          <p className="text-[#5A5A5A] dark:text-[#E8DCC0] mb-5">
            Need support or want to ask product questions? Open a thread in
            community discussions.
          </p>
          <a
            href={landingExternalLinks.discussions}
            target="_blank"
            rel="noreferrer noopener"
            className={`${actionClass} border border-[#D4B896] hover:bg-[#D4B896] hover:text-[var(--lingua-grey)] transition-colors`}
          >
            Open Help Discussion
          </a>
        </article>
      </section>

      <section className="max-w-7xl mx-auto px-8 mt-14">
        <div className="rounded-2xl bg-[var(--lingua-grey)] text-[#F5F0E6] p-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Ready to start learning?</h2>
            <p className="text-[#E8DCC0] mt-2">
              Create your onboarding path, then jump into practice.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={landingInternalLinks.onboarding}
              className={`${actionClass} bg-[#F5F0E6] text-[var(--lingua-grey)]`}
            >
              Start Onboarding
            </Link>
            <Link
              href="/login"
              className={`${actionClass} border border-[#D4B896] text-[#F5F0E6] hover:bg-[#D4B896] hover:text-[var(--lingua-grey)] transition-colors`}
            >
              Log In
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
