"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MainSection } from "./main-section";
import { PersonalSection } from "./personal-section";
import { BottomSection } from "./bottom-section";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";

interface HomeSidebarProps {
  isMobile?: boolean;
  open?: boolean;
  setIsOpen?: (open: boolean) => void;
}

export const HomeSidebar = ({
  isMobile = false,
  open,
  setIsOpen,
}: HomeSidebarProps) => {
  const user = useCurrentUser();

  return (
    <nav
      className={cn(
        "lg:w-[50px] xl:w-[145px] h-screen lg:flex flex-col bg-sidebar hidden fixed top-0 left-0 z-50",
        isMobile && open && "w-[145px] fixed z-50 top-0 left-0 block"
      )}
    >
      <div className="">
        <Link
          prefetch
          href={"/"}
          className="hidden md:block pl-4 pt-3 py-2 pb-3 hover:bg-black/10 transition-colors duration-200"
        >
          <Image
            src={"/logo_chess.png"}
            alt="Logo"
            width={110}
            height={30}
            className="object-cover xl:block hidden"
          />

          <Image
            src={"/logo_mobile.png"}
            alt="Logo"
            width={20}
            height={20}
            className="object-cover xl:hidden flex"
          />
        </Link>
      </div>

      {isMobile && (
        <div
          className="flex items-center justify-start pl-3 hover:bg-black/20 py-2 cursor-pointer"
          onClick={() => setIsOpen && setIsOpen(false)}
        >
          <XIcon className="size-6.5 text-white" strokeWidth={4} />
        </div>
      )}

      {isMobile ? <MainSection isMobile /> : <MainSection />}

      {isMobile ? (
        <div className="mt-2 w-full">
          <PersonalSection isMobile />
        </div>
      ) : (
        <div className="mt-2 w-full">
          <PersonalSection />
        </div>
      )}

      {/* Go this div to bottoom with margin auto */}
      {isMobile ? (
        <></>
      ) : (
        <div className="mt-auto mb-6 w-full ">
          <BottomSection />
        </div>
      )}
    </nav>
  );
};
