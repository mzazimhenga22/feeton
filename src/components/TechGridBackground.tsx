"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const TechGridBackground = () => {
  const { scrollYProgress } = useScroll();
  // Reduce travel distance for smoother performance
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 opacity-[0.02]"
      >
        <div 
          className="w-full h-[150%] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:80px_80px]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      
      {/* Dynamic light orb - Optimized with smaller blur and size */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
    </div>
  );
};