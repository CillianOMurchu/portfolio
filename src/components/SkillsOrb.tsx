import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load the heavy HolographicSkillsSphere component
const HolographicSkillsSphere = lazy(() => 
  import("../features").then((module) => ({ default: module.HolographicSkillsSphere }))
);

const SkillsOrb: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [showSphere, setShowSphere] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    // Small delay before showing the sphere to allow lightbulb animation
    setTimeout(() => {
      setShowSphere(true);
    }, 300);
  };

  return (
    <>
      {/* Glowing Orb / Lightbulb */}
      <motion.button
        onClick={handleClick}
        className="relative w-12 h-12 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-300/50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glowing background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-blue-400 rounded-full blur-sm"
        />
        
        {/* Main orb */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px rgba(59, 130, 246, 0.5)',
              '0 0 30px rgba(59, 130, 246, 0.8)',
              '0 0 20px rgba(59, 130, 246, 0.5)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center"
        >
          {/* Icon that transforms */}
          <motion.div
            animate={{
              rotate: isClicked ? 360 : 0,
              scale: isClicked ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="text-white text-lg"
          >
            {isClicked ? '💡' : '🔮'}
          </motion.div>
        </motion.div>
      </motion.button>

      {/* Holographic Skills Sphere */}
      <AnimatePresence>
        {showSphere && (
          <Suspense fallback={null}>
            <div className="fixed inset-0 z-[70]">
              <HolographicSkillsSphere 
                buttonText="View Skills"
              />
            </div>
          </Suspense>
        )}
      </AnimatePresence>
    </>
  );
};

export default SkillsOrb;