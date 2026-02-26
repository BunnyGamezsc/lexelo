"use client";

import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";

export const KEYCHAIN_NOTICE_STORAGE_KEY = "lexelo.desktop.keychain.notice.v1";
const authBootstrapRetryMs = 1500;
const phaseWaiting = "waiting_for_secure_storage";
const phaseResolving = "resolving_auth";
const phaseReady = "ready";
const phaseError = "error";

type AuthBootstrapPhase =
  | typeof phaseWaiting
  | typeof phaseResolving
  | typeof phaseReady
  | typeof phaseError;

type AuthStatusResponse = {
  isSignedIn: boolean;
  userId?: string | null;
  displayName?: string | null;
  bootstrapPhase?: AuthBootstrapPhase | null;
};

type DesktopAuthSessionState = {
  isSignedIn: boolean;
  userId: string | null;
  displayName: string | null;
  isAuthResolved: boolean;
  bootstrapPhase: AuthBootstrapPhase | null;
};

type DesktopAuthSessionAction =
  | { type: "bootstrap_started" }
  | { type: "bootstrap_failed" }
  | { type: "keychain_notice_pending" }
  | {
      type: "bootstrap_succeeded";
      response: AuthStatusResponse;
      phase: AuthBootstrapPhase;
    }
  | {
      type: "event_phase_pending";
      phase: typeof phaseWaiting | typeof phaseResolving;
    }
  | { type: "event_ready"; response: AuthStatusResponse }
  | { type: "set_signed_in"; next: boolean };

const initialDesktopAuthSessionState: DesktopAuthSessionState = {
  isSignedIn: false,
  userId: null,
  displayName: null,
  isAuthResolved: false,
  bootstrapPhase: null,
};

