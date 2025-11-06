export interface ShimmerEffectProps {
  width?: string
  height?: string
  className?: string
  children?: React.ReactNode
  intensity?: 'low' | 'medium' | 'high'
  speed?: 'slow' | 'normal' | 'fast'
}

export type ShimmerIntensity = 'low' | 'medium' | 'high'
export type ShimmerSpeed = 'slow' | 'normal' | 'fast'