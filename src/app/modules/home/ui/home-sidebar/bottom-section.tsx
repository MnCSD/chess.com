import { cn } from "@/lib/utils";
import { Globe2Icon, HelpCircleIcon } from "lucide-react";
import React from "react";

interface BottomSectionProps {
  isMobile?: boolean;
}

export const BottomSection = ({ isMobile = false }: BottomSectionProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-col">
        <div
          className={cn(
            "flex items-center justify-center xl:justify-start px-3 hover:bg-black/20 py-1.5 cursor-pointer group hover:[&_svg]:text-white",
            isMobile && "justify-start px-3"
          )}
        >
          <Globe2Icon
            className={cn(
              "size-5 xl:mr-2 text-[#ffffff80]",
              isMobile && "mr-2"
            )}
          />

          <span
            className={cn(
              "text-[#ffffff80] text-[13px] font-semibold group-hover:text-white hidden xl:block",
              isMobile && "block pl-2"
            )}
          >
            English
          </span>
        </div>

        <div className="flex items-center justify-center xl:justify-start px-3 hover:bg-black/20 py-1.5 cursor-pointer group hover:[&_svg]:text-white">
          <HelpCircleIcon className="size-5 xl:mr-2 text-[#ffffff80]" />
          <span className="text-[#ffffff80] text-[13px] font-semibold group-hover:text-white hidden xl:block">
            Support
          </span>
        </div>
      </div>
    </div>
  );
};
