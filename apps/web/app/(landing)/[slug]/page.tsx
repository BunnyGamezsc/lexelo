import { notFound, redirect } from "next/navigation";
import { landingInternalLinks } from "../content/links";

type LandingParams = {
  slug: string;
};

const linkEntries = Object.entries(landingInternalLinks) as Array<
  [string, string]
>;

function resolveLandingRedirect(slug: string): string | null {
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();
  const directMatch = landingInternalLinks[normalizedSlug as keyof typeof landingInternalLinks];
  if (directMatch) return directMatch;

  const entry = linkEntries.find(
    ([key]) => key.toLowerCase() === normalizedSlug,
  );
  return entry?.[1] ?? null;
}

export default async function LandingSlugRedirectPage({
  params,
}: {
  params: Promise<LandingParams>;
}) {
  const { slug } = await params;
  const destination = resolveLandingRedirect(slug);

  if (!destination) notFound();
  redirect(destination);
}