// NeonIcon: applies green neon effect to any icon/element
const NeonIcon: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <span
    className={[
      "text-emerald-400 drop-shadow-[0_0_6px_#10b981]",
      className || "",
    ].join(" ")}
    style={{ filter: "drop-shadow(0 0 8px #10b981)" }}
  >
    {children}
  </span>
);
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./Button";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../hooks/useAuth";
import { useAuth } from "../hooks/useAuth";
import { Name } from "./Name";
import { AuthContext } from "../context/AuthContext";
import { usePageNavigation } from "../hooks/usePageNavigation";

export interface NavItem {
  id: string;
  icon: string | React.ReactElement;
  url: string;
}

import apexLegendsIcon from "../assets/apex-legends-icon.svg"; // Adjust path as needed

const navItems = [
  {
    id: "home",
    icon: "🏠",
    url: "/",
  },
  {
    id: "critical-thinking",
    icon: "🧠",
    url: "/critical-thinking",
  },
  {
    id: "music",
    icon: "\ud83c\udfb5",
    url: "/music",
  },
  // add one for streaming twitch apex legends
  {
    id: "streaming",
    icon: (
      <img
        src={apexLegendsIcon}
        alt="Apex Legends"
        style={{ width: 24, height: 24, display: "inline-block", verticalAlign: "middle" }}
      />
    ),
    url: "/streaming",
  }
];

interface NavItemsProps {
  navItems: NavItem[];
  currentPage: string;
  onNavigate: (url: string) => void;
}

const NavItems: React.FC<NavItemsProps> = ({
  navItems,
  currentPage,
  onNavigate,
}) => (
  <>
    {navItems
      .filter((item) => item.url !== currentPage)
      .map((item) => (
        <motion.div
          onClick={() => onNavigate(item.url)}
          key={item.id}
          className="cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <NeonIcon className="text-3xl">{item.icon}</NeonIcon>
        </motion.div>
      ))}
  </>
);

export const UnifiedNavbar: React.FC = () => {
  const auth = useContext(AuthContext);
  const { onLogout } = auth!;
  const navigate = useNavigate();
  const { currentPage } = usePageNavigation();
  const { session } = useAuth();
  const [isMobile, setIsMobile] = React.useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.75, 0.5, 1.25] }}
        className="relative flex items-center w-full py-3 px-5 justify-between min-h-150px"
      >
        <div className="flex items-center gap-6 border-2relative name-container absoloute bottom-0">
          <Name />
        </div>
        <motion.nav className="absolute left-1/2 transform -translate-x-1/2 flex justify-center gap-4 z-20">
          {currentPage === "/" ? (
            <NavItems
              navItems={navItems}
              currentPage={currentPage}
              onNavigate={navigate}
            />
          ) : (
            <button
              type="button"
              onClick={() => navigate("/")}
              className="group relative pointer-events-auto text-emerald-400 text-xl font-semibold tracking-wide drop-shadow-[0_0_6px_#10b981] capitalize sm:px-4 sm:py-2 px-8 py-3 outline-none bg-transparent mt-0 grid align-middle"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <span className="relative z-10 text-sm sm:text-xl">
                {(() => {
                  if (currentPage === "/music") return "Music";
                  if (currentPage === "/critical-thinking")
                    return "Critical Thinking";
                  return currentPage
                    .replace(/^\//, "")
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase());
                })()}
              </span>
              {/* Animated border and arrow */}
              <span
                className="pointer-events-none absolute inset-0 rounded-xl border-2 border-emerald-400 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_16px_#10b981]"
                style={{
                  zIndex: 1,
                  padding: "0.25rem",
                  transition: "all 0.3s cubic-bezier(.25,.75,.5,1.25)",
                }}
              ></span>
              <span
                className="pointer-events-none absolute left-[-2.5rem] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                style={{ 
                  zIndex: 2,
                  transition: "all 0.3s cubic-bezier(.25,.75,.5,1.25)",
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-emerald-400"
                >
                  <polygon
                    points="18,6 8,14 18,22"
                    fill="#10b981"
                    className="drop-shadow-[0_0_6px_#10b981]"
                  />
                </svg>
              </span>
            </button>
          )}
        </motion.nav>
        <div className="flex items-center ml-auto">
          {/* Show Sign Out if signed in, else show Google Auth on desktop */}
          {session ? (
            <div className="relative flex items-center">
              {/* Animated LOGOUT letters */}
              <motion.div
                className="flex items-center mr-2 overflow-hidden"
                initial={{ width: 0 }}
                animate={isLogoutHovered ? { width: "auto" } : { width: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.75, 0.5, 1.25] }}
              >
                <span
                  className="text-emerald-400 font-mono text-lg font-bold whitespace-nowrap"
                  style={{
                    textShadow: `0 0 5px rgba(16,185,129,0.8),0 0 10px rgba(16,185,129,0.6),0 0 15px rgba(16,185,129,0.4),0 0 20px rgba(16,185,129,0.3)`,
                  }}
                >
                  LOGOUT
                </span>
              </motion.div>
              
              <Button 
                onClick={onLogout} 
                onMouseEnter={() => setIsLogoutHovered(true)}
                onMouseLeave={() => setIsLogoutHovered(false)}
                value="Sign Out" 
              />
            </div>
          ) : (
            !isMobile && (
              <Auth
                onlyThirdPartyProviders
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  style: {
                    button: {
                      borderRadius: "0.75rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      padding: "0.75rem 1rem",
                      background: "transparent",
                      border: "1px solid #ccc",
                      cursor: "pointer",
                      transition: "all 0.2s cubic-bezier(.25,.75,.5,1.25)",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    },
                    container: {
                      display: "flex",
                      flexDirection: "column",
                    },
                  },
                }}
                theme="light"
                providers={["google"]}
                view="sign_in"
                showLinks={false}
                redirectTo={`${window.location.origin}/`}
              />
            )
          )}
        </div>
      </motion.div>
    </>
  );
};

export default UnifiedNavbar;
