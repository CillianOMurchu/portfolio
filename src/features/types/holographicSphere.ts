export interface SphereItem {
  id: string;
  name: string;
  description: string;
  image: string;
  details?: string[];
  category?: string;
  metadata?: Record<string, unknown>; // For any additional data
}

export interface SphereOptions {
  width?: number;
  height?: number;
  radius?: number;
  iconSize?: number;
  initialVelocityX?: number;
  initialVelocityY?: number;
  enableHover?: boolean;
  enableClick?: boolean;
  allowDragRotation?: boolean;
}

export interface HolographicSphereProps {
  items: SphereItem[];
  sphereOptions?: SphereOptions;
  onItemHover?: (item: SphereItem | null, position: { x: number; y: number } | null) => void;
  onItemClick?: (item: SphereItem, position: { x: number; y: number }) => void;
  className?: string;
  showDescriptions?: boolean;
  enableLineAnimations?: boolean;
}