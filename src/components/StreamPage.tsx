import React, { useState } from "react";
import { motion, easeOut } from "framer-motion";

const TWITCH_PARENT_DOMAINS = [
  window.location.hostname,
  "localhost",
  "127.0.0.1",
];
const twitchChannel = "ichilliano";

// Removed unused EASE constant

// Removed unused fadeUp variant
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

// Featured video links
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
// (Removed duplicate videoLinks arrays and stray code)

const MusicPage: React.FC = () => {
  const [show, setShow] = useState(false);
  React.useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-950 flex flex-col items-center justify-center p-0 relative overflow-hidden">
      <motion.h1
        variants={fadeDownCascade(0)}
        initial="initial"
        animate={show ? "animate" : "initial"}
        className="text-4xl font-bold text-white mb-4 text-center drop-shadow-lg"
      >
        Live Music Stream
      </motion.h1>
      <motion.p
        variants={fadeDownCascade(1)}
        initial="initial"
        animate={show ? "animate" : "initial"}
        className="text-lg text-emerald-200 mb-8 text-center"
      >
        Enjoy live music performances and jam sessions from Twitch creators.
      </motion.p>

      <motion.div
        variants={fadeDownCascade(2)}
        initial="initial"
        animate={show ? "animate" : "initial"}
        className="w-full max-w-2xl flex justify-center items-center mb-10"
      >
        <div className="w-full flex justify-center">
          <iframe
            src={`https://player.twitch.tv/?channel=${twitchChannel}&parent=${TWITCH_PARENT_DOMAINS.join("&parent=")}`}
            height={480}
            width="100%"
            allowFullScreen
            frameBorder="0"
            title={`Twitch Stream - ${twitchChannel}`}
            className="rounded-xl shadow-emerald-400/30 shadow-lg border-2 border-emerald-500"
            style={{ minHeight: 320, background: "#18181b" }}
          />
        </div>
      </motion.div>

      <motion.div
        variants={fadeDownCascade(3)}
        initial="initial"
        animate={show ? "animate" : "initial"}
        className="w-full max-w-xl flex flex-col items-center gap-4 pb-12"
      >
        <h2 className="text-xl font-semibold text-emerald-300 mb-2">
          Featured Videos
        </h2>
        {videoLinks.map((vid: { label: string; url: string }, i: number) => (
          <motion.a
            key={vid.url}
            href={vid.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-3 px-6 rounded-lg bg-emerald-900/80 hover:bg-emerald-700 text-emerald-100 font-medium shadow transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 0 24px #10b981" }}
            variants={fadeDownCascade(4 + i)}
            initial="initial"
            animate={show ? "animate" : "initial"}
          >
            {vid.label}
          </motion.a>
        ))}
      </motion.div>
    </main>
  );
};

export default MusicPage;
