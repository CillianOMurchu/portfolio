import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicalIconProps {
  onExitComplete: () => void;
  isAnimatingOut: boolean;
}

export const MusicalIcon: React.FC<MusicalIconProps> = ({ onExitComplete, isAnimatingOut }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {!isAnimatingOut && (
        <motion.div
          className="relative group cursor-pointer"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ 
            scale: 0,
            rotate: 360,
            x: -200,
            y: -100,
            opacity: 0,
            transition: { duration: 0.8, ease: "backIn" }
          }}
          transition={{
            duration: 0.6, 
            ease: "backOut"
          }}
        >
          {/* Main musical note container */}
          <motion.div
            className="relative w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl shadow-lg"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)",
              background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #ef4444 100%)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={isHovered ? {
              background: [
                "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #ef4444 100%)",
                "linear-gradient(135deg, #ec4899 0%, #ef4444 50%, #8b5cf6 100%)",
                "linear-gradient(135deg, #ef4444 0%, #8b5cf6 50%, #ec4899 100%)",
                "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #ef4444 100%)"
              ]
            } : {}}
            transition={{
              background: { duration: 2, repeat: isHovered ? Infinity : 0, ease: "linear" },
              scale: { duration: 0.2 },
              boxShadow: { duration: 0.2 }
            }}
          >
            {/* Floating musical notes */}
            <AnimatePresence>
              {isHovered && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-white text-lg font-bold"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${10 + i * 20}%`,
                      }}
                      initial={{ opacity: 0, y: 0, scale: 0.5 }}
                      animate={{
                        opacity: [0, 1, 0],
                        y: -30,
                        scale: [0.5, 1, 0.5],
                        rotate: [0, 180, 360]
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    >
                      ♪
                    </motion.div>
                  ))}
                  
                  {[...Array(2)].map((_, i) => (
                    <motion.div
                      key={`note2-${i}`}
                      className="absolute text-white text-sm font-bold"
                      style={{
                        right: `${10 + i * 25}%`,
                        bottom: `${15 + i * 30}%`,
                      }}
                      initial={{ opacity: 0, y: 0, scale: 0.3 }}
                      animate={{
                        opacity: [0, 1, 0],
                        y: -25,
                        scale: [0.3, 0.8, 0.3],
                        rotate: [0, -90, -180]
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 1.8,
                        delay: 0.5 + i * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      ♫
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Main musical note symbol */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-white text-2xl font-bold"
                animate={isHovered ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                } : {}}
                transition={{
                  duration: 0.6,
                  repeat: isHovered ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                🎵
              </motion.span>
            </div>

            {/* Ripple effect on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-white"
                  initial={{ scale: 0.8, opacity: 0.6 }}
                  animate={{
                    scale: [0.8, 1.3],
                    opacity: [0.6, 0]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 opacity-50 blur-md -z-10"
            animate={isHovered ? {
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            } : {}}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut"
            }}
          />

          {/* Text label */}
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-black bg-opacity-80 text-white text-sm rounded-lg whitespace-nowrap"
            initial={{ opacity: 0, y: -5 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : -5 
            }}
            transition={{ duration: 0.2 }}
          >
            Music Studio
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};