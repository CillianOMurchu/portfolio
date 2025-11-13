import { useState, useEffect } from "react";
import { createClient, type Session } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

interface UseAuthReturn {
  session: Session | null;
  authLoading: boolean;
  signInState: "signin" | "transitioning" | "complete";
  hydrated: boolean;
  setSignInState: (value: "signin" | "transitioning" | "complete") => void;
  handleSignInSuccess: (session: Session) => void;
  handleLogout: () => Promise<void>;
}

/**
 * Custom hook for authentication state management - Google OAuth only
 */
export function useAuth(): UseAuthReturn {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [signInState, setSignInState] = useState<
    "signin" | "transitioning" | "complete"
  >("signin");
  const [hydrated, setHydrated] = useState(false);

  const handleSignInSuccess = (session: Session) => {
    setSession(session);
    setAuthLoading(false);
    setSignInState("complete");
  };

  // Local version for the hook
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSignInState("signin");
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        setSignInState("complete");
      }
      setHydrated(true);
    });

    // Listen for auth button clicks
    const handleAuthStarted = () => {
      setAuthLoading(true);
    };

    window.addEventListener("authStarted", handleAuthStarted);

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        handleSignInSuccess(session);
      } else if (event === "SIGNED_OUT") {
        setSession(null);
        setSignInState("signin");
        setAuthLoading(false);
      } else {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("authStarted", handleAuthStarted);
    };
  }, []);

  return {
    session,
    authLoading,
    signInState,
    hydrated,
    setSignInState,
    handleSignInSuccess,
    handleLogout,
  };
}
