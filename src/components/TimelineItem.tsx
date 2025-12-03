import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import "../styles/theme.css";

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
  link?: string;
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
      className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 timeline-card"
    >
      {/* 1. Image/Media Column */}
      <div className="sm:col-span-1">
        {work.projectImage && (
          <a
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
            title={`Visit ${work.name} website`}
          >
            <img
              src={work.projectImage}
              alt={`Screenshot of ${work.name} tool`}
              className="w-full h-auto sm:max-h-60 sm:w-auto mx-auto sm:mx-0 timeline-card-image"
            />
          </a>
        )}
      </div>

      {/* 2. Content Column */}
      <div className="sm:col-span-2 flex flex-col">
        <div className="mb-4">
          {work.link ? (
            <a
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              title={`Visit ${work.name} website`}
            >
              <h3 className="timeline-card-title">
                {work.name}
              </h3>
            </a>
          ) : (
            <h3 className="timeline-card-title">
              {work.name}
            </h3>
          )}
          <p className="timeline-card-subtitle">
            {work.title} ({work.dates})
          </p>
        </div>

        {/* --- Responsibilities Panel (Section 1) --- */}
        {work.responsibilities && work.responsibilities.length > 0 && (
          <div className="timeline-card-section">
            <h4 className="timeline-card-section-title">
              <span className="mr-2">💡</span>Primary Responsibilities
            </h4>

            <motion.ul
              className="timeline-card-list"
              variants={listContainerVariants}
            >
              {work.responsibilities.map((responsibility, i) => (
                <motion.li
                  key={`resp-${i}`}
                  variants={listItemVariants}
                >
                  <span className="timeline-card-list-bullet">•</span>
                  <ReactMarkdown>{responsibility}</ReactMarkdown>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        )}

        {/* --- Key Features/Highlights Panel (Section 2) --- */}
        {work.keyFeatures && work.keyFeatures.length > 0 && (
          <div className="timeline-card-section">
            <h4 className="timeline-card-section-title">
              <span className="mr-2">⚙️</span>Key Features & Contributions
            </h4>
            <motion.ul
              className="timeline-card-list"
              variants={listContainerVariants}
            >
              {work.keyFeatures.map((feature, i) => (
                <motion.li
                  key={`feat-${i}`}
                  variants={listItemVariants}
                >
                  <span className="timeline-card-list-bullet">»</span>
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
