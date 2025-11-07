import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

const PageTransition: React.FC<PageTransitionProps> = ({ isActive, onComplete }) => {
  const [stage, setStage] = useState<'hidden' | 'fade' | 'complete'>('hidden');

  useEffect(() => {
    if (isActive) {
      // Jump straight to fade
      setStage('fade');

      // After 0.8 seconds, complete transition
      const completeTimer = setTimeout(() => {
        setStage('complete');
        onComplete();
      }, 800);

      return () => {
        clearTimeout(completeTimer);
      };
    } else {
      setStage('hidden');
    }
  }, [isActive, onComplete]);

  if (!isActive && stage === 'hidden') return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Fade Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: stage === 'fade' || stage === 'complete' ? 1 : 0 
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="absolute inset-0 bg-gradient-to-br from-purple-900/95 to-pink-900/95"
      />
    </div>
  );
};

export default PageTransition;