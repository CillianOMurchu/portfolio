/**
 * Generate golden spiral sphere distribution for evenly spaced 3D points
 */
export function generateFibonacciSphere(count: number): { x: number; y: number; z: number }[] {
  const positions: { x: number; y: number; z: number }[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians
  
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // Range from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    positions.push({ x, y, z });
  }
  
  return positions;
}

/**
 * Calculate the required rotation to center a specific icon
 */
export function calculateCenteringRotation(
  iconIndex: number,
  totalIcons: number,
  currentRotation: { rx: number; rz: number }
): { targetRx: number; targetRz: number } {
  // Use the same golden spiral sphere generation as rendering
  const positions = generateFibonacciSphere(totalIcons);
  
  if (iconIndex >= positions.length) {
    return { targetRx: currentRotation.rx, targetRz: currentRotation.rz };
  }
  
  const iconPos = positions[iconIndex];
  
  // Calculate required rotation to center the icon
  const targetRx = Math.atan2(-iconPos.y, iconPos.z);
  const targetRz = -Math.atan2(iconPos.x, Math.sqrt(iconPos.y * iconPos.y + iconPos.z * iconPos.z));
  
  return { targetRx, targetRz };
}