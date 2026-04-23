"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { 
  Zap, 
  Cpu, 
  Shield, 
  Wind, 
  FlaskConical, 
  Dna, 
  Activity, 
  Microscope,
  BoxSelect,
  Orbit,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SCIENCE_MODULES = [
  {
    id: "kinetic",
    title: "KINETIC ENERGY RETURN",
    icon: Zap,
    stat: "98.4%",
    desc: "Our proprietary carbon core utilizes a lattice structure that compresses and recoils with unprecedented efficiency.",
    color: "from-red-500 to-orange-500"
  },
  {
    id: "biometry",
    title: "BIOMETRIC ADAPTATION",
    icon: Dna,
    stat: "0.2ms",
    desc: "Sensory mesh that adjusts tension based on neuro-muscular feedback loops during high-intensity shifts.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "thermal",
    title: "THERMAL EQUILIBRIUM",
    icon: Wind,
    stat: "-4.2°C",
    desc: "Integrated micro-ventilation channels that maintain optimal internal temperature even at peak performance.",
    color: "from-emerald-500 to-teal-500"
  }
];

export default function SciencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,51,51,0.08)_0%,transparent_70%)]" />
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <motion.div 
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="relative z-10 text-center space-y-12 max-w-5xl px-6"
        >
          <div className="flex justify-center">
            <Badge variant="outline" className="px-6 py-2 border-primary/40 text-primary uppercase tracking-[0.5em] font-bold text-[10px] bg-primary/5 backdrop-blur-sm">
              Laboratory Protocol V.26
            </Badge>
          </div>
          <h1 className="text-8xl md:text-[14rem] font-headline font-black uppercase tracking-tighter leading-none italic">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">LAB</span>
          </h1>
          <p className="text-xl md:text-3xl font-body uppercase tracking-[0.2em] text-white/40 max-w-3xl mx-auto leading-relaxed">
            Where biometry meets kinetic engineering to redefine the boundaries of human performance.
          </p>
          <div className="flex justify-center gap-12 pt-12">
             <div className="text-center">
                <p className="text-4xl font-headline font-bold text-primary">0.12</p>
                <p className="text-[10px] uppercase tracking-widest text-white/20 mt-2">Coefficient of Drag</p>
             </div>
             <div className="w-px h-16 bg-white/10" />
             <div className="text-center">
                <p className="text-4xl font-headline font-bold text-primary">420g</p>
                <p className="text-[10px] uppercase tracking-widest text-white/20 mt-2">Peak Propulsion</p>
             </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
           <span className="text-[9px] uppercase tracking-[0.5em] text-white/20">Initiate Deep Dive</span>
           <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-20 bg-gradient-to-b from-primary to-transparent" 
           />
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-60 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
           <div className="space-y-12">
              <div className="space-y-6">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1">PHASE 01</Badge>
                <h2 className="text-6xl font-headline font-bold uppercase tracking-tight leading-none">THE BIOMETRIC <br /> <span className="text-white/20">MAPPING</span></h2>
              </div>
              <p className="text-xl text-white/60 leading-relaxed font-body uppercase tracking-wide">
                We start with the data. Every movement, every shift in pressure, every thermal spike is captured and converted into a computational lattice.
              </p>
              <div className="grid grid-cols-2 gap-8">
                 <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
                    <Activity className="w-8 h-8 text-primary" />
                    <h4 className="font-bold uppercase tracking-widest text-xs">Pressure Mapping</h4>
                    <p className="text-[10px] text-white/30 uppercase leading-relaxed">High-resolution sensors track 1,200 data points per second.</p>
                 </div>
                 <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
                    <Orbit className="w-8 h-8 text-primary" />
                    <h4 className="font-bold uppercase tracking-widest text-xs">Kinetic Paths</h4>
                    <p className="text-[10px] text-white/30 uppercase leading-relaxed">AI optimizes energy flow based on individual gait patterns.</p>
                 </div>
              </div>
           </div>
           <div className="relative aspect-square">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
              <div className="relative w-full h-full border border-white/10 rounded-[3rem] p-12 overflow-hidden glass">
                 <div className="absolute top-0 right-0 p-8">
                    <Badge variant="outline" className="text-[8px] tracking-[0.4em] opacity-40">SIM_V8.4.2</Badge>
                 </div>
                 <div className="w-full h-full flex items-center justify-center">
                    {/* Visual representation of data */}
                    <div className="relative w-64 h-64">
                       {[...Array(5)].map((_, i) => (
                         <motion.div
                          key={i}
                          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 border border-primary/20 rounded-full"
                          style={{ margin: i * 20 }}
                         />
                       ))}
                       <div className="absolute inset-0 flex items-center justify-center">
                          <Microscope className="w-12 h-12 text-primary" />
                       </div>
                    </div>
                 </div>
                 <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                    <div className="space-y-1">
                       <p className="text-[8px] uppercase tracking-widest text-white/30">System Status</p>
                       <p className="text-xs font-bold uppercase tracking-widest text-green-500">Optimized</p>
                    </div>
                    <div className="w-24 h-8 bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-full h-full bg-primary/40"
                       />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Tech Modules Grid */}
      <section className="py-60 bg-white/[0.02] border-y border-white/5">
         <div className="container mx-auto px-6">
            <div className="text-center space-y-6 mb-32">
               <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">Core Technologies</span>
               <h2 className="text-5xl md:text-7xl font-headline font-bold uppercase tracking-tighter">THE ANATOMY OF <br /> <span className="text-white/20">SUPERIORITY</span></h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
               {SCIENCE_MODULES.map((mod, i) => (
                 <motion.div 
                  key={mod.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative p-12 rounded-[3rem] border border-white/10 bg-black hover:border-primary/50 transition-all duration-700"
                 >
                   <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700 rounded-[3rem]`} />
                   
                   <div className="relative z-10 space-y-12">
                      <div className="flex justify-between items-start">
                         <div className="p-5 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                            <mod.icon className="w-8 h-8" />
                         </div>
                         <p className="text-4xl font-headline font-bold text-primary">{mod.stat}</p>
                      </div>
                      <div className="space-y-4">
                         <h3 className="text-2xl font-headline font-bold uppercase tracking-tight">{mod.title}</h3>
                         <p className="text-sm text-white/40 uppercase tracking-widest leading-loose">
                           {mod.desc}
                         </p>
                      </div>
                      <Button variant="link" className="p-0 h-auto text-primary uppercase tracking-[0.3em] font-bold text-[10px] group-hover:translate-x-2 transition-transform">
                         View Case Study <ArrowRight className="w-3 h-3 ml-2" />
                      </Button>
                   </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Exploded View Section (Placeholder for 3D) */}
      <section className="py-60 relative overflow-hidden">
         <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <h2 className="text-[30rem] font-headline font-black italic">PROTOCOL</h2>
         </div>
         <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto space-y-12">
               <div className="space-y-6">
                  <Badge variant="outline" className="border-white/20 uppercase tracking-widest text-[9px] px-4 py-1">Interactive Component</Badge>
                  <h2 className="text-6xl md:text-8xl font-headline font-bold uppercase tracking-tighter leading-none">EXPLODED <br /> <span className="text-primary">ARCHITECTURE</span></h2>
               </div>
               <p className="text-lg text-white/40 uppercase tracking-widest leading-relaxed">
                 Toggle layers to inspect the 12-layer composite construction that makes a Feeton artifact a masterpiece of modular engineering.
               </p>
               <div className="pt-20">
                  <Button size="lg" className="h-16 px-16 rounded-full bg-white text-black font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-500 glow-red">
                     Launch 3D Explorer
                  </Button>
               </div>
            </div>
         </div>
      </section>

      {/* Lab Reports / Whitepaper */}
      <section className="py-60 container mx-auto px-6 border-t border-white/5">
         <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
            <div className="space-y-6">
               <h2 className="text-5xl font-headline font-bold uppercase tracking-tight">TECHNICAL <br /> <span className="text-white/20">WHITE-PAPERS</span></h2>
               <p className="text-white/40 text-sm uppercase tracking-widest max-w-md">Our peer-reviewed research on kinetic propulsion and biological integration.</p>
            </div>
            <Button variant="outline" className="rounded-full border-white/10 px-10 h-14 uppercase tracking-widest text-[10px] font-bold">Access All Reports</Button>
         </div>

         <div className="grid md:grid-cols-2 gap-8">
            {[
              "The Impact of Nitrogen Infusion on Lactic Acid Buildup",
              "Lattice Geometry: Optimizing Energy Vectors in Sprints",
              "Biometric Mesh: Thermal Regulation in High-Performance Athletics",
              "Sustainability of Performance: Lab-Grown Polymers"
            ].map((title, i) => (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/5 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer">
                 <div className="flex justify-between items-start">
                    <div className="space-y-6">
                       <span className="text-[10px] text-primary font-bold uppercase tracking-[0.4em]">Report 0{i+1}</span>
                       <h3 className="text-2xl font-headline font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{title}</h3>
                    </div>
                    <BoxSelect className="w-6 h-6 text-white/20 group-hover:text-primary transition-colors" />
                 </div>
              </div>
            ))}
         </div>
      </section>

      <div className="py-40 text-center">
         <p className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-bold">© 2026 FEETON KINETICS LAB • PROPRIETARY TECHNOLOGY</p>
      </div>
    </div>
  );
}
