import { motion } from "framer-motion";
import profileImage from "../../assets/about/profile.png";
import { TimelineItem } from "../TimelineItem";
import { experienceData } from "../../consts/experience-data";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const About = () => (
  <div className="bg-black min-h-screen pt-20 pb-16 flex flex-col items-center justify-start space-y-8">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={sectionVariants}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center"
    >
      <img
        src={profileImage}
        alt="Portrait of Cillian O'Murchu"
        className="w-100 h-100 rounded-full shadow-lg object-cover mb-6 border-4 border-white"
      />
    </motion.div>

    <TimelineLayout />
  </div>
);

export default About;

export const TimelineLayout = () => {
  return (
    <div className="flex flex-col space-y-12 px-4 py-8 w-full max-w-6xl mx-auto">
      {experienceData.map((work, index) => (
        <TimelineItem key={work.id} work={work} index={index} />
      ))}
    </div>
  );
};
