import React from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";

const defaultMotion = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  duration: 0.5,
};

const routeConfigs = [
  {
    path: "/",
    key: "home",
    screen: <HomeScreen />,
    motion: defaultMotion,
  },
  {
    path: "/about",
    key: "about",
    screen: <AboutScreen />,
    motion: defaultMotion,
  },
];

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {routeConfigs.map(({ path, key, screen, motion: m }) => (
        <Route
          key={key}
          path={path}
          element={
            <motion.div
              key={key}
              initial={m.initial}
              animate={m.animate}
              exit={m.exit}
              transition={{ duration: m.duration, ease: [0.25, 0.75, 0.5, 1.25] }}
              className="relative z-10"
            >
              {screen}
            </motion.div>
          }
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
