// Lazy load SVG icons to improve initial page load performance
const importIcon = (iconName: string) => import(`../assets/programming-icons/${iconName}.svg`);

// Create array of all available icons with lazy loading
export const allIcons = [
  { name: "android-studio", importIcon: () => importIcon("android-studio") },
  { name: "android", importIcon: () => importIcon("android") },
  { name: "css3", importIcon: () => importIcon("css3") },
  { name: "cypress", importIcon: () => importIcon("cypress") },
  { name: "dart", importIcon: () => importIcon("dart") },
  { name: "docker", importIcon: () => importIcon("docker") },
  { name: "express", importIcon: () => importIcon("express") },
  { name: "figma", importIcon: () => importIcon("figma") },
  { name: "firebase", importIcon: () => importIcon("firebase") },
  { name: "flutter", importIcon: () => importIcon("flutter") },
  { name: "github", importIcon: () => importIcon("github") },
  { name: "gitlab", importIcon: () => importIcon("gitlab") },
  { name: "html5", importIcon: () => importIcon("html5") },
  { name: "javascript", importIcon: () => importIcon("javascript") },
  { name: "jest", importIcon: () => importIcon("jest") },
  { name: "jira", importIcon: () => importIcon("jira") },
  { name: "next-js", importIcon: () => importIcon("next-js") },
  { name: "nginx", importIcon: () => importIcon("nginx") },
  { name: "node-js", importIcon: () => importIcon("node-js") },
  { name: "postgresql", importIcon: () => importIcon("postgresql") },
  { name: "prisma", importIcon: () => importIcon("prisma") },
  { name: "react", importIcon: () => importIcon("react") },
  { name: "testing-library", importIcon: () => importIcon("testing-library") },
  { name: "typescript", importIcon: () => importIcon("typescript") },
  { name: "vercel", importIcon: () => importIcon("vercel") },
];

// Create tech icon map with lazy loading
export const techIconMap: Record<string, () => Promise<{ default: string }>> = {};
allIcons.forEach(icon => {
  techIconMap[icon.name] = icon.importIcon;
});
