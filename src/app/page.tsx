"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { TechSection } from "@/components/TechSection";
import { Newsletter } from "@/components/Newsletter";
import { CollectionSection } from "@/components/CollectionSection";
import { LiveDrops } from "@/components/LiveDrops";
import { Testimonials } from "@/components/Testimonials";
import { MembershipTiers } from "@/components/MembershipTiers";
import { SocialProof } from "@/components/SocialProof";
import { TechBlueprint } from "@/components/TechBlueprint";
import { LifestyleGallery } from "@/components/LifestyleGallery";
import { TikTokSection } from "@/components/TikTokSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

// Lazy-load Three.js scene — keeps ~500KB+ out of the initial bundle
const AuraThreeScene = dynamic(
  () => import("@/components/AuraThreeScene").then(mod => ({ default: mod.AuraThreeScene })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 w-48">
          <div className="text-[10px] text-primary font-bold uppercase tracking-[0.5em] animate-pulse">
            Syncing...
          </div>
          <div className="w-full h-[1px] bg-white/10" />
        </div>
      </div>
    ),
  }
);

// Lazy-load the AI Style Assistant — defers genkit + AI flow bundle
const StyleAssistant = dynamic(
  () => import("@/components/StyleAssistant").then(mod => ({ default: mod.StyleAssistant })),
  { ssr: false }
);

const AnimatedTitle = React.memo(({ text }: { text: string }) => {
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
});
AnimatedTitle.displayName = "AnimatedTitle";

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
        {/* Unified Atmospheric Glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1400px] aspect-square bg-primary/5 rounded-full blur-[180px] translate-z-0 animate-pulse-glow" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent blur-3xl opacity-30 translate-z-0" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 items-center gap-0 lg:-space-x-20">
            <motion.div 
              style={{ opacity: textOpacity, y: textY }}
              className="space-y-12 relative z-20 will-change-transform"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                >
                  <Badge variant="outline" className="border-primary/50 text-primary px-6 py-2 uppercase tracking-[0.4em] font-bold text-[8px] bg-primary/5 backdrop-blur-sm">
                    PROTOCOL 01: THE GENESIS
                  </Badge>
                </motion.div>
                
                <div className="relative">
                   <AnimatedTitle text="KINETIC" />
                   <motion.h1 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="text-8xl md:text-[14rem] font-headline font-black leading-[0.8] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-white bg-[length:200%_auto] animate-shimmer"
                   >
                    ART
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
                <Button asChild size="lg" className="h-20 px-12 text-lg font-bold bg-primary text-primary-foreground rounded-full glow-red group transition-all duration-300 transform hover:scale-105 active:scale-95">
                  <Link href="/archive">
                    INITIALIZE <ArrowRight className="ml-3 group-hover:translate-x-3 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              style={{ scale }}
              className="relative h-[600px] lg:h-[800px] flex items-center justify-center z-10 will-change-transform"
            >
               <div className="w-full h-full relative">
                 <AuraThreeScene />
               </div>
               {/* Enhanced Focal Glow for the shoe */}
               <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
                  <div className="w-[80%] h-[80%] bg-primary/20 rounded-full blur-[140px] animate-pulse-glow" />
               </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          style={{ opacity: textOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-20"
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
        <TechBlueprint />
      </ScrollSection>

      <ScrollSection>
        <LifestyleGallery />
      </ScrollSection>

      <ScrollSection>
        <TikTokSection />
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
            {[
              { label: "Archive", href: "/archive" },
              { label: "Orders", href: "/orders" },
              { label: "Waitlist", href: "/#newsletter" },
              { label: "Privacy", href: "#" },
            ].map((link, i) => (
              <Link 
                key={i}
                href={link.href} 
                className="text-sm font-bold transition-all uppercase tracking-[0.4em] hover:text-primary"
              >
                {link.label}
              </Link>
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
