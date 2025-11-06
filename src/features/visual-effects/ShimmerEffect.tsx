import React from 'react'
import { motion } from 'framer-motion'

export interface ShimmerEffectProps {
  className?: string
  children?: React.ReactNode
}

export const ShimmerEffect: React.FC<ShimmerEffectProps> = ({
  className = '',
  children
}) => {
  return (
    <div
      data-testid="shimmer-effect"
      className={`relative overflow-hidden ${className}`}
    >
      {children}
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
          repeatDelay: 0.5
        }}
      />
    </div>
  )
}

export default ShimmerEffect