"use client";

import { useRouter } from "next/navigation";
import { useEffect, type JSX, type ReactNode } from "react";

import { useDesktopAuthSession } from "@/lib/auth/session";

type RequireDesktopSignedInProps = {
  children: ReactNode;
};

const RequireDesktopSignedIn = ({ children }: RequireDesktopSignedInProps): JSX.Element => {
  const router = useRouter();
  const { isAuthResolved, isSignedIn } = useDesktopAuthSession();

  useEffect(() => {
    if (isAuthResolved && !isSignedIn) {
      router.replace("/");
    }
  }, [isAuthResolved, isSignedIn, router]);

  if (!isAuthResolved) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!isSignedIn) {
    return <div className="min-h-[40vh]" aria-hidden="true" />;
  }

  return <>{children}</>;
};

export default RequireDesktopSignedIn;
