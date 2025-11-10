import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from './Link';

export interface NavItem {
  id: string;
  icon: string;
  glowColor: string;
  shadowColor: string;
  textColor?: string;
  onClick: () => void;
  onExitComplete: () => void;
  isAnimatingOut: boolean;
}

interface UnifiedNavbarProps {
  items: NavItem[];
  clickedIcon: string | null;
  className?: string;
}

export const UnifiedNavbar: React.FC<UnifiedNavbarProps> = ({
  items,
  clickedIcon,
  className = "fixed top-6 left-6 z-[60]"
}) => {
  return (
    <motion.nav 
      className={`${className} flex items-center gap-6`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <AnimatePresence>
        {items.map((item) => {
          const isClicked = clickedIcon === item.id;
          const anyClicked = clickedIcon !== null;
          
          return (
            <motion.div
              key={item.id}
              onClick={item.onClick}
              // When any item is clicked, non-clicked items fade out quickly
              animate={anyClicked && !isClicked ? {
                opacity: 0
              } : {
                opacity: 1
              }}
              transition={{
                duration: anyClicked && !isClicked ? 0.3 : 0,
                ease: "easeOut"
              }}
            >
              <EnhancedLink 
                onExitComplete={item.onExitComplete}
                isAnimatingOut={item.isAnimatingOut}
                isClicked={isClicked}
                icon={item.icon}
                glowColor={item.glowColor}
                shadowColor={item.shadowColor}
                textColor={item.textColor}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.nav>
  );
};

// Enhanced Link component
interface EnhancedLinkProps {
  onExitComplete: () => void;
  isAnimatingOut: boolean;
  isClicked?: boolean;
  icon: string;
  glowColor: string;
  shadowColor: string;
  textColor?: string;
}

const EnhancedLink: React.FC<EnhancedLinkProps> = ({ 
  onExitComplete, 
  isAnimatingOut, 
  isClicked = false,
  icon,
  glowColor,
  shadowColor,
  textColor = "text-white"
}) => {
  return (
    <Link 
      onExitComplete={onExitComplete}
      isAnimatingOut={isAnimatingOut}
      isClicked={isClicked}
      icon={icon}
      glowColor={glowColor}
      shadowColor={shadowColor}
      textColor={textColor}
    />
  );
};

export default UnifiedNavbar;