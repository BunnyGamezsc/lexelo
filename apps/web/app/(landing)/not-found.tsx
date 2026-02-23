import Link from "next/link";
import { landingInternalLinks } from "./content/links";

export default function LandingNotFoundPage() {
  return (
    <main className="mt-[72px] min-h-[calc(100svh-72px)] flex items-center bg-[radial-gradient(circle_at_15%_0%,rgba(212,185,150,0.28),transparent_38%),radial-gradient(circle_at_92%_10%,rgba(184,148,95,0.2),transparent_36%),var(--lingua-light)] text-[var(--lingua-grey)] px-6 py-8 md:py-10 dark:bg-[radial-gradient(circle_at_15%_0%,rgba(212,185,150,0.14),transparent_40%),radial-gradient(circle_at_92%_10%,rgba(184,148,95,0.12),transparent_38%),#151515] dark:text-[#F5F0E6]">
      <section className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-stretch">
        <article className="rounded-3xl border border-[rgba(184,148,95,0.35)] bg-[rgba(255,252,246,0.82)] p-8 md:p-10 shadow-[0_20px_50px_rgba(58,58,58,0.18)] dark:bg-[rgba(32,33,38,0.75)] dark:border-[rgba(212,185,150,0.32)]">
          <p className="inline-flex items-center rounded-full border border-[rgba(184,148,95,0.45)] bg-[rgba(184,148,95,0.14)] px-3 py-1 text-xs font-semibold tracking-[0.12em] uppercase text-[#7A5E33] dark:text-[#D4B896]">
            Error 404
          </p>

          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.05]">
            Lost in the
            <span className="block text-[#B8945F] dark:text-[#E8DCC0]">
              Latin labyrinth?
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#5A5A5A] dark:text-[#E8DCC0]">
            This page does not exist, was moved, or never made it past declension
            practice. Choose a path below and get back to learning.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href={landingInternalLinks.home}
              className="inline-flex items-center justify-center rounded-xl bg-[var(--lingua-grey)] px-5 py-3.5 font-semibold text-[#F5F0E6] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#232323] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896]"
            >
              Back to Home
            </Link>
            <Link
              href={landingInternalLinks.app}
              className="inline-flex items-center justify-center rounded-xl border border-[rgba(184,148,95,0.55)] bg-[rgba(255,255,255,0.65)] px-5 py-3.5 font-semibold text-[var(--lingua-grey)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896] dark:bg-[rgba(245,240,230,0.08)] dark:text-[#F5F0E6] dark:hover:bg-[rgba(245,240,230,0.16)]"
            >
              Open App
            </Link>
          </div>
        </article>

        <aside className="rounded-3xl border border-[rgba(184,148,95,0.3)] bg-[linear-gradient(180deg,#25262c_0%,#15161a_100%)] p-7 md:p-8 text-[#F5F0E6] shadow-[0_20px_45px_rgba(28,28,28,0.3)]">
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4B896]">
            Quick Routes
          </p>
          <ul className="mt-4 space-y-3">
            <li>
              <Link
                href={landingInternalLinks.features}
                className="block rounded-lg border border-[rgba(212,185,150,0.28)] bg-[rgba(245,240,230,0.05)] px-4 py-3 font-medium transition-colors hover:bg-[rgba(245,240,230,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896]"
              >
                Explore Features
              </Link>
            </li>
            <li>
              <Link
                href={landingInternalLinks.pricing}
                className="block rounded-lg border border-[rgba(212,185,150,0.28)] bg-[rgba(245,240,230,0.05)] px-4 py-3 font-medium transition-colors hover:bg-[rgba(245,240,230,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896]"
              >
                Compare Editions
              </Link>
            </li>
            <li>
              <Link
                href={landingInternalLinks.contribute}
                className="block rounded-lg border border-[rgba(212,185,150,0.28)] bg-[rgba(245,240,230,0.05)] px-4 py-3 font-medium transition-colors hover:bg-[rgba(245,240,230,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896]"
              >
                Contribute to Lexelo
              </Link>
            </li>
            <li>
              <Link
                href={landingInternalLinks.about}
                className="block rounded-lg border border-[rgba(212,185,150,0.28)] bg-[rgba(245,240,230,0.05)] px-4 py-3 font-medium transition-colors hover:bg-[rgba(245,240,230,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896]"
              >
                Read About Lexelo
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-sm text-[#D4B896]">
            Tip: unknown short URLs are auto-checked against internal redirect
            aliases first.
          </p>
        </aside>
      </section>
    </main>
  );
}
