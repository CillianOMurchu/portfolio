import React from "react";

type SocialLink = {
    name: string;
    href: string;
    icon: React.ReactNode;
};

const socials: SocialLink[] = [
    {
        name: "GitHub",
        href: "#",
        icon: null, // Replace with icon component
    },
    {
        name: "X",
        href: "#",
        icon: null, // Replace with icon component
    },
    {
        name: "Linkedin",
        href: "#",
        icon: null, // Replace with icon component
    },
    {
        name: "Instagram",
        href: "#",
        icon: null, // Replace with icon component
    },
];

export const Socials: React.FC = () => (
    <div className="flex gap-6 items-center">
        {socials.map((social) => (
            <a
                key={social.name}
                href={social.href}
                className="flex items-center gap-2 text-base hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
            >
                {social.icon}
                <span>{social.name}</span>
            </a>
        ))}
    </div>
);