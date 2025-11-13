import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import { fadeUpPreset } from "../utils/animations";
import { AuthContext } from "../context/AuthContext";

export interface NavItem {
  id: string;
  icon: string;
  glowColor: string;
  shadowColor: string;
  textColor?: string;
  onClick: () => void;
}

interface UnifiedNavbarProps {
  items: NavItem[];
  className?: string;
}

export const UnifiedNavbar: React.FC<UnifiedNavbarProps> = ({
  items,
  className = "fixed top-6 left-6 z-[60]",
}) => {
  const auth = useContext(AuthContext);

  const { onLogout, isLoggedIn } = auth!;
  return (
    <div>
      <motion.nav
        className={`${className} flex items-center gap-6`}
        {...fadeUpPreset}
      >
        <AnimatePresence mode="sync">
          {items.map((item) => (
            <motion.div
              key={item.id}
              onClick={item.onClick}
              className="cursor-pointer select-none"
              {...fadeUpPreset}
            >
              <span className="text-2xl font-bold">{item.icon}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.nav>

      {isLoggedIn && (
        <div className="sign-out fixed top-6 right-6 z-[70]">
          <Button onClick={onLogout} value="Sign Out" />
        </div>
      )}
    </div>
  );
};

export default UnifiedNavbar;
