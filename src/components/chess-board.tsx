"use client";

import React, { useRef, useState, useCallback } from "react";
import Coordinates from "./coordinates";
import { chessPieces } from "@/constants";

interface ChessBoardProps {
  type: "view" | "play";
}

export const ChessBoard = ({ type }: ChessBoardProps) => {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const pieceRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [draggingPiece, setDraggingPiece] = useState<string | null>(null);
  const [positions, setPositions] = useState(
    chessPieces.reduce(
      (acc, piece) => ({
        ...acc,
        [piece.id]: { x: piece.initialX, y: piece.initialY },
      }),
      {} as { [key: string]: { x: number; y: number } }
    )
  );
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [hoveredTile, setHoveredTile] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const boardSize = 850;
  const squareSize = 101;

  const handleMouseDown = useCallback(
    (id: string) => (e: React.MouseEvent) => {
      if (boardRef.current) {
        const boardRect = boardRef.current.getBoundingClientRect();
        const offsetX = e.clientX - boardRect.left - positions[id].x;
        const offsetY = e.clientY - boardRect.top - positions[id].y;
        setOffset({ x: offsetX, y: offsetY });
        setDraggingPiece(id);
      }
    },
    [positions]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!draggingPiece || !boardRef.current) return;

      const boardRect = boardRef.current.getBoundingClientRect();
      const relativeX = e.clientX - boardRect.left;
      const relativeY = e.clientY - boardRect.top;

      // Calculate new position
      let newX = relativeX - offset.x;
      let newY = relativeY - offset.y;

      // Boundary checks
      newX = Math.max(0, Math.min(boardSize - squareSize, newX));
      newY = Math.max(0, Math.min(boardSize - squareSize, newY));

      // Calculate tile position only when needed
      const col = Math.floor(relativeX / squareSize);
      const row = Math.floor(relativeY / squareSize);

      // Update positions and hoveredTile in a single render
      requestAnimationFrame(() => {
        setPositions((prev) => ({
          ...prev,
          [draggingPiece]: { x: newX, y: newY },
        }));

        if (col >= 0 && col < 8 && row >= 0 && row < 8) {
          setHoveredTile({ row, col });
        } else {
          setHoveredTile(null);
        }
      });
    },
    [draggingPiece, offset.x, offset.y, boardSize, squareSize]
  );

  const handleMouseUp = useCallback(() => {
    if (draggingPiece && hoveredTile) {
      const snappedX = hoveredTile.col * 100;
      const snappedY = hoveredTile.row * 100;

      setPositions((prev) => ({
        ...prev,
        [draggingPiece]: { x: snappedX, y: snappedY },
      }));
    }
    setDraggingPiece(null);
    setHoveredTile(null);
  }, [draggingPiece, hoveredTile]);

  return (
    <div
      className="flex justify-center items-center w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        ref={boardRef}
        className="w-full max-w-[850px] aspect-square rounded-[3px] relative"
        style={{
          backgroundImage: "url('/main_board.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Coordinates />

        {/* Render Chessboard Tiles with Highlight */}
        {[...Array(8)].map((_, row) =>
          [...Array(8)].map((_, col) => (
            <div
              key={`${row}-${col}`}
              className={`tile absolute ${
                hoveredTile?.row === row && hoveredTile?.col === col
                  ? "border-5 border-white/30"
                  : ""
              }`}
              style={{
                width: `${squareSize}px`,
                height: `${squareSize}px`,
                transform: `translate(${col * 100}%, ${row * 100}%)`,
                boxSizing: "border-box",
              }}
            />
          ))
        )}

        {/* Render Chess Pieces */}
        {chessPieces.map((piece) => (
          <div
            key={piece.id}
            ref={(el) => {
              pieceRefs.current[piece.id] = el;
            }}
            className="piece absolute w-[60px] h-[60px] bg-no-repeat bg-contain cursor-grab"
            style={{
              backgroundImage: `url('${piece.image}')`,
              transform: `translate(${positions[piece.id].x}%, ${
                positions[piece.id].y
              }%)`,
              position: "absolute",
            }}
            onMouseDown={handleMouseDown(piece.id.toString())}
          ></div>
        ))}
      </div>
    </div>
  );
};
