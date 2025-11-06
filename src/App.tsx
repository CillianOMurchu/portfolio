import "./index.css";
import { useState, useEffect, Suspense, lazy } from "react";
import { createClient, type Session } from "@supabase/supabase-js";
import { LoadingFallback } from "./components/LoadingFallback";
import { PianoLoading } from "./components/PianoLoading";

// Lazy load heavy components
const Auth = lazy(() =>
  import("@supabase/auth-ui-react").then((module) => ({ default: module.Auth }))
);
const ThreeDBall = lazy(() =>
  import("./features").then((module) => ({ default: module.ThreeDBall }))
);

// Import ThemeSupa normally since it's just a theme object, not a component
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isVisitor, setIsVisitor] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [signInState, setSignInState] = useState<'signin' | 'loading' | 'complete'>('signin');
  const [fadeClass, setFadeClass] = useState('opacity-100');
  const [loadingProgress, setLoadingProgress] = useState(0);

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
        setLoadingProgress(0);
      } else {
        setSession(session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignInSuccess = (session: Session) => {
    // Start the transition sequence
    setSignInState('loading');
    setFadeClass('opacity-0'); // Fade out sign-in form
    
    // Immediate progress - auth request completed
    setLoadingProgress(70);
    
    // Quick processing simulation for smooth UX
    setTimeout(() => {
      setLoadingProgress(100); // Processing complete
      
      // Very brief pause to show completion
      setTimeout(() => {
        setSignInState('complete');
        setSession(session);
      }, 150);
    }, 200); // Minimal delay - auth is already done
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

  // Loading Bar Component
  const LoadingBar = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Signing you in...</h2>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-200 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-4">
            {loadingProgress >= 100 ? 'Complete!' : `${Math.round(loadingProgress)}% complete`}
          </p>
        </div>
      </div>
    </div>
  );

  // Show loading bar during transition
  if (signInState === 'loading') {
    return <LoadingBar />;
  }

  if (!session && !isVisitor && signInState === 'signin') {
    return (
      <div className={`min-h-screen bg-gray-50 flex items-center justify-center transition-opacity duration-500 ${fadeClass}`}>
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-center text-2xl font-bold text-gray-900 mb-2">
              COM
            </h1>
            <p className="text-gray-600">
              Sign in to explore interactive experiences
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
        setSignInState={setSignInState}
        setFadeClass={setFadeClass}
        setLoadingProgress={setLoadingProgress}
      />
    );
  }
}

const LogoutButton: React.FC<{
  supabase: typeof supabase;
  isVisitor: boolean;
  setIsVisitor: (value: boolean) => void;
  setSignInState: (value: 'signin' | 'loading' | 'complete') => void;
  setFadeClass: (value: string) => void;
  setLoadingProgress: (value: number) => void;
}> = ({ supabase, isVisitor, setIsVisitor, setSignInState, setFadeClass, setLoadingProgress }) => {
  const [pageVisible, setPageVisible] = useState(false);

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
      setLoadingProgress(0);
    } else {
      await supabase.auth.signOut();
      // Reset sign-in state for Google users
      setSignInState('signin');
      setFadeClass('opacity-100');
      setLoadingProgress(0);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gray-50 transition-opacity duration-700 ${pageVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Large text - this should be the LCP element and render immediately */}
      <div className="mb-6">
        <h1 className="text-center text-8xl font-bold text-gray-900">
          Welcome
        </h1>
      </div>

      <div
        className="mb-8 flex justify-center"
        style={{ marginLeft: "-10px", minHeight: "352px" }}
      >
        <Suspense
          fallback={
            <div className="w-[352px] h-[352px] flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="text-gray-600">Loading 3D Experience...</div>
            </div>
          }
        >
          <ThreeDBall
            options={{
              width: 352,
              height: 352,
              radius: 120,
            }}
            // Use all icons with cascading load effect
          />
        </Suspense>
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
