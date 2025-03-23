import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const PlaySidebar = () => {
  return (
    <div className="h-full bg-sidebar w-full rounded-sm pb-10">
      <div
        className="relative flex items-center flex-col gap-y-2"
        style={{
          background:
            "radial-gradient(180% 160% at top center,rgba(0,0,0,.14)  40%, transparent 0)",
        }}
      >
        {/* <div className="w-full bg-red-500 h-full absolute top-0" /> */}
        <h2 className="text-white font-extrabold  text-[32px]">Play Chess</h2>
        <Image src={"play_white.svg"} alt="Play" width={88} height={88} />
      </div>

      <div className="flex flex-col items-center mt-4 w-[85%] mx-auto">
        <Link prefetch href="/play/computer" className="cursor-pointer w-full">
          <Button className="bg-[rgba(0,0,0,.24)] rounded-sm w-full border-b-3 border-b-black/30 py-12 flex items-center justify-start pl-6 cursor-pointer">
            <Image src={"/bot.svg"} alt="Bot" width={48} height={48} />
            <div className="flex flex-col items-start ml-2">
              <p className="text-2xl font-bold"> Play Bots</p>
              <p className="text-muted/90 text-sm font-normal text-wrap text-left">
                Challenge a bot from Easy to Master
              </p>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
};
