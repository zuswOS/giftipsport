import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ className = "", size = "default" }) => {
  const sizeClasses = {
    small: "w-10 h-10",
    default: "w-12 h-12",
    large: "w-16 h-16",
    xl: "w-24 h-24"
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} flex items-center justify-center`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <img 
        src="https://horizons-cdn.hostinger.com/2797da0c-83cb-479d-9581-8077985efc7c/f2031a17d17b137c373ce8e43db2d600.png"
        alt="GIF-TIP" 
        className="object-contain w-full h-full" 
      />
    </motion.div>
  );
};

export default Logo;