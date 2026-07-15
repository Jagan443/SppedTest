const http = require("http");
const crypto = require("crypto");

const PORT = process.env.PORT || 3001;

// Generate a 100MB buffer of random data at startup
const TEST_FILE = crypto.randomBytes(100 * 1024 * 1024);

const server = http.createServer((req, res) => {
  // CORS headers - allows browser requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Max-Age", "86400");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  // GET /download - serves the 100MB test file
  if (url.pathname === "/download" && req.method === "GET") {
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Length", TEST_FILE.length);
    res.writeHead(200);
    res.end(TEST_FILE);
    return;
  }

  // POST /upload - accepts any data (just discards it)
  if (url.pathname === "/upload" && req.method === "POST") {
    let bytes = 0;
    req.on("data", (chunk) => {
      bytes += chunk.length;
    });
    req.on("end", () => {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify({ bytes }));
    });
    return;
  }

  // GET /ping - simple health check
  if (url.pathname === "/ping") {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify({ t: Date.now() }));
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`Speed test server running on http://localhost:${PORT}`);
  console.log("Endpoints:");
  console.log(`  GET  /download  - 100MB test file`);
  console.log(`  POST /upload    - echo endpoint`);
  console.log(`  GET  /ping      - health check`);
});
