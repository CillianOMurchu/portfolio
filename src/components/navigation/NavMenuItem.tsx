import React from "react";
import type { IconType } from "react-icons/lib";
import { useNavigate } from "react-router-dom";

interface NavMenuItemProps {
  href: string;
  icon: IconType;
  children: React.ReactNode;
  onNavigate?: () => void;
}

export const NavMenuItem: React.FC<NavMenuItemProps> = ({ href, icon: Icon, children, onNavigate }) => {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(href, { replace: false });
    if (onNavigate) onNavigate();
  };
  return (
    <a
      href={href}
      className="flex items-center gap-3 text-emerald-400 neon text-lg font-bold px-4 py-2 rounded hover:bg-emerald-900/30 transition-colors"
      onClick={handleClick}
    >
      <Icon className="w-5 h-5" />
      {children}
    </a>
  );
};
