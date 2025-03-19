"use client";

import { MenuIcon } from "lucide-react";
import React, { useState } from "react";
import { AuthButton } from "../components/auth-buttons";
import { HomeSidebar } from "../home-sidebar";

export const HomeNavbar = () => {
  const [open, setIsOpen] = useState(false);

  return (
    <nav className="h-10 w-full lg:hidden block">
      <div className="flex justify-between items-center h-full w-full px-1">
        <div className="flex items-center gap-x-2 ">
          <MenuIcon
            className="size-8 text-muted/50 cursor-pointer"
            strokeWidth={3}
            onClick={() => setIsOpen(!open)}
          />
          <img
            src="/logo_chess.png"
            alt="Logo"
            className="h-[35px] w-[110px] object-contain"
          />
        </div>
        <div className="flex items-center gap-x-4">
          <AuthButton isMobile />
        </div>
      </div>
      <HomeSidebar isMobile={true} open={open} setIsOpen={setIsOpen} />;
    </nav>
  );
};
