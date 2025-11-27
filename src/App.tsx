import "./index.css";
import "./styles/theme.css";
import { usePageNavigation } from "./hooks/usePageNavigation";
import PageRouter from "./components/app/PageRouter";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";


function App() {
  const { currentPage } = usePageNavigation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 page-main">
        <PageRouter currentPage={currentPage} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
