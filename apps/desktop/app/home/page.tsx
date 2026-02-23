"use client";

import { type JSX } from "react";

import { HomePageContent } from "@/components/pages/DesktopPages";
import RequireDesktopSignedIn from "@/components/RequireDesktopSignedIn";

const HomePage = (): JSX.Element => {
  return (
    <RequireDesktopSignedIn>
      <HomePageContent />
    </RequireDesktopSignedIn>
  );
};

export default HomePage;
