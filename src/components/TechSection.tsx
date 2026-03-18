
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Cpu, Wind } from "lucide-react";

const technologies = [
  {
    icon: Cpu,
    title: "KINETIC CORE",
    description: "Proprietary carbon-fiber midsole that returns 98% of energy with every stride.",
    color: "text-primary"
  },
  {
    icon: Zap,
    title: "NEON REACT",
    description: "Active illuminating polymers that respond to pressure and movement speed.",
    color: "text-white"
  },
  {
    icon: Shield,
    title: "EXO-SHELL",
    description: "Surgical-grade synthetic mesh that adapts to your foot's unique anatomy.",
    color: "text-primary"
  },
  {
    icon: Wind,
    title: "AERO-FLOW",
    description: "Integrated cooling channels that maintain optimal temperature during peak performance.",
    color: "text-white"
  }
];

export const TechSection = () => {
  return (
    <section id="innovation" className="py-40 bg-black/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.4em] text-primary uppercase"
          >
            Chapter 03: The Engineering
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-headline font-bold uppercase tracking-tighter"
          >
            REDEFINING THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">POSSIBLE</span>
          </motion.h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-primary/50 transition-all duration-500 hover:-translate-y-4"
            >
              <div className={`w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 ${tech.color}`}>
                <tech.icon className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-headline font-bold mb-4 tracking-tight">{tech.title}</h4>
              <p className="text-foreground/40 font-body text-sm leading-relaxed uppercase tracking-[0.15em]">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
