import { items } from "@/app/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MainSectionProps {
  isMobile?: boolean;
}

export const MainSection = ({ isMobile = false }: MainSectionProps) => {
  return (
    <div className="flex flex-col gap-y-0.5">
      {items.map((item, idx) => (
        <Link
          prefetch
          href={item.url}
          key={idx}
          className="pl-2 py-1 hover:bg-black/10 transition-colors duration-200 flex items-center "
        >
          <Image
            src={item.icon}
            alt={item.title}
            className="object-cover mr-[10px]"
            width={37}
            height={37}
          />
          <span
            className={cn(
              "text-white text-[16px] font-semibold ",
              isMobile ? "text-[16px] flex" : "hidden xl:block"
            )}
          >
            {item.title}
          </span>
        </Link>
      ))}
    </div>
  );
};
