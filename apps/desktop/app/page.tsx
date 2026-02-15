"use client";
import { type JSX } from "react";

import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";

import Login from "#/frontend/Login";
import LexeloApp from "#/frontend/app/LexeloApp";

const Page = (): JSX.Element => {
  const { isLoaded } = useUser();
  return (
    <>
      <SignedOut>
        <div>
          <div className="flex items-center justify-center min-h-svh">
            <div className="w-full max-w-sm">
              <Login SignInButton={isLoaded ? SignInButton : null} />
            </div>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <LexeloApp />
      </SignedIn>
    </>
  );
};

export default Page;
