import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./Button";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../hooks/useAuth";
import { useAuth } from "../hooks/useAuth";
import { fadeUpPreset } from "../utils/animations";
import { Name } from "./Name";
import { AuthContext } from "../context/AuthContext";
import { usePageNavigation } from "../hooks/usePageNavigation";

export interface NavItem {
  id: string;
  icon: string;
  url: string;
}


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
];

interface NavItemsProps {
  navItems: NavItem[];
  currentPage: string;
  onNavigate: (url: string) => void;
}

const NavItems: React.FC<NavItemsProps> = ({ navItems, currentPage, onNavigate }) => (
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
          <span className="text-3xl">{item.icon}</span>
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
        transition={{ duration: 0.7, delay: .2 }}
        className="relative flex items-center w-full py-3 px-5"
      >
        <div className="flex items-center gap-6">
          <Name />
        </div>
        <motion.nav className="flex-1 flex justify-center gap-4" {...fadeUpPreset}>
          <NavItems navItems={navItems} currentPage={currentPage} onNavigate={navigate} />
        </motion.nav>
        {/* Show Sign Out if signed in, else show Google Auth on desktop */}
        {session ? (
          <Button onClick={onLogout} value="Sign Out" />
        ) : (
          !isMobile && (
            <div className="flex items-center ml-auto">
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
                      transition: "all 0.2s ease",
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
            </div>
          )
        )}
      </motion.div>
    </>
  );
};

export default UnifiedNavbar;
