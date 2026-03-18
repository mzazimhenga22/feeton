
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Newsletter = () => {
  return (
    <section id="newsletter" className="py-60 relative overflow-hidden bg-gradient-to-b from-transparent to-black/60">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-primary/20 rounded-full blur-[160px] pointer-events-none" 
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto p-16 md:p-32 rounded-[5rem] bg-white/5 border border-white/5 backdrop-blur-2xl flex flex-col items-center text-center space-y-12"
        >
          <div className="space-y-6">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <Mail className="w-16 h-16 text-primary mx-auto mb-8" />
            </motion.div>
            <h2 className="text-sm font-bold tracking-[0.6em] text-primary uppercase mb-4">Chapter 04: The Future</h2>
            <h3 className="text-5xl md:text-7xl font-headline font-bold uppercase tracking-tighter leading-none">Secure <br /><span className="text-primary text-glow-red">Early Access</span></h3>
            <p className="text-foreground/40 max-w-lg mx-auto font-body text-sm uppercase tracking-[0.25em] leading-relaxed">
              Join the Feeton Collective. Be the first to witness the next evolution in performance footwear.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-xl flex flex-col sm:flex-row gap-6"
          >
            <Input 
              placeholder="ENTER YOUR COORDINATES (EMAIL)" 
              className="h-20 bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-full px-10 text-sm tracking-widest uppercase focus:border-primary transition-all"
            />
            <Button size="lg" className="h-20 px-12 text-lg font-bold bg-primary text-primary-foreground rounded-full glow-red group transition-all duration-300">
              JOIN <Send className="ml-3 group-hover:translate-x-3 transition-transform" />
            </Button>
          </motion.div>
          
          <p className="text-[10px] text-foreground/20 uppercase tracking-[0.6em] font-bold">
            Strictly limited capacity. No compromises.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
