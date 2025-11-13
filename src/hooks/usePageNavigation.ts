import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export type Page = "home" | "music" | "barebells" | "spheres";

interface UsePageNavigationReturn {
  currentPage: Page;
}

/**
 * Custom hook for page navigation state management with URL routing
 */
export function usePageNavigation(): UsePageNavigationReturn {
  const location = useLocation();

  // Determine current page from URL
  const getPageFromPath = (pathname: string): Page => {
    switch (pathname) {
      case "/music":
        return "music";
      default:
        return "home";
    }
  };

  const [currentPage, setCurrentPage] = useState<Page>(
    getPageFromPath(location.pathname)
  );

  // Sync URL changes with internal state
  useEffect(() => {
    const newPage = getPageFromPath(location.pathname);
    setCurrentPage(newPage);
  }, [location.pathname]);

  return {
    currentPage,
  };
}
