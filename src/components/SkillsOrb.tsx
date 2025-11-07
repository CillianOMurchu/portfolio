import React, { Suspense, lazy } from 'react';

// Lazy load the heavy HolographicSkillsSphere component
const HolographicSkillsSphere = lazy(() => 
  import("../features").then((module) => ({ default: module.HolographicSkillsSphere }))
);

const SkillsOrb: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="w-[150px] h-[150px] bg-gradient-to-br from-blue-400 to-purple-600 rounded-full animate-pulse" />
    }>
      <HolographicSkillsSphere />
    </Suspense>
  );
};

export default SkillsOrb;