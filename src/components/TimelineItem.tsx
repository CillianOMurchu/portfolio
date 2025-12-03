import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

// --- ANIMATION CONFIGURATIONS ---

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Container for staggering the list items
const listContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.05, // Stagger each child item's animation
    },
  },
};

// Individual item animation for responsibilities and features
const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

// --- INTERFACES (Updated) ---

interface TimelineWork {
  id: string | number;
  name: string;
  title: string;
  dates: string;
  projectImage?: string;
  // UPDATED: Now an array for better presentation
  responsibilities?: string[];
  keyFeatures?: string[];
}

interface TimelineItemProps {
  work: TimelineWork;
  index: number;
}

// --- COMPONENT ---

export const TimelineItem = ({ work, index }: TimelineItemProps) => {
  return (
    <motion.div
      key={work.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-xl shadow-lg border border-emerald-700 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(19, 26, 40, 0.4)", // Dark background
        borderColor: "rgba(16, 185, 129, 0.3)", // Subtle border
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* 1. Image/Media Column */}
      <div className="sm:col-span-1">
        {work.projectImage && (
          <img
            src={work.projectImage}
            alt={`Screenshot of ${work.name} tool`}
            className="w-full h-auto rounded-lg object-cover shadow-2xl sm:max-h-60 sm:w-auto mx-auto sm:mx-0"
          />
        )}
      </div>

      {/* 2. Content Column */}
      <div className="sm:col-span-2 flex flex-col">
        <div className="mb-4">
          <h3 className="text-2xl font-extrabold text-emerald-400">
            {work.name}
          </h3>
          <p className="text-lg font-semibold text-white">
            {work.title} ({work.dates})
          </p>
        </div>

        {/* --- Responsibilities Panel (Section 1) --- */}
        {work.responsibilities && work.responsibilities.length > 0 && (
          <div className="p-4 rounded-lg bg-black/20 border border-slate-700/50 mb-6">
            <h4 className="text-base font-bold text-emerald-300 mb-3 border-b border-emerald-700/50 pb-2">
              <span className="mr-2">💡</span>Primary Responsibilities
            </h4>

            <motion.ul
              className="space-y-3 text-slate-300"
              variants={listContainerVariants}
            >
              {work.responsibilities.map((responsibility, i) => (
                <motion.li
                  key={`resp-${i}`}
                  variants={listItemVariants}
                  className="flex items-start"
                >
                  <span className="text-emerald-500 text-xl font-bold mr-2 leading-none">
                    •
                  </span>
                  <ReactMarkdown>{responsibility}</ReactMarkdown>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        )}

        {/* --- Key Features/Highlights Panel (Section 2) --- */}
        {work.keyFeatures && work.keyFeatures.length > 0 && (
          <div className="p-4 rounded-lg bg-black/20 border border-slate-700/50">
            <h4 className="text-base font-bold text-emerald-300 mb-3 border-b border-emerald-700/50 pb-2">
              <span className="mr-2">⚙️</span>Key Features & Contributions
            </h4>
            <motion.ul
              className="space-y-3 text-slate-400"
              variants={listContainerVariants}
            >
              {work.keyFeatures.map((feature, i) => (
                <motion.li
                  key={`feat-${i}`}
                  variants={listItemVariants}
                  className="flex items-start"
                >
                  <span className="text-emerald-500 mr-2 text-xl leading-none font-bold">
                    »
                  </span>
                  <ReactMarkdown>{feature}</ReactMarkdown>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};
