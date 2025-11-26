import React from "react";
import HeroTitle from "../HeroTitle";
import ItemSphere from "../ItemSphere";
import { SocialLinks } from "../ui/SocialLinks";

const HomeScreen: React.FC = () => {
  return (
    <div className="home-screen">
      <ItemSphere />
      <HeroTitle />
      <SocialLinks />
    </div>
  );
};

export default HomeScreen;
