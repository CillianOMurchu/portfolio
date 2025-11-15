import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface OrbAnimationContextType {
  triggerOrbAnimation: () => void;
  isAnimating: boolean;
}

const OrbAnimationContext = createContext<OrbAnimationContextType | undefined>(undefined);

export const useOrbAnimation = () => {
  const context = useContext(OrbAnimationContext);
  if (!context) {
    throw new Error('useOrbAnimation must be used within an OrbAnimationProvider');
  }
  return context;
};

interface OrbAnimationProviderProps {
  children: ReactNode;
}

export const OrbAnimationProvider: React.FC<OrbAnimationProviderProps> = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerOrbAnimation = () => {
    setIsAnimating(true);
    // Animation will be handled by the component that renders the orb
    setTimeout(() => setIsAnimating(false), 2000); // Reset after animation
  };

  return (
    <OrbAnimationContext.Provider value={{ triggerOrbAnimation, isAnimating }}>
      {children}
    </OrbAnimationContext.Provider>
  );
};