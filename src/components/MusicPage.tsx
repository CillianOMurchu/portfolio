import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SpotifyLoginButton } from "./Spotify";
import { Status } from "./Status";

export const MusicPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showOrb, setShowOrb] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = () => {
      const token = localStorage.getItem("spotify_access_token");
      const wasLoggedIn = isLoggedIn;
      const nowLoggedIn = !!token;

      setIsLoggedIn(nowLoggedIn);

      // If user just logged in, trigger orb animation
      if (!wasLoggedIn && nowLoggedIn) {
        setTimeout(() => {
          setShowOrb(true);
          setTimeout(() => {
            setShowStatus(true);
            setShowOrb(false);
          }, 1500);
        }, 500);
      }
    };

    checkLoginStatus();

    // Listen for storage changes (when login completes)
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    // Also check periodically in case login happens in same tab
    const interval = setInterval(checkLoginStatus, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950 to-slate-950 p-8 relative overflow-hidden">
      {/* Status component in top right */}
      <div className="text-right top-6 right-6 z-20 pb-4">
        {/* {showStatus && ( */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Status isActive={false} animateToActive={showOrb} />
        </motion.div>
        {/* )} */}
      </div>

      {/* Animated green orb */}
      {showOrb && (
        <motion.div
          className="absolute w-4 h-4 bg-green-400 rounded-full shadow-lg z-20"
          initial={{
            x: window.innerWidth / 2 - 100, // Start from center-left (simulating the "O" position)
            y: window.innerHeight / 2,
            scale: 1,
          }}
          animate={{
            x: window.innerWidth - 120, // Move to top-right status position
            y: 20,
            scale: [1, 1.2, 0.8, 0],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            scale: {
              times: [0, 0.3, 0.7, 1],
              duration: 1.5,
            },
          }}
          style={{
            boxShadow: "0 0 20px rgba(34, 197, 94, 0.8)",
          }}
        />
      )}

      <div className="flex items-center justify-center min-h-full">
        <div className="bg-black/80 backdrop-blur-sm rounded-xl p-8 text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6">Music</h1>
          <p className="text-emerald-200/80 text-sm mb-6">
            {isLoggedIn
              ? "Successfully connected to Spotify!"
              : "Connect your Spotify account to access your music"}
          </p>
          {!isLoggedIn && <SpotifyLoginButton />}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
