import React from "react";
import { RedVelvetBackground } from "../features/visual-effects";
import { BackButton } from "./BackButton";

export const MusicPage: React.FC = () => {
  return (
    <RedVelvetBackground>
      <BackButton />
    </RedVelvetBackground>
  );
};

export default MusicPage;
