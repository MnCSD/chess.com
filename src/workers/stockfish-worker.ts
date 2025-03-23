export async function createStockfishWorker(): Promise<Worker> {
  const response = await fetch("/stockfish.js"); // Fetch the Stockfish script
  const stockfishScript = await response.text(); // Get script content

  const workerScript = `
      ${stockfishScript} // Load Stockfish dynamically
  
      self.onmessage = function(event) {
        postMessage("Worker received: " + event.data);
        self.postMessage(event.data);
      };
    `;

  const blob = new Blob([workerScript], { type: "application/javascript" });
  const workerURL = URL.createObjectURL(blob);
  return new Worker(workerURL);
}
