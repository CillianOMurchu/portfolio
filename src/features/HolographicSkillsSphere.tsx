import React from 'react';
import { HolographicSphere } from './HolographicSphere';
import { convertTechDataToSphereItems } from './utils/sphereData';
import { techInfoData } from './data/techInfo';
import type { SphereItem } from './types/holographicSphere';

export const HolographicSkillsSphere: React.FC = () => {
  // Convert tech data to generic sphere items
  const skillsItems: SphereItem[] = convertTechDataToSphereItems(techInfoData);

  return (
    <HolographicSphere
      items={skillsItems}
      sphereOptions={{
        width: 150,
        height: 150,
        radius: 65,
        iconSize: 24,
        initialVelocityX: 0.01,
        initialVelocityY: 0.015,
        enableHover: true,
        enableClick: false,
        allowDragRotation: false
      }}
      className=""
      showDescriptions={false}
      enableLineAnimations={false}
    />
  );
};