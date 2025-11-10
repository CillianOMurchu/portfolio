// Manual icon loading - directly importing the SVG icons that exist in assets folder
// This replaces the dynamic detection with a reliable manual list

const importIcon = (iconName: string) => import(`../assets/programming-icons/${iconName}.svg`);

// Manual list of all available icons in the assets/programming-icons folder
export const allIcons = [
  { name: "angular", importIcon: () => importIcon("angular") },
  { name: "css3", importIcon: () => importIcon("css3") },
  { name: "cypress", importIcon: () => importIcon("cypress") },
  { name: "docker", importIcon: () => importIcon("docker") },
  { name: "express", importIcon: () => importIcon("express") },
  { name: "figma", importIcon: () => importIcon("figma") },
  { name: "firebase", importIcon: () => importIcon("firebase") },
  { name: "github", importIcon: () => importIcon("github") },
  { name: "gitlab", importIcon: () => importIcon("gitlab") },
  { name: "html5", importIcon: () => importIcon("html5") },
  { name: "javascript", importIcon: () => importIcon("javascript") },
  { name: "jest", importIcon: () => importIcon("jest") },
  { name: "jira", importIcon: () => importIcon("jira") },
  { name: "mongodb", importIcon: () => importIcon("mongodb") },
  { name: "next-js", importIcon: () => importIcon("next-js") },
  { name: "nginx", importIcon: () => importIcon("nginx") },
  { name: "node-js", importIcon: () => importIcon("node-js") },
  { name: "postman", importIcon: () => importIcon("postman") },
  { name: "prisma", importIcon: () => importIcon("prisma") },
  { name: "puppeteer", importIcon: () => importIcon("puppeteer") },
  { name: "python", importIcon: () => importIcon("python") },
  { name: "react", importIcon: () => importIcon("react") },
  { name: "rxjs", importIcon: () => importIcon("rxjs") },
  { name: "sass", importIcon: () => importIcon("sass") },
  { name: "storybook", importIcon: () => importIcon("storybook") },
  { name: "tailwindcss", importIcon: () => importIcon("tailwindcss") },
  { name: "typescript", importIcon: () => importIcon("typescript") },
  { name: "vercel", importIcon: () => importIcon("vercel") },
];

// Create tech icon map manually
export const techIconMap: Record<string, () => Promise<{ default: string }>> = {};
allIcons.forEach(icon => {
  techIconMap[icon.name] = icon.importIcon;
});

// Helper functions
export const getAvailableIconNames = (): string[] => {
  return allIcons.map(icon => icon.name).sort();
};

export const hasIcon = (iconName: string): boolean => {
  return iconName in techIconMap;
};
