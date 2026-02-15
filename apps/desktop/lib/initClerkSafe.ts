import type { Clerk } from "@clerk/clerk-js";

const ABSOLUTE_URL_PATTERN = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;

const isRelativeRequestInput = (input: RequestInfo | URL): boolean => {
  if (typeof input === "string") {
    return !ABSOLUTE_URL_PATTERN.test(input) && !input.startsWith("//");
  }

  if (input instanceof URL) {
    return false;
  }

  return !ABSOLUTE_URL_PATTERN.test(input.url) && !input.url.startsWith("//");
};

const isRelativeUrlParseError = (error: unknown): error is TypeError => {
  return (
    error instanceof TypeError &&
    typeof error.message === "string" &&
    error.message.includes("cannot be parsed as a URL")
  );
};

export const initClerkSafe = async (): Promise<Clerk> => {
  const browserFetch = globalThis.fetch.bind(globalThis);
  const { initClerk } = await import("tauri-plugin-clerk");
  const clerk = await initClerk();
  const tauriClerkFetch = globalThis.fetch.bind(globalThis);

  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    if (isRelativeRequestInput(input)) {
      return browserFetch(input, init);
    }

    try {
      return await tauriClerkFetch(input, init);
    } catch (error) {
      if (isRelativeUrlParseError(error)) {
        return browserFetch(input, init);
      }

      throw error;
    }
  };

  return clerk;
};
