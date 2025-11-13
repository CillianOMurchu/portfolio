import React, { Suspense } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../hooks/useAuth";
import ItemSphere from "../ItemSphere";
import HeroTitle from "../HeroTitle";
import { motion } from "framer-motion";

const AuthScreen: React.FC = () => {
  const handleAuthClick = () => {
    // Set loading state immediately when auth button is clicked
    const event = new CustomEvent("authStarted");
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen place-items-center">
      <div className="name w-full">
        <HeroTitle />
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
      <div className="max-w-md w-full mx-4">
        <div className="">
          <Suspense
            fallback={
              <div className="h-32 flex items-center justify-center">
                <div className="animate-pulse text-gray-400 text-sm">
                  Loading authentication...
                </div>
              </div>
            }
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              onClick={handleAuthClick}
              className="animated-button "
              // style="
              //  initial={{ opacity: 0, y: 50 }}
              // animate={{ opacity: 1, y: 0 }}
              // transition={{ duration: 1, delay: 0.5 }}"
            >
              {/* <Auth
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
              /> */}
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
      </div>
    </div>
  );
};

export default AuthScreen;
