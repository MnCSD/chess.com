import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const GamesSection = () => {
  return (
    <div className="w-full flex flex-col gap-y-6">
      <div className="lg:w-full lg:flex lg:items-start lg:flex-row grid grid-cols-2 items-center gap-y-5 lg:gap-x-8 w-[90%] mx-auto lg:mx-0">
        <div className="flex items-start gap-x-4 flex-1 w-[90%] lg:w-unset lg:justify-start">
          <Image src="/board.svg" alt="Board" width={55} height={55} />
          <div className="flex flex-col">
            <p className="text-white font-semibold text-[17px]">Play</p>
            <p className="text-muted/50 text-sm">Start a game</p>
          </div>
        </div>

        <div className="flex items-end gap-x-4 flex-1 w-[90%] lg:w-unset lg:justify-start">
          <Image src="/puzzle_tier.svg" alt="Board" width={55} height={55} />
          <div className="flex flex-col ">
            <p className="text-white font-semibold text-[17px]">Puzzles</p>
            <p className=" text-4xl text-white font-extrabold">50</p>
          </div>
        </div>

        <div className="flex items-center gap-x-4 flex-1 w-[90%] lg:w-unset lg:justify-start">
          <Image src="/lessons.svg" alt="Board" width={55} height={55} />
          <div className="flex flex-col">
            <p className="text-white font-semibold text-[17px]">Next Lesson</p>
            <p className="text-muted/50 text-wrap max-w-[150px] text-sm">
              Playing the Game: The Goals of Chess
            </p>
          </div>
        </div>

        <div className="flex items-start gap-x-4 flex-1 w-[90%] lg:w-unset lg:justify-start">
          <Image src="/review.svg" alt="Board" width={55} height={55} />
          <div className="flex flex-col">
            <p className="text-white font-semibold text-[17px]">Game Review</p>
            <p className="text-muted/50 text-sm">Learn from your mistakes</p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row lg:flex-nowrap lg:gap-x-8 gap-y-6 items-center">
        <div className="lg:w-1/4 w-[90%] flex flex-col gap-y-2">
          <Button
            variant={"alternate_black"}
            className="py-8 rounded-sm text-[17px] font-bold cursor-pointer"
          >
            Play 10 min
          </Button>
          <Button
            variant={"alternate_black"}
            className="py-8 rounded-sm text-[17px] font-bold cursor-pointer"
          >
            New Game
          </Button>
          <Button
            variant={"alternate_black"}
            className="py-8 rounded-sm text-[17px] font-bold cursor-pointer"
          >
            Play Bots
          </Button>
          <Button
            variant={"alternate_black"}
            className="py-8 rounded-sm text-[17px] font-bold cursor-pointer"
          >
            Play a friend
          </Button>
        </div>

        <div className="lg:w-1/4 w-[90%] cursor-pointer">
          <Link prefetch href={"/puzzles"}>
            <Image
              src={"/lessons_board.png"}
              alt="Board"
              width={241}
              height={241}
              layout="responsive"
              className="rounded-t-sm"
            />
            <Button
              variant={"alternate_black"}
              className="py-6.5 rounded-b-sm text-[17px] font-bold w-full"
            >
              Solve Puzzle
            </Button>
          </Link>
        </div>

        <div className="lg:w-1/4 w-[90%] cursor-pointer">
          <Link prefetch href={"/lessons"}>
            <Image
              src={"/lessons_board.png"}
              alt="Board"
              layout="responsive"
              width={241}
              height={241}
              className="rounded-t-sm"
            />
            <Button
              variant={"alternate_black"}
              className="py-6.5 rounded-b-sm text-[17px] font-bold w-full"
            >
              Start Lesson
            </Button>
          </Link>
        </div>

        <div className="lg:w-1/4 w-[90%] cursor-pointer">
          <Link prefetch href={"/games/archive"}>
            <Image
              src={"/lessons_board.png"}
              alt="Board"
              layout="responsive"
              width={241}
              height={241}
              className="rounded-t-sm"
            />
            <Button
              variant={"alternate_black"}
              className="py-6.5 rounded-b-sm text-[17px] font-bold w-full"
            >
              Review
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
