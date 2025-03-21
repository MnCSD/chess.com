export interface Position {
  row: number;
  col: number;
}

export interface ChessPiece {
  id: string;
  type: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
  color: "white" | "black";
  image: string;
  initialX: number;
  initialY: number;
}

export interface BoardState {
  [key: string]: {
    position: Position;
    isFirstMove: boolean;
  };
}
