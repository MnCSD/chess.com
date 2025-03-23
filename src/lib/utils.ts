import { chessPieces, initialBoardState } from "@/constants";
import { BoardState, ChessPiece, Position } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { isEqual } from "lodash";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const isValidPawnMove = (
  color: ChessPiece["color"],
  currentPosition: Position,
  nextPosition: Position,
  boardState: BoardState
) => {};

export const isValidMove = (
  type: ChessPiece["type"],
  color: ChessPiece["color"],
  currentPosition: Position,
  nextPosition: Position,
  boardState: BoardState
) => {
  switch (type) {
    case "pawn": {
      console.log(
        isValidPawnMove(color, currentPosition, nextPosition, boardState)
      );
      return isValidPawnMove(color, currentPosition, nextPosition, boardState);
    }
    default:
      return true;
  }
};
