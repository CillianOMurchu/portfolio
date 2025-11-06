import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load the heavy 3D component only when modal opens
const InteractiveThreeDBall = React.lazy(() =>
  import("../features").then((module) => ({ default: module.InteractiveThreeDBall }))
);

interface SphereModalProps {
  sphereExpanded: boolean;
  onToggle: () => void;
}

export const SphereModal: React.FC<SphereModalProps> = ({ sphereExpanded, onToggle }) => {
  return (
    <AnimatePresence>
      {sphereExpanded && (
        <>
          {/* White overlay background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-40"
            onClick={onToggle}
          />
          
          {/* Sphere container */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
              scale: { duration: 0.5 },
              opacity: { duration: 0.3 }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="pointer-events-auto">
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-gray-600">Loading 3D Experience...</div>
                  </div>
                }
              >
                <InteractiveThreeDBall
                  options={{
                    width: window.innerWidth,
                    height: window.innerHeight,
                    radius: Math.min(window.innerWidth, window.innerHeight) * 0.30,
                  }}
                />
              </Suspense>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SphereModal;