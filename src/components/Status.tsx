import React, { useState, useEffect } from "react";

interface StatusProps {
  isActive?: boolean;
  animateToActive?: boolean;
}

export const Status: React.FC<StatusProps> = ({ isActive = false, animateToActive = false }) => {
  const [animatedActive, setAnimatedActive] = useState(isActive);

  useEffect(() => {
    if (animateToActive && !animatedActive) {
      // Delay the activation animation to sync with orb landing
      const timer = setTimeout(() => {
        setAnimatedActive(true);
      }, 1200); // Wait for orb to almost reach destination

      return () => clearTimeout(timer);
    }
  }, [animateToActive, animatedActive]);

  const displayActive = animatedActive || isActive;

  return (
    <div className={`
      inline-flex items-center px-4 py-2 rounded-md font-medium text-sm
      border-2 transition-all duration-500 ease-in-out
      bg-slate-800 shadow-lg text-gray-400
      ${displayActive ? 'border-emerald-400' : 'border-gray-500'}
    `}>
      <span className="mr-2">
        Active
      </span>
      <div className={`
        w-3 h-3 rounded-full transition-all duration-500 ease-in-out
        ${displayActive
          ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50'
          : 'bg-red-400 shadow-lg shadow-red-400/50'
        }
      `}
      style={displayActive ? {
        boxShadow: '0 0 10px rgba(52, 211, 153, 0.6), 0 0 20px rgba(52, 211, 153, 0.4)',
        filter: 'drop-shadow(0 0 8px rgba(52, 211, 153, 0.8))'
      } : {
        boxShadow: '0 0 10px rgba(248, 113, 113, 0.4), 0 0 20px rgba(248, 113, 113, 0.2)',
        filter: 'drop-shadow(0 0 6px rgba(248, 113, 113, 0.6))'
      }}
      />
    </div>
  );
};