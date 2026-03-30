"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { AuraThreeScene } from "@/components/AuraThreeScene";
import { TechSection } from "@/components/TechSection";
import { Newsletter } from "@/components/Newsletter";
import { CollectionSection } from "@/components/CollectionSection";
import { LiveDrops } from "@/components/LiveDrops";
import { Testimonials } from "@/components/Testimonials";
import { MembershipTiers } from "@/components/MembershipTiers";
import { SocialProof } from "@/components/SocialProof";
import { StyleAssistant } from "@/components/StyleAssistant";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
  </svg>
);

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.2], [1, 1.2]), {
    stiffness: 100,
    damping: 30
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 0.5, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <div ref={targetRef} className="min-h-screen relative bg-[#050505] text-white selection:bg-primary selection:text-white overflow-x-hidden">
      <Navigation />
      <StyleAssistant />
      
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section - The Genesis */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <motion.div 
          style={{ opacity, y }}
          className="container mx-auto px-6 grid lg:grid-cols-2 items-center gap-16 relative z-10"
        >
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <Badge variant="outline" className="border-primary/50 text-primary px-6 py-2 uppercase tracking-[0.4em] font-bold text-[10px] bg-primary/5">
                Chapter 01: The Genesis
              </Badge>
              <h1 className="text-8xl md:text-9xl font-headline font-extrabold leading-[0.9] tracking-tighter uppercase">
                QUALITY <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] animate-[shimmer_5s_linear_infinite]">
                  STEPS
                </span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl text-foreground/50 max-w-lg font-body leading-relaxed uppercase tracking-wider"
            >
              Born in the neon-lit labs of the future, Feeton isn't just footwear. It's an extension of your kinetic potential.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Button size="lg" className="h-20 px-12 text-lg font-bold bg-primary text-primary-foreground rounded-full glow-red group transition-all duration-300 transform hover:scale-105">
                START JOURNEY <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform" />
              </Button>
            </motion.div>
          </div>

          <motion.div 
            style={{ scale }}
            className="relative h-[700px] lg:h-[800px] flex items-center justify-center"
          >
             <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
               <AuraThreeScene />
             </div>
             {/* Glow behind model */}
             <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
                <div className="w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
             </div>
          </motion.div>
        </motion.div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-30">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Scroll to Evolve</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-16 bg-gradient-to-b from-primary to-transparent" 
          />
        </div>
      </section>

      <SocialProof />
      
      <LiveDrops />

      <CollectionSection />

      <TechSection />

      <MembershipTiers />

      <Testimonials />
      
      <Newsletter />

      {/* Footer */}
      <footer className="py-40 bg-black relative overflow-hidden">
        <div className="container mx-auto px-6 text-center space-y-20">
          <div className="flex flex-col items-center gap-8">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="/" 
              className="text-6xl md:text-8xl font-bold font-headline tracking-tighter inline-flex items-center gap-4 group"
            >
              <span className="text-primary group-hover:text-glow-red transition-all duration-500">FEETON</span>
              <span className="text-foreground/80">KICKS</span>
            </motion.a>
            <p className="text-foreground/20 uppercase tracking-[1em] text-[12px] font-bold">Engineered for the Future</p>
          </div>

          <div className="flex justify-center gap-10">
            {[
              { icon: TikTokIcon, href: "https://www.tiktok.com/@feeton_collections" },
              { icon: ArrowRight, href: "#" },
              { icon: ArrowRight, href: "#" }
            ].map((social, i) => (
              <motion.a 
                key={i}
                whileHover={{ y: -5, borderColor: "rgba(255,0,0,0.5)" }}
                href={social.href} 
                className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center hover:text-primary transition-all bg-white/5"
              >
                <social.icon />
              </motion.a>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-16 md:gap-32">
            <a href="#" className="text-sm font-bold hover:text-primary transition-colors uppercase tracking-[0.4em]">Privacy</a>
            <a href="#" className="text-sm font-bold hover:text-primary transition-colors uppercase tracking-[0.4em]">Terms</a>
            <a href="#" className="text-sm font-bold hover:text-primary transition-colors uppercase tracking-[0.4em]">Contact</a>
          </div>

          <div className="pt-24 border-t border-white/5">
            <p className="text-foreground/10 text-xs uppercase tracking-[0.8em] font-bold">
              © 2026 FEETON KICKS INC. @feeton_collections
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}