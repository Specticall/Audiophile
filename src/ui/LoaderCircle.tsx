import { motion } from "framer-motion";

// Think of this as "states"
const loadingVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
};
const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.15,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
const loadingCircleTransition = {
  duration: 0.4,
  repeat: Infinity,
  repeatType: "reverse" as const,
  ease: "easeInOut",
};

export default function LoaderCircle() {
  return (
    <motion.div
      className="flex gap-2"
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <motion.div
        className="w-3 h-3 bg-white/75 rounded-full"
        variants={loadingVariants}
        transition={loadingCircleTransition}
      ></motion.div>
      <motion.div
        className="w-3 h-3 bg-white/75 rounded-full"
        variants={loadingVariants}
        transition={loadingCircleTransition}
      ></motion.div>
      <motion.div
        className="w-3 h-3 bg-white/75 rounded-full"
        variants={loadingVariants}
        transition={loadingCircleTransition}
      ></motion.div>
    </motion.div>
  );
}
