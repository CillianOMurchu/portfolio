import React from 'react';
import { RedVelvetBackground } from '../features/visual-effects';

export const RedVelvetDemo: React.FC = () => {
  return (
    <RedVelvetBackground 
      noteCount={30}
      noteColor="text-rose-300"
      noteOpacity={0.7}
      rainSpeed="medium"
      className="min-h-screen"
    >
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-6">
          <div className="text-8xl">🎵</div>
          <h1 className="text-white text-6xl font-bold mb-4">
            Music Studio
          </h1>
          <p className="text-rose-200 text-xl max-w-md">
            Experience the magic of music with our luxurious red velvet atmosphere
          </p>
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 mt-8">
            <p className="text-white text-lg mb-2">Now Playing</p>
            <p className="text-rose-300 text-2xl font-semibold">Velvet Dreams</p>
            <p className="text-rose-400">by Studio Artist</p>
          </div>
        </div>
      </div>
    </RedVelvetBackground>
  );
};

export default RedVelvetDemo;