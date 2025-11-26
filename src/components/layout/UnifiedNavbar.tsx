import React, { useState } from "react";
import { BurgerMenuIcon } from "../ui/BurgerMenuIcon";
import { MobileMenuPanel } from "../navigation/MobileMenuPanel";
import "../../styles/neon.css";
import { Name } from "../Name";

export const UnifiedNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((open) => !open);

  return (
    <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 bg-black/80 backdrop-blur z-50">
      <Name />
      <BurgerMenuIcon isOpen={menuOpen} onClick={toggleMenu} />
      <MobileMenuPanel isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
};

export default UnifiedNavbar;
