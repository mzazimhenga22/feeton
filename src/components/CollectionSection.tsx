"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const CATEGORIES = ["ALL", "PERFORMANCE", "LIMITED", "LIFESTYLE"];

const PRODUCTS = [
  { id: "c-1", name: "FEETON CARBON FLUX", price: "$540.00", category: "PERFORMANCE", tag: "Performance", description: "A masterpiece of carbon fiber integration.", image: PlaceHolderImages.find(img => img.id === "shoe-1")?.imageUrl || "" },
  { id: "c-2", name: "NEON PULSE XT", price: "$620.00", category: "LIMITED", tag: "Limited", description: "Featuring active illuminating soles.", image: PlaceHolderImages.find(img => img.id === "shoe-2")?.imageUrl || "" },
  { id: "c-3", name: "CRIMSON EDGE 01", price: "$480.00", category: "LIFESTYLE", tag: "Lifestyle", description: "Sharp edges meet soft landings.", image: PlaceHolderImages.find(img => img.id === "shoe-3")?.imageUrl || "" },
];

export const CollectionSection = () => {
  const [activeTab, setActiveTab] = useState("ALL");

  const filteredProducts = activeTab === "ALL" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeTab);

  return (
    <section id="collections" className="py-60 relative bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-32">
          <div className="space-y-6">
             <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 border border-primary/30 rounded-full bg-primary/5"
            >
              <span className="text-[10px] text-primary uppercase tracking-[0.4em] font-bold">The Archive</span>
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-headline font-bold leading-none tracking-tighter uppercase">
              TECHNICAL <br /> MASTERPIECES
            </h2>
          </div>
          
          <Tabs defaultValue="ALL" className="w-fit" onValueChange={setActiveTab}>
            <TabsList className="bg-white/5 border border-white/10 p-1 h-14 rounded-full">
              {CATEGORIES.map(cat => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="rounded-full px-8 text-[10px] tracking-[0.2em] uppercase data-[state=active]:bg-primary data-[state=active]:text-white h-full"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <motion.div layout className="grid md:grid-cols-3 gap-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
