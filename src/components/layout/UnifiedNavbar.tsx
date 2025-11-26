import React from "react";
import { MobileMenu } from "../navigation/MobileMenu";
import { Name } from "../Name";

export const UnifiedNavbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 bg-black/80 backdrop-blur z-50">
      <Name />
      <MobileMenu />
    </header>
  );
};

export default UnifiedNavbar;
