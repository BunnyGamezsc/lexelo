"use client";

import { invoke } from "@tauri-apps/api/core";
import { ShieldCheck } from "lucide-react";
import { type JSX, useCallback, useEffect, useMemo, useRef, useState } from "react";

import Login, {
  type DesktopAuthState,
  type LoginMode,
  type OAuthProvider,
  type SecondFactorStrategy,
} from "#/frontend/Login";
import { Button } from "#/ui/button";
import { HomePageContent } from "@/components/pages/DesktopPages";
import { getDesktopAuthMode, getWebSignInUrl } from "@/lib/auth/config";
import { KEYCHAIN_NOTICE_STORAGE_KEY, useDesktopAuthSession } from "@/lib/auth/session";

type RustSecondFactor = {
  strategy: string;
};

type RustAuthFlowResponse = {
  status: string;
  isSignedIn: boolean;
  secondFactors: RustSecondFactor[];
  oauthRedirectUrl: string | null;
  sessionId: string | null;
};

const authUiLog = (step: string, payload?: unknown): void => {
  const unixMs = Date.now();
  const perfMs = typeof performance !== "undefined" ? performance.now().toFixed(2) : "n/a";
  if (payload === undefined) {
    console.log(`[AUTH-UI][${unixMs}][perf_ms=${perfMs}] ${step}`);
    return;
  }
  let renderedPayload: string;
  try {
    renderedPayload = JSON.stringify(payload);
  } catch {
    renderedPayload = String(payload);
  }
  console.log(`[AUTH-UI][${unixMs}][perf_ms=${perfMs}] ${step} payload=${renderedPayload}`);
};

const AUTH_ERROR_CODE_CREATE_SIGN_IN_404 = "CLERK_CREATE_SIGN_IN_404";
const AUTH_ERROR_CODE_TICKET_EXCHANGE_404 = "CLERK_TICKET_EXCHANGE_404";

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

const isRecoverableAuthErrorForSource = (
  source: "submitIdentifierPassword" | "processDeepLinks",
  code: string | null,
): boolean => {
  if (!code) {
    return false;
  }
  if (source === "submitIdentifierPassword") {
    return code === AUTH_ERROR_CODE_CREATE_SIGN_IN_404;
  }
  return code === AUTH_ERROR_CODE_TICKET_EXCHANGE_404;
};

const isSecondFactorStrategy = (value: string): value is SecondFactorStrategy => {
  return value === "email_code" || value === "totp" || value === "backup_code";
};

const mapSecondFactorStrategies = (factors: RustSecondFactor[]): SecondFactorStrategy[] => {
  const unique = new Set<SecondFactorStrategy>();
  for (const factor of factors) {
    if (isSecondFactorStrategy(factor.strategy)) {
      unique.add(factor.strategy);
    }
  }
  return Array.from(unique);
};

