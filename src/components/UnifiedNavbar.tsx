import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./Button";
import { fadeUpPreset } from "../utils/animations";
import { AuthContext } from "../context/AuthContext";
import { usePageNavigation } from "../hooks/usePageNavigation";

export interface NavItem {
  id: string;
  icon: string;
  url: string;
}

const navItems = [
  {
    id: "home",
    icon: "🏠",
    url: "/",
  },
  {
    id: "critical-thinking",
    icon: "🧠",
    url: "/critical-thinking",
  },
  {
    id: "music",
    icon: "\ud83c\udfb5",
    url: "/music",
  },
 
];

export const UnifiedNavbar: React.FC = () => {
  const auth = useContext(AuthContext);
  const { onLogout } = auth!;
  const navigate = useNavigate();
  const { currentPage } = usePageNavigation();

  return (
    <div className="flex items-center justify-between w-full py-3 px-5">
      <motion.nav className="flex gap-4" {...fadeUpPreset}>
        {navItems
          .filter((item) => item.url !== currentPage)
          .map((item) => (
            <motion.div
              onClick={() => navigate(item.url)}
              key={item.id}
              className="cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-3xl">{item.icon}</span>
            </motion.div>
          ))}
      </motion.nav>
      <Button onClick={onLogout} value="Sign Out" />
    </div>
  );
};

export default UnifiedNavbar;
