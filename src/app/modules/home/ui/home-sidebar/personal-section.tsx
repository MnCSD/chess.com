"use client";

import { Button } from "@/components/ui/button";
import { LogInIcon, SearchIcon, UserPlus2Icon } from "lucide-react";
import React from "react";
import { AuthButton } from "../components/auth-buttons";

interface PersonalSectionProps {
  isMobile?: boolean;
}

export const PersonalSection = ({ isMobile = false }: PersonalSectionProps) => {
  const isMobilePersonal = isMobile;

  return (
    <div className="xl:px-2.5 w-full">
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-[#373633] pl-2 py-0.5 border border-muted-foreground/50 placeholder:text-muted-foreground rounded-xs text-white outline-0 hidden xl:block"
      />

      <div className="xl:hidden flex items-center justify-center hover:bg-black/20 py-3 cursor-pointer">
        <SearchIcon className="size-5 text-white" strokeWidth={4} />
      </div>

      {!isMobile ? <AuthButton isMobilePersonal /> : <AuthButton />}
    </div>
  );
};
