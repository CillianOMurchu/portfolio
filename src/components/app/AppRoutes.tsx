import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import type { Session } from "@supabase/supabase-js";
import AuthScreen from "./AuthScreen";
const WelcomeScreen = React.lazy(() => import("./WelcomeScreen"));
const MusicPage = React.lazy(() => import("../MusicPage"));
import CriticalThinkingPage from "../CriticalThinkingPage";

interface AppRoutesProps {
  session: Session | null;
  signInState: "signin" | "transitioning" | "complete";
  currentPage: string;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ session, signInState }) => {
  // Show auth screen if not signed in
  if (!session && signInState === "signin") {
    return (
      <motion.div
        key="auth"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="relative z-10"
      >
        <AuthScreen />
      </motion.div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative z-10"
          >
            <WelcomeScreen />
          </motion.div>
        }
      />
      <Route
        path="/music"
        element={
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                Loading music page...
              </div>
            }
          >
            <motion.div
              key="music"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative z-10"
            >
              <MusicPage />
            </motion.div>
          </Suspense>
        }
      />
      <Route
        path="/critical-thinking"
        element={
          <motion.div
            key="critical-thinking"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative z-10"
          >
            <CriticalThinkingPage />
          </motion.div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
