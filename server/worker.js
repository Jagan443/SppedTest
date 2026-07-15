// Cloudflare Worker - deploy with `wrangler deploy`
// Free tier: 100K requests/day

const TEST_SIZE = 100 * 1024 * 1024; // 100MB

export default {
  async fetch(request) {
    const url = new URL(request.url);

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (url.pathname === "/download") {
      const data = crypto.getRandomBytes(TEST_SIZE);
      return new Response(data, {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/octet-stream",
          "Content-Length": TEST_SIZE,
        },
      });
    }

    if (url.pathname === "/upload" && request.method === "POST") {
      const body = await request.arrayBuffer();
      return new Response(JSON.stringify({ bytes: body.byteLength }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (url.pathname === "/ping") {
      return new Response(JSON.stringify({ t: Date.now() }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};
