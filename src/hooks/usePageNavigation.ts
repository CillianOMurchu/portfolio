import { useState } from "react";

export type Page = 'home' | 'music' | 'barebells';

interface UsePageNavigationReturn {
  currentPage: Page;
  isMusicIconAnimatingOut: boolean;
  isBarebellsIconAnimatingOut: boolean;
  clickedIcon: 'music' | 'barebells' | null;
  handleMusicPageTransition: () => void;
  handleMusicIconExitComplete: () => void;
  handleBarebellsPageTransition: () => void;
  handleBarebellsIconExitComplete: () => void;
  handleBackToHome: () => void;
}

/**
 * Custom hook for page navigation state management
 */
export function usePageNavigation(): UsePageNavigationReturn {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMusicIconAnimatingOut, setIsMusicIconAnimatingOut] = useState(false);
  const [isBarebellsIconAnimatingOut, setIsBarebellsIconAnimatingOut] = useState(false);
  const [clickedIcon, setClickedIcon] = useState<'music' | 'barebells' | null>(null);

  const handleMusicPageTransition = () => {
    setClickedIcon('music');
    setIsMusicIconAnimatingOut(true);
  };

  const handleMusicIconExitComplete = () => {
    setIsMusicIconAnimatingOut(false);
    setCurrentPage('music');
    setClickedIcon(null);
  };

  const handleBarebellsPageTransition = () => {
    setClickedIcon('barebells');
    setIsBarebellsIconAnimatingOut(true);
  };

  const handleBarebellsIconExitComplete = () => {
    setIsBarebellsIconAnimatingOut(false);
    setCurrentPage('barebells');
    setClickedIcon(null);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setClickedIcon(null);
    setIsMusicIconAnimatingOut(false);
    setIsBarebellsIconAnimatingOut(false);
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
    handleBackToHome,
  };
}