import React from "react";
import type { IconType } from "react-icons/lib";
import { useNavigate } from "react-router-dom";

interface NavMenuItemProps {
  href: string;
  icon: IconType;
  children: React.ReactNode;
  onNavigate?: () => void;
  selected?: boolean;
}

export function NavMenuItem({ href, icon: Icon, children, onNavigate, selected }: NavMenuItemProps) {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(href, { replace: false });
    if (onNavigate) onNavigate();
  };
  return (
    <a
      href={href}
      className={`flex items-center gap-3 text-accent neon text-lg font-bold px-4 py-2 rounded transition-colors hover:bg-accent-hover ${selected ? "nav-menu-item-selected" : ""}`}
      onClick={handleClick}
    >
      <Icon className="w-5 h-5" />
      {children}
    </a>
  );
}
