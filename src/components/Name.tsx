// import { motion } from "framer-motion";
// import { fadeUpPreset } from "../utils/animations";

// type NameProps = {
//   showShine: boolean;
//   letters: string[];
// };

// export const Name = ({ showShine, letters }: NameProps) => {
//   return (
//     <div
//       className="
//     relative flex items-center select-none"
//     >
//       <motion.h1
//         className="flex flex-wrap items-center gap-x-1 gap-y-2 font-extrabold tracking-tight relative text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
//         initial={{ scale: 2.2, opacity: 0, fontSize: '3rem' }}
//         animate={{ scale: 1, opacity: 1, fontSize: '1.5rem' }}
//         transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
//         style={{
//           color: "rgba(37,99,235,0.85)",
//           textShadow: `0 2px 8px rgba(255,255,255,0.5),0 0 16px rgba(96,165,250,0.12),0 0 32px rgba(59,130,246,0.10),0 1px 0 rgba(255,255,255,0.5)`
//         }}
//       >
//         {letters.map((letter, index) => (
//           <span key={index} className="relative">
//             {letter === " " ? "\u00A0" : letter}
//           </span>
//         ))}
//         {/* Shine effect overlay */}
//         {showShine && (
//           <motion.span
//             className="pointer-events-none"
//             initial={{ x: "-100%" }}
//             animate={{ x: "100%" }}
//             transition={{ duration: 1, ease: "easeInOut" }}
//             style={{
//               background:
//                 "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
//               WebkitMaskImage:
//                 "linear-gradient(120deg, transparent 0%, white 50%, transparent 100%)",
//               maskImage:
//                 "linear-gradient(120deg, transparent 0%, white 50%, transparent 100%)",
//               filter: "blur(2px)",
//               mixBlendMode: "lighten",
//             }}
//           />
//         )}
//       </motion.h1>
//     </div>
//   );
// };

const hexagonClip =
  "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

export function Name() {
  return (
    <div className="relative w-64 h-20">
      <style>{`
        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
            text-shadow: 
              0 0 5px rgba(16, 185, 129, 0.8),
              0 0 10px rgba(16, 185, 129, 0.6),
              0 0 15px rgba(16, 185, 129, 0.4),
              0 0 20px rgba(16, 185, 129, 0.3);
          }
          20%, 24%, 55% {
            opacity: 0.3;
            text-shadow: none;
          }
        }
      `}</style>

      <div
        className="absolute inset-0"
        style={
          {
            // clipPath: hexagonClip,
          }
        }
      />

      <div
        className="absolute inset-3 border border-emerald-500/25"
        style={{ clipPath: hexagonClip }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-emerald-400 text-[11px] tracking-wider"
          style={{
            animation: "flicker 4s infinite",
            textShadow: `
              0 0 5px rgba(16, 185, 129, 0.8),
              0 0 10px rgba(16, 185, 129, 0.6),
              0 0 15px rgba(16, 185, 129, 0.4),
              0 0 20px rgba(16, 185, 129, 0.3)
            `,
          }}
        >
          CILLIAN Ó MURCHU
        </span>
      </div>
    </div>
  );
}
