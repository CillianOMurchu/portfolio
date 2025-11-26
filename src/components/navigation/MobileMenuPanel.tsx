import React from "react";
import { motion } from "framer-motion";
import { FiHome, FiUser } from "react-icons/fi";
import { NavMenuItem } from "./NavMenuItem";

interface MobileMenuPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenuPanel: React.FC<MobileMenuPanelProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
          style={{ backdropFilter: "blur(2px)", zIndex: 99 }}
        />
      )}
      <motion.div
        className="fixed right-0 top-16 flex flex-col bg-black/90 backdrop-blur-lg shadow-2xl z-50 h-[calc(100vh-64px)] min-w-[240px] w-min[50vw,400px] border-l-2 border-emerald-500"
        initial={{ x: "100%" }}
        animate={isOpen ? { x: 0 } : { x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <nav className="flex flex-col gap-6 mt-8">
          <NavMenuItem href="/" icon={FiHome} onClick={onClose}>
            Home
          </NavMenuItem>
          <NavMenuItem href="/about" icon={FiUser} onClick={onClose}>
            About
          </NavMenuItem>
        </nav>
      </motion.div>
    </>
  );
};
