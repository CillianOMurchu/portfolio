import { motion } from "framer-motion";

const getImage = (imagePath: string | undefined): string => {
  if (!imagePath) return "";
  return imagePath as string;
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface TimelineWork {
  id: string | number;
  name: string;
  title: string;
  dates: string;
  projectImage?: string;
  responsibilities?: string;
  keyFeatures?: string[];
}

interface TimelineItemProps {
  work: TimelineWork;
  index: number;
}

export const TimelineItem = ({ work, index }: TimelineItemProps) => {
  console.log("work.projectImage is ", work.projectImage);
  return (
    <motion.div
      key={work.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-xl shadow-lg bg-black/30 border border-emerald-700 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(19, 26, 40, 0.4)",
        borderColor: "rgba(16, 185, 129, 0.3)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="sm:col-span-1">
        {work.projectImage && (
          <img
            src={getImage(work.projectImage)}
            alt={`Screenshot of ${work.name} tool`}
            className="w-full h-auto rounded-lg object-cover shadow-2xl sm:max-h-60 sm:w-auto mx-auto sm:mx-0"
          />
        )}
      </div>

      <div className="sm:col-span-2">
        <div className="flex items-center space-x-4 mb-2">
          <h3 className="text-2xl font-extrabold text-emerald-400">
            {work.name}
          </h3>
        </div>
        <p className="text-lg font-semibold text-white mb-2">
          {work.title} ({work.dates})
        </p>

        {/* Tool Description */}
        {work.responsibilities && (
          <p className="mt-4 text-slate-300 leading-relaxed border-l-2 border-emerald-500 pl-4">
            {work.responsibilities}
          </p>
        )}

        {/* Key Features/Highlights */}
        {work.keyFeatures && (
          <ul className="mt-4 space-y-1 text-slate-400">
            {work.keyFeatures.map((feature, i) => (
              <li key={i} className="flex items-start">
                <span className="text-emerald-400 mr-2">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};
