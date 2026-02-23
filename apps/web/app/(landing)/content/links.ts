export const landingInternalLinks = {
  home: "/",
  features: "/#features",
  about: "/about",
  contribute: "/contribute",
  pricing: "/pricing",
  pricingDownload: "/pricing#download",
  download: "/pricing#download",
  downloads: "/pricing#download",
  pricingPlans: "/pricing#pricing",
  pricingDocs: "/pricing#docs",
  pricingHelp: "/pricing#help",
  plans: "/pricing",
  plansDownload: "/pricing#download",
  plansPricing: "/pricing#pricing",
  plansDocs: "/pricing#docs",
  plansHelp: "/pricing#help",
  resources: "/pricing",
  resourcesDownload: "/pricing#download",
  resourcesPricing: "/pricing#pricing",
  resourcesDocs: "/pricing#docs",
  resourcesHelp: "/pricing#help",
  contributeContact: "/contribute#contact",
  app: "/app",
  onboarding: "/app/onboarding",
} as const;

export const landingExternalLinks = {
  releases: "https://github.com/BunnyGamezsc/lexelo/releases",
  releasesLatest: "https://github.com/BunnyGamezsc/lexelo/releases/latest",
  desktopSource: "https://github.com/BunnyGamezsc/lexelo/tree/main/apps/desktop",
  readme: "https://github.com/BunnyGamezsc/lexelo#readme",
  discussions: "https://github.com/BunnyGamezsc/lexelo/discussions",
  github: "https://github.com/BunnyGamezsc/lexelo",
  license: "https://github.com/BunnyGamezsc/lexelo/blob/main/LICENSE",
  terms: "https://polyformproject.org/licenses/noncommercial/1.0.0",
  issues: "https://github.com/BunnyGamezsc/lexelo/issues",
} as const;

export const landingNavLinks = [
  { label: "Features", href: landingInternalLinks.features },
  { label: "Contribute", href: landingInternalLinks.contribute },
  { label: "About", href: landingInternalLinks.about },
  { label: "Pricing", href: landingInternalLinks.pricing },
] as const;

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const landingFooterLinks: Record<
  "product" | "resources" | "company",
  readonly FooterLink[]
> = {
  product: [
    { label: "Features", href: landingInternalLinks.features },
    { label: "Pricing", href: landingInternalLinks.pricingPlans },
    { label: "Download", href: landingInternalLinks.pricingDownload },
    { label: "Contribute", href: landingInternalLinks.contribute },
  ],
  resources: [
    { label: "Documentation", href: landingExternalLinks.readme, external: true },
    { label: "Help Center", href: landingInternalLinks.resourcesHelp },
    { label: "Community", href: landingExternalLinks.discussions, external: true },
    { label: "Github", href: landingExternalLinks.github, external: true },
  ],
  company: [
    { label: "About", href: landingInternalLinks.about },
    { label: "Contact", href: landingInternalLinks.contributeContact },
    { label: "Privacy", href: landingExternalLinks.license, external: true },
    { label: "Terms", href: landingExternalLinks.terms, external: true },
  ],
};
