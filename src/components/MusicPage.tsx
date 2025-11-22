import React, { useEffect } from "react";

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_EDGE_FUNCTION_URL + "/spotify-token-exchange";
const REDIRECT_URI = window.location.origin + "/music";

const MusicPage: React.FC = () => {
  useEffect(() => {
    async function getTokenAndFetchTracks() {
      let token = localStorage.getItem("spotify_token");
      if (!token) {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (code) {
          const res = await fetch(SUPABASE_FUNCTION_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, redirect_uri: REDIRECT_URI }),
          });
          const data = await res.json();
          token = data.access_token;
          if (token) {
            localStorage.setItem("spotify_token", token);
            window.history.replaceState({}, document.title, REDIRECT_URI); // Clean up URL
          }
        }
      }
      if (!token) return;
      await fetch("https://api.spotify.com/v1/me/tracks?limit=50", {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    getTokenAndFetchTracks();
  }, []);
  return null;
};
