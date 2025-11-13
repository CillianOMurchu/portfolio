import { useLocation } from "react-router-dom";

export interface Page {
  currentPage: string;
}

export function usePageNavigation(): Page {
  const location = useLocation();
  return {
    currentPage: location.pathname,
  };
}
