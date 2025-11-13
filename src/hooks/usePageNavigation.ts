import { useLocation } from "react-router-dom";

interface UsePageNavigationReturn {
  currentPage: string;
}

export function usePageNavigation(): UsePageNavigationReturn {
  const location = useLocation();
  return {
    currentPage: location.pathname,
  };
}
