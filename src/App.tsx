import "./index.css";
import { Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./hooks/useAuth";
import { usePageNavigation } from "./hooks/usePageNavigation";
import LoadingScreen from "./components/app/LoadingScreen";
import PageRouter from "./components/app/PageRouter";

// Lazy load components
const SkillsOrb = lazy(() => import("./components/SkillsOrb"));

function App() {
  const {
    session,
    authLoading,
    signInState,
    hydrated,
    handleLogout,
  } = useAuth();

  const {
    currentPage,
    isMusicIconAnimatingOut,
    isBarebellsIconAnimatingOut,
    clickedIcon,
    handleMusicPageTransition,
    handleMusicIconExitComplete,
    handleBarebellsPageTransition,
    handleBarebellsIconExitComplete,
    handleSpheresPageTransition,
    handleBackToHome,
  } = usePageNavigation();

  // Loading state - just check auth and hydration
  if (!hydrated || authLoading) {
    return <LoadingScreen authLoading={authLoading} />;
  }

  return (
    <>
      {/* Persistent background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
      
      {/* Skills Orb - Only show on home page when logged in */}
      <AnimatePresence>
        {currentPage === 'home' && session && (
          <motion.div 
            className="fixed top-6 right-6 z-[70]"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Suspense fallback={
              <div className="w-12 h-12 bg-blue-200 rounded-full animate-pulse"></div>
            }>
              <SkillsOrb />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Page Router */}
      <PageRouter
        session={session}
        signInState={signInState}
        currentPage={currentPage}
        onLogout={handleLogout}
        onMusicClick={handleMusicPageTransition}
        onBarebellsClick={handleBarebellsPageTransition}
        onSpheresClick={handleSpheresPageTransition}
        isMusicIconAnimatingOut={isMusicIconAnimatingOut}
        onMusicIconExitComplete={handleMusicIconExitComplete}
        isBarebellsIconAnimatingOut={isBarebellsIconAnimatingOut}
        onBarebellsIconExitComplete={handleBarebellsIconExitComplete}
        clickedIcon={clickedIcon}
        onBackToHome={handleBackToHome}
      />
    </>
  );
}

export default App;