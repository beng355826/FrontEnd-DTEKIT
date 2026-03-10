import { motion } from "framer-motion";

const DotLoader = () => {
  const dotVariants = {
    bounce: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex gap-2 justify-center">
      {[...Array(3)].map((_, i) => (
        <motion.span
          key={i}
          variants={dotVariants}
          animate="bounce"
          style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            backgroundColor: "#333",
            borderRadius: "50%",
          }}
          transition={{ delay: i * 0.2 }}
        />
      ))}
    </div>
  );
};

export default DotLoader;