"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Crown, Diamond, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TIERS = [
  {
    name: "ORIGIN",
    icon: Shield,
    price: "FREE",
    features: ["Early Access Alerts", "Standard Maintenance", "Member Portal"],
    color: "border-white/10"
  },
  {
    name: "KINETIC",
    icon: Crown,
    price: "$250/YR",
    features: ["48h Priority Access", "Biannual Resole Service", "Limited Edition Drops"],
    color: "border-primary/50 bg-primary/5"
  },
  {
    name: "FEETON APEX",
    icon: Diamond,
    price: "$1200/YR",
    features: ["Instant Global Drops", "VIP Lab Concierge", "Custom Bespoke Service"],
    color: "border-white/20"
  }
];

export const MembershipTiers = () => {
  return (
    <section className="py-60 bg-[#080808] relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[160px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-32 space-y-6">
          <motion.h2 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.6em" }}
            viewport={{ once: true }}
            className="text-sm font-bold text-primary uppercase"
          >
            The Collective
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-headline font-bold uppercase tracking-tighter"
          >
            BEYOND <br /> OWNERSHIP
          </motion.h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {TIERS.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              whileHover={{ y: -20 }}
              className={`p-12 rounded-[4rem] border ${tier.color} backdrop-blur-xl relative group flex flex-col transition-shadow hover:shadow-[0_20px_50px_rgba(255,0,0,0.1)]`}
            >
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="w-12 h-12 mb-10"
              >
                <tier.icon className="w-full h-full text-primary" />
              </motion.div>
              
              <h4 className="text-3xl font-headline font-bold mb-2 uppercase tracking-tight group-hover:text-primary transition-colors">{tier.name}</h4>
              <div className="text-sm text-foreground/40 font-bold tracking-[0.3em] mb-12">{tier.price}</div>
              
              <ul className="space-y-6 mb-16 flex-grow">
                {tier.features.map((f, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: (i * 0.2) + (idx * 0.1) }}
                    className="flex items-center gap-4 text-xs uppercase tracking-widest text-foreground/80"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary glow-red" />
                    {f}
                  </motion.li>
                ))}
              </ul>

              <Button variant={i === 1 ? "default" : "outline"} className={`w-full h-16 rounded-full text-xs font-bold tracking-[0.4em] transition-all duration-500 ${i === 1 ? 'glow-red' : 'hover:border-primary hover:text-primary'}`}>
                ENROLL NOW <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
