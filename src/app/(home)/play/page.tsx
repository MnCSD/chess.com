import { PlayView } from "@/app/modules/play/ui/views/play-view";
import { ChessBoard } from "@/components/chess-board";
import React from "react";

const PlayPage = () => {
  return (
    <div className="lg:h-screen h-[calc(100vh-200px])]">
      <PlayView />
    </div>
  );
};

export default PlayPage;
