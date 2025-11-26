import "./index.css";
import "./styles/theme.css";
import { usePageNavigation } from "./hooks/usePageNavigation";
import PageRouter from "./components/app/PageRouter";
import UnifiedNavbar from "./components/layout/UnifiedNavbar";
import Footer from "./components/layout/Footer";

function App() {
  const { currentPage } = usePageNavigation();

  return (
    <>
      <UnifiedNavbar />

      <main className="page-main">
        <PageRouter currentPage={currentPage} />
      </main>

      <footer className="site-footer">
        <Footer />
      </footer>
    </>
  );
}

export default App;
