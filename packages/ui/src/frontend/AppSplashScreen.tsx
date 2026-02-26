import Image from "next/image";

import lexeloLogo from "#/frontend/lexelo.png";

type AppSplashScreenProps = {
  isVisible: boolean;
  appName?: string;
  subtitle?: string;
};

const defaultSubtitle = "Preparing your learning workspace...";

const AppSplashScreen = ({
  isVisible,
  appName = "Lexelo",
  subtitle = defaultSubtitle,
}: AppSplashScreenProps) => {
  return (
    <section
      aria-hidden={!isVisible}
      aria-live="polite"
      role="status"
      className={`fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[var(--lexelo-lightgradient)] px-6 text-[var(--lexelo-page-fg)] transition-opacity ease-out dark:bg-background ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transitionDuration: "var(--desktop-launch-splash-fade-ms, 280ms)",
      }}
    >
      <div className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-[var(--lexelo-brand-overlay-30)] blur-3xl motion-safe:animate-pulse motion-reduce:animate-none" />
      <div className="pointer-events-none absolute -bottom-20 -right-12 h-72 w-72 rounded-full bg-[var(--lexelo-brand-overlay-10)] blur-3xl motion-safe:animate-pulse motion-reduce:animate-none [animation-delay:400ms]" />

      <div className="relative w-full max-w-md rounded-2xl border border-[var(--lexelo-nav-border)] bg-[var(--lexelo-surface-glass-strong)] p-8 text-center shadow-xl backdrop-blur-md">
        <Image
          src={lexeloLogo}
          alt={`${appName} logo`}
          priority
          className="mx-auto h-20 w-20 rounded-2xl object-cover shadow-md motion-safe:animate-pulse motion-reduce:animate-none"
        />

        <h1 className="mt-5 text-3xl font-semibold tracking-tight">{appName}</h1>
        <p className="mt-2 text-sm text-[var(--lexelo-muted-fg)]">{subtitle}</p>

        <div className="mx-auto mt-7 h-9 w-9 rounded-full border-2 border-[var(--lexelo-accent)] border-t-transparent motion-safe:animate-spin motion-reduce:animate-none" />
      </div>
    </section>
  );
};

export default AppSplashScreen;
