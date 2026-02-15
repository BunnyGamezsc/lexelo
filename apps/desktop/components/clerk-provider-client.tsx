"use client";
import type { Clerk } from "@clerk/clerk-js";
import { ClerkProvider } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {initClerk} from "tauri-plugin-clerk";

export function ClerkProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [clerkConfig, setClerkConfig] = useState< Clerk | null>(null);

  useEffect(() => {
    async function loadClerk() {
      try {
        const { initClerk } = await import("tauri-plugin-clerk");
        const config = await initClerk();
        setClerkConfig(config as unknown as Clerk);
      } catch (error) {
        console.error("Failed to initialize Clerk:", error);
      }
    }
    if (!clerkConfig?.isSignedIn) {
      loadClerk();
    }
  }, []);

  if (!clerkConfig) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={clerkConfig.publishableKey} Clerk={clerkConfig}>
      {children}
    </ClerkProvider>
  );
}
