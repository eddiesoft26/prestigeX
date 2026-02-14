import { motion } from "framer-motion";

const revealVariant = {
  hidden: { opacity: 0, y: 0 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.2 },
  },
};

const ScrollReveal = ({ children, className = "" }) => {
  return (
    <motion.section
      className={className}
      variants={revealVariant}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        margin: "-100px",
        amount: 0.2,
      }}
    >
      {children}
    </motion.section>
  );
};

export default ScrollReveal;
