"use client";

import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export const KEYCHAIN_NOTICE_STORAGE_KEY = "lexelo.desktop.keychain.notice.v1";
const AUTH_STATE_EVENT = "lexelo://auth-state";
const AUTH_BOOTSTRAP_RETRY_MS = 1500;
const AUTH_ERROR_CODE_KEYCHAIN_ACCESS_REQUIRED = "KEYCHAIN_ACCESS_REQUIRED";
const AUTH_PHASE_WAITING_FOR_SECURE_STORAGE = "waiting_for_secure_storage";
const AUTH_PHASE_RESOLVING_AUTH = "resolving_auth";
const AUTH_PHASE_READY = "ready";
const AUTH_PHASE_ERROR = "error";

type AuthBootstrapPhase =
  | typeof AUTH_PHASE_WAITING_FOR_SECURE_STORAGE
  | typeof AUTH_PHASE_RESOLVING_AUTH
  | typeof AUTH_PHASE_READY
  | typeof AUTH_PHASE_ERROR;

type AuthStatusResponse = {
  isSignedIn: boolean;
  userId?: string | null;
  displayName?: string | null;
  bootstrapPhase?: AuthBootstrapPhase | null;
};

type DesktopAuthSessionContextValue = {
  isSignedIn: boolean;
  userId: string | null;
  displayName: string | null;
  isAuthResolved: boolean;
  bootstrapPhase: AuthBootstrapPhase | null;
  setSignedIn: (next: boolean) => void;
  refreshAuthStatus: () => Promise<boolean>;
  startBootstrap: () => void;
};

const DesktopAuthSessionContext = createContext<DesktopAuthSessionContextValue | null>(null);

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

const extractAuthErrorCode = (error: unknown): string | null => {
  const message = extractErrorMessage(error);
  const matchedCode = message.match(/AUTH_ERROR\|code=([^|]+)/);
  return matchedCode?.[1] ?? null;
};

