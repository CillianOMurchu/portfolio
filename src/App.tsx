import "./index.css";
import { useAuth } from "./hooks/useAuth";
import { usePageNavigation } from "./hooks/usePageNavigation";
import LoadingScreen from "./components/app/LoadingScreen";
import PageRouter from "./components/app/PageRouter";
import UnifiedNavbar from "./components/UnifiedNavbar";

import { AuthContext } from "./context/AuthContext";

function App() {
  const { session, authLoading, signInState, hydrated, handleLogout } =
    useAuth();
  const { currentPage } = usePageNavigation();

  // Loading state - just check auth and hydration
  if (!hydrated || authLoading) {
    return (
      <div
        className="min-h-screen w-full bg-fixed"
        style={{
          background: "#0a0e1a",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)",
        }}
      >
        <LoadingScreen authLoading={authLoading} />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full bg-fixed"
      style={{
        background: "#0a0e1a",
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)",
      }}
    >
      <AuthContext.Provider
        value={{
          onLogout: handleLogout,
          isLoggedIn: signInState === "complete",
        }}
      >
        {signInState === "complete" && <UnifiedNavbar />}
        <PageRouter
          session={session}
          signInState={signInState}
          currentPage={currentPage}
        />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
