import { useEffect, useState, useRef } from "react"; // 👈 Added useRef

// Extend Window type to include Twitch (Simplified for functional JavaScript/React setup)
// In a dedicated TypeScript file (.d.ts), you would use the detailed interface provided earlier.
declare global {
    interface Window {
        Twitch: any;
    }
}

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
    // 1. Use useRef to hold the Twitch Player instance
    const playerRef = useRef(null); 
    
    useEffect(() => {
        // 2. Load the script and initialize the player once
        loadTwitchEmbedScript().then(() => {
            if (window.Twitch) {
                initializePlayer();
            }
        });

        function initializePlayer() {
            // Prevent initialization if a player is already attached to this component
            if (playerRef.current) {
                return; 
            }
            
            // 3. Initialize the Twitch Player, targeting the div ID
            const playerInstance = new window.Twitch.Player(PLAYER_EMBED_ID, {
                width: '100%',
                height: '100%',
                channel: TWITCH_CHANNEL_NAME,
                parent: ALLOWED_PARENTS, 
                autoplay: true, 
                muted: true 
            });

            // 4. Store the instance in the ref
            playerRef.current = playerInstance; 
            
            // 5. Attach event listeners directly to the player instance
            playerInstance.addEventListener(window.Twitch.Player.ONLINE, () => {
                console.log(`${TWITCH_CHANNEL_NAME} is LIVE.`);
                setIsLive(true);
            });

            playerInstance.addEventListener(window.Twitch.Player.OFFLINE, () => {
                console.log(`${TWITCH_CHANNEL_NAME} is OFFLINE.`);
                setIsLive(false);
            });
        }

        // 6. Cleanup Function: CRITICAL for preventing memory leaks
        return () => {
            if (playerRef.current && typeof playerRef.current.destroy === 'function') {
                console.log('Destroying Twitch Player instance.');
                playerRef.current.destroy();
                playerRef.current = null; // Clear the ref
                // Clean up the DOM element content to be safe
                const embedDiv = document.getElementById(PLAYER_EMBED_ID);
                if (embedDiv) embedDiv.innerHTML = '';
            }
        };
    }, []); // Empty dependency array ensures run on mount, cleanup on unmount

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