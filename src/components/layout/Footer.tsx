import React from "react";
import { SocialLinks } from "../ui/SocialLinks";

const Footer: React.FC = () => (
  <footer className="w-full flex flex-col items-center justify-center">
    <footer className="w-full bg-gray-900 text-gray-300 py-6 flex flex-col items-center justify-center relative">
      <div className="absolute top-0 left-0 w-full menu-border-top" />
      <SocialLinks />
    </footer>
  </footer>
);

export default Footer;
