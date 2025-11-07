import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HolographicProjectorProps {
  children: React.ReactNode;
  buttonText?: string;
  projectionSize?: {
    width: number;
    height: number;
  };
}

export const HolographicProjector: React.FC<HolographicProjectorProps> = ({
  children,
  buttonText = "View Skills",
  projectionSize = { width: 150, height: 150 }
}) => {
  const [isProjecting, setIsProjecting] = useState(false);

  const toggleProjection = () => {
    setIsProjecting(!isProjecting);
  };

  return (
    <div className="relative inline-block">
      {/* Holographic Projector Button */}
      <motion.button
        onClick={toggleProjection}
        className={`
          relative px-6 py-3 rounded-lg font-semibold text-white
          bg-gradient-to-r from-blue-600 to-blue-800
          hover:from-blue-700 hover:to-blue-900
          transition-all duration-300 ease-out
          shadow-lg hover:shadow-xl
          border border-blue-400
          ${isProjecting ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Button glow effect when projecting */}
        {isProjecting && (
          <motion.div
            className="absolute inset-0 rounded-lg bg-blue-400 opacity-20"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        
        {/* Button text */}
        <span className="relative z-10 flex items-center gap-2">
          {buttonText}
          <motion.div
            className="w-2 h-2 bg-blue-300 rounded-full"
            animate={isProjecting ? {
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            } : {}}
            transition={isProjecting ? {
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
          />
        </span>
      </motion.button>

      {/* Holographic Projection Beam */}
      <AnimatePresence>
        {isProjecting && (
          <>
            {/* Light beam effect */}
            <motion.div
              className="absolute left-1/2 top-full transform -translate-x-1/2"
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: projectionSize.height + 20,
                opacity: 0.3
              }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                height: {
                  duration: 0.8,
                  ease: "easeOut"
                },
                opacity: {
                  duration: 0.3,
                  ease: "easeOut"
                }
              }}
            >
              <div className="w-1 bg-gradient-to-b from-blue-400 to-transparent h-full mx-auto" />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-400 rounded-full opacity-20 blur-sm" />
            </motion.div>

            {/* Holographic Sphere Projection */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2"
              style={{
                width: projectionSize.width,
                height: projectionSize.height,
                marginLeft: -projectionSize.width / 2,
              }}
              initial={{ 
                scale: 0,
                opacity: 0,
                top: 0, // Start at the button
              }}
              animate={{ 
                scale: 1,
                opacity: 1,
                top: projectionSize.height + 30, // End at final position
              }}
              exit={{ 
                scale: 0,
                opacity: 0,
                top: 0, // Return to button
              }}
              transition={{ 
                duration: 0.8,
                delay: 0.1, // Start slightly after beam begins
                ease: "easeOut",
                top: {
                  duration: 0.8,
                  ease: "easeOut"
                },
                scale: {
                  duration: 0.6,
                  delay: 0.3, // Scale up after it starts moving
                  ease: "easeOut"
                },
                opacity: {
                  duration: 0.4,
                  delay: 0.2,
                  ease: "easeOut"
                }
              }}
            >
              {/* Holographic container with glow effect */}
              <div className="relative w-full h-full">
                {/* Outer glow */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-blue-400 opacity-20 blur-lg"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Content container */}
                <div className="relative w-full h-full overflow-hidden rounded-full">
                  {/* Holographic scan lines effect */}
                  <motion.div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      background: `repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 2px,
                        rgba(96, 165, 250, 0.1) 2px,
                        rgba(96, 165, 250, 0.1) 4px
                      )`
                    }}
                    animate={{ x: [-20, 20, -20] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  {/* The actual sphere content */}
                  <div className="relative w-full h-full">
                    {children}
                  </div>
                </div>

                {/* Floating particles around the projection */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full"
                    style={{
                      left: `${20 + (i * 15)}%`,
                      top: `${30 + (i * 10)}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2 + (i * 0.5),
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};