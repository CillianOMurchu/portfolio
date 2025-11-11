import React, { Suspense } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../hooks/useAuth";
import ItemSphere from "../../features/ItemSphere";

const AuthScreen: React.FC = () => {
  const handleAuthClick = () => {
    // Set loading state immediately when auth button is clicked
    const event = new CustomEvent("authStarted");
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        style={{
          width: "100vw",
          border: "2px solid red",
          height: "100vh",
          opacity: 0.2,
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
            <div onClick={handleAuthClick}>
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
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
