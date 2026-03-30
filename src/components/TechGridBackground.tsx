"use client";

import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const TechGridBackground = () => {
  const { scrollYProgress } = useScroll();
  
  // Use a spring for the scroll parallax to make it feel smoother/less jittery
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], [0, -80]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 opacity-[0.03] will-change-transform"
      >
        <div 
          className="w-full h-[120%] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px]"
        />
      </motion.div>
      
      {/* Static gradients are cheaper to render than dynamic ones if they don't need to move */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      
      {/* Optimized light orb - using CSS animations which are highly optimized by browsers */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow will-change-[opacity,filter]" />
    </div>
  );
};
