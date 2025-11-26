import React from "react";
import type { IconType } from "react-icons/lib";

interface NavMenuItemProps {
  href: string;
  icon: IconType;
  children: React.ReactNode;
  onClick?: () => void;
}

export const NavMenuItem: React.FC<NavMenuItemProps> = ({ href, icon: Icon, children, onClick }) => (
  <a
    href={href}
    className="flex items-center gap-3 text-emerald-400 neon text-lg font-bold px-4 py-2 rounded hover:bg-emerald-900/30 transition-colors"
    onClick={onClick}
  >
    <Icon className="w-5 h-5" />
    {children}
  </a>
);
