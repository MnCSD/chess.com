import { PlayComputerView } from "@/app/modules/play-computer/ui/views/play-computer-view";
import { PlayView } from "@/app/modules/play/ui/views/play-view";
import { ChessBoard } from "@/components/chess-board";
import React from "react";

const PlayPage = () => {
  return (
    <div className="lg:h-screen h-[calc(100vh-200px])]">
      <PlayComputerView />
    </div>
  );
};

export default PlayPage;
