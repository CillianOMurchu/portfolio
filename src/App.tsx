import "./index.css";
import { usePageNavigation } from "./hooks/usePageNavigation";
import PageRouter from "./components/app/PageRouter";
import UnifiedNavbar from "./components/layout/UnifiedNavbar";

function App() {
  const { currentPage } = usePageNavigation();

  return (
    <div
      className="min-h-screen w-full bg-fixed"
      style={{
        background: "#0a0e1a",
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)",
      }}
    >
      <UnifiedNavbar />
      <PageRouter currentPage={currentPage} />
    </div>
  );
}

export default App;
