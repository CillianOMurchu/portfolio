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
import { fadeUpPreset } from "../utils/animations";
import { Name } from "./Name";
import { AuthContext } from "../context/AuthContext";
import { usePageNavigation } from "../hooks/usePageNavigation";

export interface NavItem {
  id: string;
  icon: React.ReactNode;
  url: string;
}

const navItems = [
  {
    id: "home",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4.5 10.5V21h15V10.5" />
      </svg>
    ),
    url: "/",
  },
  {
    id: "critical-thinking",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 560" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M207.523,560.316c0,0,194.42-421.925,194.444-421.986l10.79-23.997c-41.824,12.02-135.271,34.902-135.57,35.833    C286.96,122.816,329.017,0,330.829,0c-39.976,0-79.952,0-119.927,0l-12.167,57.938l-51.176,209.995l135.191-36.806    L207.523,560.316z" fill="currentColor" />
      </svg>
    ),
    url: "/critical-thinking",
  },
  {
    id: "music",
    icon: (
      <svg viewBox="0 0 276.164 276.164" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M156.716,61.478c-4.111,6.276-8.881,11.511-14.212,15.609l-8.728,6.962c-13.339,11.855-22.937,21.433-28.542,28.464
          c-10.209,12.788-15.806,25.779-16.65,38.611c-0.942,14.473,3.187,28.21,12.275,40.84c9.636,13.458,21.8,20.754,36.164,21.69
          c3.291,0.218,6.897,0.182,9.896-0.015l-1.121-10.104c-2.09,0.192-4.306,0.223-6.628,0.068c-9.437-0.617-17.864-4.511-25.064-11.573
          c-7.524-7.333-10.895-15.415-10.287-24.7c1.149-17.59,12.562-35.004,33.925-51.792l9.543-7.599
          c8.394-7.174,15.192-16.191,20.216-26.825c4.971-10.556,7.886-21.983,8.673-33.96c0.466-7.037-0.513-15.775-2.874-25.965
          c-3.241-13.839-7.854-20.765-14.136-21.179c-2.232-0.138-4.676,0.986-7.658,3.617c-7.252,6.548-12.523,14.481-15.683,23.542
          c-2.438,6.926-4.057,16.189-4.805,27.529c-0.313,4.72,0.313,13.438,1.805,23.962l8.844-8.192c-0.028-1.183,0.005-2.413,0.096-3.703
          c0.466-7.221,2.289-15.062,5.394-23.293c3.956-10.296,7.689-13.409,10.133-14.204c0.668-0.218,1.32-0.298,2.015-0.254
          c3.185,0.212,6.358,1.559,5.815,9.979C164.664,46.132,161.831,53.693,156.716,61.478z"/>
        <path d="M164.55,209.161c5.728-2.568,10.621-6.478,14.576-11.651c5.055-6.561,7.897-14.316,8.467-23.047
          c0.72-10.719-1.854-20.438-7.617-28.895c-6.322-9.264-14.98-14.317-25.745-15.026c-1.232-0.081-2.543-0.075-3.895,0.025
          l-2.304-17.191l-9.668,7.112l1.483,12.194c-5.789,2.393-10.827,6.17-15.017,11.255c-4.823,5.924-7.508,12.443-7.964,19.382
          c-0.466,7.208,1.142,13.81,4.782,19.583c1.895,3.081,4.507,5.82,7.498,8.058c4.906,3.65,10.563,3.376,11.459,1.393
          c0.906-1.983-2.455-5.095-5.09-9.248c-1.502-2.351-2.242-5.173-2.242-8.497c0-7.053,4.256-13.116,10.317-15.799l5.673,44.211
          l1.325,10.258c0.864,4.873,1.719,9.725,2.537,14.52c1,6.488,1.352,12.112,1.041,16.715c-0.419,6.375-2.408,11.584-5.919,15.493
          c-2.234,2.485-4.844,4.055-7.795,4.925c3.961-3.962,6.414-9.43,6.414-15.478c0-12.075-9.792-21.872-21.87-21.872
          c-3.353,0-6.491,0.812-9.329,2.159c-0.36,0.155-0.699,0.388-1.054,0.574c-0.779,0.425-1.559,0.85-2.286,1.362
          c-0.249,0.187-0.487,0.403-0.732,0.605c-4.888,3.816-8.091,9.616-8.375,16.229c0,0.01-0.011,0.021-0.011,0.031
          c0,0.005,0,0.01,0,0.016c-0.013,0.311-0.09,0.59-0.09,0.896c0,0.259,0.067,0.492,0.078,0.74
          c-0.011,7.084,2.933,13.179,8.839,18.118c5.584,4.666,12.277,7.28,19.892,7.777c4.327,0.28,8.505-0.217,12.407-1.485
          c3.189-1.041,6.275-2.62,9.149-4.687c6.96-5.022,10.75-11.584,11.272-19.532c0.399-6.063,0.094-13.235-0.937-21.411l-2.838-18.429
          l-7.156-52.899c7.984,1.532,14.027,8.543,14.027,16.968c0,5.986-1.937,15.431-5.551,20.376L164.55,209.161z"/>
      </svg>
    ),
    url: "/music",
  },
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
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative flex items-center w-full py-3 px-5 justify-between"
      >
        <div className="flex items-center gap-6">
          <Name />
        </div>
        <motion.nav
          className="flex-1 flex justify-center gap-4"
          {...fadeUpPreset}
        >
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
              className="group relative text-emerald-400 text-xl font-semibold tracking-wide drop-shadow-[0_0_6px_#10b981] capitalize px-8 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <span className="relative z-10">{(() => {
                // Map route to readable name
                if (currentPage === "/music") return "Music";
                if (currentPage === "/critical-thinking") return "Critical Thinking";
                // Add more routes as needed
                // Remove leading slash and capitalize
                return currentPage.replace(/^\//, "").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
              })()}</span>
              {/* Animated border and arrow */}
              <span
                className="pointer-events-none absolute inset-0 rounded-xl border-2 border-emerald-400 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_16px_#10b981] transition-all duration-300 ease-out"
                style={{ zIndex: 1, padding: '0.25rem' }}
              ></span>
              <span
                className="pointer-events-none absolute left-[-2.5rem] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"
                style={{ zIndex: 2 }}
              >
                <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-400">
                  <polygon points="18,6 8,14 18,22" fill="#10b981" className="drop-shadow-[0_0_6px_#10b981]" />
                </svg>
              </span>
              {/* Animated orbs around border */}
              <svg
                className="pointer-events-none absolute inset-0 w-full h-full z-20"
                style={{ pointerEvents: 'none' }}
                width="100%" height="100%" viewBox="0 0 100 40" fill="none"
              >
                <circle
                  className="transition-all duration-500 ease-in-out"
                  cx="50" cy="3" r="4"
                  fill="#10b981"
                  style={{
                    opacity: 0,
                    transformOrigin: '50% 3%',
                  }}
                />
                <circle
                  className="transition-all duration-500 ease-in-out"
                  cx="50" cy="37" r="4"
                  fill="#10b981"
                  style={{
                    opacity: 0,
                    transformOrigin: '50% 37%',
                  }}
                />
                <motion.animate
                  xlinkHref="#"
                  attributeName="opacity"
                  from="0" to="1"
                  begin="button.mouseover"
                  dur="0.2s"
                  fill="freeze"
                />
              </svg>
              <style>{`
                .group:hover .absolute.inset-0 svg circle:first-child {
                  opacity: 1 !important;
                  animation: orb-top-grow 0.5s cubic-bezier(.7,0,.3,1) forwards;
                }
                .group:hover .absolute.inset-0 svg circle:last-child {
                  opacity: 1 !important;
                  animation: orb-bottom-grow 0.5s cubic-bezier(.7,0,.3,1) forwards;
                }
                @keyframes orb-top-grow {
                  0% { stroke-dasharray: 0 100; }
                  100% { stroke-dasharray: 50 50; transform: rotate(180deg); }
                }
                @keyframes orb-bottom-grow {
                  0% { stroke-dasharray: 0 100; }
                  100% { stroke-dasharray: 50 50; transform: rotate(-180deg); }
                }
              `}</style>
            </button>
          )}
        </motion.nav>
        <div className="flex items-center ml-auto">
          {/* Show Sign Out if signed in, else show Google Auth on desktop */}
          {session ? (
            <Button onClick={onLogout} value="Sign Out" />
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
            )
          )}
        </div>
      </motion.div>
    </>
  );
};

export default UnifiedNavbar;
