import React, { useEffect, useState } from "react";

interface SpotifyTrack {
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
}

interface LatestFavouriteProps {
  token?: string | null;
}

const LatestFavourite: React.FC<LatestFavouriteProps> = ({ token }) => {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    async function fetchLatest() {
      try {
        const res = await fetch(
          "https://api.spotify.com/v1/me/tracks?limit=1",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch playlist data");
        const data = await res.json();
        setTrack(data.items?.[0]?.track || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    }

    fetchLatest();
  }, [token]);

  if (!token)
    return <div className="text-red-500">Missing Spotify token</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!track) return <div className="text-emerald-500/60">Loading...</div>;

  return (
    <div className="music-page bg-gradient-to-br from-slate-900 via-red-950 to-slate-950 min-h-screen flex items-center justify-center p-8">
      <div className="p-6 rounded-2xl shadow-lg bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/30 text-white w-full max-w-md">
        <h1 className="text-2xl font-bold text-emerald-400 mb-6 text-center">Latest Favourite Track</h1>
        <div className="flex items-center space-x-4">
          {track.album?.images?.[0]?.url && (
            <img
              src={track.album.images[0].url}
              alt={track.name}
              className="w-20 h-20 rounded-xl object-cover shadow-lg"
            />
          )}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-emerald-300 mb-1">{track.name}</h2>
            <p className="text-emerald-200/80 text-sm">
              {track.artists.map((a) => a.name).join(", ")}
            </p>
            {track.album?.name && (
              <p className="text-emerald-200/60 text-xs mt-1 italic">
                {track.album.name}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const MusicPage: React.FC = () => {
  // For now, we'll use a placeholder token or get it from context/auth
  // In a real implementation, you'd get this from your auth system
  const token = null; // TODO: Get actual Spotify token from auth context

  return <LatestFavourite token={token} />;
};

export default MusicPage;
