import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LinkProps {
  onExitComplete: () => void;
  isAnimatingOut: boolean;
  isClicked?: boolean;
  icon: string;
  glowColor: string;
  shadowColor: string;
  textColor?: string;
}

export const Link: React.FC<LinkProps> = ({ 
  onExitComplete, 
  isAnimatingOut, 
  isClicked = false,
  icon,
  glowColor,
  shadowColor,
  textColor = "text-white"
}) => {

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {!isAnimatingOut && (
        <motion.div
          className="relative group cursor-pointer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ 
            y: isClicked ? -800 : 0,
            opacity: 0,
            scale: isClicked ? [1, 1.2, 0.8] : 1,
            rotate: isClicked ? [0, -5, 5, 0] : 0,
            filter: isClicked ? `brightness(1.5) drop-shadow(0 0 20px ${shadowColor})` : "brightness(1)",
            transition: isClicked ? { 
              duration: 1.2, 
              ease: [0.25, 0.46, 0.45, 0.94],
              y: { duration: 1.2, ease: "easeIn" },
              scale: { duration: 0.4, ease: "easeOut" },
              rotate: { duration: 0.6, ease: "easeInOut" }
            } : { 
              duration: 0.4, 
              ease: "easeOut" 
            }
          }}
          transition={{
            duration: 0.5, 
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {/* Main container */}
          <div
            className="relative w-16 h-16 btn-glass rounded-2xl"
          >
            {/* Rocket trail particles when clicked */}
            {isClicked && (
              <>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`trail-${i}`}
                    className="absolute w-2 h-2 bg-orange-400 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: '-4px',
                      marginTop: '-4px',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      y: [0, 20 + i * 10],
                      x: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 20],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: "easeOut",
                      repeat: 3,
                    }}
                  />
                ))}
                
                {/* Main rocket flame */}
                <motion.div
                  className="absolute w-4 h-8 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full blur-sm"
                  style={{
                    left: '50%',
                    top: '100%',
                    marginLeft: '-8px',
                  }}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scaleY: [0, 1, 1.5, 0],
                    scaleX: [1, 0.8, 1.2, 0.5],
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                  }}
                />
              </>
            )}

            {/* Main icon symbol */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={`${textColor} text-2xl font-bold`}
              >
                {icon}
              </span>
            </div>

            {/* Static glow effect */}
            <div
              className="absolute inset-0 rounded-2xl blur-md -z-10"
              style={{ background: `linear-gradient(135deg, ${glowColor}20, ${glowColor}10)`, opacity: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Link;