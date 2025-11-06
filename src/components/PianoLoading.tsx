import React, { useEffect, useState } from 'react';

interface PianoLoadingProps {
  onComplete?: () => void;
  duration?: number;
  debugMode?: boolean;
}

export const PianoLoading: React.FC<PianoLoadingProps> = ({ 
  onComplete, 
  duration = 3000,
  debugMode = false
}) => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  
  useEffect(() => {
    // Start animation immediately
    setAnimationStarted(true);
    
    // In debug mode, don't auto-complete
    if (debugMode) {
      // Show countdown in debug mode
      const interval = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 100));
      }, 100);
      
      return () => clearInterval(interval);
    }
    
    // Complete after duration in normal mode
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [onComplete, duration, debugMode]);

  // Piano keys configuration - 3 octaves with black keys
  const whiteKeys = Array.from({ length: 21 }, (_, i) => i); // 3 octaves of white keys
  
  // Black keys positioned correctly: groups of 2-3-2-3-2-3 across 3 octaves
  // Pattern per octave: C#, D#, [gap], F#, G#, A#, [gap]
  const blackKeyPositions = [
    // First octave (C D E F G A B = indices 0-6)
    { whiteKeyIndex: 0, note: 'C#', octave: 1 }, // Between C and D
    { whiteKeyIndex: 1, note: 'D#', octave: 1 }, // Between D and E
    // Skip E-F (no black key)
    { whiteKeyIndex: 3, note: 'F#', octave: 1 }, // Between F and G
    { whiteKeyIndex: 4, note: 'G#', octave: 1 }, // Between G and A
    { whiteKeyIndex: 5, note: 'A#', octave: 1 }, // Between A and B
    // Skip B-C (no black key)
    
    // Second octave (C D E F G A B = indices 7-13)
    { whiteKeyIndex: 7, note: 'C#', octave: 2 },  // Between C and D
    { whiteKeyIndex: 8, note: 'D#', octave: 2 },  // Between D and E
    // Skip E-F
    { whiteKeyIndex: 10, note: 'F#', octave: 2 }, // Between F and G
    { whiteKeyIndex: 11, note: 'G#', octave: 2 }, // Between G and A
    { whiteKeyIndex: 12, note: 'A#', octave: 2 }, // Between A and B
    // Skip B-C
    
    // Third octave (C D E F G A B = indices 14-20)
    { whiteKeyIndex: 14, note: 'C#', octave: 3 }, // Between C and D
    { whiteKeyIndex: 15, note: 'D#', octave: 3 }, // Between D and E
    // Skip E-F
    { whiteKeyIndex: 17, note: 'F#', octave: 3 }, // Between F and G
    { whiteKeyIndex: 18, note: 'G#', octave: 3 }, // Between G and A
    { whiteKeyIndex: 19, note: 'A#', octave: 3 }, // Between A and B
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center z-50">
      {/* Debug controls */}
      {debugMode && (
        <div className="absolute top-4 left-4 bg-black/50 text-white p-4 rounded-lg z-20 animate-glow-border">
          <h3 className="font-bold mb-2">🎹 Piano Loading Debug</h3>
          <p className="text-sm mb-2">URL: <code className="bg-gray-700 px-1 rounded">?debug=loading</code></p>
          <p className="text-sm mb-2">Duration: {(duration/1000).toFixed(1)}s</p>
          <p className="text-sm mb-2">Remaining: {(timeRemaining/1000).toFixed(1)}s</p>
          <div className="flex gap-2 mt-3">
            <button 
              onClick={() => window.location.href = window.location.pathname}
              className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-sm transition-all"
            >
              Exit Debug
            </button>
            <button 
              onClick={() => setTimeRemaining(duration)}
              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-all"
            >
              Reset Timer
            </button>
          </div>
        </div>
      )}
      
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Loading text */}
      <div className="text-center mb-16 z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-pulse">
          Creative Portfolio
        </h1>
        <p className="text-xl text-purple-200 animate-fade-in">
          {debugMode ? "🎹 Debug Mode - Styling Piano Animation" : "Loading musical experiences..."}
        </p>
      </div>

      {/* Piano keyboard */}
      <div className="relative flex items-end justify-center mb-8 z-10">
        {/* White keys container */}
        <div className="flex relative">
          {whiteKeys.map((keyIndex) => {
            // Musical note pattern: C, D, E, F, G, A, B (repeating)
            const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
            const noteName = noteNames[keyIndex % 7];
            const octave = Math.floor(keyIndex / 7) + 1;
            
            return (
              <div
                key={`white-${keyIndex}`}
                className={`
                  w-8 md:w-12 h-32 md:h-48 bg-white border border-gray-300
                  transform transition-all duration-150 ease-out cursor-pointer
                  hover:bg-gray-100 active:bg-gray-200 relative
                  ${animationStarted ? 'animate-piano-key' : ''}
                  ${debugMode ? 'hover:scale-105' : ''}
                `}
                style={{
                  animationDelay: `${keyIndex * 50}ms`,
                  transformOrigin: 'bottom',
                }}
                onClick={() => debugMode && console.log(`White key ${keyIndex} pressed: ${noteName}${octave}`)}
              >
                {debugMode && (
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-800">
                    {noteName}
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Black keys positioned absolutely within the white keys container */}
          {blackKeyPositions.map((blackKey, index) => {
            // Calculate position: each white key is 32px (mobile) or 48px (desktop) wide
            const whiteKeyWidth = window.innerWidth > 768 ? 48 : 32;
            // Position black key at the boundary between two white keys
            const leftPosition = (blackKey.whiteKeyIndex + 1) * whiteKeyWidth - 16; // Center on the border
            
            return (
              <div
                key={`black-${index}`}
                className={`
                  absolute top-0 w-5 md:w-8 h-20 md:h-32 bg-gray-900
                  transform transition-all duration-150 ease-out cursor-pointer
                  hover:bg-gray-800 active:bg-gray-700
                  ${animationStarted ? 'animate-piano-key-black' : ''}
                  ${debugMode ? 'hover:scale-105' : ''}
                `}
                style={{
                  left: `${leftPosition}px`,
                  animationDelay: `${index * 60 + 200}ms`,
                  transformOrigin: 'bottom',
                  zIndex: 10,
                }}
                onClick={() => debugMode && console.log(`Black key ${index} pressed: ${blackKey.note}${blackKey.octave}`)}
              >
                {debugMode && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white">
                    {blackKey.note}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Loading progress bar */}
      <div className="w-64 md:w-96 h-2 bg-gray-700 rounded-full overflow-hidden z-10">
        <div 
          className={`h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full ${debugMode ? '' : 'animate-loading-bar'}`}
          style={{ 
            animationDuration: debugMode ? '0s' : `${duration}ms`,
            width: debugMode ? `${Math.max(0, 100 - (timeRemaining / duration) * 100)}%` : '0%'
          }}
        />
      </div>

      {/* Musical notes floating animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white text-2xl md:text-4xl opacity-30 animate-float-note"
            style={{
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 800}ms`,
              animationDuration: '4s',
            }}
          >
            ♪
          </div>
        ))}
        {[...Array(6)].map((_, i) => (
          <div
            key={`note2-${i}`}
            className="absolute text-purple-300 text-xl md:text-3xl opacity-40 animate-float-note-reverse"
            style={{
              right: `${5 + i * 15}%`,
              animationDelay: `${i * 1000 + 2000}ms`,
              animationDuration: '5s',
            }}
          >
            ♫
          </div>
        ))}
      </div>

      {/* Debug info overlay */}
      {debugMode && (
        <div className="absolute bottom-4 right-4 bg-black/50 text-white p-3 rounded-lg text-sm z-20 animate-pulse-debug">
          <p className="mb-1">Keys: {whiteKeys.length} white, {blackKeyPositions.length} black</p>
          <p className="mb-1">Animation: <span className={animationStarted ? 'text-green-400' : 'text-yellow-400'}>{animationStarted ? 'Active' : 'Pending'}</span></p>
          <p className="mb-1">Mouse: Click keys to test interaction</p>
          <p className="text-xs opacity-75">Press ESC to exit debug mode</p>
        </div>
      )}
    </div>
  );
};

export default PianoLoading;