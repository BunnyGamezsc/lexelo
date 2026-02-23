import { SignIn } from "@clerk/nextjs";

type SignInPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const resolveRedirectUrl = (value: string | string[] | undefined): string | undefined => {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;
  const redirectUrl = resolveRedirectUrl(params.redirect_url);

  return (
    <div className="bg-muted flex min-h-svh items-center justify-center p-6 md:p-10">
      <SignIn
        routing="path"
        path="/sign-in"
        forceRedirectUrl={redirectUrl}
        signUpForceRedirectUrl={redirectUrl}
      />
    </div>
  );
}
