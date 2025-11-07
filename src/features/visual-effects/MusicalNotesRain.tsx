import React, { useEffect, useState } from 'react';

interface MusicalNote {
  id: number;
  symbol: string;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

interface MusicalNotesRainProps {
  noteCount?: number;
  color?: string;
  opacity?: number;
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
}

const musicalSymbols = ['♪', '♫', '♬', '♭', '♯', '𝄞', '𝄢', '♩', '♮'];

export const MusicalNotesRain: React.FC<MusicalNotesRainProps> = ({
  noteCount = 25,
  color = 'text-rose-400',
  opacity = 0.7,
  speed = 'medium',
  className = ''
}) => {
  const [notes, setNotes] = useState<MusicalNote[]>([]);

  const speedMultiplier = {
    slow: 1.5,
    medium: 1,
    fast: 0.6
  }[speed];

  useEffect(() => {
    const generateNotes = () => {
      const newNotes: MusicalNote[] = [];
      
      for (let i = 0; i < noteCount; i++) {
        newNotes.push({
          id: i,
          symbol: musicalSymbols[Math.floor(Math.random() * musicalSymbols.length)],
          x: Math.random() * 100, // Percentage position
          size: Math.random() * 20 + 16, // Size between 16px and 36px
          duration: (Math.random() * 3 + 4) * speedMultiplier, // Duration between 4-7 seconds
          delay: Math.random() * 5, // Delay between 0-5 seconds
          rotation: Math.random() * 360 // Initial rotation
        });
      }
      
      setNotes(newNotes);
    };

    generateNotes();
  }, [noteCount, speedMultiplier]);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {notes.map((note) => (
        <div
          key={note.id}
          className={`absolute animate-rain-drop ${color}`}
          style={{
            left: `${note.x}%`,
            fontSize: `${note.size}px`,
            opacity: opacity,
            animationDuration: `${note.duration}s`,
            animationDelay: `${note.delay}s`,
            transform: `rotate(${note.rotation}deg)`,
            userSelect: 'none'
          }}
        >
          {note.symbol}
        </div>
      ))}
    </div>
  );
};

export default MusicalNotesRain;