
// Supabase Edge Function: Spotify Token Exchange
// Exchanges authorization code for Spotify access token securely using client secret
// Usage: POST with { code, redirect_uri }

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore: Deno namespace is available in Supabase Edge Functions runtime
declare const Deno: any;

type TokenRequest = {
  code: string;
  redirect_uri: string;
};

serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let body: TokenRequest;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { code, redirect_uri } = body;
  if (!code || !redirect_uri) {
    return new Response("Missing code or redirect_uri", { status: 400 });
  }

  const client_id = Deno.env.get("SPOTIFY_CLIENT_ID");
  const client_secret = Deno.env.get("SPOTIFY_CLIENT_SECRET");
  if (!client_id || !client_secret) {
    return new Response("Missing Spotify credentials", { status: 500 });
  }

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri,
    client_id,
    client_secret,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const data = await res.json();
  if (!res.ok) {
    return new Response(JSON.stringify(data), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
