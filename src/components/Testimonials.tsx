"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const REVIEWS = [
  {
    name: "Alex Thorne",
    role: "Professional Runner",
    text: "The energy return on the Carbon Flux is surgically precise. It feels like an extension of my nervous system.",
    avatar: "https://picsum.photos/seed/alex/100/100"
  },
  {
    name: "Elena Vark",
    role: "Architect",
    text: "Finally, a brand that treats footwear as structural engineering. The Crimson Edge is a masterpiece of form and function.",
    avatar: "https://picsum.photos/seed/elena/100/100"
  },
  {
    name: "Marcus Void",
    role: "Visual Artist",
    text: "The Neon Pulse is pure cyberpunk. The illumination patterns are the future of street aesthetics.",
    avatar: "https://picsum.photos/seed/marcus/100/100"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-60 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <h2 className="text-sm font-bold tracking-[0.6em] text-primary uppercase">The Verdict</h2>
            <h3 className="text-6xl md:text-8xl font-headline font-bold uppercase tracking-tighter leading-tight">
              VOICES FROM <br /> THE <span className="text-primary">FUTURE</span>
            </h3>
            <p className="text-foreground/40 max-w-sm font-body text-sm uppercase tracking-[0.2em] leading-relaxed">
              We don't sell shoes. We provide vessels for human acceleration. Hear from those who've made the leap.
            </p>
          </div>

          <div className="space-y-8">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="glass border-white/5 p-8 rounded-[2.5rem] hover:border-primary/30 transition-all group">
                  <CardContent className="p-0 space-y-6">
                    <Quote className="w-10 h-10 text-primary/20 group-hover:text-primary transition-colors" />
                    <p className="text-lg font-body text-foreground/80 leading-relaxed italic">
                      "{review.text}"
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 border border-primary/20">
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-bold uppercase tracking-widest">{review.name}</div>
                          <div className="text-[10px] text-foreground/40 uppercase tracking-widest">{review.role}</div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-primary text-primary" />)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
