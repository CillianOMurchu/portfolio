import React, { Suspense } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../hooks/useAuth";
import ItemSphere from "../ItemSphere";
import HeroTitle from "../HeroTitle";
import { motion } from "framer-motion";
import { Name } from "../Name";

const AuthScreen: React.FC = () => {
  const handleAuthClick = () => {
    // Set loading state immediately when auth button is clicked
    const event = new CustomEvent("authStarted");
    window.dispatchEvent(event);
  };

  const { session } = useAuth();
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return (
    <div className="min-h-screen place-items-center">
      <div className="name w-full">
        <HeroTitle />
      </div>

      <div className={`absolute top-0 pointer-events-none${session ? " left-0" : ""}`}>
        <Name />
      </div>

      <div
        className="sphere"
        style={{
          width: "100vw",
          height: "100vh",
          opacity: 0.8,
          position: "absolute",
          zIndex: -1,
        }}
      >
        <ItemSphere />
      </div>
      {/* Auth button: top right on desktop, bottom on mobile */}
      {!session && !isMobile && (
        <div className="fixed right-6 z-30">
          <Suspense
            fallback={
              <div className="h-12 flex items-center justify-center">
                <div className="animate-pulse text-gray-400 text-sm">
                  Loading authentication...
                </div>
              </div>
            }
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              onClick={handleAuthClick}
              className="animated-button"
            >
              <Auth
                onlyThirdPartyProviders
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  style: {
                    button: {
                      borderRadius: "0.75rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      padding: "0.75rem 1rem",
                      background: "transparent",
                      border: "1px solid #ccc",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    },
                    container: {
                      display: "flex",
                      flexDirection: "column",
                    },
                  },
                }}
                theme="light"
                providers={["google"]}
                view="sign_in"
                showLinks={false}
                redirectTo={`${window.location.origin}/`}
              />
            </motion.div>
          </Suspense>
        </div>
      )}
      {/* Mobile: keep at bottom */}
      {!session && isMobile && (
        <div className="fixed bottom-0 left-0 w-full z-30 px-4 py-6 backdrop-blur-md">
          <Suspense
            fallback={
              <div className="h-12 flex items-center justify-center">
                <div className="animate-pulse text-gray-400 text-sm">
                  Loading authentication...
                </div>
              </div>
            }
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              onClick={handleAuthClick}
              className="animated-button"
            >
              <Auth
                onlyThirdPartyProviders
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  style: {
                    button: {
                      borderRadius: "0.75rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      padding: "0.75rem 1rem",
                      width: "100%",
                      background: "transparent",
                      border: "1px solid #ccc",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    },
                    container: {
                      display: "flex",
                      flexDirection: "column",
                    },
                  },
                }}
                theme="light"
                providers={["google"]}
                view="sign_in"
                showLinks={false}
                redirectTo={`${window.location.origin}/`}
              />
            </motion.div>
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default AuthScreen;
