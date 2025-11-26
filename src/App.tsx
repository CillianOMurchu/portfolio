import "./index.css";
import "./styles/theme.css";
import { usePageNavigation } from "./hooks/usePageNavigation";
import PageRouter from "./components/app/PageRouter";
import UnifiedNavbar from "./components/layout/UnifiedNavbar";

function App() {
  const { currentPage } = usePageNavigation();

  return (
    <div className="min-h-screen w-full bg-fixed bg-[#0a0e1a]">
      <div className="fixed top-0 left-0 w-full z-50">
        <UnifiedNavbar />
      </div>
      <main className="pt-16 relative z-10">
        <PageRouter currentPage={currentPage} />
      </main>
    </div>
  );
}

export default App;



