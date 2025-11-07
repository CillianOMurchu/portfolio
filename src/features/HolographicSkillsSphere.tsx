import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DiagonalDescriptions } from './components/DiagonalDescriptions';
import { techInfoData } from './data/techInfo';
import { ThreeDBall } from './3dBall';

interface IconLine {
  id: string;
  iconName: string;
  startX: number;
  startY: number;
}

// Memoized ThreeDBall optimized for holographic projection
const MemoizedHolographicThreeDBall = React.memo<{
  onIconHover: (iconKey: string | null, position: { x: number; y: number } | null) => void;
  onIconClick: (iconKey: string, position: { x: number; y: number }) => void;
}>(({ onIconHover, onIconClick }) => (
  <ThreeDBall
    options={{
      width: 150,
      height: 150,
      radius: 65, // Smaller radius for 150px sphere
      iconSize: 24, // Smaller icons for compact sphere
      initialVelocityX: 0.01,
      initialVelocityY: 0.015,
    }}
    onIconHover={onIconHover}
    onIconClick={onIconClick}
    isInteractionDisabled={false}
  />
), (prevProps, nextProps) => {
  return prevProps.onIconHover === nextProps.onIconHover && 
         prevProps.onIconClick === nextProps.onIconClick;
});

MemoizedHolographicThreeDBall.displayName = 'MemoizedHolographicThreeDBall';

export const HolographicSkillsSphere: React.FC = () => {
  const [iconLines, setIconLines] = useState<IconLine[]>([]);

  const handleIconClick = useCallback((iconName: string, position: { x: number; y: number }) => {
    const newLine: IconLine = {
      id: `${iconName}-${Date.now()}`,
      iconName,
      startX: position.x,
      startY: position.y,
    };

    // Add new line and remove any existing line for this icon
    setIconLines(prevLines => [
      ...prevLines.filter(line => line.iconName !== iconName),
      newLine
    ]);

    // Remove the line after 3 seconds
    setTimeout(() => {
      setIconLines(prevLines => prevLines.filter(line => line.id !== newLine.id));
    }, 3000);
  }, []);

  return (
    <div className="relative w-[150px] h-[150px]">
      {/* SVG Overlay for Icon Lines */}
      <svg 
        className="absolute inset-0 pointer-events-none z-10"
        width={170} // 150 + 20 for left extension
        height={150}
        style={{ left: -20 }} // Offset to show lines to the left
      >
            <defs>
              <filter id="iconLineGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feMorphology operator="dilate" radius="2"/>
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <AnimatePresence>
              {iconLines.map(line => (
                <motion.g key={line.id}>
                  {/* Main line */}
                  <motion.line
                    x1={line.startX + 20} // Offset for SVG positioning
                    y1={line.startY}
                    x2={line.startX + 20} // Start at icon position
                    y2={line.startY}
                    stroke="#3b82f6"
                    strokeWidth="3"
                    filter="url(#iconLineGlow)"
                    initial={{ x2: line.startX + 20 }}
                    animate={{ x2: 0 }} // End 20px to the left
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      ease: "easeOut"
                    }}
                  />
                  
                  {/* Endpoint glow */}
                  <motion.circle
                    cx={line.startX + 20}
                    cy={line.startY}
                    r="0"
                    fill="#3b82f6"
                    opacity="0.6"
                    initial={{ cx: line.startX + 20 }}
                    animate={{ 
                      cx: 0,
                      r: 4
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      ease: "easeOut",
                      r: { delay: 0.3, duration: 0.2 }
                    }}
                  />
                  
                  {/* Pulsing effect at endpoint */}
                  <motion.circle
                    cx={0}
                    cy={line.startY}
                    r="0"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="1"
                    opacity="0.4"
                    animate={{
                      r: [0, 8, 0],
                      opacity: [0.4, 0, 0.4]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: 0.5,
                      ease: "easeOut"
                    }}
                  />
                </motion.g>
              ))}
            </AnimatePresence>
          </svg>

      <DiagonalDescriptions iconData={techInfoData}>
        {({ handleIconHover }) => (
          <MemoizedHolographicThreeDBall 
            onIconHover={handleIconHover}
            onIconClick={handleIconClick}
          />
        )}
      </DiagonalDescriptions>
    </div>
  );
};