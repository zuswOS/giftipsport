import React from 'react';
import { motion } from 'framer-motion';

const ChatBotLogo = ({ className = "" }) => {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.circle 
        cx="15" 
        cy="10" 
        r="1" 
        fill="currentColor" 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.circle 
        cx="11" 
        cy="10" 
        r="1" 
        fill="currentColor" 
        initial={{ scale: 1 }}
        animate={{ scale: 0.8 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
      />
      <motion.circle 
        cx="7" 
        cy="10" 
        r="1" 
        fill="currentColor" 
        initial={{ scale: 1.1 }}
        animate={{ scale: 0.9 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
      />
    </motion.svg>
  );
};

export default ChatBotLogo;