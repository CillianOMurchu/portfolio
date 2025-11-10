import React, { Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Session } from "@supabase/supabase-js";
import type { Page } from "../../hooks/usePageNavigation";
import AuthScreen from "./AuthScreen";
import WelcomeScreen from "./WelcomeScreen";

// Lazy load heavy page components
const MusicPage = lazy(() => import("../MusicPage"));
const BarebellsPage = lazy(() => import("../BarebellsPage"));

interface PageRouterProps {
  session: Session | null;
  signInState: 'signin' | 'transitioning' | 'complete';
  currentPage: Page;
  onLogout: () => Promise<void>;
  onMusicClick: () => void;
  onBarebellsClick: () => void;
  isMusicIconAnimatingOut: boolean;
  onMusicIconExitComplete: () => void;
  isBarebellsIconAnimatingOut: boolean;
  onBarebellsIconExitComplete: () => void;
  clickedIcon: 'music' | 'barebells' | null;
  onBackToHome: () => void;
}

const PageRouter: React.FC<PageRouterProps> = ({
  session,
  signInState,
  currentPage,
  onLogout,
  onMusicClick,
  onBarebellsClick,
  isMusicIconAnimatingOut,
  onMusicIconExitComplete,
  isBarebellsIconAnimatingOut,
  onBarebellsIconExitComplete,
  clickedIcon,
  onBackToHome,
}) => {
  return (
    <AnimatePresence mode="wait">
      {!session && signInState === 'signin' ? (
        <motion.div
          key="auth"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="relative z-10"
        >
          <AuthScreen />
        </motion.div>
      ) : currentPage === 'music' ? (
        <motion.div
          key="music"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="relative z-10"
        >
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center text-white">
              Loading Music Page...
            </div>
          }>
            <MusicPage onBack={onBackToHome} />
          </Suspense>
        </motion.div>
      ) : currentPage === 'barebells' ? (
        <motion.div
          key="barebells"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="relative z-10"
        >
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center text-white">
              Loading Barebells Page...
            </div>
          }>
            <BarebellsPage onBack={onBackToHome} />
          </Suspense>
        </motion.div>
      ) : (
        <motion.div
          key="welcome"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="relative z-10"
        >
          <WelcomeScreen 
            onMusicClick={onMusicClick}
            onBarebellsClick={onBarebellsClick}
            isMusicIconAnimatingOut={isMusicIconAnimatingOut}
            onMusicIconExitComplete={onMusicIconExitComplete}
            isBarebellsIconAnimatingOut={isBarebellsIconAnimatingOut}
            onBarebellsIconExitComplete={onBarebellsIconExitComplete}
            clickedIcon={clickedIcon}
            onLogout={onLogout}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageRouter;