"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, Zap, Shield, Wind, Sparkles, Activity, Layers, Crosshair } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BentoItem = ({ 
  children, 
  className = "", 
  delay = 0,
  title = "",
  subtitle = "",
  icon: Icon
}: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    className={`group relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.03] p-10 hover:border-primary/40 transition-all duration-700 ${className}`}
  >
    {/* Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    
    <div className="relative z-10 h-full flex flex-col justify-between">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
            <Icon className="w-6 h-6" />
          </div>
          <Badge variant="outline" className="text-[8px] uppercase tracking-widest border-white/10 opacity-30 group-hover:opacity-100 group-hover:border-primary/30 transition-all">
            SEC_CORE_V4
          </Badge>
        </div>
        <div className="space-y-2">
          <h4 className="text-2xl font-headline font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{title}</h4>
          <p className="text-xs uppercase tracking-widest text-white/30 leading-loose group-hover:text-white/60 transition-colors">
            {subtitle}
          </p>
        </div>
      </div>
      {children}
    </div>
  </motion.div>
);

export const TechSection = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [0, -1000]);

  return (
    <section id="innovation" className="py-60 relative overflow-hidden bg-black">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,51,51,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 mb-32">
        <div className="grid lg:grid-cols-2 items-end gap-12">
          <div className="space-y-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2 uppercase tracking-[0.4em] font-bold text-[10px]">
              ENGINEERING PROTOCOL
            </Badge>
            <h2 className="text-6xl md:text-8xl font-headline font-black uppercase tracking-tighter leading-[0.9]">
              THE SCIENCE <br />
              <span className="text-white/20">OF KINETICS</span>
            </h2>
          </div>
          <p className="text-xl text-white/40 font-body uppercase tracking-wider max-w-md ml-auto text-right border-r-2 border-primary/30 pr-8">
            REDEFINING HUMAN MOVEMENT THROUGH COMPUTATIONAL DESIGN AND MATERIAL BIOLOGY.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[300px]">
          
          {/* Main Large Card */}
          <BentoItem 
            className="md:col-span-2 md:row-span-2" 
            title="Kinetic Carbon Core"
            subtitle="Aerospace-grade lattice structure engineered for maximum energy return and metabolic efficiency."
            icon={Cpu}
            delay={0.1}
          >
            <div className="mt-12 relative flex-1 flex items-center justify-center">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,51,51,0.1)_0%,transparent_100%)] animate-pulse" />
               <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 border border-white/5 rounded-full flex items-center justify-center"
               >
                 <div className="w-40 h-40 border border-primary/20 rounded-full flex items-center justify-center border-dashed" />
               </motion.div>
               <Activity className="absolute w-12 h-12 text-primary opacity-50" />
            </div>
          </BentoItem>

          <BentoItem 
            title="Neon-Pulse XT"
            subtitle="Active polymers that adapt in real-time."
            icon={Zap}
            delay={0.2}
          />

          <BentoItem 
            title="Exo-Shell 01"
            subtitle="Biometric mesh integration."
            icon={Shield}
            delay={0.3}
          />

          <BentoItem 
            className="md:col-span-2"
            title="Aero-Flow Cooling"
            subtitle="Internal micro-ventilation systems maintaining thermal equilibrium during 100% load."
            icon={Wind}
            delay={0.4}
          >
             <div className="flex gap-4 mt-4">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      className="w-full h-full bg-primary/40"
                    />
                  </div>
                ))}
             </div>
          </BentoItem>

          <BentoItem 
            title="Hyper-Link"
            subtitle="Neural movement tracking."
            icon={Crosshair}
            delay={0.5}
          />

          <BentoItem 
            title="Layered Tech"
            subtitle="12-layer composite soul."
            icon={Layers}
            delay={0.6}
          />

        </div>
      </div>

      {/* Marquee Section */}
      <div className="mt-40 border-y border-white/5 py-12 bg-white/[0.01]">
        <motion.div style={{ x }} className="flex whitespace-nowrap gap-20">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex gap-20 items-center">
               <span className="text-8xl md:text-[10rem] font-headline font-black uppercase text-white/5 tracking-tighter">ENGINEERED FOR SUPREMACY</span>
               <Sparkles className="w-12 h-12 text-primary opacity-20" />
               <span className="text-8xl md:text-[10rem] font-headline font-black uppercase text-transparent border-text tracking-tighter" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}>FUTURE OF MOVEMENT</span>
               <Sparkles className="w-12 h-12 text-primary opacity-20" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
