"use client";

import { invoke } from "@tauri-apps/api/core";
import { useCallback, useEffect, useState } from "react";

import type { DesktopAuthState } from "#/frontend/Login";
import { getWebSignInUrl } from "@/lib/auth/config";

type RustAuthFlowResponse = {
  status: string;
  isSignedIn: boolean;
  sessionId: string | null;
};

const AUTH_ERROR_CODE_TICKET_EXCHANGE_404 = "CLERK_TICKET_EXCHANGE_404";
const AUTH_ERROR_CODE_KEYCHAIN_ACCESS_REQUIRED = "KEYCHAIN_ACCESS_REQUIRED";
const OAUTH_REDIRECT_TIMEOUT_MS = 120000;

type UseDesktopBrowserSignInOptions = {
  enabled: boolean;
  setSignedIn: (next: boolean) => void;
  refreshAuthStatus: () => Promise<boolean>;
};

const extractErrorMessage = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    const maybeMessage = (error as { message?: unknown }).message;
    if (typeof maybeMessage === "string") {
      return maybeMessage;
    }
    try {
      return JSON.stringify(error);
    } catch {
      return String(error);
    }
  }

  return String(error);
};

const isMissingTauriCommandError = (error: unknown): boolean => {
  const message = extractErrorMessage(error);
  return message.includes("Command") && message.includes("not found");
};

const isDesktopBackendUnavailableError = (error: unknown): boolean => {
  const message = extractErrorMessage(error).toLowerCase();
  return (
    isMissingTauriCommandError(error) ||
    message.includes("ipc channel") ||
    message.includes("tauri api is not available") ||
    message.includes("failed to send message to the ipc") ||
    message.includes("webview not found")
  );
};

const extractAuthErrorCode = (error: unknown): string | null => {
  const message = extractErrorMessage(error);
  const matchedCode = message.match(/AUTH_ERROR\|code=([^|]+)/);
  return matchedCode?.[1] ?? null;
};

export const useDesktopBrowserSignIn = ({
  enabled,
  setSignedIn,
  refreshAuthStatus,
}: UseDesktopBrowserSignInOptions) => {
  const [authState, setAuthState] = useState<DesktopAuthState>("idle");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  const applyAuthFlowResponse = useCallback(
    async (response: RustAuthFlowResponse) => {
      if (response.isSignedIn || response.status === "complete") {
        // Wait for session bootstrap/auth events to confirm secure storage is ready.
        setAuthState("callback_processing");
        setAuthMessage("Finalizing secure desktop sign-in...");
        setAuthError(null);
        const isSignedInAfterBootstrap = await refreshAuthStatus();
        if (isSignedInAfterBootstrap) {
          setAuthState("signed_in");
          setAuthMessage(null);
          setSignedIn(true);
        }
        return;
      }

      setAuthState("error");
      setAuthError(`Sign-in is in unexpected state: ${response.status}`);
      setAuthMessage(null);
    },
    [refreshAuthStatus, setSignedIn],
  );

  const recoverFromKnownTicketExchangeError = useCallback(
    async (error: unknown): Promise<boolean> => {
      const errorCode = extractAuthErrorCode(error);
      if (errorCode !== AUTH_ERROR_CODE_TICKET_EXCHANGE_404) {
        return false;
      }

      const recoveredIsSignedIn = await refreshAuthStatus();
      if (!recoveredIsSignedIn) {
        try {
          await invoke("auth_sign_out");
        } catch {
          // No-op: this cleanup is best-effort.
        }
        setSignedIn(false);
        return false;
      }

      setSignedIn(true);
      setAuthState("signed_in");
      setAuthError(null);
      setAuthMessage(null);
      return true;
    },
    [refreshAuthStatus, setSignedIn],
  );

  const openWebSignIn = useCallback(async () => {
    const signInUrl = getWebSignInUrl();

    setAuthState("oauth_redirecting");
    setAuthError(null);
    setAuthMessage("Opening browser sign-in...");

    try {
      await invoke("auth_start_web_sign_in", signInUrl ? { signInUrl } : {});
    } catch (error) {
      if (isDesktopBackendUnavailableError(error)) {
        if (signInUrl) {
          window.location.href = signInUrl;
          return;
        }
        setAuthState("error");
        setAuthError(
          "Desktop auth backend is unavailable and NEXT_PUBLIC_WEB_AUTH_BASE_URL is not set.",
        );
        setAuthMessage(null);
        return;
      }
      setAuthState("error");
      setAuthError(extractErrorMessage(error));
      setAuthMessage(null);
      console.error(error);
    }
  }, []);

  const processDeepLinks = useCallback(
    async (urls: string[]) => {
      if (urls.length === 0) {
        return;
      }

      for (const url of urls) {
        try {
          const response = await invoke<RustAuthFlowResponse | null>("auth_handle_callback_url", {
            url,
          });
          if (!response) {
            continue;
          }

          setAuthState("callback_processing");
          setAuthError(null);
          setAuthMessage("Completing desktop sign-in...");
          await applyAuthFlowResponse(response);
        } catch (error) {
          const errorCode = extractAuthErrorCode(error);
          if (errorCode === AUTH_ERROR_CODE_KEYCHAIN_ACCESS_REQUIRED) {
            setAuthState("callback_processing");
            setAuthError(null);
            setAuthMessage("Waiting for Keychain permission...");
            await refreshAuthStatus();
            continue;
          }

          if (isDesktopBackendUnavailableError(error)) {
            setAuthState("error");
            setAuthError("Desktop auth backend is unavailable. Restart the app!");
            setAuthMessage(null);
            continue;
          }

          if (await recoverFromKnownTicketExchangeError(error)) {
            continue;
          }

          const isTicketExchangeRecoveryError = errorCode === AUTH_ERROR_CODE_TICKET_EXCHANGE_404;
          setAuthState("error");
          setAuthError(
            isTicketExchangeRecoveryError
              ? "Session state was reset. Please start sign-in again."
              : "OAuth callback failed. Please try again.",
          );
          setAuthMessage(null);
          console.error(error);
        }
      }
    },
    [applyAuthFlowResponse, recoverFromKnownTicketExchangeError, refreshAuthStatus],
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let didCancel = false;
    let unlisten: (() => void) | null = null;

    const initializeListener = async () => {
      try {
        const { getCurrent, onOpenUrl } = await import("@tauri-apps/plugin-deep-link");

        const initialUrls = await getCurrent();
        if (!didCancel && initialUrls?.length) {
          await processDeepLinks(initialUrls);
        }

        const removeListener = await onOpenUrl((urls) => {
          void processDeepLinks(urls);
        });

        if (!didCancel) {
          unlisten = removeListener;
        }
      } catch {
        // Keep browser development mode usable when Tauri APIs are unavailable.
      }
    };

    void initializeListener();

    return () => {
      didCancel = true;
      if (unlisten) {
        unlisten();
      }
    };
  }, [enabled, processDeepLinks]);

  useEffect(() => {
    if (authState !== "oauth_redirecting") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setAuthState("error");
      setAuthMessage(null);
      setAuthError("Sign-in callback was not received. Please try again.");
    }, OAUTH_REDIRECT_TIMEOUT_MS);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [authState]);

  const resetToIdle = useCallback(() => {
    setAuthState("idle");
    setAuthError(null);
    setAuthMessage(null);
  }, []);

  return {
    authState,
    authError,
    authMessage,
    openWebSignIn,
    resetToIdle,
  };
};
