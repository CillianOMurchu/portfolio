import "./index.css";
import { useState, useEffect, Suspense, lazy } from "react";
import { createClient, type Session } from "@supabase/supabase-js";
import { LoadingFallback } from "./components/LoadingFallback";
import { PianoLoading } from "./components/PianoLoading";
import { motion, AnimatePresence } from "framer-motion";
import { setSkillsButtonPosition } from "./utils/skillsButtonPosition";

// Lazy load heavy components
const Auth = lazy(() =>
  import("@supabase/auth-ui-react").then((module) => ({ default: module.Auth }))
);
const InteractiveThreeDBall = lazy(() =>
  import("./features").then((module) => ({ default: module.InteractiveThreeDBall }))
);

// Import ThemeSupa normally since it's just a theme object, not a component
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isVisitor, setIsVisitor] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [signInState, setSignInState] = useState<'signin' | 'complete'>('signin');
  const [fadeClass, setFadeClass] = useState('opacity-100');

  useEffect(() => {
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
      return () => document.removeEventListener("keydown", handleKeyPress);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // If we already have a session, set it directly (returning user)
        setSession(session);
        setSignInState('complete');
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // User just signed in, trigger the transition sequence
        handleSignInSuccess(session);
      } else if (event === 'SIGNED_OUT') {
        // Reset everything on sign out
        setSession(null);
        setSignInState('signin');
        setFadeClass('opacity-100');
      } else {
        setSession(session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignInSuccess = (session: Session) => {
    // Smooth direct transition - fade out auth, fade in welcome
    setFadeClass('opacity-0'); // Fade out sign-in form
    
    // Short delay to let fade-out complete, then show welcome
    setTimeout(() => {
      setSignInState('complete');
      setSession(session);
    }, 300); // Just enough time for smooth fade transition
  };

  // Show piano loading only in debug mode
  if (debugMode) {
    return (
      <PianoLoading
        onComplete={() => {}}
        duration={1200}
        debugMode={debugMode}
      />
    );
  }

  const handleVisitorSignIn = () => {
    setIsVisitor(true);
  };

  // Show loading bar during transition
  if (!session && !isVisitor && signInState === 'signin') {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center transition-all duration-500 ease-out ${fadeClass}`}>
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-white/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                <h1 className="text-2xl font-bold text-white">
                  C
                </h1>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-sm">
                Sign in to explore the interactive portfolio
              </p>
            </div>

            <Suspense
              fallback={
                <LoadingFallback
                  height={128}
                  message="Loading authentication..."
                />
              }
            >
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
                onClick={handleVisitorSignIn}
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
  } else {
    return (
      <LogoutButton
        supabase={supabase}
        isVisitor={isVisitor}
        setIsVisitor={setIsVisitor}
        setSignInState={setSignInState}
        setFadeClass={setFadeClass}
      />
    );
  }
}

const LogoutButton: React.FC<{
  supabase: typeof supabase;
  isVisitor: boolean;
  setIsVisitor: (value: boolean) => void;
  setSignInState: (value: 'signin' | 'complete') => void;
  setFadeClass: (value: string) => void;
}> = ({ supabase, isVisitor, setIsVisitor, setSignInState, setFadeClass }) => {
  const [pageVisible, setPageVisible] = useState(false);
  const [sphereExpanded, setSphereExpanded] = useState(false); // Start with sphere closed

  useEffect(() => {
    // Trigger fade-in animation when component mounts
    const timer = setTimeout(() => {
      setPageVisible(true);
    }, 100); // Brief delay for smooth transition

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    if (isVisitor) {
      setIsVisitor(false);
      // Reset sign-in state for visitors
      setSignInState('signin');
      setFadeClass('opacity-100');
    } else {
      await supabase.auth.signOut();
      // Reset sign-in state for Google users
      setSignInState('signin');
      setFadeClass('opacity-100');
    }
  };

  const toggleSphere = (event: React.MouseEvent<HTMLElement>) => {
    console.log('Skills button clicked! Current sphereExpanded:', sphereExpanded);
    
    // Get the exact button position when clicked
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    
    console.log('Button position:', { x: buttonCenterX, y: buttonCenterY });
    
    // Store button position for the animation
    setSkillsButtonPosition({ x: buttonCenterX, y: buttonCenterY });
    
    setSphereExpanded(!sphereExpanded);
    console.log('Setting sphereExpanded to:', !sphereExpanded);
  };

  return (
    <>
      {/* Main Page Content */}
      <div className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-700 ease-out ${pageVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Large text - this should be the LCP element and render immediately */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-xl">
            <span className="text-3xl font-bold text-white">C</span>
          </div>
          <h1 className="text-center text-7xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text">
            Welcome
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
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

      {/* Skills Toggle Button - positioned absolutely in top right */}
      <button
        onClick={toggleSphere}
        className="fixed top-6 right-6 z-[60] px-6 py-3 bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300 font-medium text-sm tracking-wide uppercase cursor-pointer"
        style={{
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          pointerEvents: 'auto',
        }}
        aria-label={sphereExpanded ? "Close skills" : "View skills"}
      >
        Skills
      </button>

      {/* Sphere Overlay Modal */}
      <AnimatePresence>
        {sphereExpanded && (
          <>
            {/* White overlay background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white z-40"
              onClick={toggleSphere}
            />
            
            {/* Sphere container */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                duration: 0.5, 
                ease: [0.25, 0.46, 0.45, 0.94],
                scale: { duration: 0.5 },
                opacity: { duration: 0.3 }
              }}
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
              <div className="pointer-events-auto">
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-gray-600">Loading 3D Experience...</div>
                    </div>
                  }
                >
                  <InteractiveThreeDBall
                    options={{
                      width: window.innerWidth,
                      height: window.innerHeight,
                      radius: Math.min(window.innerWidth, window.innerHeight) * 0.30,
                    }}
                    // Use all icons with cascading load effect
                  />
                </Suspense>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
