import { Suspense } from "react";
import Link from "next/link";
import {
  landingExternalLinks,
  landingInternalLinks,
} from "../content/links";

const sharedRow =
  "flex items-center justify-between py-2 border-b border-[rgba(212,185,150,0.25)] last:border-b-0";

type ReleaseResponse = {
  tag_name?: string;
  name?: string;
};

async function getLatestDesktopVersion(): Promise<string | null> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/BunnyGamezsc/lexelo/releases/latest",
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) return null;
    const data = (await response.json()) as ReleaseResponse;
    return data.tag_name ?? data.name ?? null;
  } catch {
    return null;
  }
}

async function DownloadDesktopButton() {
  const version = await getLatestDesktopVersion();
  const label = version
    ? `Download Desktop (${version})`
    : "Download Desktop";

  return (
    <a
      href={landingExternalLinks.releases}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--lingua-grey)] text-[#F5F0E6] px-5 py-3.5 font-semibold hover:bg-[#2f2f2f] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896]"
    >
      {label}
    </a>
  );
}

function DownloadDesktopFallback() {
  return (
    <a
      href={landingExternalLinks.releases}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--lingua-grey)] text-[#F5F0E6] px-5 py-3.5 font-semibold hover:bg-[#2f2f2f] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896]"
    >
      Download Desktop
    </a>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_18%_0%,rgba(212,185,150,0.22),transparent_44%),radial-gradient(circle_at_92%_12%,rgba(184,148,95,0.18),transparent_42%),var(--lingua-light)] text-[var(--lingua-grey)] dark:bg-[#151515] dark:text-[#F5F0E6] pt-24 pb-10">
      <section className="max-w-7xl mx-auto px-8">
        <p className="uppercase tracking-[0.2em] text-xs text-[#8A8A8A] dark:text-[#D4B896] mb-3">
          Pricing
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Same price. Different superpower.
        </h1>
        <p className="max-w-4xl text-lg leading-relaxed text-[#5A5A5A] dark:text-[#E8DCC0]">
          Web Edition works anywhere your browser runs, which makes it the
          most portable option. Desktop Edition gives you the same learning
          core with a focused, ad-free experience.
        </p>
      </section>

      <section
        id="pricing"
        className="max-w-7xl mx-auto px-8 mt-8 scroll-mt-32"
      >
        <div className="rounded-3xl overflow-hidden border border-[rgba(212,185,150,0.32)] shadow-[0_20px_60px_rgba(58,58,58,0.18)] grid lg:grid-cols-2">
          <article className="bg-gradient-to-b from-[#202126] to-[#121318] text-[#F5F0E6] p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#D4B896]">
                  Web
                </p>
                <h2 className="text-3xl font-bold mt-2">Web Edition</h2>
                <p className="text-[#E8DCC0] mt-1">
                  Instant access on any device with a browser.
                </p>
              </div>
              <span className="rounded-full text-[10px] uppercase tracking-[0.15em] border border-[#D4B896] px-3 py-1 bg-[rgba(212,185,150,0.14)]">
                Portable
              </span>
            </div>

            <div className="rounded-xl border border-[rgba(212,185,150,0.28)] bg-[rgba(245,240,230,0.06)] p-4 mb-5">
              <span className="text-4xl font-bold">FREE</span>
              <span className="text-[#D4B896] ml-2">forever</span>
            </div>

            <div className="rounded-xl border border-[rgba(212,185,150,0.22)] px-4 mb-5">
              <div className={sharedRow}>
                <span>Use it anywhere</span>
                <span className="font-semibold text-[#10B981]">All Devices</span>
              </div>
              <div className={sharedRow}>
                <span>All App Features</span>
                <span className="font-semibold text-[#10B981]">Included</span>
              </div>
              <div className={sharedRow}>
                <span>No install required</span>
                <span className="font-semibold text-[#10B981]">Instant start</span>
              </div>
              <div className={sharedRow}>
                <span>Ads</span>
                <span className="font-semibold text-[#D4B896]">Yes, tiny ads</span>
              </div>
            </div>

            <div className="mb-4 h-10 flex items-center">
              <p className="text-xs text-[#D4B896]">
                Ads help fund development so both editions can stay free.
              </p>
            </div>

            <Link
              href={landingInternalLinks.app}
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#F5F0E6] text-[#151515] px-5 py-3.5 font-semibold hover:bg-[#e8dcc0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896]"
            >
              Open Web App
            </Link>
          </article>

          <article
            id="download"
            className="bg-[linear-gradient(180deg,#fffdfa_0%,#f6eddd_100%)] text-[var(--lingua-grey)] p-6 md:p-8"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A8A]">
                  Desktop
                </p>
                <h2 className="text-3xl font-bold mt-2">Desktop Edition</h2>
                <p className="text-[#5A5A5A] mt-1">
                  Focus mode for deep study sessions.
                </p>
              </div>
              <span className="rounded-full text-[10px] uppercase tracking-[0.15em] border border-[#B8945F] px-3 py-1 bg-[rgba(184,148,95,0.13)]">
                Ad-free
              </span>
            </div>

            <div className="rounded-xl border border-[rgba(184,148,95,0.35)] bg-white/80 p-4 mb-5">
              <span className="text-4xl font-bold">FREE</span>
              <span className="text-[#8A8A8A] ml-2">forever</span>
            </div>

            <div className="rounded-xl border border-[rgba(184,148,95,0.3)] bg-white/60 px-4 mb-5">
              <div className={sharedRow}>
                <span>Use it anywhere</span>
                <span className="font-semibold text-[#10B981]">Laptop/Desktop</span>
              </div>
              <div className={sharedRow}>
                <span>All App Features</span>
                <span className="font-semibold text-[#10B981]">Included</span>
              </div>
              <div className={sharedRow}>
                <span>Offline-first sessions</span>
                <span className="font-semibold text-[#10B981]">Included</span>
              </div>
              <div className={sharedRow}>
                <span>Ads</span>
                <span className="font-semibold text-[#10B981]">No ads</span>
              </div>
            </div>

            <div className="mb-4 h-10 flex items-center">
              <a
                href={landingExternalLinks.releases}
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs font-semibold text-[#7A5E33] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896] rounded-sm"
              >
                See more versions
              </a>
            </div>

            <Suspense fallback={<DownloadDesktopFallback />}>
              <DownloadDesktopButton />
            </Suspense>
          </article>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 mt-4 grid md:grid-cols-2 gap-3">
        <article
          id="docs"
          className="rounded-xl border border-[rgba(212,185,150,0.32)] bg-white/60 dark:bg-[#232323]/80 px-4 py-3 scroll-mt-32"
        >
          <p className="text-sm text-[#8A8A8A] mb-2">Docs</p>
          <a
            href={landingExternalLinks.readme}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm font-semibold text-[#B8945F] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896]"
          >
            Read setup and architecture guides
          </a>
        </article>
        <article
          id="help"
          className="rounded-xl border border-[rgba(212,185,150,0.32)] bg-white/60 dark:bg-[#232323]/80 px-4 py-3 scroll-mt-32"
        >
          <p className="text-sm text-[#8A8A8A] mb-2">Help</p>
          <a
            href={landingExternalLinks.discussions}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm font-semibold text-[#B8945F] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B896]"
          >
            Ask questions in community discussions
          </a>
        </article>
      </section>
    </main>
  );
}
