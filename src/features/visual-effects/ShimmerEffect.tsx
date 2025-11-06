import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

export interface ShimmerEffectProps {
  className?: string
  children?: React.ReactNode
}

export const ShimmerEffect: React.FC<ShimmerEffectProps> = ({
  className = '',
  children
}) => {
  const [isHovered, setIsHovered] = useState(false)
  
  // Generate random star positions
  const stars = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.5,
      size: Math.random() * 0.5 + 0.5, // Size between 0.5 and 1
    })), []
  )

  return (
    <div
      data-testid="shimmer-effect"
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      {/* Hovering Stars */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0, star.size, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 1.5,
                delay: star.delay,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: "easeInOut"
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-yellow-400"
              >
                <path
                  d="M12 2L14.09 8.26L22 9L16.5 14.74L18 21L12 17.77L6 21L7.5 14.74L2 9L9.91 8.26L12 2Z"
                  fill="currentColor"
                  className="drop-shadow-sm"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Original Shimmer Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(110deg, 
            transparent 20%, 
            transparent 40%, 
            rgba(255, 255, 255, 0.25) 50%, 
            transparent 60%, 
            transparent 80%
          )`,
          transform: 'translateX(-100%)',
        }}
        animate={{
          transform: ['translateX(-100%)', 'translateX(100%)']
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: [0.4, 0.0, 0.2, 1],
          repeatDelay: 2.5
        }}
      />
    </div>
  )
}

export default ShimmerEffect