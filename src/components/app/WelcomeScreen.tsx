import React from "react";
import UnifiedNavbar from "../UnifiedNavbar";
import type { NavItem } from "../UnifiedNavbar";

interface WelcomeScreenProps {
  onMusicClick: () => void;
  onBarebellsClick: () => void;
  isMusicIconAnimatingOut: boolean;
  onMusicIconExitComplete: () => void;
  isBarebellsIconAnimatingOut: boolean;
  onBarebellsIconExitComplete: () => void;
  clickedIcon: 'music' | 'barebells' | null;
  onLogout: () => Promise<void>;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onMusicClick,
  onBarebellsClick,
  isMusicIconAnimatingOut,
  onMusicIconExitComplete,
  isBarebellsIconAnimatingOut,
  onBarebellsIconExitComplete,
  clickedIcon,
  onLogout,
}) => {
  const handleLogout = async () => {
    await onLogout();
  };

  // Define navigation items
  const navItems: NavItem[] = [
    {
      id: 'music',
      icon: '🎵',
      glowColor: '#a855f7',
      shadowColor: 'rgba(168, 85, 247, 0.6)',
      textColor: 'text-white',
      onClick: onMusicClick,
      onExitComplete: onMusicIconExitComplete,
      isAnimatingOut: isMusicIconAnimatingOut
    },
    {
      id: 'barebells',
      icon: '🍫',
      glowColor: '#f59e0b',
      shadowColor: 'rgba(245, 158, 11, 0.6)',
      textColor: 'text-amber-200',
      onClick: onBarebellsClick,
      onExitComplete: onBarebellsIconExitComplete,
      isAnimatingOut: isBarebellsIconAnimatingOut
    }
  ];

  return (
    <>
      {/* Main Page Content */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-xl">
            <span className="text-3xl font-bold text-white">C</span>
          </div>
          <h1 className="text-center text-7xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text">
            Welcome
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto" />
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

      {/* Unified Navigation Navbar */}
      <UnifiedNavbar 
        items={navItems}
        clickedIcon={clickedIcon}
      />
    </>
  );
};

export default WelcomeScreen;