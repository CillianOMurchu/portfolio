import "./index.css";
import { useState, useEffect, Suspense, lazy } from "react";
import { createClient, type Session } from "@supabase/supabase-js";
import { LoadingFallback } from "./components/LoadingFallback";
import { PianoLoading } from "./components/PianoLoading";

// Lazy load heavy components
const Auth = lazy(() => import("@supabase/auth-ui-react").then(module => ({ default: module.Auth })));
const ThreeDBall = lazy(() => import("./features").then(module => ({ default: module.ThreeDBall })));

// Import ThemeSupa normally since it's just a theme object, not a component
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isVisitor, setIsVisitor] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    // Check for debug mode in URL
    const urlParams = new URLSearchParams(window.location.search);
    const isDebugMode = urlParams.get('debug') === 'loading';
    setDebugMode(isDebugMode);

    // Handle ESC key in debug mode
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDebugMode) {
        window.location.href = window.location.pathname;
      }
    };

    if (isDebugMode) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  if (!session && !isVisitor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-center text-2xl font-bold text-gray-900 mb-2">
              COM
            </h1>
            <p className="text-gray-600">
              Sign in to explore interactive experiences
            </p>
          </div>

          <Suspense fallback={<LoadingFallback height={128} message="Loading authentication..." />}>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={["google"]}
              onlyThirdPartyProviders={true}
            />
          </Suspense>

          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <button
              onClick={handleVisitorSignIn}
              className="mt-4 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue as Visitor
            </button>
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
      />
    );
  }
}

const LogoutButton: React.FC<{
  supabase: typeof supabase;
  isVisitor: boolean;
  setIsVisitor: (value: boolean) => void;
}> = ({ supabase, isVisitor, setIsVisitor }) => {
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    // Delay 3D component loading significantly to improve LCP
    const timer = setTimeout(() => {
      setShow3D(true);
    }, 1000); // Increased delay to 1 second for better LCP

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    if (isVisitor) {
      setIsVisitor(false);
    } else {
      await supabase.auth.signOut();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Large text - this should be the LCP element and render immediately */}
      <div className="mb-6">
        <h1 className="text-center text-8xl font-bold text-gray-900">
          Welcome
        </h1>
      </div>

      {/* 3D Component with optimized loading */}
      <div className="mb-8 flex justify-center" style={{ marginLeft: '-10px', minHeight: '352px' }}>
        {show3D ? (
          <Suspense fallback={null}>
            <ThreeDBall 
              options={{ 
                width: 352, 
                height: 352, 
                radius: 120
              }}
              // Use all icons with cascading load effect
            />
          </Suspense>
        ) : null}
      </div>

      <p className="text-lg text-gray-600 mb-6">
        {isVisitor ? "Browsing as Visitor" : "Signed in with Google"}
      </p>
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        {isVisitor ? "Exit Visitor Mode" : "Logout"}
      </button>
    </div>
  );
};
