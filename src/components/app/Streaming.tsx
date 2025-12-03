import { useEffect, useState } from "react";

// --- Configuration ---
const TWITCH_CHANNEL_NAME = "ichilliano";
const ALLOWED_PARENTS = ["localhost", "cillianomurchu.vercel.app", "www.cillianmurchu.com", "cillianmurchu.com"];
const PLAYER_EMBED_ID = 'twitch-player-embed'; // ID for the container div

// Ensure the Twitch embed script is loaded globally
function loadTwitchEmbedScript() {
    if (document.getElementById('twitch-embed-script')) {
        return Promise.resolve();
    }
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.setAttribute('src', 'https://embed.twitch.tv/embed/v1.js');
        script.setAttribute('id', 'twitch-embed-script');
        script.onload = resolve;
        document.head.appendChild(script);
    });
}

const Streaming = () => {
    const [isLive, setIsLive] = useState(false);
    
    useEffect(() => {
        let playerInstance;

        loadTwitchEmbedScript().then(() => {
            // Script is loaded, Twitch object is available
            if (typeof window.Twitch !== 'undefined') {
                initializePlayer();
            }
        });

        function initializePlayer() {
             // 1. Initialize the Twitch Player, targeting the div ID
            // The Twitch object is expected to be on the window after the script loads
            playerInstance = new window.Twitch.Player(PLAYER_EMBED_ID, {
                width: '100%',
                height: '100%',
                channel: TWITCH_CHANNEL_NAME,
                // Pass allowed domains as an array
                parent: ALLOWED_PARENTS, 
                autoplay: true, 
                muted: true 
            });

            // 2. Attach event listeners directly to the player instance
            playerInstance.addEventListener(window.Twitch.Player.ONLINE, () => {
                console.log(`${TWITCH_CHANNEL_NAME} is LIVE.`);
                setIsLive(true);
            });

            playerInstance.addEventListener(window.Twitch.Player.OFFLINE, () => {
                console.log(`${TWITCH_CHANNEL_NAME} is OFFLINE.`);
                setIsLive(false);
            });
        }

        // Cleanup: Important to destroy the player instance if needed
        return () => {
             // Future cleanup: playerInstance.destroy();
        };
    }, []);

    // 🔴 The Twitch Player API will manage the iframe inside this div
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 pt-20 pb-16 relative">
            
            {/* 🔴 LIVE INDICATOR */}
            <div className="absolute top-20 right-4 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full animate-pulse ${isLive ? 'bg-emerald-400 shadow-lg shadow-emerald-400/60' : 'bg-red-400 shadow-lg shadow-red-400/40'}`} />
                <span className={`text-sm font-semibold ${isLive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isLive ? "LIVE" : "OFFLINE"}
                </span>
            </div>
            
            {/* 📺 VIDEO PLAYER CONTAINER - The target for the Twitch Player API */}
            <div 
                id="twitch-player-embed" 
                className="w-full max-w-7xl aspect-video"
                style={{
                    borderRadius: "8px",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                }}
            />
        </div>
    );
};

export default Streaming; 