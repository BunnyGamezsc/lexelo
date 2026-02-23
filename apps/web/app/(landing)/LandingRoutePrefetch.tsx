"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { landingInternalLinks } from "./content/links";

const PRIORITY_ROUTES = [
  landingInternalLinks.about,
  landingInternalLinks.contribute,
  landingInternalLinks.pricing,
];

const DEFERRED_ROUTES = [
  landingInternalLinks.app,
  landingInternalLinks.onboarding,
  "/login",
];

function normalizeRoute(path: string): string {
  return path.split("#")[0] ?? path;
}

function shouldLogPrefetch(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  );
}

function logPrefetch(event: string, route: string, delayMs?: number) {
  if (!shouldLogPrefetch()) return;
  const delayText = typeof delayMs === "number" ? ` (in ${delayMs}ms)` : "";
  console.info(`[LandingRoutePrefetch] ${event}: ${route}${delayText}`);
}

export default function LandingRoutePrefetch() {
  const router = useRouter();

  useEffect(() => {
    const priorityRoutes = [...new Set(PRIORITY_ROUTES.map(normalizeRoute))];
    const deferredRoutes = [...new Set(DEFERRED_ROUTES.map(normalizeRoute))];
    let cancelled = false;
    const timeoutIds: number[] = [];

    const scheduleRoutePrefetch = (
      routes: string[],
      startDelayMs: number,
      stepDelayMs: number
    ) => {
      routes.forEach((route, index) => {
        const delay = startDelayMs + index * stepDelayMs;
        logPrefetch("scheduled", route, delay);

        const timeoutId = window.setTimeout(() => {
          if (cancelled) return;
          logPrefetch("prefetch", route);
          router.prefetch(route);
        }, delay);

        timeoutIds.push(timeoutId);
      });
    };

    const scheduleLazyPrefetch = () => {
      scheduleRoutePrefetch(priorityRoutes, 200, 350);
      scheduleRoutePrefetch(deferredRoutes, 2600, 450);
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(() => {
        logPrefetch("idle-start", "/");
        scheduleLazyPrefetch();
      });
      return () => {
        cancelled = true;
        timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
        window.cancelIdleCallback(idleId);
      };
    }

    const kickoffTimeout = window.setTimeout(scheduleLazyPrefetch, 500);
    return () => {
      cancelled = true;
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      window.clearTimeout(kickoffTimeout);
    };
  }, [router]);

  return null;
}
