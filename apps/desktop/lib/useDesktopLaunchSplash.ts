"use client";

import { useEffect, useState } from "react";

type UseDesktopLaunchSplashOptions = {
  enabled: boolean;
  minDurationMs: number;
  fadeOutMs: number;
  isBlockingDismissal?: boolean;
};

type UseDesktopLaunchSplashResult = {
  shouldRenderSplash: boolean;
  isSplashVisible: boolean;
};

const resolveDuration = (value: number, fallback: number): number => {
  if (!Number.isFinite(value) || value < 0) {
    return fallback;
  }
  return value;
};

export const useDesktopLaunchSplash = ({
  enabled,
  minDurationMs,
  fadeOutMs,
  isBlockingDismissal = false,
}: UseDesktopLaunchSplashOptions): UseDesktopLaunchSplashResult => {
  const [shouldRenderSplash, setShouldRenderSplash] = useState(enabled);
  const [isSplashVisible, setIsSplashVisible] = useState(enabled);
  const [hasMinDurationElapsed, setHasMinDurationElapsed] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setIsSplashVisible(false);
      setShouldRenderSplash(false);
      setHasMinDurationElapsed(true);
      return;
    }

    setShouldRenderSplash(true);
    setIsSplashVisible(true);
    setHasMinDurationElapsed(false);

    const minDuration = resolveDuration(minDurationMs, 1200);
    const minDurationTimerId = window.setTimeout(() => {
      setHasMinDurationElapsed(true);
    }, minDuration);

    return () => {
      window.clearTimeout(minDurationTimerId);
    };
  }, [enabled, minDurationMs]);

  useEffect(() => {
    if (!enabled || !hasMinDurationElapsed || isBlockingDismissal) {
      return;
    }

    const fadeDuration = resolveDuration(fadeOutMs, 280);
    setIsSplashVisible(false);

    const unmountTimerId = window.setTimeout(() => {
      setShouldRenderSplash(false);
    }, fadeDuration);

    return () => {
      window.clearTimeout(unmountTimerId);
    };
  }, [enabled, fadeOutMs, hasMinDurationElapsed, isBlockingDismissal]);

  return { shouldRenderSplash, isSplashVisible };
};
