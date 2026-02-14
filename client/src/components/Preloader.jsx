// components/Preloader.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Preloader = ({ setLoaded }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true); // mark content as loaded after 2s
    }, 2000); // adjust duration to your asset load time
    return () => clearTimeout(timer);
  }, [setLoaded]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <motion.div
        className="text-white text-2xl font-bold"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <img src="/src/assets/logo.png" alt="logo" width={50} />
      </motion.div>
    </div>
  );
};

export default Preloader;
