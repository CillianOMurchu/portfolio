import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type Page = 'home' | 'music' | 'barebells' | 'spheres';

interface UsePageNavigationReturn {
  currentPage: Page;
  isMusicIconAnimatingOut: boolean;
  isBarebellsIconAnimatingOut: boolean;
  clickedIcon: 'music' | 'barebells' | null;
  handleMusicPageTransition: () => void;
  handleMusicIconExitComplete: () => void;
  handleBarebellsPageTransition: () => void;
  handleBarebellsIconExitComplete: () => void;
  handleSpheresPageTransition: () => void;
  handleBackToHome: () => void;
}

/**
 * Custom hook for page navigation state management with URL routing
 */
export function usePageNavigation(): UsePageNavigationReturn {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine current page from URL
  const getPageFromPath = (pathname: string): Page => {
    switch (pathname) {
      case '/music': return 'music';
      case '/barebells': return 'barebells';  
      case '/spheres': return 'spheres';
      default: return 'home';
    }
  };

  const [currentPage, setCurrentPage] = useState<Page>(getPageFromPath(location.pathname));
  const [isMusicIconAnimatingOut, setIsMusicIconAnimatingOut] = useState(false);
  const [isBarebellsIconAnimatingOut, setIsBarebellsIconAnimatingOut] = useState(false);
  const [clickedIcon, setClickedIcon] = useState<'music' | 'barebells' | null>(null);

  // Sync URL changes with internal state
  useEffect(() => {
    const newPage = getPageFromPath(location.pathname);
    setCurrentPage(newPage);
  }, [location.pathname]);

  const handleMusicPageTransition = () => {
    setClickedIcon('music');
    setIsMusicIconAnimatingOut(true);
  };

  const handleMusicIconExitComplete = () => {
    setIsMusicIconAnimatingOut(false);
    setCurrentPage('music');
    setClickedIcon(null);
    navigate('/music');
  };

  const handleBarebellsPageTransition = () => {
    setClickedIcon('barebells');
    setIsBarebellsIconAnimatingOut(true);
  };

  const handleBarebellsIconExitComplete = () => {
    setIsBarebellsIconAnimatingOut(false);
    setCurrentPage('barebells');
    setClickedIcon(null);
    navigate('/barebells');
  };

  const handleSpheresPageTransition = () => {
    setCurrentPage('spheres');
    setClickedIcon(null);
    navigate('/spheres');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setClickedIcon(null);
    setIsMusicIconAnimatingOut(false);
    setIsBarebellsIconAnimatingOut(false);
    navigate('/');
  };

  return {
    currentPage,
    isMusicIconAnimatingOut,
    isBarebellsIconAnimatingOut,
    clickedIcon,
    handleMusicPageTransition,
    handleMusicIconExitComplete,
    handleBarebellsPageTransition,
    handleBarebellsIconExitComplete,
    handleSpheresPageTransition,
    handleBackToHome,
  };
}