
const spotifyTracks = [
  {
    title: "Spotify Track Example",
    url: "https://open.spotify.com/track/4oVO4fGNRRvEn0CRuFO4qv?si=76ae92f80bc24d2f",
    embed: "https://open.spotify.com/embed/track/4oVO4fGNRRvEn0CRuFO4qv?utm_source=generator"
  },
  // Add more tracks here as needed
];

import React, { useEffect, useState } from "react";

const SUPABASE_FUNCTION_URL = "https://<your-project-ref>.functions.supabase.co/spotify-token-exchange";
const CLIENT_ID = "<your-client-id>";
const REDIRECT_URI = window.location.origin + "/music";
const SCOPES = ["user-library-read"];

const loginUrl =
  "https://accounts.spotify.com/authorize" +
  `?client_id=${CLIENT_ID}` +
  "&response_type=code" +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&scope=${encodeURIComponent(SCOPES.join(" "))}`;

const MusicPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Step 1: Handle Spotify OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code && !token) {
      setLoading(true);
      fetch(SUPABASE_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, redirect_uri: REDIRECT_URI }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            setToken(data.access_token);
            localStorage.setItem("spotify_token", data.access_token);
            window.history.replaceState({}, document.title, REDIRECT_URI); // Clean up URL
          }
        })
        .finally(() => setLoading(false));
    } else {
      const stored = localStorage.getItem("spotify_token");
      if (stored) setToken(stored);
    }
  }, [token]);

  // Step 2: Fetch liked songs
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch("https://api.spotify.com/v1/me/tracks?limit=50", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTracks(data.items || []))
      .finally(() => setLoading(false));
  }, [token]);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-green-300 mb-8">Login to view your Liked Songs</h1>
        <a href={loginUrl}>
          <button className="px-4 py-2 bg-green-500 text-white rounded-xl shadow-green-500/40 shadow-lg border-2 border-green-400 hover:bg-green-600 transition">Login with Spotify</button>
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-slate-950 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold mb-8 text-green-300 border-b-4 border-green-500 pb-2 w-full text-center shadow-green-500/40 shadow">Your Liked Songs</h2>
      {loading ? (
        <div className="text-green-200">Loading...</div>
      ) : (
        <ul className="w-full max-w-2xl flex flex-col gap-8 items-center">
          {tracks.map(({ track }) => (
            <li
              key={track.id}
              className="w-full bg-green-950/80 border-4 border-green-500 rounded-xl shadow-lg shadow-green-700/40 p-4 flex items-center gap-4 hover:shadow-green-400/60 transition-all duration-300"
              style={{ boxShadow: "0 0 32px #22c55e, 0 0 8px #166534 inset" }}
            >
              <img
                src={track.album.images[2]?.url || track.album.images[0]?.url}
                alt="cover"
                className="w-16 h-16 rounded-lg border-2 border-green-400 shadow-green-400/30 shadow"
              />
              <div className="flex-1">
                <div className="font-semibold text-green-200 text-lg">{track.name}</div>
                <div className="text-sm text-green-400">{track.artists[0].name}</div>
                <a
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-green-300 font-semibold underline hover:text-green-400 transition block"
                >
                  Listen on Spotify
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MusicPage;
