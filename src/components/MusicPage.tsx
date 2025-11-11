import React from 'react';
import { motion } from 'framer-motion';
import { RedVelvetBackground } from '../features/visual-effects';

interface MusicPageProps {
  onBack: () => void;
}

export const MusicPage: React.FC<MusicPageProps> = ({ onBack }) => {
  return (
    <RedVelvetBackground 
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex flex-col items-center justify-center min-h-screen relative z-10"
      >
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          className="absolute top-8 left-8 px-6 py-3 btn-glass rounded-xl font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Home
        </motion.button>

      </motion.div>
    </RedVelvetBackground>
  );
};

export default MusicPage;