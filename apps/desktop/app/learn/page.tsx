"use client";

import { type JSX } from "react";

import { LearnPageContent } from "@/components/pages/DesktopPages";
import RequireDesktopSignedIn from "@/components/RequireDesktopSignedIn";

const LearnPage = (): JSX.Element => {
  return (
    <RequireDesktopSignedIn>
      <LearnPageContent />
    </RequireDesktopSignedIn>
  );
};

export default LearnPage;
