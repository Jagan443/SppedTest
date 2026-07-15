# Self-hosted Speed Test Server

Run your own server to avoid third-party dependencies.

## Quick start

```bash
node server/server.js
```

Server runs on `http://localhost:3001` with these endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/download` | GET | Serves 100MB test file |
| `/upload` | POST | Echo endpoint (discards data) |
| `/ping` | GET | Health check |

## Update the frontend

Edit `src/utils/speedTest.ts` and replace the URLs at the top:

```ts
const DOWNLOAD_URL = "https://your-server.com/download";
const UPLOAD_URL = "https://your-server.com/upload";
const PING_URLS = ["https://your-server.com/ping"];
```

## Deploy for free

### Vercel (recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Deploy - the React app goes live at `your-project.vercel.app`

For the server, deploy separately on [Railway](https://railway.app) or [Render](https://render.com) (both have free tiers).

### Cloudflare Workers (serverless)

Create `wrangler.toml`:

```toml
name = "speedtest-server"
main = "server/worker.js"
compatibility_date = "2024-01-01"
```

Then deploy:

```bash
npm install -g wrangler
wrangler deploy
```

### Docker

```bash
docker run -p 3001:3001 node server/server.js
```

## Why self-host?

- No reliance on third-party CORS policies
- Full control over test file sizes
- No rate limits
- Measure speed to YOUR server (most realistic)
