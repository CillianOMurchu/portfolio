// motionPresets.ts
export const fadeUpPreset = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
  transition: {
    duration: 1,
    delay: 0.5,
    ease: [0.42, 0, 0.58, 1], // ✅ type-safe easeInOut curve
  },
} as const;

export const fadeInFast = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3, ease: "easeOut" },
};
