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

  // Shared style and animation props
  const containerClass = !session
    ? isMobile
      ? "fixed bottom-0 left-0 w-full z-30 px-4 py-6 backdrop-blur-md"
      : "fixed right-6 z-30"
    : "";
  const buttonStyle = {
    borderRadius: "0.75rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    padding: "0.75rem 1rem",
    background: "transparent",
    border: "1px solid #ccc",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(.25,.75,.5,1.25)",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    ...(isMobile ? { width: "100%" } : {}),
  };
  const motionProps = isMobile
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen">
      <div className="name">
        <HeroTitle />
      </div>

      <div className=" absolute ml-2">
        <Name />
      </div>

      <div
        className="sphere"
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          zIndex: -1,
        }}
      >
        <ItemSphere />
      </div>
      {!session && (
        <div className={containerClass}>
          <Suspense
            fallback={
              <div className="h-12 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg px-4">
                <div className="animate-pulse text-emerald-400 text-sm">
                  Loading authentication...
                </div>
              </div>
            }
          >
            <motion.div
              {...motionProps}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: [0.25, 0.75, 0.5, 1.25],
              }}
              onClick={handleAuthClick}
              className="animated-button"
            >
              <Auth
                onlyThirdPartyProviders
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  style: {
                    button: buttonStyle,
                    container: { display: "flex", flexDirection: "column" },
                  },
                }}
                theme="dark"
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
