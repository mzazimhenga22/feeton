"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timer, Zap, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const LiveDrops = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 45, s: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: 59, s: 59 };
        return { h: prev.h - 1, m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-primary/5 border-y border-primary/10 relative overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center glow-red">
            <Zap className="w-10 h-10 text-primary animate-pulse" />
          </div>
          <div>
            <Badge className="bg-primary/20 text-primary border-primary/50 mb-2 tracking-widest">NEXT EVOLUTION DROP</Badge>
            <h3 className="text-3xl font-headline font-bold uppercase tracking-tighter">FEETON NEBULA X-01</h3>
          </div>
        </div>

        <div className="flex gap-4 md:gap-8 items-center">
          {[
            { label: "Hours", val: timeLeft.h },
            { label: "Mins", val: timeLeft.m },
            { label: "Secs", val: timeLeft.s }
          ].map((item, i) => (
            <div key={i} className="text-center min-w-[80px]">
              <div className="text-5xl font-headline font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                {String(item.val).padStart(2, '0')}
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-bold">{item.label}</div>
            </div>
          ))}
        </div>

        <Button size="lg" className="h-16 px-10 rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all group font-bold">
          REMIND ME <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
        </Button>
      </div>
      
      {/* Dynamic Background Line — CSS animated for zero JS overhead */}
      <div 
        className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-30 animate-sweep-line"
      />
    </section>
  );
};
