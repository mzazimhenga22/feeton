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
    <section className="py-60 bg-[#080808]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-32 space-y-6">
          <h2 className="text-sm font-bold tracking-[0.6em] text-primary uppercase">The Collective</h2>
          <h3 className="text-5xl md:text-8xl font-headline font-bold uppercase tracking-tighter">BEYOND <br /> OWNERSHIP</h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {TIERS.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-12 rounded-[4rem] border ${tier.color} backdrop-blur-xl relative group flex flex-col`}
            >
              <tier.icon className="w-12 h-12 text-primary mb-10 group-hover:scale-110 transition-transform" />
              <h4 className="text-3xl font-headline font-bold mb-2 uppercase tracking-tight">{tier.name}</h4>
              <div className="text-sm text-foreground/40 font-bold tracking-[0.3em] mb-12">{tier.price}</div>
              
              <ul className="space-y-6 mb-16 flex-grow">
                {tier.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-xs uppercase tracking-widest text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button variant={i === 1 ? "default" : "outline"} className={`w-full h-16 rounded-full text-xs font-bold tracking-[0.4em] ${i === 1 ? 'glow-red' : ''}`}>
                ENROLL NOW <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
