import "./index.css";
import { Suspense, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./hooks/useAuth";
import { usePageNavigation } from "./hooks/usePageNavigation";
import LoadingScreen from "./components/app/LoadingScreen";
import PageRouter from "./components/app/PageRouter";

// Lazy load components

// AuthContext for global auth actions
interface AuthContextType {
  onLogout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}

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
    clickedIcon,
    handleMusicPageTransition,
    handleMusicIconExitComplete,
    handleBackToHome,
  } = usePageNavigation();

  // Loading state - just check auth and hydration
  if (!hydrated || authLoading) {
    return <LoadingScreen authLoading={authLoading} />;
  }

  return (
    <AuthContext.Provider value={{ onLogout: handleLogout }}>
      {/* Persistent background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
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
        isMusicIconAnimatingOut={isMusicIconAnimatingOut}
        onMusicIconExitComplete={handleMusicIconExitComplete}
        clickedIcon={clickedIcon}
        onBackToHome={handleBackToHome}
      />
    </AuthContext.Provider>
  );
}

export default App;