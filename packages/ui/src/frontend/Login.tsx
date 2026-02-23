"use client";

import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "#/lib/utils";
import { Button } from "#/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/ui/card";
import { Input } from "#/ui/input";
import { Label } from "#/ui/label";

export type DesktopAuthState =
  | "idle"
  | "submitting"
  | "needs_second_factor"
  | "oauth_redirecting"
  | "callback_processing"
  | "signed_in"
  | "error";

export type OAuthProvider = "google" | "microsoft";
export type SecondFactorStrategy = "email_code" | "totp" | "backup_code";

export type LoginMode = "v1" | "v2";

type LoginProps = {
  className?: string;
  mode?: LoginMode;
  authState?: DesktopAuthState;
  error?: string | null;
  statusMessage?: string | null;
  secondFactorStrategies?: SecondFactorStrategy[];
  selectedSecondFactor?: SecondFactorStrategy | null;
  onIdentifierPasswordSubmit?: (identifier: string, password: string) => Promise<void> | void;
  onSecondFactorSubmit?: (strategy: SecondFactorStrategy, code: string) => Promise<void> | void;
  onSelectSecondFactor?: (strategy: SecondFactorStrategy) => Promise<void> | void;
  onStartOAuth?: (provider: OAuthProvider) => Promise<void> | void;
  onOpenWebSignIn?: () => Promise<void> | void;
};

const providerLabel = (provider: OAuthProvider): string =>
  provider === "google" ? "Google" : "Microsoft";

const strategyLabel = (strategy: SecondFactorStrategy): string => {
  if (strategy === "email_code") {
    return "Email code";
  }

  if (strategy === "totp") {
    return "Authenticator app";
  }

  return "Backup code";
};

const pendingStateSet = new Set<DesktopAuthState>([
  "submitting",
  "oauth_redirecting",
  "callback_processing",
]);

const Login = ({
  className,
  mode = "v1",
  authState = "idle",
  error,
  statusMessage,
  secondFactorStrategies = [],
  selectedSecondFactor,
  onIdentifierPasswordSubmit,
  onSecondFactorSubmit,
  onSelectSecondFactor,
  onStartOAuth,
  onOpenWebSignIn,
}: LoginProps) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const isBusy = pendingStateSet.has(authState);
  const isSecondFactorStep = authState === "needs_second_factor";

  const effectiveSecondFactor = useMemo<SecondFactorStrategy | null>(() => {
    if (selectedSecondFactor) {
      return selectedSecondFactor;
    }

    return secondFactorStrategies[0] ?? null;
  }, [selectedSecondFactor, secondFactorStrategies]);

  const submitIdentifierPassword = async () => {
    if (!onIdentifierPasswordSubmit || isBusy) {
      return;
    }

    await onIdentifierPasswordSubmit(identifier.trim(), password);
  };

  const submitSecondFactor = async () => {
    if (!onSecondFactorSubmit || !effectiveSecondFactor || isBusy) {
      return;
    }

    await onSecondFactorSubmit(effectiveSecondFactor, verificationCode.trim());
  };

  const renderStatus = () => {
    if (!error && !statusMessage) {
      return null;
    }

    const isError = Boolean(error);
    return (
      <div
        className={cn(
          "rounded-md border px-3 py-2 text-sm",
          isError
            ? "border-destructive/50 bg-destructive/10 text-destructive"
            : "border-border bg-muted text-muted-foreground",
        )}
      >
        {error ?? statusMessage}
      </div>
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome to Lexelo</CardTitle>
          <CardDescription>
            {mode === "v1"
              ? "Sign in to your account"
              : "Sign in in your browser and continue on desktop"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">{renderStatus()}</div>

          {mode === "v2" ? (
            <div className="mt-6 grid gap-4">
              <Button
                type="button"
                className="w-full"
                disabled={isBusy}
                onClick={() => {
                  void onOpenWebSignIn?.();
                }}
              >
                {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Continue in browser
              </Button>

              <p className="text-muted-foreground text-center text-xs">
                Email/password and Google/Microsoft are completed in your system browser, then
                deep-linked back to desktop.
              </p>
            </div>
          ) : null}

          {mode === "v1" && !isSecondFactorStep ? (
            <>
              <div className="mt-6 grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="identifier">Email or username</Label>
                  <Input
                    id="identifier"
                    type="text"
                    placeholder="you@example.com"
                    value={identifier}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    disabled={isBusy}
                    onChange={(event) => {
                      setIdentifier(event.target.value);
                    }}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    disabled={isBusy}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        void submitIdentifierPassword();
                      }
                    }}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    required
                  />
                </div>

                <Button
                  type="button"
                  disabled={isBusy}
                  className="w-full"
                  onClick={() => {
                    void submitIdentifierPassword();
                  }}
                >
                  {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Sign in
                </Button>
              </div>

              <div className="relative my-4 text-center text-xs">
                <span className="bg-card text-muted-foreground px-2">or continue with</span>
              </div>

              <div className="grid gap-2">
                {(["google", "microsoft"] as OAuthProvider[]).map((provider) => (
                  <Button
                    key={provider}
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled={isBusy}
                    onClick={() => {
                      void onStartOAuth?.(provider);
                    }}
                  >
                    {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    Continue with {providerLabel(provider)}
                  </Button>
                ))}
              </div>
            </>
          ) : null}

          {mode === "v1" && isSecondFactorStep ? (
            <>
              <div className="mt-6 grid gap-2">
                <Label>Verification method</Label>
                <div className="grid gap-2 sm:grid-cols-3">
                  {secondFactorStrategies.map((strategy) => (
                    <Button
                      key={strategy}
                      type="button"
                      variant={effectiveSecondFactor === strategy ? "default" : "outline"}
                      disabled={isBusy}
                      onClick={() => {
                        void onSelectSecondFactor?.(strategy);
                      }}
                    >
                      {strategyLabel(strategy)}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="verificationCode">Verification code</Label>
                  <Input
                    id="verificationCode"
                    type="text"
                    inputMode="numeric"
                    value={verificationCode}
                    disabled={isBusy}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        void submitSecondFactor();
                      }
                    }}
                    onChange={(event) => {
                      setVerificationCode(event.target.value);
                    }}
                    required
                  />
                </div>

                <Button
                  type="button"
                  disabled={isBusy}
                  className="w-full"
                  onClick={() => {
                    void submitSecondFactor();
                  }}
                >
                  {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Verify and continue
                </Button>
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
