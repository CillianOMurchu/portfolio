import React from "react";
import { SpotifyLoginButton } from "./Spotify";

export const MusicPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950 to-slate-950 flex items-center justify-center p-8">
      <div className="bg-black/80 backdrop-blur-sm rounded-xl p-8 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-6">Music</h1>
        <p className="text-emerald-200/80 text-sm mb-6">
          Connect your Spotify account to access your music
        </p>
        <SpotifyLoginButton />
      </div>
    </div>
  );
};

export default MusicPage;