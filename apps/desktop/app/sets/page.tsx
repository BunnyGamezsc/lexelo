"use client";

import { type JSX } from "react";

import { SetsPageContent } from "@/components/pages/DesktopPages";
import RequireDesktopSignedIn from "@/components/RequireDesktopSignedIn";

const SetsPage = (): JSX.Element => {
  return (
    <RequireDesktopSignedIn>
      <SetsPageContent />
    </RequireDesktopSignedIn>
  );
};

export default SetsPage;
