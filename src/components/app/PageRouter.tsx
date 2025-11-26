import React from "react";
import { AnimatePresence } from "framer-motion";
import AppRoutes from "./AppRoutes";

interface PageRouterProps {
  currentPage: string;
}

const PageRouter: React.FC<PageRouterProps> = () => {
  return (
    <AnimatePresence mode="wait">
      <AppRoutes  />
    </AnimatePresence>
  );
};

export default PageRouter;