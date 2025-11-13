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
    return <LoadingScreen authLoading={authLoading} />;
  }

  return (
    <AuthContext.Provider
      value={{ onLogout: handleLogout, isLoggedIn: signInState === "complete" }}
    >
      {signInState === "complete" && <UnifiedNavbar />}

      {/* Page Router */}
      <PageRouter
        session={session}
        signInState={signInState}
        currentPage={currentPage}
      />
    </AuthContext.Provider>
  );
}

export default App;
