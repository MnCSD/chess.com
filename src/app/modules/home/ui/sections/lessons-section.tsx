import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export const LessonsSection = () => {
  return (
    <div className="bg-sidebar flex-col-reverse rounded-sm p-10 flex md:flex-row-reverse items-center gap-y-10">
      <div className="md:w-1/2 w-full flex items-center flex-col gap-y-14">
        <h2 className="text-4xl text-white font-bold">Solve Chess Puzzles</h2>

        <Button
          variant={"main"}
          className="border-b-4 border-[#45753c] px-6 py-8 text-2xl font-bold cursor-pointer"
        >
          Solve Puzzles
        </Button>

        <div className="flex items-center gap-x-8 w-full mt-4">
          <img
            src={"/rudolf.jpg"}
            alt="Hikaru"
            className="rounded-sm h-auto w-[30%]"
          />

          <div className="flex flex-col gap-y-2 w-[55%]">
            <p className="text-white text-[17px] text-wrap">
              "Chess.com lessons make it easy to learn to play, then challenge
              you to continue growing."
            </p>
            <p className="text-[17px] text-white ">Anna Rudolf</p>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 w-full flex md:justify-start items-center justify-center">
        <img
          src="/lessons_board.png"
          alt="Chess Board"
          className="w-[85%] h-auto rounded-sm"
        />
      </div>
    </div>
  );
};
