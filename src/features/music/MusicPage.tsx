import React from "react";
import { useOrbOrigin } from "../../components/OrbOriginContext";

const MusicPage: React.FC = () => {
  const { oCharPosition } = useOrbOrigin();

  return (
    <div>
      <h1>Music stuff</h1>
      <p>Orb Origin Character Position: {JSON.stringify(oCharPosition)}</p>
    </div>
  );
};

export default MusicPage;
