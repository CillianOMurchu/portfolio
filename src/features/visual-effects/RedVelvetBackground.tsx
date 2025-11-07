import React from 'react';
import { MusicalNotesRain } from './MusicalNotesRain';

interface RedVelvetBackgroundProps {
  children?: React.ReactNode;
  noteCount?: number;
  noteColor?: string;
  noteOpacity?: number;
  rainSpeed?: 'slow' | 'medium' | 'fast';
  className?: string;
  style?: React.CSSProperties;
}

export const RedVelvetBackground: React.FC<RedVelvetBackgroundProps> = ({
  children,
  noteCount = 25,
  noteColor = 'text-rose-400',
  noteOpacity = 0.6,
  rainSpeed = 'medium',
  className = '',
  style = {}
}) => {
  return (
    <div 
      className={`relative size-full bg-gradient-to-br from-slate-900 via-red-950 to-slate-950 ${className}`}
      style={style}
    >
      {/* Red velvet texture overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(220, 38, 38, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Subtle texture pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.05) 2px,
              rgba(255, 255, 255, 0.05) 4px
            )
          `
        }}
      />

      {/* Musical notes rain effect */}
      <MusicalNotesRain 
        noteCount={noteCount}
        color={noteColor}
        opacity={noteOpacity}
        speed={rainSpeed}
      />

      {/* Content */}
      {children && (
        <div className="relative z-10 size-full">
          {children}
        </div>
      )}
    </div>
  );
};

export default RedVelvetBackground;