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
