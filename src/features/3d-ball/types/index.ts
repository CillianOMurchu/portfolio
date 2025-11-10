export interface WordSphereOptions {
  width?: number;
  height?: number;
  radius?: number;
  padding?: number;
  iconSize?: number;
  tilt?: number;
  initialVelocityX?: number;
  initialVelocityY?: number;
  initialRotationX?: number;
  initialRotationZ?: number;
}

export interface ThreeDBallProps {
  words?: string[];
  options?: WordSphereOptions;
  onIconClick?: (iconKey: string, position: { x: number; y: number }) => void;
  onIconHover?: (iconKey: string | null, position: { x: number; y: number } | null) => void;
  onIconCentered?: (iconKey: string) => void;
  isInteractionDisabled?: boolean;
  allowDragRotation?: boolean;
}

export interface RotationState {
  rx: number;
  rz: number;
  vx: number;
  vy: number;
  clicked: boolean;
  lastX: number;
  lastY: number;
  hovering: boolean;
  lastMouseX: number;
  lastMouseY: number;
  autoRotationDirectionX: number;
  autoRotationDirectionZ: number;
  currentMouseX: number;
  currentMouseY: number;
  prevMouseX: number;
  prevMouseY: number;
  pausedRx: number;
  pausedRz: number;
  hoverStartTime: number;
  isRotatingToCenter: boolean;
  targetRx: number;
  targetRz: number;
  centeringSpeed: number;
  centeringIconName: string | null;
  autoRotationStopped: boolean;
}

export interface CanvasPosition {
  x: number;
  y: number;
  z: number;
}

export interface SphereIcon {
  name: string;
  position: CanvasPosition;
  size: number;
  visible: boolean;
  opacity?: number;
}