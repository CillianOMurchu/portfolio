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

  // Define navigation items
  const navItems = [
    {
      id: "critical-thinking",
      icon: "🧠",
      glowColor: "#10b981",
      shadowColor: "rgba(16, 185, 129, 0.6)",
      textColor: "text-white",
      onClick: () => {},
    },
    {
      id: "music",
      icon: "\ud83c\udfb5",
      glowColor: "#a855f7",
      shadowColor: "rgba(168, 85, 247, 0.6)",
      textColor: "text-white",
      onClick: () => {},
    },
  ];

  return (
    <AuthContext.Provider
      value={{ onLogout: handleLogout, isLoggedIn: signInState === "complete" }}
    >
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
      <UnifiedNavbar items={navItems} />

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
