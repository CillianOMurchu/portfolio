import React, { useMemo } from 'react';
import { HolographicSphere } from './HolographicSphere';
import { convertTechDataToSphereItems } from './utils/sphereData';
import { techInfoData } from './data/techInfo';
import type { SphereItem } from './types/holographicSphere';

export const HolographicSkillsSphere: React.FC = React.memo(() => {
  // Memoize the converted tech data to prevent recreation on re-renders
  const skillsItems: SphereItem[] = useMemo(
    () => convertTechDataToSphereItems(techInfoData), 
    [] // Empty dependency array since techInfoData is static
  );

  // Memoize sphere options to prevent object recreation
  const sphereOptions = useMemo(() => ({
    width: 150,
    height: 150,
    radius: 65,
    iconSize: 24,
    initialVelocityX: 0.01,
    initialVelocityY: 0.015,
    enableHover: true,
    enableClick: false,
    allowDragRotation: false
  }), []);

  return (
    <HolographicSphere
      items={skillsItems}
      sphereOptions={sphereOptions}
      className=""
      showDescriptions={false}
      enableLineAnimations={false}
    />
  );
});

HolographicSkillsSphere.displayName = 'HolographicSkillsSphere';