import { motion } from "framer-motion";

const motionWrapper = ({ children }) => {
  const transition = {
    duration: 0.67,
    ease: "easeInOut",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default motionWrapper


