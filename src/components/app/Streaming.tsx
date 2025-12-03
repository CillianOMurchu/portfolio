import { useEffect } from "react";

// --- Configuration ---
const TWITCH_CHANNEL_NAME = "ichilliano"; // The Twitch channel name you want to stream
const ALLOWED_PARENTS = ["localhost", "cillianomurchu.vercel.app"]; 
// IMPORTANT: These must be your exact domains (excluding https:// or www)

const Streaming = () => {
  useEffect(() => {
    // This loads the Twitch embed script for the SDK, 
    // but we'll use the simpler iframe method below since it's cleaner in React.
    // If you plan to use the full SDK (e.g., for events/API), keep this useEffect.
    // If you only use the iframe, you can remove this useEffect block entirely.
    const script = document.createElement("script");
    script.src = "https://embed.twitch.tv/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Format the parent domains list for the URL
  // Example: parent=localhost&parent=cillianomurchu.vercel.app
  const parentParams = ALLOWED_PARENTS.map(domain => `parent=${domain}`).join('&');

  // 1. Twitch Player URL (for the main video stream)
  const playerUrl = `https://player.twitch.tv/?channel=${TWITCH_CHANNEL_NAME}&${parentParams}&autoplay=true`;

  // 2. Twitch Chat URL (optional, if you want the chat next to the player)
  const chatUrl = `https://www.twitch.tv/embed/${TWITCH_CHANNEL_NAME}/chat?${parentParams}`;


  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row items-center justify-center px-4 pt-20 pb-16 lg:space-x-4">
      
      {/* 📺 VIDEO PLAYER (Main Component) */}
      <div className="w-full max-w-7xl lg:w-3/4 aspect-video mb-4 lg:mb-0">
        <iframe
          src={playerUrl} // Use the correct player URL here
          height="100%"
          width="100%"
          allowFullScreen={true}
          style={{
            borderRadius: "8px",
            border: "1px solid rgba(16, 185, 129, 0.3)",
          }}
          title={`${TWITCH_CHANNEL_NAME} Live Stream`}
        />
      </div>
      
     
    </div>
  );
};

export default Streaming;