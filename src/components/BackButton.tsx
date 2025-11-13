import { motion } from "framer-motion";
import { usePageNavigation } from "../hooks/usePageNavigation";

export const BackButton: React.FC = () => {
  const { handleBackToHome } = usePageNavigation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen relative z-10"
    >
      {/* Back Button */}
      <motion.button
        onClick={handleBackToHome}
        className="absolute top-8 left-8 px-6 py-3 btn-glass rounded-xl font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back to Home
      </motion.button>
    </motion.div>
  );
};
