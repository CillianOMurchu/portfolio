import React from 'react';
import { motion } from 'framer-motion';
import { RedVelvetBackground } from '../features/visual-effects';

interface MusicPageProps {
  onBack: () => void;
}

export const MusicPage: React.FC<MusicPageProps> = ({ onBack }) => {
  return (
    <RedVelvetBackground 
      noteCount={35}
      noteColor="text-rose-300"
      noteOpacity={0.7}
      rainSpeed="medium"
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
          className="absolute top-8 left-8 px-6 py-3 bg-black/30 backdrop-blur-sm text-rose-200 rounded-xl hover:bg-black/50 transition-all duration-300 border border-rose-400/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Home
        </motion.button>

        {/* Main Content */}
        <div className="text-center space-y-8">
          {/* Music Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7, type: "spring", bounce: 0.3 }}
            className="text-9xl mb-6"
          >
            🎵
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-white text-7xl font-bold mb-6 tracking-tight"
          >
            Music Studio
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-rose-200 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Welcome to the creative space where melodies come to life. 
            Experience the art of sound in a luxurious velvet atmosphere.
          </motion.p>

          {/* Music Player Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-rose-400/20"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                  🎼
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white text-lg font-semibold">Now Playing</p>
                  <p className="text-rose-300 text-sm">Your favorite melodies</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-rose-300 text-2xl font-bold">Velvet Dreams</h3>
                <p className="text-rose-400">Studio Sessions</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full bg-rose-900/30 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-rose-400 to-purple-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 2, delay: 1.5 }}
                  />
                </div>
                <div className="flex justify-between text-rose-400 text-sm">
                  <span>2:34</span>
                  <span>4:12</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center space-x-6 pt-4">
                <button className="text-rose-300 hover:text-white transition-colors text-2xl">⏮</button>
                <button className="text-white bg-gradient-to-r from-rose-400 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center hover:from-rose-300 hover:to-purple-400 transition-all text-xl">
                  ▶️
                </button>
                <button className="text-rose-300 hover:text-white transition-colors text-2xl">⏭</button>
              </div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex items-center justify-center space-x-8 text-rose-300"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">🎸</div>
              <p className="text-sm">Guitar</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🥁</div>
              <p className="text-sm">Drums</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🎹</div>
              <p className="text-sm">Piano</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🎤</div>
              <p className="text-sm">Vocals</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </RedVelvetBackground>
  );
};

export default MusicPage;