const readKeychainNoticeAccepted = (): boolean => {
  try {
    return window.localStorage.getItem(KEYCHAIN_NOTICE_STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
};

export const DesktopAuthSessionProvider = ({ children }: { children: ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [isAuthResolved, setIsAuthResolved] = useState(false);
  const [bootstrapPhase, setBootstrapPhase] = useState<AuthBootstrapPhase | null>(null);
  const [isKeychainNoticeAccepted, setIsKeychainNoticeAccepted] = useState(() =>
    readKeychainNoticeAccepted(),
  );
  const bootstrapInFlightRef = useRef(false);

  const applySignedOutState = useCallback(() => {
    setIsSignedIn(false);
    setUserId(null);
    setDisplayName(null);
  }, []);

  const applyAuthStatus = useCallback((response: AuthStatusResponse) => {
    setIsSignedIn(response.isSignedIn);
    setUserId(response.userId ?? null);
    setDisplayName(response.displayName ?? null);
  }, []);

  const refreshAuthStatus = useCallback(async (): Promise<boolean> => {
    if (bootstrapInFlightRef.current) {
      return false;
    }

    bootstrapInFlightRef.current = true;
    setBootstrapPhase(AUTH_PHASE_RESOLVING_AUTH);
    try {
      const response = await invoke<AuthStatusResponse>("auth_bootstrap");
      applyAuthStatus(response);
      setBootstrapPhase(response.bootstrapPhase ?? AUTH_PHASE_READY);
      setIsAuthResolved(true);
      return response.isSignedIn;
    } catch (error) {
      const authErrorCode = extractAuthErrorCode(error);
      if (authErrorCode === AUTH_ERROR_CODE_KEYCHAIN_ACCESS_REQUIRED) {
        setBootstrapPhase(AUTH_PHASE_WAITING_FOR_SECURE_STORAGE);
        setIsAuthResolved(false);
        return false;
      }
      applySignedOutState();
      setBootstrapPhase(AUTH_PHASE_ERROR);
      setIsAuthResolved(true);
      return false;
    } finally {
      bootstrapInFlightRef.current = false;
    }
  }, [applyAuthStatus, applySignedOutState]);

  const startBootstrap = useCallback(() => {
    setIsKeychainNoticeAccepted(true);
    setIsAuthResolved(false);
    setBootstrapPhase(AUTH_PHASE_RESOLVING_AUTH);
    void refreshAuthStatus();
  }, [refreshAuthStatus]);

  useEffect(() => {
    if (!isKeychainNoticeAccepted) {
      applySignedOutState();
      setBootstrapPhase(null);
      setIsAuthResolved(true);
      return;
    }

    setIsAuthResolved(false);
    setBootstrapPhase(AUTH_PHASE_RESOLVING_AUTH);
    void refreshAuthStatus();
  }, [applySignedOutState, isKeychainNoticeAccepted, refreshAuthStatus]);

  useEffect(() => {
    if (!isKeychainNoticeAccepted || isAuthResolved) {
      return;
    }
    if (bootstrapPhase !== AUTH_PHASE_WAITING_FOR_SECURE_STORAGE) {
      return;
    }

    const retryId = window.setTimeout(() => {
      void refreshAuthStatus();
    }, AUTH_BOOTSTRAP_RETRY_MS);

    return () => {
      window.clearTimeout(retryId);
    };
  }, [bootstrapPhase, isAuthResolved, isKeychainNoticeAccepted, refreshAuthStatus]);

  useEffect(() => {
    let disposed = false;
    let unlisten: (() => void) | null = null;

    const attach = async () => {
      try {
        const stop = await listen<AuthStatusResponse>(AUTH_STATE_EVENT, (event) => {
          if (disposed || !isKeychainNoticeAccepted) {
            return;
          }

          const phase = event.payload.bootstrapPhase ?? AUTH_PHASE_READY;
          setBootstrapPhase(phase);

          if (
            phase === AUTH_PHASE_WAITING_FOR_SECURE_STORAGE ||
            phase === AUTH_PHASE_RESOLVING_AUTH
          ) {
            // Ignore late phase-only events once bootstrap is already resolved.
            if (!bootstrapInFlightRef.current && isAuthResolved) {
              return;
            }
            setIsAuthResolved(false);
            return;
          }

          applyAuthStatus(event.payload);
          setIsAuthResolved(true);
        });

        if (!disposed) {
          unlisten = stop;
        }
      } catch {
        // No-op: explicit bootstrap invoke remains the source of truth.
      }
    };

    void attach();

    return () => {
      disposed = true;
      if (unlisten) {
        unlisten();
      }
    };
  }, [applyAuthStatus, isAuthResolved, isKeychainNoticeAccepted]);

  const contextValue = useMemo<DesktopAuthSessionContextValue>(
    () => ({
      isSignedIn,
      userId,
      displayName,
      isAuthResolved,
      bootstrapPhase,
      setSignedIn: (next: boolean) => {
        setIsSignedIn(next);
        if (!next) {
          setUserId(null);
          setDisplayName(null);
        }
        setBootstrapPhase(AUTH_PHASE_READY);
        setIsAuthResolved(true);
      },
      refreshAuthStatus,
      startBootstrap,
    }),
    [
      bootstrapPhase,
      displayName,
      isAuthResolved,
      isSignedIn,
      refreshAuthStatus,
      startBootstrap,
      userId,
    ],
  );

  return (
    <DesktopAuthSessionContext.Provider value={contextValue}>
      {children}
    </DesktopAuthSessionContext.Provider>
  );
};

export const useDesktopAuthSession = () => {
  const context = useContext(DesktopAuthSessionContext);
  if (!context) {
    throw new Error("useDesktopAuthSession must be used within DesktopAuthSessionProvider");
  }
  return context;
};

export const DesktopSignedIn = ({ children }: { children: ReactNode }) => {
  const { isAuthResolved, isSignedIn } = useDesktopAuthSession();
  if (!isAuthResolved || !isSignedIn) {
    return null;
  }
  return <>{children}</>;
};

export const DesktopSignedOut = ({ children }: { children: ReactNode }) => {
  const { isAuthResolved, isSignedIn } = useDesktopAuthSession();
  if (!isAuthResolved || isSignedIn) {
    return null;
  }
  return <>{children}</>;
};
