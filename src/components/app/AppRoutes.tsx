import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Session } from '@supabase/supabase-js';
import type { Page } from '../../hooks/usePageNavigation';
import AuthScreen from './AuthScreen';
import WelcomeScreen from './WelcomeScreen';
import MusicPage from '../MusicPage';
import BarebellsPage from '../BarebellsPage';

interface AppRoutesProps {
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

const AppRoutes: React.FC<AppRoutesProps> = ({
  session,
  signInState,
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
  // Show auth screen if not signed in
  if (!session && signInState === 'signin') {
    return (
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
        }
      />
      <Route
        path="/music"
        element={
          <motion.div
            key="music"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="relative z-10"
          >
            <MusicPage onBack={onBackToHome} />
          </motion.div>
        }
      />
      <Route
        path="/barebells"
        element={
          <motion.div
            key="barebells"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="relative z-10"
          >
            <BarebellsPage onBack={onBackToHome} />
          </motion.div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;