import React from "react";
import { SocialLink } from "./SocialLink";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const SocialLinks: React.FC = () => (
  <div
    className="social-links flex gap-3 mt-6 justify-center items-center text-[0.85rem] sm:text-base md:text-lg lg:text-xl xl:text-2xl"
    style={{ maxWidth: "100vw" }}
  >
    <SocialLink href="https://github.com/CillianOMurchu" icon={FaGithub}>
      <span className="block">Github</span>
    </SocialLink>
    <SocialLink href="https://linkedin.com/in/CillianOMurchu" icon={FaLinkedin}>
      <span className="block">LinkedIn</span>
    </SocialLink>
  </div>
);
