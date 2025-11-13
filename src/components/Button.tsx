
import { motion } from "framer-motion";
import { fadeUpPreset } from "../utils/animations";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  value?: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, value }) => {
  // If value is 'Sign Out', show only neon green SVG, no background
  if (value === "Sign Out") {
    return (
      <motion.div {...fadeUpPreset}>
        <motion.button
          onClick={onClick}
          className="p-2 rounded-md bg-transparent flex items-center focus-visible:ring-emerald-400"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#10b981"
            className="w-7 h-7 drop-shadow-[0_0_6px_#10b981]"
            style={{ filter: 'drop-shadow(0 0 8px #10b981)' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-6-3h12m0 0l-3-3m3 3l-3 3"
            />
          </svg>
        </motion.button>
      </motion.div>
    );
  }
  // Default button
  return (
    <motion.div {...fadeUpPreset}>
      <motion.button
        onClick={onClick}
        className="px-4 py-2 rounded-md text-white font-medium shadow-md focus-visible:ring-indigo-400 active:shadow-sm transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-600  antialiased flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {value}
      </motion.button>
    </motion.div>
  );
};

