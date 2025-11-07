import "./index.css";
import { useState, useEffect, Suspense, lazy } from "react";
import { createClient, type Session } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";

// Lazy load heavy components only when needed
const Auth = lazy(() =>
  import("@supabase/auth-ui-react").then((module) => ({ default: module.Auth }))
);
const PianoLoading = lazy(() => import("./components/PianoLoading").then(module => ({ default: module.PianoLoading })));
const MusicPage = lazy(() => import("./components/MusicPage").then(module => ({ default: module.MusicPage })));
const SkillsOrb = lazy(() => import("./components/SkillsOrb"));

// Import only lightweight theme object
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isVisitor, setIsVisitor] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [signInState, setSignInState] = useState<'signin' | 'transitioning' | 'complete'>('signin');
  const [hydrated, setHydrated] = useState(false);
  const [minLoadingComplete, setMinLoadingComplete] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  
  // New state for page navigation
  const [currentPage, setCurrentPage] = useState<'home' | 'music'>('home');

  useEffect(() => {
    // Ensure minimum loading time of 1 second for smooth experience
    const minLoadingTimer = setTimeout(() => {
      setMinLoadingComplete(true);
    }, 1000);

    // Check for debug mode in URL
    const urlParams = new URLSearchParams(window.location.search);
    const isDebugMode = urlParams.get("debug") === "loading";
    setDebugMode(isDebugMode);

    // Handle ESC key in debug mode
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isDebugMode) {
        window.location.href = window.location.pathname;
      }
    };

    if (isDebugMode) {
      document.addEventListener("keydown", handleKeyPress);
      return () => {
        clearTimeout(minLoadingTimer);
        document.removeEventListener("keydown", handleKeyPress);
      };
    }

    return () => clearTimeout(minLoadingTimer);
  }, []);

  useEffect(() => {
    // Hydration guard - get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // If we already have a session, set it directly (returning user)
        setSession(session);
        setSignInState('complete');
      }
      setHydrated(true);
    });

    // Listen for auth button clicks to show loading immediately
    const handleAuthStarted = () => {
      setAuthLoading(true);
    };

    window.addEventListener('authStarted', handleAuthStarted);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Immediate transition - no delay
        handleSignInSuccess(session);
      } else if (event === 'SIGNED_OUT') {
        // Reset everything on sign out
        setSession(null);
        setSignInState('signin');
        setAuthLoading(false);
      } else {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('authStarted', handleAuthStarted);
    };
  }, []);

  const handleSignInSuccess = (session: Session) => {
    // Direct transition to complete state
    setSignInState('complete');
    setSession(session);
    setAuthLoading(false);
  };

  // Page navigation functions
  const handleMusicPageTransition = () => {
    setCurrentPage('music');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  // Show loading if not yet hydrated OR minimum loading time hasn't passed OR auth is loading
  if (!hydrated || !minLoadingComplete || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg animate-pulse">
            <span className="text-2xl font-bold text-white">C</span>
          </div>
          <div className="text-gray-600 font-medium">
            {authLoading ? "Signing you in..." : "Loading portfolio..."}
          </div>
        </div>
      </div>
    );
  }

  // Show piano loading only in debug mode
  if (debugMode) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-pulse">Loading debug mode...</div></div>}>
        <PianoLoading
          onComplete={() => {}}
          duration={1200}
          debugMode={debugMode}
        />
      </Suspense>
    );
  }

  const handleVisitorSignIn = () => {
    setIsVisitor(true);
    setSignInState('complete');
  };

  return (
    <>
      {/* Persistent background to prevent layout jump */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
      
      {/* Animated screen transitions */}
      <AnimatePresence mode="wait">
        {!session && !isVisitor && signInState === 'signin' ? (
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="relative z-10"
          >
            <AuthScreen onVisitorSignIn={handleVisitorSignIn} />
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
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading Music Page...</div>}>
              <MusicPage onBack={handleBackToHome} />
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
              isVisitor={isVisitor} 
              setIsVisitor={setIsVisitor}
              setSignInState={setSignInState}
              onMusicClick={handleMusicPageTransition}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Auth Screen Component
const AuthScreen: React.FC<{ onVisitorSignIn: () => void }> = ({ onVisitorSignIn }) => {
  const handleAuthClick = () => {
    // Set loading state immediately when auth button is clicked
    // This will be handled by the parent component
    const event = new CustomEvent('authStarted');
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <h1 className="text-2xl font-bold text-white">C</h1>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-sm">Sign in to explore the interactive portfolio</p>
          </div>

          <Suspense
            fallback={
              <div className="h-32 flex items-center justify-center">
                <div className="animate-pulse text-gray-400 text-sm">Loading authentication...</div>
              </div>
            }
          >
            <div onClick={handleAuthClick}>
              <Auth
                supabaseClient={supabase}
                appearance={{ 
                  theme: ThemeSupa,
                  style: {
                    button: {
                      borderRadius: '0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      padding: '0.75rem 1rem',
                      transition: 'all 0.2s ease',
                    },
                    anchor: {
                      color: '#3B82F6',
                      textDecoration: 'none',
                    },
                    message: {
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      marginBottom: '1rem',
                    }
                  }
                }}
                providers={["google"]}
                onlyThirdPartyProviders={true}
              />
            </div>
          </Suspense>

        <div className="mt-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500 font-medium">or</span>
            </div>
          </div>

          <button
            onClick={onVisitorSignIn}
            className="mt-4 w-full flex justify-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Continue as Visitor
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

// Welcome Screen Component
const WelcomeScreen: React.FC<{
  isVisitor: boolean;
  setIsVisitor: (value: boolean) => void;
  setSignInState: (value: 'signin' | 'transitioning' | 'complete') => void;
  onMusicClick: () => void;
}> = ({ isVisitor, setIsVisitor, setSignInState, onMusicClick }) => {

  const handleLogout = async () => {
    if (isVisitor) {
      setIsVisitor(false);
      setSignInState('signin');
    } else {
      await supabase.auth.signOut();
      setSignInState('signin');
    }
  };

  return (
    <>
      {/* Main Page Content */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-xl">
            <span className="text-3xl font-bold text-white">C</span>
          </div>
          <h1 className="text-center text-7xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text">
            Welcome
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto" />
        </div>

        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 mb-6 font-medium">
            {isVisitor ? "🎉 Browsing as Visitor" : "✨ Signed in with Google"}
          </p>
          <button
            onClick={handleLogout}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
          >
            {isVisitor ? "Exit Visitor Mode" : "Sign Out"}
          </button>
        </div>
      </div>

      {/* Top Navigation */}
      <div className="fixed top-6 left-0 right-0 z-[60] flex justify-between items-center px-6">
        {/* Music Page Button */}
        <button
          onClick={onMusicClick}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium flex items-center gap-2"
        >
          🎵 Music
        </button>
        
        {/* Skills Orb */}
        <Suspense fallback={
          <div className="w-12 h-12 bg-blue-200 rounded-full animate-pulse"></div>
        }>
          <SkillsOrb />
        </Suspense>
      </div>
    </>
  );
};

export default App;
