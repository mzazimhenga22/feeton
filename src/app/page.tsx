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
import { ArrowRight, ChevronDown } from "lucide-react";

const AnimatedTitle = ({ text }: { text: string }) => {
  return (
    <h1 className="text-8xl md:text-[12rem] font-headline font-extrabold leading-[0.85] tracking-tighter uppercase overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            delay: 0.05 * i,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  );
};

const ScrollSection = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.2], [1, 1.2]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <div ref={targetRef} className="min-h-screen relative bg-[#050505] text-white selection:bg-primary selection:text-white overflow-x-hidden">
      <Navigation />
      <StyleAssistant />
      
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 items-center gap-16">
            <motion.div 
              style={{ opacity: textOpacity, y: textY }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                >
                  <Badge variant="outline" className="border-primary/50 text-primary px-6 py-2 uppercase tracking-[0.4em] font-bold text-[10px] bg-primary/5">
                    Chapter 01: The Genesis
                  </Badge>
                </motion.div>
                
                <div className="relative">
                   <AnimatedTitle text="QUALITY" />
                   <motion.h1 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="text-8xl md:text-[12rem] font-headline font-extrabold leading-[0.85] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] animate-shimmer"
                   >
                    STEPS
                   </motion.h1>
                </div>
              </div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-xl text-foreground/50 max-w-lg font-body leading-relaxed uppercase tracking-wider"
              >
                Engineering the bridge between biology and kinetic art.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <Button size="lg" className="h-20 px-12 text-lg font-bold bg-primary text-primary-foreground rounded-full glow-red group transition-all duration-300 transform hover:scale-105 active:scale-95">
                  INITIALIZE <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              style={{ scale }}
              className="relative h-[600px] lg:h-[800px] flex items-center justify-center"
            >
               <div className="w-full h-full relative">
                 <AuraThreeScene />
               </div>
               <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
                  <div className="w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
               </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          style={{ opacity: textOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">Scroll to Evolve</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center"
          >
             <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
             <ChevronDown className="w-4 h-4 text-primary -mt-1" />
          </motion.div>
        </motion.div>
      </section>

      <SocialProof />
      
      <ScrollSection>
        <LiveDrops />
      </ScrollSection>

      <ScrollSection>
        <CollectionSection />
      </ScrollSection>

      <ScrollSection>
        <TechSection />
      </ScrollSection>

      <ScrollSection>
        <MembershipTiers />
      </ScrollSection>

      <ScrollSection>
        <Testimonials />
      </ScrollSection>
      
      <ScrollSection>
        <Newsletter />
      </ScrollSection>

      {/* Footer */}
      <footer className="py-40 bg-black relative overflow-hidden">
        <div className="container mx-auto px-6 text-center space-y-20 relative z-10">
          <div className="flex flex-col items-center gap-8">
            <Link href="/" className="text-6xl md:text-8xl font-bold font-headline tracking-tighter inline-flex items-center gap-4 group">
              <span className="text-primary group-hover:text-glow-red transition-all duration-500">FEETON</span>
              <span className="text-foreground/80">KICKS</span>
            </Link>
            <p className="text-foreground/20 uppercase tracking-[1em] text-[12px] font-bold">Engineered for the Future</p>
          </div>

          <div className="flex flex-wrap justify-center gap-16 md:gap-32">
            {["Privacy", "Terms", "Contact"].map((link, i) => (
              <a 
                key={i}
                href="#" 
                className="text-sm font-bold transition-all uppercase tracking-[0.4em] hover:text-primary"
              >
                {link}
              </a>
            ))}
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

import Link from "next/link";