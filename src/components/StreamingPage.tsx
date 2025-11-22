import React, { useState } from "react";
import { motion, easeOut } from "framer-motion";
import { MetalSheenBackground } from "../features/visual-effects/MetalSheenBackground";

const TWITCH_PARENT_DOMAINS = [
  window.location.hostname,
  "localhost",
  "127.0.0.1",
];
const twitchChannel = "ichilliano";

function fadeDownCascade(index: number, baseDelay = 0.1, duration = 0.7) {
  return {
    initial: { opacity: 0, y: -40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: easeOut,
        delay: baseDelay + index * 0.15,
      },
    },
  };
}

const videoLinks = [
  {
    label: "Chill Guitar Jam (YouTube)",
    url: "https://www.youtube.com/watch?v=5qap5aO4i9A",
  },
  {
    label: "Live Drum Session (Twitch)",
    url: "https://www.twitch.tv/videos/123456789",
  },
  {
    label: "Piano Improv (YouTube)",
    url: "https://www.youtube.com/watch?v=DWcJFNfaw9c",
  },
];

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 640;
}

const StreamingPage: React.FC = () => {
  const [show, setShow] = useState(false);
  React.useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <MetalSheenBackground>
      <div className="w-full min-h-screen flex flex-col">
        <main className="flex-1 w-full max-w-full px-2 sm:px-6 py-4 sm:py-8 flex flex-col items-center gap-6 sm:gap-10 overflow-y-auto">
          <motion.h1
            variants={fadeDownCascade(0)}
            initial="initial"
            animate={show ? "animate" : "initial"}
            className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4 text-center drop-shadow-lg"
          >
            {/* Live Apex Legends Stream */}
          </motion.h1>
          <motion.p
            variants={fadeDownCascade(1)}
            initial="initial"
            animate={show ? "animate" : "initial"}
            className="text-base sm:text-lg text-emerald-200 mb-4 sm:mb-8 text-center"
          >
          </motion.p>

          <motion.div
            variants={fadeDownCascade(2)}
            initial="initial"
            animate={show ? "animate" : "initial"}
            className="w-full max-w-md sm:max-w-2xl flex justify-center items-center mb-6 sm:mb-10"
          >
            <div className="w-full flex justify-center">
              <iframe
                src={`https://player.twitch.tv/?channel=${twitchChannel}&parent=${TWITCH_PARENT_DOMAINS.join("&parent=")}`}
                height={isMobile() ? 220 : 480}
                width="100%"
                allowFullScreen
                frameBorder="0"
                title={`Twitch Stream - ${twitchChannel}`}
                className="rounded-xl shadow-emerald-400/30 shadow-lg border-2 border-emerald-500"
                style={{ minHeight: isMobile() ? 180 : 320, background: "#18181b" }}
              />
            </div>
          </motion.div>

         
        </main>
      </div>
    </MetalSheenBackground>
  );
}

export default StreamingPage;
