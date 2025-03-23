"use client";

import { useMemo, useState, useRef, useEffect, JSX } from "react";
import { Chess } from "chess.js";
import { pieces } from "@/constants";
import { Chessboard } from "react-chessboard";
import Engine from "@/lib/engine";

interface ChessBoardProps {
  type: "view" | "play";
}

export const ChessBoard = ({ type }: ChessBoardProps) => {
  const [stockfishReady, setStockfishReady] = useState(false);
  const engine = useMemo(() => new Engine(), []);
  const [game, setGame] = useState(new Chess());
  const [gamePosition, setGamePosition] = useState(game.fen());
  const [stockfishLevel, setStockfishLevel] = useState(10);

  const [isEngineReady, setIsEngineReady] = useState(false); // Track the engine readiness

  function findBestMove() {
    engine.evaluatePosition(game.fen(), stockfishLevel);
    engine.onMessage(({ bestMove }) => {
      if (bestMove) {
        // In latest chess.js versions you can just write ```game.move(bestMove)```
        game.move({
          from: bestMove.substring(0, 2),
          to: bestMove.substring(2, 4),
          promotion: bestMove.substring(4, 5),
        });
        setGamePosition(game.fen());
      }
    });
  }
  function onDrop(sourceSquare: string, targetSquare: string, piece: string) {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q",
    });
    setGamePosition(game.fen());

    // illegal move
    if (move === null) return false;

    // exit if the game is over
    if (game.isGameOver()) {
      console.log("Game Over");
    }
    findBestMove();
    console.log("Game Position Ongoing");
    return true;
  }

  const customPieces = useMemo(() => {
    const pieceComponents: {
      [key: string]: ({ squareWidth }: { squareWidth: number }) => JSX.Element;
    } = {};
    pieces.forEach((piece) => {
      pieceComponents[piece] = ({ squareWidth }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: `url(/${piece}.png)`,
            backgroundSize: "100%",
          }}
        />
      );
    });
    return pieceComponents;
  }, []);

  useEffect(() => {
    engine.onReady(() => {
      console.log("Stockfish is ready");
      setIsEngineReady(true); // Set the engine to ready when it signals ready
    });

    return () => {
      engine.terminate();
    };
  }, [engine]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      {type === "view" ? (
        <Chessboard
          id="StyledBoard"
          boardOrientation="white"
          customDarkSquareStyle={{
            backgroundColor: "#779952",
          }}
          customLightSquareStyle={{
            backgroundColor: "#edeed1",
          }}
          customPieces={customPieces}
          isDraggablePiece={() => false}
        />
      ) : (
        <Chessboard
          id="PlayVsStockfish"
          boardOrientation="white"
          customNotationStyle={{
            fontSize: "22px",
            fontWeight: "600",
          }}
          position={gamePosition}
          onPieceDrop={onDrop}
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
          }}
          isDraggablePiece={(piece) => {
            return (
              game.turn() === "w" &&
              piece.piece[0] === game.turn() &&
              isEngineReady
            );
          }}
          customDarkSquareStyle={{
            backgroundColor: "#779952",
          }}
          customLightSquareStyle={{
            backgroundColor: "#edeed1",
          }}
          customPieces={customPieces}
        />
      )}
    </div>
  );
};
