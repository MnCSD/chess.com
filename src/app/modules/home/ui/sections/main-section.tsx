import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const MainSection = () => {
  return (
    <div className="flex items-center space-x-8 mb-4">
      {/* Left Side: Chess Image */}
      <div className="w-1/2 hidden md:block">
        <img
          src="/chess_board.png"
          alt="Chess Board"
          className="w-[96%] h-auto rounded-sm"
        />
      </div>

      {/* Right Side: Content */}
      <div className="md:w-1/2 w-full flex items-center flex-col space-y-4 px-[48px] md:pl-[20px] h-auto">
        <h1 className="text-white xl:text-[51px] text-[38px] font-bold text-center xl:leading-15 leading-10">
          Play Chess Online on the #1 Site!
        </h1>

        <div className="flex items-center justify-between w-full max-w-[400px] mt-4">
          <p className="text-muted/60">
            <span className="font-bold text-white">18,143,848</span> Games Today
          </p>

          <p className="text-muted/60">
            <span className="font-bold text-white">228,647</span> Playing Now
          </p>
        </div>

        <div className="w-full mt-8 flex flex-col gap-y-4 max-w-[400px]">
          <Link prefetch href="/play/online">
            <Button
              variant={"main"}
              type="button"
              className="w-full py-11 border-b-4 border-[#45753c] pl-6 flex items-center cursor-pointer"
            >
              <Image
                src={"/play_white.svg"}
                width={55}
                height={55}
                alt="Play white"
                className="flex-shrink-0"
              />

              {/* Remove bg-red-500 and fix layout */}
              <div className="flex flex-col items-start ml-4 flex-1">
                <p className="text-white font-bold text-[28px] leading-tight">
                  Play Online
                </p>
                <p className="text-white text-sm text-wrap text-start">
                  Play with someone at your level
                </p>
              </div>
            </Button>
          </Link>

          <Link prefetch href="/play/computer">
            <Button
              variant={"alternate"}
              type="button"
              className="w-full py-11 border-b-4 border-black/10 pl-6 flex justify-start items-center cursor-pointer"
            >
              <Image src={"/bot.svg"} width={55} height={55} alt="Play white" />

              <div className="flex flex-col items-start ml-4 ">
                <p className="text-muted/70 font-bold text-[28px]">Play Bots</p>
                <p className="text-muted/70 text-wrap text-start">
                  Play vs customizable training bots
                </p>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
