import React from "react";
import { motion } from "framer-motion";

interface BurgerMenuIconProps {
  isOpen: boolean;
  onClick: () => void;
}

export const BurgerMenuIcon: React.FC<BurgerMenuIconProps> = ({ isOpen, onClick }) => (
  <button
    className="relative w-10 h-10 flex items-center justify-center focus:outline-none z-50 md:hidden"
    aria-label={isOpen ? "Close menu" : "Open menu"}
    onClick={onClick}
  >
    <motion.span
      className="absolute w-7 h-0.5 burger-line"
      initial={false}
      animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ filter: "none" }}
    />
    <motion.span
      className="absolute w-7 h-0.5 burger-line"
      initial={false}
      animate={isOpen ? { opacity: 0 } : { opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ filter: "none" }}
    />
    <motion.span
      className="absolute w-7 h-0.5 burger-line"
      initial={false}
      animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ filter: "none" }}
    />
  </button>
);
