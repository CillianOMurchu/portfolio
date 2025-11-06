export interface TechInfo {
  name: string;
  description: string;
  image: string;
  details: string[];
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'cloud' | 'mobile';
  experience: string;
  projects?: string[];
}

export interface IconInteractionState {
  isHovered: boolean;
  isAnimating: boolean;
  animationPhase: 'idle' | 'lineGrow' | 'iconTravel' | 'absorb' | 'return' | 'morph';
  lineProgress: number;
  travelProgress: number;
  panelVisible: boolean;
  iconPosition: { x: number; y: number; z: number };
  targetPosition: { x: number; y: number };
  originalPosition: { x: number; y: number; z: number };
}

export interface AnimationConfig {
  lineGrowDuration: number;
  iconTravelDuration: number;
  absorbDuration: number;
  returnDuration: number;
  morphDuration: number;
  easingFunction: string;
}