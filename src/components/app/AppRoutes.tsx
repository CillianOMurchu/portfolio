import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import HomeScreen from "./HomeScreen";
const WelcomeScreen = React.lazy(() => import("./WelcomeScreen"));
import LoadingScreen from "./LoadingScreen";
import AboutScreen from "./AboutScreen";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.75, 0.5, 1.25] }}
            className="relative z-10"
          >
            <HomeScreen />
          </motion.div>
        }
      />
      <Route
        path="/welcome"
        element={
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen bg-black text-emerald-400">
                Loading...
              </div>
            }
          >
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.25, 0.75, 0.5, 1.25] }}
              className="relative z-10"
            >
              <WelcomeScreen />
            </motion.div>
          </Suspense>
        }
      />
      <Route
        path="/loading-test"
        element={
          <motion.div
            key="loading-test"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.75, 0.5, 1.25] }}
            className="relative z-10"
          >
            <LoadingScreen authLoading={false} />
          </motion.div>
        }
      />
      <Route
        path="/about"
        element={
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen bg-black text-emerald-400">
                Loading...
              </div>
            }
          >
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.25, 0.75, 0.5, 1.25] }}
              className="relative z-10"
            >
              <AboutScreen />
            </motion.div>
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
