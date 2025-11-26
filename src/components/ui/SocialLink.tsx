import React from "react";
import type { IconType } from "react-icons/lib";

interface SocialLinkProps {
  href: string;
  icon: IconType;
  children: React.ReactNode;
}

export const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  icon: Icon,
  children,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3  text-lg font-bold px-4 py-2 rounded hover:bg-emerald-900/30 "
    style={{ textDecoration: "none", textShadow: "var(--neon-glow-secondary)" }}
  >
    <Icon
      className="w-5 h-5 neon"
      style={{ textShadow: "var(--neon-glow-primary)" }}
    />
    <span className="text-base" style={{ textShadow: "var(--neon-glow-secondary)" }}>
      {children}
    </span>
  </a>
);
