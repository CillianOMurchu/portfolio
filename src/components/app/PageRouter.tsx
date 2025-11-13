import React from "react";
import { AnimatePresence } from "framer-motion";
import { type Session } from "@supabase/supabase-js";
import AppRoutes from "./AppRoutes";

interface PageRouterProps {
  session: Session | null;
  signInState: 'signin' | 'transitioning' | 'complete';
  currentPage: string;
}

const PageRouter: React.FC<PageRouterProps> = (props) => {
  return (
    <AnimatePresence mode="wait">
      <AppRoutes {...props} />
    </AnimatePresence>
  );
};

export default PageRouter;