"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProducts, Product } from "@/lib/products";
import { Skeleton } from "@/components/ui/skeleton";

const CATEGORIES = ["ALL", "PERFORMANCE", "LIMITED", "LIFESTYLE"];

export const CollectionSection = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeTab === "ALL" 
    ? products 
    : products.filter(p => p.category === activeTab);

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

        <div className="grid md:grid-cols-3 gap-16">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="space-y-6">
                <Skeleton className="aspect-square w-full rounded-2xl bg-white/5" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-2/3 bg-white/5" />
                  <Skeleton className="h-4 w-1/3 bg-white/5" />
                </div>
              </div>
            ))
          ) : (
            <AnimatePresence mode="wait">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};