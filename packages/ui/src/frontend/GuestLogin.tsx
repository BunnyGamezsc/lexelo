"use client";
import React from "react";
import { Button } from "#/ui/button";
import { redirect } from "next/navigation";

const GuestLogin = () => {
  return (
    <Button
      type={"button"}
      variant={"secondary"}
      onClick={() => {
        redirect("/app");
      }}
    >
      Continue as Guest
    </Button>
  );
};

export default GuestLogin;
