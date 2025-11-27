
import React from "react";
import { SocialLinks } from "../ui/SocialLinks";
import "./site-footer.css";


const Footer: React.FC = () => (
  <footer className="site-footer w-full bg-gray-900 text-gray-300 py-6 flex flex-col items-center justify-center relative">
    <div className="absolute top-0 left-0 w-full menu-border-top" />
    <SocialLinks />
  </footer>
);

export default Footer;
