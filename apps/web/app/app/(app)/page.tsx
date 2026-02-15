import React from "react";
import LexeloApp from "#/frontend/app/LexeloApp";
import { redirect } from "next/navigation";

const Page = () => {
  const onboarded = true;

  if (!onboarded) {
    redirect("/app/onboarding");
    return <></>;
  } else {
    return <LexeloApp />;
  }
};

export default Page;
