export const getDesktopScheme = (): string => {
  return process.env.NEXT_PUBLIC_DESKTOP_DEEP_LINK_SCHEME ?? "lexelo";
};

export const getDesktopAuthMode = (): "v1" | "v2" => {
  const flow = process.env.NEXT_PUBLIC_DESKTOP_AUTH_MODE;
  return flow === "v2" ? "v2" : "v1";
};

export const getWebAuthBaseUrl = (): string | null => {
  const value = process.env.NEXT_PUBLIC_WEB_AUTH_BASE_URL;
  if (!value) {
    return null;
  }

  return value.replace(/\/+$/, "");
};

export const getWebSignInUrl = (): string | null => {
  const baseUrl = getWebAuthBaseUrl();
  if (!baseUrl) {
    return null;
  }

  return `${baseUrl}/sign-in`;
};
