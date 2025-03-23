// stockfish.js worker script initialization
let stockfish: Worker | null = null;

if (typeof window !== "undefined") {
  // Ensure that we're in the browser environment
  stockfish = new window.Worker("/stockfish.js");
}

type EngineMessage = {
  uciMessage: string;
  bestMove?: string;
  ponder?: string;
  positionEvaluation?: string;
  possibleMate?: string;
  pv?: string;
  depth?: number;
};

export default class Engine {
  private stockfish: Worker | null = stockfish;
  private isReady = false;
  private onMessageCallback: ((messageData: EngineMessage) => void) | null =
    null;

  constructor() {
    if (this.stockfish) {
      this.init();
    }
  }

  private async init() {
    // Ensure stockfish is available (in the browser environment)
    if (this.stockfish) {
      this.stockfish.addEventListener("message", (e) => {
        const parsedData = this.transformSFMessageData(e);
        this.onMessageCallback?.(parsedData);

        if (parsedData.uciMessage === "readyok") {
          this.isReady = true;
        }
      });

      this.sendMessage("uci");
      this.sendMessage("isready");
    }
  }

  private transformSFMessageData(e: MessageEvent): EngineMessage {
    const uciMessage = e?.data ?? e;
    return {
      uciMessage,
      bestMove: uciMessage.match(/bestmove\s+(\S+)/)?.[1],
      ponder: uciMessage.match(/ponder\s+(\S+)/)?.[1],
      positionEvaluation: uciMessage.match(/cp\s+(\S+)/)?.[1],
      possibleMate: uciMessage.match(/mate\s+(\S+)/)?.[1],
      pv: uciMessage.match(/ pv\s+(.*)/)?.[1],
      depth: Number(uciMessage.match(/ depth\s+(\S+)/)?.[1]) || 0,
    };
  }

  onReady(callback: () => void) {
    if (this.stockfish) {
      this.onMessage(({ uciMessage }) => {
        if (uciMessage === "readyok") {
          callback();
        }
      });
    }
  }

  onMessage(callback: (messageData: EngineMessage) => void) {
    this.onMessageCallback = callback;
  }

  evaluatePosition(fen: string, depth = 12) {
    if (this.stockfish) {
      if (depth > 24) depth = 24;
      this.sendMessage(`position fen ${fen}`);
      this.sendMessage(`go depth ${depth}`);
    }
  }

  stop() {
    if (this.stockfish) {
      this.sendMessage("stop");
    }
  }

  terminate() {
    if (this.stockfish) {
      this.isReady = false;
      this.sendMessage("quit");
      this.stockfish.terminate();
      this.stockfish = null;
    }
  }

  private sendMessage(message: string) {
    if (this.stockfish) {
      this.stockfish.postMessage(message);
      console.log("Engine sent:", message);
    } else {
      console.warn("Stockfish worker is not initialized.");
    }
  }
}
