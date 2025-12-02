import { motion } from "framer-motion";
import profileImage from "../../assets/about/profile.png";
import { TimelineItem } from "../TimelineItem";
import { experienceData } from "../../consts/experience-data";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const profileAnimationVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const detailsAnimationVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const About = () => {
  // const bioLines = [
  //   "Full-stack software engineer with 15+ years of experience",
  //   "building scalable systems, leading teams, and delivering high-impact products.",
  //   "Specialized in TypeScript, React & Angular, and event-driven architectures.",
  //   "Currently focused on creative web experiences and intuitive UI."
  // ];

  return (
    <div className="bg-black min-h-screen pt-20 pb-16 flex flex-col items-center justify-start space-y-8 px-4">
      {/* Profile section - hidden on mobile, shown on iPad+ */}
      <div className="hidden md:flex w-full max-w-6xl gap-12 items-start">
        {/* Profile Image - slides in from right */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={profileAnimationVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <img
            src={profileImage}
            alt="Portrait of Cillian O'Murchu"
            className="w-80 h-80 rounded-full shadow-lg object-cover border-4 border-emerald-500/30"
          />
        </motion.div>

        {/* Details section - slides in from left with line-by-line fade animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={detailsAnimationVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex flex-col justify-center"
        >
          <h1 className="text-5xl font-extrabold text-emerald-400 mb-6">
            Cillian Ó Murchú
          </h1>
          <div className="space-y-3">
            {/* {bioLines.map((line, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="text-emerald-400 text-lg leading-relaxed font-light tracking-wide"
              >
                {line}
              </motion.p>
            ))} */}
          </div>
          <div className="mt-8 space-y-3">
            <p className="text-emerald-300 text-sm">
              🎮 Gaming Analytics • 🎵 Music Tech • 💼 Full-Stack Engineering
            </p>
          </div>
        </motion.div>
      </div>

      {/* Mobile profile - centered with text below */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        variants={sectionVariants}
        transition={{ duration: 0.7 }}
        className="md:hidden flex flex-col items-center text-center"
      >
        <img
          src={profileImage}
          alt="Portrait of Cillian O'Murchu"
          className="max-h-[25rem] w-100 h-100 rounded-full shadow-lg object-cover mb-6 border-4 border-white"
        />
        <h1 className="text-3xl font-extrabold text-emerald-400 mb-4">
          Cillian Ó Murchú
        </h1>
        {/* <div className="space-y-2 max-w-sm">
          {bioLines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="text-emerald-400 text-base leading-relaxed font-light tracking-wide"
            >
              {line}
            </motion.p>
          ))}
        </div> */}
        <div className="mt-6 space-y-2">
          <p className="text-emerald-300 text-xs">
            🎮 Gaming Analytics • 🎵 Music Tech • 💼 Full-Stack Engineering
          </p>
        </div>
      </motion.div>

      <TimelineLayout />
    </div>
  );
};

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
