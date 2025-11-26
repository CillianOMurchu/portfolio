import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/neon.css";
import { FiHome, FiUser } from "react-icons/fi";
import { Name } from "./Name";

const BurgerMenu: React.FC<{ open: boolean; onClick: () => void }> = ({
  open,
  onClick,
}) => (
  <div
    style={{
      right: 0,
      top: 0,
      height: "100%",
      display: "flex",
      alignItems: "center",
      zIndex: 100,
    }}
  >
    <button
      className="relative w-10 h-10 flex items-center justify-center focus:outline-none"
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onClick}
      style={{ background: "transparent" }}
    >
      <motion.span
        className="absolute w-7 h-0.5 bg-emerald-400 neon"
        initial={false}
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <motion.span
        className="absolute w-7 h-0.5 bg-emerald-400 neon"
        initial={false}
        animate={open ? { opacity: 0 } : { opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <motion.span
        className="absolute w-7 h-0.5 bg-emerald-400 neon"
        initial={false}
        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </button>
  </div>
);

export const UnifiedNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 bg-black/80 backdrop-blur z-50">
      <Name />
      {/* Hamburger menu icon top right, always visible and clickable */}
      <BurgerMenu
        open={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      />
      {/* Side panel for mobile menu */}
      <motion.div
        className="fixed right-0 top-16 flex flex-col bg-black/90 backdrop-blur-lg shadow-lg z-50"
        initial={{ x: "100%" }}
        animate={menuOpen ? { x: 0 } : { x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          height: "calc(100vh - 64px)",
          minWidth: "240px",
          width: "min(50vw, 400px)",
          top: "64px",
          right: 0,
          borderLeft: "2px solid #10b981",
          borderTop: "none",
          borderBottom: "none",
          borderRight: "none",
          boxSizing: "border-box",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <nav className="flex flex-col gap-6 mt-8">
          <a
            href="/"
            className="flex items-center gap-3 text-emerald-400 neon text-lg font-bold px-4 py-2 rounded hover:bg-emerald-900/30 transition-colors"
          >
            <FiHome className="w-5 h-5" />
            Home
          </a>
          <a
            href="/about"
            className="flex items-center gap-3 text-emerald-400 neon text-lg font-bold px-4 py-2 rounded hover:bg-emerald-900/30 transition-colors"
          >
            <FiUser className="w-5 h-5" />
            About
          </a>
          {/* Add more menu links here */}
        </nav>
      </motion.div>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
          style={{ backdropFilter: "blur(2px)", zIndex: 99 }}
        />
      )}
    </nav>
  );
};

export default UnifiedNavbar;
