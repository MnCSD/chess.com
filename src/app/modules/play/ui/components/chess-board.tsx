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

  // --- Edit mode state ---
  const [editMode, setEditMode] = useState(false);
  const [editorPosition, setEditorPosition] = useState<{
    [sq: string]: string;
  }>({});
  const [editorTurn, setEditorTurn] = useState<"w" | "b">("w");
  const [selectedPiece, setSelectedPiece] = useState<string | null>("wP");

  // Hint circles for legal pawn moves
  const [hintSquares, setHintSquares] = useState<
    Record<string, Record<string, string | number>>
  >({});

  // Helpers for FEN <-> position object
  const fenToPositionObj = (fen: string): { [sq: string]: string } => {
    // convert fen placement to position object (e.g. { a8: 'bR', ... })
    const COLUMNS = "abcdefgh".split("");
    const fenBoard = fen.split(" ")[0];
    const rows = fenBoard.split("/");
    const position: { [sq: string]: string } = {};
    let currentRow = 8;
    for (let i = 0; i < 8; i++) {
      const row = rows[i].split("");
      let colIdx = 0;
      for (let j = 0; j < row.length; j++) {
        const ch = row[j];
        if (/[1-8]/.test(ch)) {
          colIdx += parseInt(ch, 10);
        } else {
          const square = `${COLUMNS[colIdx]}${currentRow}`;
          const piece = ch;
          const code =
            piece === piece.toLowerCase()
              ? `b${piece.toUpperCase()}`
              : `w${piece}`;
          position[square] = code;
          colIdx += 1;
        }
      }
      currentRow -= 1;
    }
    return position;
  };

  const positionObjToFenBoard = (pos: { [sq: string]: string }): string => {
    const COLUMNS = "abcdefgh".split("");
    const toFenChar = (code: string) => {
      const color = code[0];
      const type = code[1];
      const map: Record<string, string> = {
        P: "p",
        N: "n",
        B: "b",
        R: "r",
        Q: "q",
        K: "k",
      };
      const p = map[type.toUpperCase()];
      return color === "w" ? p.toUpperCase() : p.toLowerCase();
    };
    const ranks: string[] = [];
    for (let r = 8; r >= 1; r--) {
      let empty = 0;
      let rankStr = "";
      for (let f = 0; f < 8; f++) {
        const sq = `${COLUMNS[f]}${r}`;
        const code = pos[sq];
        if (!code) {
          empty += 1;
        } else {
          if (empty > 0) {
            rankStr += String(empty);
            empty = 0;
          }
          rankStr += toFenChar(code);
        }
      }
      if (empty > 0) rankStr += String(empty);
      ranks.push(rankStr);
    }
    return ranks.join("/");
  };

  // initialize editor position from current game when toggling on
  const enableEditMode = () => {
    setEditorPosition(fenToPositionObj(game.fen()));
    setEditorTurn(game.turn());
    setEditMode(true);
  };
  const applyEditorPosition = () => {
    const board = positionObjToFenBoard(editorPosition);
    const fen = `${board} ${editorTurn} - - 0 1`;
    const newGame = new Chess(fen);
    setGame(newGame);
    setGamePosition(newGame.fen());
    setEditMode(false);
    // If engine to move first (black), trigger immediate reply
    if (editorTurn === "b") {
      findBestMove();
    }
  };
  const clearEditorPosition = () => setEditorPosition({});
  const resetEditorToStart = () => {
    const start = new Chess();
    setEditorPosition(fenToPositionObj(start.fen()));
    setEditorTurn("w");
  };

  function findBestMove() {
    // Ask the engine for the best move from the current FEN
    engine.evaluatePosition(game.fen(), stockfishLevel);
    engine.onMessage(({ bestMove }) => {
      if (!bestMove) return;

      // Parse UCI move like "e2e4" or promotion like "e7e8q"
      const from = bestMove.substring(0, 2);
      const to = bestMove.substring(2, 4);
      const promo =
        bestMove.length === 5
          ? (bestMove[4] as "q" | "r" | "b" | "n")
          : undefined;

      const engineMove = game.move(
        promo ? { from, to, promotion: promo } : { from, to }
      );

      if (engineMove) {
        setGamePosition(game.fen());
      }
    });
  }

  function onDrop(sourceSquare: string, targetSquare: string, piece: string) {
    // Only include a promotion when moving a pawn to the last rank
    const isPawn = piece[1] === "P";
    const targetRank = targetSquare[1];
    const isWhite = piece[0] === "w";
    const isPromotion =
      isPawn &&
      ((isWhite && targetRank === "8") || (!isWhite && targetRank === "1"));

    const move = game.move(
      isPromotion
        ? { from: sourceSquare, to: targetSquare, promotion: "q" } // auto-queen for now
        : { from: sourceSquare, to: targetSquare }
    );

    // illegal move → reject drop (piece snaps back)
    if (move === null) return false;

    setGamePosition(game.fen());

    // exit if the game is over
    if (game.isGameOver()) {
      console.log("Game Over");
      return true;
    }

    // trigger engine reply
    findBestMove();
    return true;
  }

  // --- Edit mode handlers ---
  function onEditorDrop(
    sourceSquare: string,
    targetSquare: string,
    piece: string
  ) {
    // Free move: move/capture regardless of legality
    setEditorPosition((prev) => {
      const next = { ...prev } as { [sq: string]: string };
      // If dragging a spare piece, library provides onSparePieceDrop instead, so here it's board piece
      const movingPiece = next[sourceSquare];
      if (!movingPiece) return next; // nothing to move
      next[targetSquare] = movingPiece;
      delete next[sourceSquare];
      return next;
    });
    return true;
  }

  function onEditorSparePieceDrop(piece: string, targetSquare: string) {
    // Add a new piece from palette to the board
    setEditorPosition((prev) => ({ ...prev, [targetSquare]: piece }));
    return true;
  }

  function onEditorSquareClick(square: string) {
    if (!editMode) return;
    setEditorPosition((prev) => {
      const next = { ...prev } as { [sq: string]: string };
      if (selectedPiece) {
        next[square] = selectedPiece;
      } else {
        delete next[square];
      }
      return next;
    });
  }

  function onEditorSquareRightClick(square: string) {
    if (!editMode) return;
    setEditorPosition((prev) => {
      const next = { ...prev } as { [sq: string]: string };
      delete next[square];
      return next;
    });
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
            backgroundImage: `url(/${piece.toLowerCase()}.png)`,
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
    <div className="flex flex-col items-center w-full h-full gap-3">
      {type === "view" ? (
        <Chessboard
          id="StyledBoard"
          boardOrientation="white"
          customDarkSquareStyle={{ backgroundColor: "#779952" }}
          customLightSquareStyle={{ backgroundColor: "#edeed1" }}
          customPieces={customPieces}
          isDraggablePiece={() => false}
        />
      ) : (
        <>
          <Chessboard
            id="PlayVsStockfish"
            boardOrientation="white"
            customNotationStyle={{ fontSize: "22px", fontWeight: "600" }}
            position={editMode ? (editorPosition as any) : gamePosition}
            onPieceDrop={editMode ? onEditorDrop : onDrop}
            onSparePieceDrop={editMode ? onEditorSparePieceDrop : undefined}
            onSquareClick={editMode ? onEditorSquareClick : undefined}
            onSquareRightClick={editMode ? onEditorSquareRightClick : undefined}
            arePiecesDraggable={true}
            allowDragOutsideBoard={true}
            snapToCursor={true}
            // Show move hints for the dragged piece (all types)
            onPieceDragBegin={
              editMode
                ? undefined
                : (piece, sourceSquare) => {
                    try {
                      const moves = game.moves({
                        square: sourceSquare as any,
                        verbose: true,
                      }) as any[];
                      const styles: Record<string, Record<string, string | number>> = {};

                      const dotBg =
                        "radial-gradient(circle, rgba(0,0,0,0.45) 22%, rgba(0,0,0,0) 24%)";
                      const ringBg =
                        "radial-gradient(circle, rgba(0,0,0,0) 56%, rgba(0,0,0,0.18) 57%, rgba(0,0,0,0.18) 72%, rgba(0,0,0,0) 73%)";

                      moves.forEach((m) => {
                        const isCapture = typeof m.flags === 'string' && m.flags.includes('c');
                        const isEP = typeof m.flags === 'string' && m.flags.includes('e');
                        const capturedPawn = (m as any).captured === 'p' || isEP;

                        if (capturedPawn) {
                          // For normal capture, ring on the target square (where pawn is)
                          // For en passant, ring on the actual captured pawn square (adjacent rank)
                          if (isEP) {
                            const file = m.to[0];
                            const rank = parseInt(m.to[1], 10);
                            const pawnSquare = `${file}${(m.color === 'w' ? rank - 1 : rank + 1)}`;
                            styles[pawnSquare] = { background: ringBg };
                          } else {
                            styles[m.to] = { background: ringBg };
                          }
                        } else {
                          // Quiet moves and captures of non-pawns: show dot on destination
                          styles[m.to] = { background: dotBg };
                        }
                      });
                      setHintSquares(styles);
                    } catch {
                      setHintSquares({});
                    }
                  }
            }
            onPieceDragEnd={editMode ? undefined : () => setHintSquares({})}
            customSquareStyles={editMode ? undefined : hintSquares}
            customBoardStyle={{
              borderRadius: "4px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
            isDraggablePiece={({ piece }) => {
              if (editMode) return true;
              // Allow dragging for the side to move; engine will respond when ready
              return piece[0] === game.turn();
            }}
            autoPromoteToQueen={!editMode}
            customDarkSquareStyle={{ backgroundColor: "#779952" }}
            customLightSquareStyle={{ backgroundColor: "#edeed1" }}
            customPieces={customPieces}
          />
          {editMode && (
            <div className="flex flex-wrap gap-2 items-center justify-center">
              {pieces.map((p) => (
                <button
                  key={p}
                  className={`w-10 h-10 bg-center bg-contain bg-no-repeat border ${
                    selectedPiece === p
                      ? "border-emerald-500"
                      : "border-transparent"
                  }`}
                  style={{ backgroundImage: `url(/${p.toLowerCase()}.png)` }}
                  onClick={() => setSelectedPiece(p)}
                  title={p}
                />
              ))}
              <button
                className={`px-2 py-1 rounded text-sm border ${
                  selectedPiece === null
                    ? "border-emerald-500"
                    : "border-slate-300"
                }`}
                onClick={() => setSelectedPiece(null)}
              >
                Erase
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
