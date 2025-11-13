import React from "react";
import UnifiedNavbar from "../UnifiedNavbar";
import HeroTitle from "../HeroTitle";
import ItemSphere from "../ItemSphere";

interface WelcomeScreenProps {
  onMusicClick: () => void;
  isMusicIconAnimatingOut: boolean;
  onMusicIconExitComplete: () => void;
  clickedIcon: "music" | null;
  onLogout: () => Promise<void>;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onMusicClick,
  isMusicIconAnimatingOut,
  onMusicIconExitComplete,
  clickedIcon,
  onLogout,
}) => {
  const handleLogout = async () => {
    await onLogout();
  };

  // Define navigation items
  const navItems = [
    {
      id: "critical-thinking",
      icon: "🧠",
      glowColor: "#10b981",
      shadowColor: "rgba(16, 185, 129, 0.6)",
      textColor: "text-white",
      onClick: () => {
        window.location.href = "/critical-thinking";
      },
      onExitComplete: () => {},
      isAnimatingOut: false,
    },
    {
      id: "music",
      icon: "\ud83c\udfb5",
      glowColor: "#a855f7",
      shadowColor: "rgba(168, 85, 247, 0.6)",
      textColor: "text-white",
      onClick: onMusicClick,
      onExitComplete: onMusicIconExitComplete,
      isAnimatingOut: isMusicIconAnimatingOut,
    },
  ];

  return (
    <>
      <UnifiedNavbar items={navItems} clickedIcon={clickedIcon} />

      <div className="w-100 h-100 absolute top-0 right-0 -z-10 background-gradient-animation opacity-70">
        <ItemSphere iconSize={20} />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="mb-8">
          <HeroTitle />
        </div>

        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 mb-6 font-medium">
            ✨ Signed in with Google
          </p>
          <button
            onClick={handleLogout}
            className="px-8 py-3 btn-primary rounded-xl font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default WelcomeScreen;
