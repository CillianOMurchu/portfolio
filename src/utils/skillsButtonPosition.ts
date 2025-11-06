// Global variable to store the Skills button position for icon animations
export let skillsButtonPosition: { x: number; y: number } | null = null;

// Function to update the button position
export const setSkillsButtonPosition = (position: { x: number; y: number } | null) => {
  skillsButtonPosition = position;
};