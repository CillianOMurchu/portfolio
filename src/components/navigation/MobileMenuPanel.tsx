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
          className="fixed inset-0 w-screen h-screen bg-black/40 z-40 flex justify-end"
          data-testid="overlay"
          onClick={onClose}
          style={{ backdropFilter: "blur(2px)", zIndex: 99 }}
        >
          <motion.div
            className="menu-panel flex flex-col bg-black/90 backdrop-blur-lg shadow-2xl h-[calc(100vh-64px)] min-w-[240px] w-min[50vw,400px] z-50 mt-16"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ pointerEvents: "auto" }}
            onClick={e => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-6 mt-8">
              <NavMenuItem
                href="/"
                icon={FiHome}
                onNavigate={onClose}
              >
                Home
              </NavMenuItem>
              <NavMenuItem
                href="/about"
                icon={FiUser}
                onNavigate={onClose}
              >
                About
              </NavMenuItem>
            </nav>
          </motion.div>
        </div>
      )}
    </>
  );
}
