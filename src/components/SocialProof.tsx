"use client";

import React from "react";
import { motion } from "framer-motion";

const BRANDS = ["VOGUE FUTURE", "HYPEBEAST LABS", "TECH-GEAR DAILY", "NEON QUARTERLY", "STREET MASTER"];

export const SocialProof = () => {
  return (
    <div className="py-20 bg-black border-y border-white/5 overflow-hidden">
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center"
        >
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="text-4xl md:text-6xl font-headline font-black text-white/5 tracking-tighter uppercase select-none">
                {brand}
              </span>
              <div className="w-2 h-2 rounded-full bg-primary/20" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