const Page = (): JSX.Element => {
  const authMode = useMemo<LoginMode>(() => getDesktopAuthMode(), []);
  const { isSignedIn, setSignedIn, refreshAuthStatus, startBootstrap } = useDesktopAuthSession();
  const [isKeychainNoticeReady, setIsKeychainNoticeReady] = useState(false);
  const [isKeychainNoticeAccepted, setIsKeychainNoticeAccepted] = useState(false);
  const [authState, setAuthState] = useState<DesktopAuthState>("idle");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [selectedSecondFactor, setSelectedSecondFactor] =
    useState<SecondFactorStrategy | null>(null);
  const [secondFactorStrategies, setSecondFactorStrategies] = useState<SecondFactorStrategy[]>(
    [],
  );
  const hasLoggedMountRef = useRef(false);

  const applyAuthFlowResponse = useCallback(async (response: RustAuthFlowResponse) => {
    const status = response.status;
    authUiLog("applyAuthFlowResponse", {
      status,
      isSignedIn: response.isSignedIn,
      hasSessionId: Boolean(response.sessionId),
    });
    if (response.isSignedIn || status === "complete") {
      setAuthState("signed_in");
      setAuthMessage(null);
      setAuthError(null);
      setSignedIn(true);
      authUiLog("applyAuthFlowResponse_complete");
      return;
    }

    if (status === "needs_second_factor") {
      const strategies = mapSecondFactorStrategies(response.secondFactors);
      const defaultStrategy = strategies[0] ?? null;
      setSecondFactorStrategies(strategies);
      setSelectedSecondFactor(defaultStrategy);
      setAuthState("needs_second_factor");
      setAuthError(null);
      setAuthMessage("Second-factor verification required.");
      return;
    }

    setAuthState("error");
    setAuthError(`Sign-in is in unexpected state: ${status}`);
  }, [setSignedIn]);

  const recoverSignedInFromKnownAuthError = useCallback(
    async (
      source: "submitIdentifierPassword" | "processDeepLinks",
      error: unknown,
    ): Promise<boolean> => {
      const errorCode = extractAuthErrorCode(error);
      if (!isRecoverableAuthErrorForSource(source, errorCode)) {
        return false;
      }

      authUiLog(`${source}_recoverable_auth_error_detected`, {
        code: errorCode,
        message: extractErrorMessage(error),
      });
      const recoveredIsSignedIn = await refreshAuthStatus();
      authUiLog(`${source}_recoverable_auth_error_recheck_done`, {
        code: errorCode,
        recoveredIsSignedIn,
      });

      if (!recoveredIsSignedIn) {
        authUiLog(`${source}_recoverable_auth_error_cleanup_start`, { code: errorCode });
        try {
          await invoke("auth_sign_out");
        } catch (signOutError) {
          authUiLog(`${source}_recoverable_auth_error_cleanup_failed`, {
            code: errorCode,
            message: extractErrorMessage(signOutError),
          });
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

  const submitIdentifierPassword = useCallback(
    async (identifier: string, password: string) => {
      const startedAt = performance.now();
      authUiLog("submitIdentifierPassword_start");
      setAuthState("submitting");
      setAuthError(null);
      setAuthMessage("Signing in...");

      try {
        authUiLog("submitIdentifierPassword_invoke_auth_sign_in_password_start");
        const response = await invoke<RustAuthFlowResponse>("auth_sign_in_password", {
          identifier,
          password,
        });
        authUiLog("submitIdentifierPassword_invoke_auth_sign_in_password_done", {
          elapsedMs: Number((performance.now() - startedAt).toFixed(2)),
        });
        await applyAuthFlowResponse(response);
      } catch (error) {
        authUiLog("submitIdentifierPassword_error", {
          elapsedMs: Number((performance.now() - startedAt).toFixed(2)),
          message: extractErrorMessage(error),
        });
        if (isDesktopBackendUnavailableError(error)) {
          setAuthState("error");
          setAuthError("Desktop auth backend is unavailable. Restart the app!");
          setAuthMessage(null);
          return;
        }
        if (await recoverSignedInFromKnownAuthError("submitIdentifierPassword", error)) {
          return;
        }
        const errorCode = extractAuthErrorCode(error);
        const isTargetedRecoveryError = isRecoverableAuthErrorForSource(
          "submitIdentifierPassword",
          errorCode,
        );
        setAuthState("error");
        setAuthError(
          isTargetedRecoveryError
            ? "Session state was reset. Please sign in again."
            : "Unable to sign in with identifier/password.",
        );
        setAuthMessage(null);
        console.error(error);
      }
    },
    [applyAuthFlowResponse, recoverSignedInFromKnownAuthError],
  );

  const selectSecondFactor = useCallback(async (strategy: SecondFactorStrategy) => {
    const startedAt = performance.now();
    authUiLog("selectSecondFactor_start", { strategy });
    setSelectedSecondFactor(strategy);
    setAuthError(null);
    setAuthState("submitting");
    setAuthMessage("Preparing selected verification method...");

    try {
      authUiLog("selectSecondFactor_invoke_start");
      const response = await invoke<RustAuthFlowResponse>("auth_prepare_second_factor", {
        strategy,
      });
      authUiLog("selectSecondFactor_invoke_done", {
        elapsedMs: Number((performance.now() - startedAt).toFixed(2)),
      });
      await applyAuthFlowResponse(response);
    } catch (error) {
      authUiLog("selectSecondFactor_error", {
        elapsedMs: Number((performance.now() - startedAt).toFixed(2)),
        message: extractErrorMessage(error),
      });
      if (isDesktopBackendUnavailableError(error)) {
        setAuthState("error");
        setAuthError("Desktop auth backend is unavailable. Restart the app!");
        setAuthMessage(null);
        return;
      }
      setAuthState("error");
      setAuthError("Unable to prepare selected second factor.");
      setAuthMessage(null);
      console.error(error);
    }
  }, [applyAuthFlowResponse]);

  const submitSecondFactor = useCallback(
    async (strategy: SecondFactorStrategy, code: string) => {
      const startedAt = performance.now();
      authUiLog("submitSecondFactor_start", { strategy });
      setAuthState("submitting");
      setAuthError(null);
      setAuthMessage("Verifying your code...");

      try {
        authUiLog("submitSecondFactor_invoke_start");
        const response = await invoke<RustAuthFlowResponse>("auth_attempt_second_factor", {
          strategy,
          code,
        });
        authUiLog("submitSecondFactor_invoke_done", {
          elapsedMs: Number((performance.now() - startedAt).toFixed(2)),
        });
        await applyAuthFlowResponse(response);
      } catch (error) {
        authUiLog("submitSecondFactor_error", {
          elapsedMs: Number((performance.now() - startedAt).toFixed(2)),
          message: extractErrorMessage(error),
        });
        if (isDesktopBackendUnavailableError(error)) {
          setAuthState("error");
          setAuthError("Desktop auth backend is unavailable. Restart the app!");
          setAuthMessage(null);
          return;
        }
        setAuthState("error");
        setAuthError("Second-factor verification failed.");
        setAuthMessage(null);
        console.error(error);
      }
    },
    [applyAuthFlowResponse],
  );

  const startOAuth = useCallback(
    async (provider: OAuthProvider) => {
      if (authMode !== "v1") {
        return;
      }
      const startedAt = performance.now();
      authUiLog("startOAuth_start", { provider });

      setAuthState("oauth_redirecting");
      setAuthError(null);
      setAuthMessage(`Redirecting to ${provider}...`);

      try {
        authUiLog("startOAuth_invoke_start");
        const response = await invoke<RustAuthFlowResponse>("auth_start_oauth", { provider });
        authUiLog("startOAuth_invoke_done", {
          elapsedMs: Number((performance.now() - startedAt).toFixed(2)),
        });
        const redirectUrl = response.oauthRedirectUrl;
        if (!redirectUrl) {
          throw new Error("Missing OAuth redirect URL");
        }

        const { openUrl } = await import("@tauri-apps/plugin-opener");
        authUiLog("startOAuth_openUrl_start");
        await openUrl(redirectUrl);
        authUiLog("startOAuth_openUrl_done");
      } catch (error) {
        authUiLog("startOAuth_error", {
          elapsedMs: Number((performance.now() - startedAt).toFixed(2)),
          message: extractErrorMessage(error),
        });
        if (isDesktopBackendUnavailableError(error)) {
          setAuthState("error");
          setAuthError("Desktop auth backend is unavailable. Restart the app!");
          setAuthMessage(null);
          return;
        }
        setAuthState("error");
        setAuthError(`Unable to start ${provider} sign-in.`);
        setAuthMessage(null);
        console.error(error);
      }
    },
    [authMode],
  );

  const openWebSignIn = useCallback(async () => {
    if (authMode !== "v2") {
      return;
    }
    const startedAt = performance.now();
    authUiLog("openWebSignIn_start");

    const signInUrl = getWebSignInUrl();
    if (!signInUrl) {
      setAuthState("error");
      setAuthError("Missing NEXT_PUBLIC_WEB_AUTH_BASE_URL for web sign-in.");
      setAuthMessage(null);
      return;
    }

    setAuthState("oauth_redirecting");
    setAuthError(null);
    setAuthMessage("Opening browser sign-in...");

    try {
      authUiLog("openWebSignIn_invoke_start");
      await invoke("auth_start_web_sign_in", {
        signInUrl,
      });
      authUiLog("openWebSignIn_invoke_done", {
        elapsedMs: Number((performance.now() - startedAt).toFixed(2)),
      });
    } catch (error) {
      authUiLog("openWebSignIn_error", {
        elapsedMs: Number((performance.now() - startedAt).toFixed(2)),
        message: extractErrorMessage(error),
      });
      if (isDesktopBackendUnavailableError(error)) {
        authUiLog("openWebSignIn_desktop_backend_unavailable_fallback_to_browser");
        window.location.href = signInUrl;
        return;
      }
      setAuthState("error");
      setAuthError("Unable to open browser sign-in.");
      setAuthMessage(null);
      console.error(error);
    }
  }, [authMode]);

  const processDeepLinks = useCallback(
    async (urls: string[]) => {
      if (urls.length === 0) {
        return;
      }
      authUiLog("processDeepLinks_start", { count: urls.length });

      for (const url of urls) {
        const startedAt = performance.now();
        try {
          authUiLog("processDeepLinks_invoke_start", { url });
          const response = await invoke<RustAuthFlowResponse | null>("auth_handle_callback_url", {
            url,
          });
          authUiLog("processDeepLinks_invoke_done", {
            elapsedMs: Number((performance.now() - startedAt).toFixed(2)),
            hasResponse: Boolean(response),
          });
          if (!response) {
            continue;
          }
          setAuthState("callback_processing");
          setAuthError(null);
          setAuthMessage("Completing desktop sign-in...");
          await applyAuthFlowResponse(response);
        } catch (error) {
          authUiLog("processDeepLinks_error", {
            elapsedMs: Number((performance.now() - startedAt).toFixed(2)),
            message: extractErrorMessage(error),
          });
          if (isDesktopBackendUnavailableError(error)) {
            setAuthState("error");
            setAuthError("Desktop auth backend is unavailable. Restart the app!");
            setAuthMessage(null);
            continue;
          }
          if (await recoverSignedInFromKnownAuthError("processDeepLinks", error)) {
            continue;
          }
          const errorCode = extractAuthErrorCode(error);
          const isTargetedRecoveryError = isRecoverableAuthErrorForSource(
            "processDeepLinks",
            errorCode,
          );
          setAuthState("error");
          setAuthError(
            isTargetedRecoveryError
              ? "Session state was reset. Please start sign-in again."
              : "OAuth callback failed. Please try again.",
          );
          setAuthMessage(null);
          console.error(error);
        }
      }
    },
    [applyAuthFlowResponse, recoverSignedInFromKnownAuthError],
  );

  useEffect(() => {
    if (!hasLoggedMountRef.current) {
      authUiLog("mount");
      hasLoggedMountRef.current = true;
    }
    try {
      const stored = window.localStorage.getItem(KEYCHAIN_NOTICE_STORAGE_KEY);
      if (stored === "accepted") {
        setIsKeychainNoticeAccepted(true);
      }
    } catch {
      // No-op: keep the notice visible when localStorage is unavailable.
    } finally {
      setIsKeychainNoticeReady(true);
    }
  }, []);

  const acceptKeychainNotice = useCallback(() => {
    authUiLog("acceptKeychainNotice");
    try {
      window.localStorage.setItem(KEYCHAIN_NOTICE_STORAGE_KEY, "accepted");
    } catch {
      // No-op: acknowledgement for the current session is still enough to continue.
    }
    setIsKeychainNoticeAccepted(true);
    startBootstrap();
  }, [startBootstrap]);

  useEffect(() => {
    authUiLog("state_isSignedIn_changed", { isSignedIn });
    if (isSignedIn) {
      return;
    }
    setAuthState("idle");
    setAuthError(null);
    setAuthMessage(null);
    setSelectedSecondFactor(null);
    setSecondFactorStrategies([]);
  }, [isSignedIn]);

  useEffect(() => {
    authUiLog("state_authState_changed", { authState });
    if (authState !== "oauth_redirecting") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setAuthState("error");
      setAuthMessage(null);
      setAuthError("Sign-in callback was not received. Please try again.");
    }, 120000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [authState]);

  useEffect(() => {
    authUiLog("state_keychainNotice_changed", {
      isKeychainNoticeReady,
      isKeychainNoticeAccepted,
    });
    if (!isKeychainNoticeReady || !isKeychainNoticeAccepted) {
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
  }, [isKeychainNoticeAccepted, isKeychainNoticeReady, processDeepLinks]);

  const loginProps = useMemo(
    () => ({
      mode: authMode,
      authState,
      error: authError,
      statusMessage: authMessage,
      secondFactorStrategies,
      selectedSecondFactor,
      onIdentifierPasswordSubmit: submitIdentifierPassword,
      onSecondFactorSubmit: submitSecondFactor,
      onSelectSecondFactor: selectSecondFactor,
      onStartOAuth: startOAuth,
      onOpenWebSignIn: openWebSignIn,
    }),
    [
      authMode,
      authError,
      authMessage,
      authState,
      openWebSignIn,
      secondFactorStrategies,
      selectedSecondFactor,
      selectSecondFactor,
      startOAuth,
      submitIdentifierPassword,
      submitSecondFactor,
    ],
  );

  if (isKeychainNoticeReady && !isKeychainNoticeAccepted) {
    return (
      <div className="fixed inset-0 z-[80] flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm">
        <div className="w-full max-w-lg rounded-xl border bg-card p-6 shadow-xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold">Security Check Required</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            To continue, macOS will show a Keychain popup for <strong>lexelo-desktop</strong>.
            This is expected and safe.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Enter your Mac login password and you <strong>must</strong> choose{" "}
            <strong>Always Allow</strong>. This lets Lexelo access encrypted desktop auth data.
          </p>
          <div className="mt-5 flex justify-end">
            <Button type="button" onClick={acceptKeychainNotice}>
              I Understand, Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isSignedIn) {
    return <HomePageContent />;
  }

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="w-full max-w-md px-4">
        <Login {...loginProps} />
      </div>
    </div>
  );
};

export default Page;
