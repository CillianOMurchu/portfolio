import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedLineProps {
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  progress: number;
  isVisible: boolean;
  color?: string;
  thickness?: number;
}

export const AnimatedLine: React.FC<AnimatedLineProps> = ({
  startPoint,
  endPoint,
  progress,
  isVisible,
  color = '#3B82F6',
  thickness = 2
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <svg 
        className="absolute inset-0 w-full h-full"
        style={{ overflow: 'visible' }}
      >
        {/* Glowing background line */}
        <motion.line
          x1={startPoint.x}
          y1={startPoint.y}
          x2={startPoint.x + (endPoint.x - startPoint.x) * progress}
          y2={startPoint.y + (endPoint.y - startPoint.y) * progress}
          stroke={color}
          strokeWidth={thickness + 4}
          strokeOpacity={0.3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
        
        {/* Main line */}
        <motion.line
          x1={startPoint.x}
          y1={startPoint.y}
          x2={startPoint.x + (endPoint.x - startPoint.x) * progress}
          y2={startPoint.y + (endPoint.y - startPoint.y) * progress}
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
        
        {/* Animated dots along the line */}
        {progress > 0.1 && (
          <>
            {[0.2, 0.4, 0.6, 0.8].map((dotProgress, index) => {
              if (dotProgress > progress) return null;
              
              const dotX = startPoint.x + (endPoint.x - startPoint.x) * dotProgress;
              const dotY = startPoint.y + (endPoint.y - startPoint.y) * dotProgress;
              
              return (
                <motion.circle
                  key={index}
                  cx={dotX}
                  cy={dotY}
                  r={3}
                  fill={color}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.7 }}
                  transition={{ 
                    delay: dotProgress * 0.5,
                    duration: 0.3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 1
                  }}
                />
              );
            })}
          </>
        )}
        
        {/* End point glow effect */}
        {progress > 0.9 && (
          <motion.circle
            cx={endPoint.x}
            cy={endPoint.y}
            r={8}
            fill={color}
            fillOpacity={0.2}
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </svg>
    </div>
  );
};