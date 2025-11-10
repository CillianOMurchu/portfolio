import React, { Suspense } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../hooks/useAuth";

const AuthScreen: React.FC = () => {
  const handleAuthClick = () => {
    // Set loading state immediately when auth button is clicked
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h1>
            <p className="text-gray-600 text-sm">Sign in with Google to explore the portfolio</p>
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
                      width: '100%'
                    },
                    container: {
                      display: 'flex',
                      flexDirection: 'column'
                    }
                  }
                }}
                theme="light"
                providers={['google']}
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