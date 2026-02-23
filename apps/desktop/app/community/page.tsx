"use client";

import { type JSX } from "react";

import { CommunityPageContent } from "@/components/pages/DesktopPages";
import RequireDesktopSignedIn from "@/components/RequireDesktopSignedIn";

const CommunityPage = (): JSX.Element => {
  return (
    <RequireDesktopSignedIn>
      <CommunityPageContent />
    </RequireDesktopSignedIn>
  );
};

export default CommunityPage;
