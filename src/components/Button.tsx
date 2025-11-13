import { motion } from "framer-motion";
import { fadeUpPreset } from "../utils/animations";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  value?: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, value }) => {
  return (
    <motion.div
      {...fadeUpPreset}
      className="flex flex-col items-center justify-center relative z-10"
    >
      <motion.button
        onClick={onClick}
        className="px-4 py-2 rounded-md text-white font-medium shadow-md focus-visible:ring-indigo-400 active:shadow-sm transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-600 mb-4 antialiased"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {value}
      </motion.button>
    </motion.div>
  );
};
