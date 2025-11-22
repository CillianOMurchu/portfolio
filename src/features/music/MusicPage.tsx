import React, { useEffect } from "react";

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_EDGE_FUNCTION_URL + "/spotify-token-exchange";

export default function MusicPage() {
  useEffect(() => {
    fetch(SUPABASE_FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}), // Add code/redirect_uri if needed
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          fetch("https://api.spotify.com/v1/me/tracks?limit=50", {
            headers: { Authorization: `Bearer ${data.access_token}` },
          });
        }
      });
  }, []);
  return null;
}
