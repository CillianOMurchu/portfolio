import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SpotifyLoginButton } from "./Spotify";
import { Status } from "./Status";

export const MusicPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showOrb, setShowOrb] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [orbStart, setOrbStart] = useState<{ x: number; y: number } | null>(null);
  const [orbEnd, setOrbEnd] = useState<{ x: number; y: number } | null>(null);
  const oRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Check login status and update UI
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("spotify_access_token");
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
    const handleStorageChange = () => checkLoginStatus();
    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(checkLoginStatus, 1000);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Handle Spotify OAuth code in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code && !localStorage.getItem("spotify_access_token")) {
      const fetchToken = async () => {
        try {
          const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "authorization_code",
              code,
              redirect_uri: import.meta.env.VITE_SPOTIFY_CLIENT_REDIRECT_URI,
              client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
              client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
            }),
          });
          if (!response.ok) throw new Error("Failed to exchange code for token");
          const data = await response.json();
          localStorage.setItem("spotify_access_token", data.access_token);
          if (data.refresh_token) localStorage.setItem("spotify_refresh_token", data.refresh_token);
          if (data.expires_in) localStorage.setItem("spotify_token_expires", (Date.now() + data.expires_in * 1000).toString());
          // Remove code from URL
          window.history.replaceState({}, document.title, window.location.pathname);
          setIsLoggedIn(true);
          setLoginClicked(true); // trigger orb animation
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("Spotify OAuth error:", err);
        }
      };
      fetchToken();
    }
  }, []);

  // Animate orb from O to status after login
  useEffect(() => {
    if (loginClicked && isLoggedIn) {
      setTimeout(() => {
        const oEl = oRef.current;
        const statusEl = statusRef.current;
        if (oEl && statusEl) {
          const oRect = oEl.getBoundingClientRect();
          const statusRect = statusEl.getBoundingClientRect();
          const start = {
            x: oRect.left + oRect.width / 2,
            y: oRect.top + oRect.height / 2,
          };
          const end = {
            x: statusRect.left + statusRect.width / 2,
            y: statusRect.top + statusRect.height / 2,
          };
          setOrbStart(start);
          setOrbEnd(end);
          setShowOrb(true);
          setTimeout(() => {
            setShowStatus(true);
            setShowOrb(false);
          }, 1500);
        }
      }, 300);
    }
  }, [loginClicked, isLoggedIn]);

  const handleLogin = () => {
    setLoginClicked(true);
    // Let the SpotifyLoginButton do its redirect
  };

  const handleLogout = () => {
    localStorage.removeItem("spotify_access_token");
    localStorage.removeItem("spotify_refresh_token");
    localStorage.removeItem("spotify_token_expires");
    setIsLoggedIn(false);
    setShowStatus(false); // status orb goes inactive
    setLoginClicked(false);
    setOrbStart(null);
    setOrbEnd(null);
    // Force Status rerender by toggling showStatus
    // setTimeout(() => setShowStatus(true), 10);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950 to-slate-950 p-8 relative overflow-hidden">
      {/* Top bar: logout left, status right */}
      <div className="flex flex-row items-center justify-between w-full absolute left-0 right-0 top-0 pb-8 z-30">
        <div>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-red-700 hover:bg-red-800 text-white font-semibold px-4 py-2 rounded shadow transition"
            >
              Logout
            </button>
          )}
        </div>
  <div ref={statusRef}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Status isActive={isLoggedIn && showStatus} animateToActive={showOrb} />
          </motion.div>
        </div>
      </div>

      {/* Animated green orb flying from O to status */}
      {showOrb && orbStart && orbEnd && (
        <motion.div
          className="fixed w-4 h-4 bg-green-400 rounded-full shadow-lg z-50 pointer-events-none"
          initial={{
            x: orbStart.x - 8,
            y: orbStart.y - 8,
            scale: 1,
          }}
          animate={{
            x: orbEnd.x - 8,
            y: orbEnd.y - 8,
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
          <h1 className="text-2xl font-bold text-white mb-6">
            <span>
              M
              <span ref={oRef} className="inline-block relative">
                o
              </span>
              sic
            </span>
          </h1>
          <p className="text-emerald-200/80 text-sm mb-6">
            {isLoggedIn
              ? "Successfully connected to Spotify!"
              : "Connect your Spotify account to access your music"}
          </p>
          {!isLoggedIn && <SpotifyLoginButton />}
the         </div>
      </div>
    </div>
  );
};

export default MusicPage;
