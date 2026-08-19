'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TextReveal({ text, className }) {
  const words = text.match(/[\p{L}\p{N}]+[^\s\p{L}\p{N}]?|[^\s]/gu) || [];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.04 * i
      }
    })
  };
  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)"
    }
  };
  return (
    <div className={className}>
      <motion.div 
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: 'flex-start'
        }} 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible" 
      >
        {words.map((word, index) => (
          <motion.span 
            key={index} 
            variants={childVariants} 
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }} 
            style={{
              marginRight: "10px",
              marginTop: "0px"
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
