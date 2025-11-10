import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThreeDBall } from './3d-ball';
import type { SphereItem, HolographicSphereProps, SphereOptions } from './types/holographicSphere';

interface ItemLine {
  id: string;
  itemName: string;
  startX: number;
  startY: number;
}

// Generic descriptions component for items
const GenericDescriptions: React.FC<{
  items: SphereItem[];
  children: (props: {
    handleItemHover: (itemKey: string | null, position: { x: number; y: number } | null) => void;
    isShowingDescriptions: boolean;
  }) => React.ReactNode;
}> = ({ items, children }) => {
  const [isShowingDescriptions] = useState(false);
  
  const handleItemHover = useCallback((itemKey: string | null, position: { x: number; y: number } | null) => {
    // For now, just console log - can be extended for descriptions
    if (itemKey && position) {
      const item = items.find(i => i.id === itemKey);
      if (item) {
        console.log(`Hovering over: ${item.name}`, position);
      }
    }
  }, [items]);

  return (
    <>
      {children({ handleItemHover, isShowingDescriptions })}
    </>
  );
};

// Memoized ThreeDBall for any type of items
const MemoizedGenericThreeDBall = React.memo<{
  items: SphereItem[];
  sphereOptions: SphereOptions;
  onItemHover: (itemKey: string | null, position: { x: number; y: number } | null) => void;
  onItemClick: (itemKey: string, position: { x: number; y: number }) => void;
}>(({ items, sphereOptions, onItemHover, onItemClick }) => (
  <ThreeDBall
    words={items.map(item => item.id)}
    options={{
      width: sphereOptions.width || 150,
      height: sphereOptions.height || 150,
      radius: sphereOptions.radius || 65,
      iconSize: sphereOptions.iconSize || 24,
      initialVelocityX: sphereOptions.initialVelocityX || 0.01,
      initialVelocityY: sphereOptions.initialVelocityY || 0.015,
    }}
    onIconHover={onItemHover}
    onIconClick={onItemClick}
    isInteractionDisabled={!sphereOptions.enableHover && !sphereOptions.enableClick}
    allowDragRotation={sphereOptions.allowDragRotation || false}
  />
), (prevProps, nextProps) => {
  return prevProps.onItemHover === nextProps.onItemHover && 
         prevProps.onItemClick === nextProps.onItemClick &&
         prevProps.items === nextProps.items &&
         prevProps.sphereOptions === nextProps.sphereOptions;
});

MemoizedGenericThreeDBall.displayName = 'MemoizedGenericThreeDBall';

export const HolographicSphere: React.FC<HolographicSphereProps> = ({
  items,
  sphereOptions = {},
  onItemHover,
  onItemClick,
  className = "",
  showDescriptions = false,
  enableLineAnimations = false
}) => {
  const [itemLines] = useState<ItemLine[]>([]);

  // Default sphere options
  const defaultOptions: SphereOptions = {
    width: 150,
    height: 150,
    radius: 65,
    iconSize: 24,
    initialVelocityX: 0.01,
    initialVelocityY: 0.015,
    enableHover: true,
    enableClick: false,
    allowDragRotation: false
  };

  const mergedOptions = { ...defaultOptions, ...sphereOptions };

  const handleItemClick = useCallback((itemKey: string, position: { x: number; y: number }) => {
    if (!mergedOptions.enableClick) return;
    
    const item = items.find(i => i.id === itemKey);
    if (item && onItemClick) {
      onItemClick(item, position);
    }
  }, [items, onItemClick, mergedOptions.enableClick]);

  const handleItemHover = useCallback((itemKey: string | null, position: { x: number; y: number } | null) => {
    if (!mergedOptions.enableHover) return;
    
    const item = itemKey ? items.find(i => i.id === itemKey) ?? null : null;
    if (onItemHover) {
      onItemHover(item, position);
    }
  }, [items, onItemHover, mergedOptions.enableHover]);

  return (
    <div className={`relative ${className}`} style={{ width: `${mergedOptions.width}px`, height: `${mergedOptions.height}px` }}>
      {/* SVG Overlay for Item Lines (if enabled) */}
      {enableLineAnimations && (
        <svg 
          className="absolute inset-0 pointer-events-none z-10"
          width={mergedOptions.width! + 20}
          height={mergedOptions.height}
          style={{ left: -20 }}
        >
          <AnimatePresence>
            {itemLines.map(line => (
              <motion.g key={line.id}>
                {/* Main line */}
                <motion.line
                  x1={line.startX + 20}
                  y1={line.startY}
                  x2={line.startX + 20}
                  y2={line.startY}
                  stroke="#3b82f6"
                  strokeWidth="3"
                  initial={{ x2: line.startX + 20 }}
                  animate={{ x2: 0 }}
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
              </motion.g>
            ))}
          </AnimatePresence>
        </svg>
      )}

      {/* Descriptions wrapper (if enabled) */}
      {showDescriptions ? (
        <GenericDescriptions items={items}>
          {({ handleItemHover: hoverHandler }) => (
            <MemoizedGenericThreeDBall 
              items={items}
              sphereOptions={mergedOptions}
              onItemHover={hoverHandler}
              onItemClick={handleItemClick}
            />
          )}
        </GenericDescriptions>
      ) : (
        <MemoizedGenericThreeDBall 
          items={items}
          sphereOptions={mergedOptions}
          onItemHover={handleItemHover}
          onItemClick={handleItemClick}
        />
      )}
    </div>
  );
};

// Export types for external use
export type { SphereItem, SphereOptions, HolographicSphereProps };