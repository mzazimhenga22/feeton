"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Plus, ChevronRight } from "lucide-react";
import Image from "next/image";

const HOTSPOTS = [
  {
    id: "upper",
    x: "35%",
    y: "40%",
    title: "Vapor-Link Upper",
    description: "Surgical-grade monofilament mesh that provides localized compression and zero-gravity breathability."
  },
  {
    id: "heel",
    x: "75%",
    y: "65%",
    title: "Bio-Lock Heel",
    description: "Anatomically mapped TPU cage that locks the calcaneus for maximum stability at high velocities."
  },
  {
    id: "sole",
    x: "50%",
    y: "85%",
    title: "Flux-Density Midsole",
    description: "Dual-density supercritical foam infused with nitrogen for explosive responsiveness."
  }
];

export const TechBlueprint = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="py-60 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-20 items-center">
          
          <div className="lg:col-span-2 space-y-12 order-2 lg:order-1">
            <div className="space-y-4">
               <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">Technical Dossier</span>
               <h2 className="text-5xl md:text-7xl font-headline font-bold uppercase tracking-tighter leading-none">
                 BIOMETRIC <br /> <span className="text-white/20">SYMMETRY</span>
               </h2>
            </div>
            
            <div className="space-y-8">
              {HOTSPOTS.map((spot) => (
                <motion.div 
                  key={spot.id}
                  onMouseEnter={() => setActiveId(spot.id)}
                  onMouseLeave={() => setActiveId(null)}
                  className={`p-8 rounded-[2rem] border transition-all duration-500 cursor-pointer ${activeId === spot.id ? 'bg-primary/5 border-primary/30' : 'bg-white/5 border-white/5'}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-headline font-bold uppercase tracking-tight text-xl">{spot.title}</h4>
                    <ChevronRight className={`w-5 h-5 transition-transform duration-500 ${activeId === spot.id ? 'translate-x-2 text-primary' : 'text-white/20'}`} />
                  </div>
                  <p className="text-sm text-white/40 uppercase tracking-widest leading-relaxed">
                    {spot.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 relative aspect-[4/3] order-1 lg:order-2">
            {/* Visual background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,51,51,0.05)_0%,transparent_70%)]" />
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
               <div className="w-full h-full border border-white/10 rounded-full" />
               <div className="absolute w-[80%] h-[80%] border border-white/10 rounded-full" />
            </div>

            <div className="relative w-full h-full">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full flex items-center justify-center"
              >
                <Image 
                  src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/MaterialsVariantsShoe/screenshot/screenshot.png"
                  alt="Technical Blueprint"
                  width={800}
                  height={600}
                  className="object-contain filter grayscale invert brightness-200 contrast-125 opacity-40 hover:opacity-100 transition-opacity duration-1000"
                />
              </motion.div>

              {/* Hotspot Markers */}
              {HOTSPOTS.map((spot) => (
                <div 
                  key={spot.id}
                  className="absolute"
                  style={{ left: spot.x, top: spot.y }}
                >
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    onMouseEnter={() => setActiveId(spot.id)}
                    onMouseLeave={() => setActiveId(null)}
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${activeId === spot.id ? 'bg-primary' : 'bg-white/10'}`}
                  >
                    <Plus className={`w-5 h-5 transition-transform duration-500 ${activeId === spot.id ? 'rotate-45' : ''}`} />
                    
                    {/* Pulse Rings */}
                    <motion.div 
                      animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 border border-primary rounded-full pointer-events-none"
                    />
                  </motion.button>

                  <AnimatePresence>
                    {activeId === spot.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute bottom-14 left-1/2 -translate-x-1/2 w-48 p-4 glass border-primary/30 rounded-2xl text-center pointer-events-none"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-widest">{spot.title}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
