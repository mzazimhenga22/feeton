"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const IMAGES = [
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1000&auto=format&fit=crop"
];

export const LifestyleGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={containerRef} className="py-60 bg-black overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="space-y-6">
            <motion.div style={{ y: y1 }} className="aspect-[3/4] relative rounded-[2rem] overflow-hidden">
               <Image src={IMAGES[0]} alt="Lifestyle" fill className="object-cover" />
            </motion.div>
            <div className="aspect-square relative rounded-[2rem] overflow-hidden bg-primary/10 flex items-center justify-center p-8 text-center">
               <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">Capture the light, master the kinetic energy.</p>
            </div>
          </div>

          <div className="space-y-6 pt-20">
            <div className="aspect-square relative rounded-[2rem] overflow-hidden border border-white/5 bg-white/[0.02]" />
            <motion.div style={{ y: y2 }} className="aspect-[3/4] relative rounded-[2rem] overflow-hidden">
               <Image src={IMAGES[1]} alt="Lifestyle" fill className="object-cover" />
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div style={{ y: y1 }} className="aspect-[3/4] relative rounded-[2rem] overflow-hidden">
               <Image src={IMAGES[2]} alt="Lifestyle" fill className="object-cover" />
            </motion.div>
            <div className="aspect-square relative rounded-[2rem] overflow-hidden bg-white/5" />
          </div>

          <div className="space-y-6 pt-32">
            <motion.div style={{ y: y2 }} className="aspect-[3/4] relative rounded-[2rem] overflow-hidden">
               <Image src={IMAGES[3]} alt="Lifestyle" fill className="object-cover" />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Floating text background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-[0.02]">
         <h2 className="text-[40rem] font-headline font-black uppercase tracking-tighter leading-none select-none">ARTIFACT</h2>
      </div>
    </section>
  );
};