const desktopAuthSessionReducer = (
  state: DesktopAuthSessionState,
  action: DesktopAuthSessionAction,
): DesktopAuthSessionState => {
  switch (action.type) {
    case "bootstrap_started":
      return {
        ...state,
        isAuthResolved: false,
        bootstrapPhase: phaseResolving,
      };
    case "bootstrap_succeeded":
      return {
        isSignedIn: action.response.isSignedIn,
        userId: action.response.userId ?? null,
        displayName: action.response.displayName ?? null,
        isAuthResolved: true,
        bootstrapPhase: action.phase,
      };
    case "event_phase_pending":
      return {
        ...state,
        bootstrapPhase: action.phase,
        isAuthResolved: false,
      };
    case "event_ready":
      return {
        isSignedIn: action.response.isSignedIn,
        userId: action.response.userId ?? null,
        displayName: action.response.displayName ?? null,
        isAuthResolved: true,
        bootstrapPhase: action.response.bootstrapPhase ?? phaseReady,
      };
    case "bootstrap_failed":
      return {
        isSignedIn: false,
        userId: null,
        displayName: null,
        isAuthResolved: true,
        bootstrapPhase: phaseError,
      };
    case "keychain_notice_pending":
      return {
        isSignedIn: false,
        userId: null,
        displayName: null,
        isAuthResolved: true,
        bootstrapPhase: null,
      };
    case "set_signed_in":
      return {
        isSignedIn: action.next,
        userId: action.next ? state.userId : null,
        displayName: action.next ? state.displayName : null,
        isAuthResolved: true,
        bootstrapPhase: phaseReady,
      };
    default:
      return state;
  }
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

const DesktopAuthSessionContext =
  createContext<DesktopAuthSessionContextValue | null>(null);

const readKeychainNoticeAccepted = (): boolean => {
  try {
    return (
      window.localStorage.getItem(KEYCHAIN_NOTICE_STORAGE_KEY) === "accepted"
    );
  } catch {
    return false;
  }
};

export const DesktopAuthSessionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    desktopAuthSessionReducer,
    initialDesktopAuthSessionState,
  );
  const [isKeychainNoticeAccepted, setIsKeychainNoticeAccepted] = useState(() =>
    readKeychainNoticeAccepted(),
  );
  const bootstrapInFlightRef = useRef(false);
  const isAuthResolvedRef = useRef(
    initialDesktopAuthSessionState.isAuthResolved,
  );
  const bootstrapGenerationRef = useRef(0);

  const refreshAuthStatus = useCallback(async (): Promise<boolean> => {
    if (bootstrapInFlightRef.current) {
      return false;
    }

    const currentGeneration = ++bootstrapGenerationRef.current;
    bootstrapInFlightRef.current = true;
    isAuthResolvedRef.current = false;
    dispatch({ type: "bootstrap_started" });

    try {
      const response = await invoke<AuthStatusResponse>("auth_bootstrap");

      // If a newer bootstrap has superseded this one (or it was resolved), abort.
      if (currentGeneration !== bootstrapGenerationRef.current) {
        return false;
      }

      const phase = response.bootstrapPhase ?? phaseReady;

      if (phase === phaseWaiting || phase === phaseResolving) {
        dispatch({ type: "event_phase_pending", phase });
        return false;
      }

      isAuthResolvedRef.current = true;
      dispatch({ type: "bootstrap_succeeded", response, phase });
      return response.isSignedIn;
    } catch {
      if (currentGeneration !== bootstrapGenerationRef.current) {
        return false;
      }
      isAuthResolvedRef.current = true;
      dispatch({ type: "bootstrap_failed" });
      return false;
    } finally {
      if (currentGeneration === bootstrapGenerationRef.current) {
        bootstrapInFlightRef.current = false;
      }
    }
  }, []);

  const startBootstrap = useCallback(() => {
    setIsKeychainNoticeAccepted(true);
    isAuthResolvedRef.current = false;
    dispatch({ type: "bootstrap_started" });
    void refreshAuthStatus();
  }, [refreshAuthStatus]);

  useEffect(() => {
    if (!isKeychainNoticeAccepted) {
      isAuthResolvedRef.current = true;
      dispatch({ type: "keychain_notice_pending" });
      return;
    }

    isAuthResolvedRef.current = false;
    dispatch({ type: "bootstrap_started" });
    void refreshAuthStatus();
  }, [isKeychainNoticeAccepted, refreshAuthStatus]);

  useEffect(() => {
    if (!isKeychainNoticeAccepted || state.isAuthResolved) {
      return;
    }
    if (
      state.bootstrapPhase !== phaseWaiting &&
      state.bootstrapPhase !== phaseResolving
    ) {
      return;
    }

    const retryId = window.setTimeout(() => {
      void refreshAuthStatus();
    }, authBootstrapRetryMs);

    return () => {
      window.clearTimeout(retryId);
    };
  }, [
    isKeychainNoticeAccepted,
    refreshAuthStatus,
    state.bootstrapPhase,
    state.isAuthResolved,
  ]);

  useEffect(() => {
    let disposed = false;
    let unlisten: (() => void) | null = null;

    const attach = async () => {
      try {
        const stop = await listen<AuthStatusResponse>(
          "lexelo://auth-state",
          (event) => {
            if (disposed || !isKeychainNoticeAccepted) {
              return;
            }

            const phase = event.payload.bootstrapPhase ?? phaseReady;
            if (phase === phaseWaiting || phase === phaseResolving) {
              // Ignore stale pending phases once auth is resolved, and ignore
              // background phase churn when no bootstrap request is active.
              if (!bootstrapInFlightRef.current || isAuthResolvedRef.current) {
                return;
              }
              dispatch({ type: "event_phase_pending", phase });
              return;
            }

            isAuthResolvedRef.current = true;
            bootstrapGenerationRef.current++; // Force ignore of active bootstrap promises
            bootstrapInFlightRef.current = false;
            dispatch({ type: "event_ready", response: event.payload });
          },
        );

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
  }, [isKeychainNoticeAccepted]);

  const contextValue = useMemo<DesktopAuthSessionContextValue>(
    () => ({
      isSignedIn: state.isSignedIn,
      userId: state.userId,
      displayName: state.displayName,
      isAuthResolved: state.isAuthResolved,
      bootstrapPhase: state.bootstrapPhase,
      setSignedIn: (next: boolean) => {
        dispatch({ type: "set_signed_in", next });
      },
      refreshAuthStatus,
      startBootstrap,
    }),
    [refreshAuthStatus, startBootstrap, state],
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
    throw new Error(
      "useDesktopAuthSession must be used within DesktopAuthSessionProvider",
    );
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
  const { isSignedIn } = useDesktopAuthSession();
  if (isSignedIn) {
    return null;
  }
  return <>{children}</>;
};
