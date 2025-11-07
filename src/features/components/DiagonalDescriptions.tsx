import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TechInfo } from '../types/interactiveIcon';

export interface DiagonalDescriptionsData {
  [key: string]: TechInfo;
}

interface DiagonalDescriptionsProps {
  iconData: DiagonalDescriptionsData;
  children: (props: {
    handleIconHover: (iconKey: string | null, position: { x: number; y: number } | null, iconPositionsRef?: React.MutableRefObject<Record<string, { x: number; y: number; size: number; visible: boolean }>>) => void;
    isShowingDescriptions: boolean;
  }) => React.ReactNode;
}

interface IconDescription {
  iconKey: string;
  iconPosition: { x: number; y: number };
  techInfo: TechInfo;
}

export const DiagonalDescriptions: React.FC<DiagonalDescriptionsProps> = ({
  iconData,
  children
}) => {
  const [iconDescriptions, setIconDescriptions] = useState<IconDescription[]>([]);
  const [isShowingDescriptions, setIsShowingDescriptions] = useState(false);
  
  const descriptionsRef = useRef<HTMLDivElement>(null);

  // Handle icon hover from the 3D sphere
  const handleIconHover = useCallback((_iconKey: string | null, position: { x: number; y: number } | null, iconPositionsRef?: React.MutableRefObject<Record<string, { x: number; y: number; size: number; visible: boolean }>>) => {
    if (position && iconPositionsRef) {
      // Get canvas position for coordinate conversion
      const canvasElement = document.querySelector('canvas');
      if (canvasElement) {
        const canvasRect = canvasElement.getBoundingClientRect();
        
        // Show descriptions for all visible icons when hovering over the sphere
        if (!isShowingDescriptions) {
          setIsShowingDescriptions(true);
          
          // Create descriptions for all visible icons with their actual positions
          const descriptions: IconDescription[] = Object.entries(iconPositionsRef.current)
            .filter(([iconKey, iconPos]) => iconPos.visible && iconData[iconKey])
            .map(([iconKey, iconPos]) => ({
              iconKey,
              iconPosition: {
                x: canvasRect.left + iconPos.x,
                y: canvasRect.top + iconPos.y
              },
              techInfo: iconData[iconKey]
            }))
            .filter(desc => desc.techInfo); // Only include icons we have data for
          
          setIconDescriptions(descriptions);
        }
      }
    } else {
      // Hide descriptions when not hovering
      setIsShowingDescriptions(false);
      setIconDescriptions([]);
    }
  }, [iconData, isShowingDescriptions]);

  // Generate positions for descriptions around the screen edges
  const getDescriptionPosition = useCallback((index: number, total: number) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Distribute descriptions around the screen edges
    const side = index % 4; // 0: top, 1: right, 2: bottom, 3: left
    const positionInSide = Math.floor(index / 4) / Math.max(1, Math.floor(total / 4));
    
    switch (side) {
      case 0: // Top
        return {
          x: windowWidth * 0.2 + (windowWidth * 0.6 * positionInSide),
          y: 80,
          anchor: 'top' as const
        };
      case 1: // Right
        return {
          x: windowWidth - 300,
          y: 120 + (windowHeight * 0.6 * positionInSide),
          anchor: 'right' as const
        };
      case 2: // Bottom
        return {
          x: windowWidth * 0.2 + (windowWidth * 0.6 * positionInSide),
          y: windowHeight - 120,
          anchor: 'bottom' as const
        };
      case 3: // Left
        return {
          x: 50,
          y: 120 + (windowHeight * 0.6 * positionInSide),
          anchor: 'left' as const
        };
      default:
        return { x: 50, y: 50, anchor: 'left' as const };
    }
  }, []);

  return (
    <>
      {children({
        handleIconHover,
        isShowingDescriptions
      })}

      {/* Diagonal Lines and Descriptions Overlay */}
      <AnimatePresence>
        {isShowingDescriptions && (
          <div 
            ref={descriptionsRef}
            className="fixed inset-0 pointer-events-none z-40"
            style={{ background: 'transparent' }}
          >
            <svg 
              className="absolute inset-0 w-full h-full"
              style={{ pointerEvents: 'none' }}
            >
              {/* Glow filter definition */}
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {iconDescriptions.map((desc, index) => {
                const descPosition = getDescriptionPosition(index, iconDescriptions.length);
                return (
                  <g key={`line-group-${desc.iconKey}`}>
                    {/* Outer glow effect */}
                    <motion.line
                      x1={desc.iconPosition.x}
                      y1={desc.iconPosition.y}
                      x2={descPosition.x}
                      y2={descPosition.y}
                      stroke="rgba(59, 130, 246, 0.2)"
                      strokeWidth="8"
                      filter="url(#glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ pathLength: 0, opacity: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                    />
                    {/* Main Tron-style line */}
                    <motion.line
                      x1={desc.iconPosition.x}
                      y1={desc.iconPosition.y}
                      x2={descPosition.x}
                      y2={descPosition.y}
                      stroke="rgba(0, 255, 255, 0.9)" // Cyan Tron color
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ pathLength: 0, opacity: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                    />
                    {/* Animated pulse effect */}
                    <motion.line
                      x1={desc.iconPosition.x}
                      y1={desc.iconPosition.y}
                      x2={descPosition.x}
                      y2={descPosition.y}
                      stroke="rgba(255, 255, 255, 0.8)"
                      strokeWidth="1"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: [0, 1, 1],
                        opacity: [0, 1, 0.3]
                      }}
                      transition={{ 
                        duration: 1.2, 
                        delay: index * 0.1 + 0.3,
                        ease: "easeOut",
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Description Cards */}
            {iconDescriptions.map((desc, index) => {
              const descPosition = getDescriptionPosition(index, iconDescriptions.length);
              
              return (
                <motion.div
                  key={`desc-${desc.iconKey}`}
                  className="absolute bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-blue-200 p-4 max-w-xs"
                  style={{
                    left: descPosition.anchor === 'right' ? descPosition.x - 250 : descPosition.x,
                    top: descPosition.anchor === 'bottom' ? descPosition.y - 100 : descPosition.y,
                  }}
                  initial={{ 
                    opacity: 0, 
                    scale: 0.8,
                    x: descPosition.anchor === 'left' ? -20 : descPosition.anchor === 'right' ? 20 : 0,
                    y: descPosition.anchor === 'top' ? -20 : descPosition.anchor === 'bottom' ? 20 : 0,
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: 0,
                    y: 0,
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8,
                    x: descPosition.anchor === 'left' ? -20 : descPosition.anchor === 'right' ? 20 : 0,
                    y: descPosition.anchor === 'top' ? -20 : descPosition.anchor === 'bottom' ? 20 : 0,
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1 + 0.3,
                    ease: "easeOut"
                  }}
                >
                  {/* Tech Icon */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-bold">
                        {desc.techInfo.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {desc.techInfo.name}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {desc.techInfo.description}
                  </p>
                  
                  {/* Experience Badge */}
                  {desc.techInfo.experience && (
                    <div className="mt-3 inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {desc.techInfo.experience}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </>
  );
};