import React from "react";
import { PlaySidebar } from "../components/play-sidebar";
import { ChessBoard } from "@/components/chess-board";
import { PlayerBar } from "../components/player-bar";

export const PlayView = () => {
  return (
    <div className="h-screen max-w-[1340px] mx-auto py-4 md:grid 2xl:grid-cols-[1fr_500px] xl:grid-cols-[1fr_350px] w-[95%] lg:w-full gap-x-8 flex flex-col">
      <div className=" flex-col w-full xl:h-full hidden xl:flex">
        <PlayerBar type="view" player="opponent" />
        <div className="flex-1 my-3 flex justify-center">
          <ChessBoard type="play" />
        </div>
        <PlayerBar type="view" player="user" />
      </div>

      <PlaySidebar />
    </div>
  );
};
