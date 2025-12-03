import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedGrid from "./AnimatedGrid";

const SideNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        animate={{ x: isOpen ? "calc(100vw - 100%)" : "0%" }}
        transition={{ ease: [0.25, 0.75, 0.5, 1.25], duration: 0.5 }}
        className={`fixed left-0 top-1/2 transform -translate-y-1/2 text-white px-4 py-2 shadow-lg cursor-pointer z-50 font-bold overflow-hidden ${
          isOpen ? "rounded-l-lg" : "rounded-r-lg"
        }`}
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="animated-grid-container absolute inset-0">
          <AnimatedGrid />
        </div>
        <div className="relative z-10">
          <AnimatedGrid />
          Projects
        </div>
      </motion.div>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ ease: [0.25, 0.75, 0.5, 1.25], duration: 0.5 }}
        className="fixed left-0 top-0 h-full w-full bg-black z-40"
      >
        {isOpen && <AnimatedGrid />}
        <div className="relative z-10 p-8 text-white flex flex-col h-full">
          <button
            onClick={() => setIsOpen(false)}
            className="self-end mb-4 text-white text-2xl hover:text-red-400 transition-colors"
          >
            ×
          </button>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xl text-center max-w-2xl leading-relaxed">
              Full-stack engineer specializing in modern web technologies and
              creative digital experiences.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SideNav;
