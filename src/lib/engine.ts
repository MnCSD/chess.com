// Engine manages its own worker instance per Engine object.
// Avoid module-level singletons to prevent cross-instance interference.

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
  private stockfish: Worker | null = null;
  private isReady = false;
  private disposed = false;
  private onMessageCallback: ((messageData: EngineMessage) => void) | null = null;
  private readyResolvers: Array<() => void> = [];

  constructor() {
    if (typeof window !== "undefined") {
      // Create a fresh worker per instance from public/stockfish.js
      try {
        this.stockfish = new window.Worker("/stockfish.js");
      } catch (e) {
        console.warn("Failed to create Stockfish worker:", e);
        this.stockfish = null;
      }
      this.init();
    }
  }

  private async init() {
    // Ensure stockfish is available (in the browser environment)
    if (!this.stockfish) return;

    this.stockfish.addEventListener("message", (e) => {
      const parsedData = this.transformSFMessageData(e);
      this.onMessageCallback?.(parsedData);

      if (parsedData.uciMessage === "uciok" || parsedData.uciMessage === "readyok") {
        if (!this.isReady) {
          this.isReady = true;
          // resolve any waiters
          this.readyResolvers.splice(0).forEach((r) => r());
        }
      }
    });

    this.sendMessage("uci");
    this.sendMessage("isready");
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
    if (!this.stockfish) return;
    if (this.isReady) {
      callback();
      return;
    }
    this.readyResolvers.push(callback);
  }

  onMessage(callback: (messageData: EngineMessage) => void) {
    this.onMessageCallback = callback;
  }

  evaluatePosition(fen: string, depth = 12) {
    if (!this.stockfish) return;
    if (depth > 24) depth = 24;
    const run = () => {
      this.sendMessage(`position fen ${fen}`);
      this.sendMessage(`go depth ${depth}`);
    };
    if (this.isReady) run();
    else this.onReady(run);
  }

  stop() {
    if (this.stockfish) {
      this.sendMessage("stop");
    }
  }

  terminate() {
    if (!this.stockfish || this.disposed) return;
    this.isReady = false;
    this.disposed = true;
    // Try to quit cleanly; ignore errors from terminated workers
    try { this.sendMessage("quit"); } catch {}
    try { this.stockfish.terminate(); } catch {}
    this.stockfish = null;
  }

  private sendMessage(message: string) {
    if (!this.stockfish || this.disposed) {
      // avoid noisy warnings during dev remounts
      return;
    }
    this.stockfish.postMessage(message);
    console.log("Engine sent:", message);
  }
}
