import React, { useState } from "react";
import { BurgerMenuIcon } from "../ui/BurgerMenuIcon";
import { MobileMenuPanel } from "./MobileMenuPanel";

export const MobileMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <BurgerMenuIcon isOpen={menuOpen} onClick={toggleMenu} />
      <MobileMenuPanel isOpen={menuOpen} onClose={closeMenu} />
    </>
  );
};
