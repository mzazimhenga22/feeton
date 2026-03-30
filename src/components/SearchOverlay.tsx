"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getProducts, Product } from "@/lib/products";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const data = await getProducts();
      setAllProducts(data);
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 5));
    } else {
      setResults([]);
    }
  }, [query, allProducts]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-background/80 backdrop-blur-2xl border-white/10 p-0 overflow-hidden top-[20%] translate-y-0">
        <div className="p-8 space-y-8">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
            <Input
              ref={inputRef}
              placeholder="SEARCH THE ARCHIVE..."
              className="h-16 pl-14 pr-12 bg-white/5 border-white/10 rounded-2xl text-xl font-headline font-bold uppercase tracking-widest focus-visible:ring-primary/50"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-transparent text-muted-foreground hover:text-white"
                onClick={() => setQuery("")}
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>

          <AnimatePresence>
            {results.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="space-y-4"
              >
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground ml-2">Matching Masterpieces</h4>
                <div className="grid gap-2">
                  {results.map((product) => (
                    <button
                      key={product.id}
                      onClick={onClose}
                      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group text-left w-full"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                        {product.image ? (
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[8px] text-muted-foreground">NO IMG</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-headline font-bold uppercase group-hover:text-primary transition-colors">{product.name}</h5>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">{product.category} • {product.price}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : query.length > 1 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center space-y-2"
              >
                <p className="text-muted-foreground uppercase tracking-widest text-sm">No results found for "{query}"</p>
                <p className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.2em]">Try searching for "Carbon" or "Pulse"</p>
              </motion.div>
            ) : (
               <div className="py-12 text-center space-y-6">
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] font-bold">Popular Searches</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Performance", "Limited", "Lifestyle", "Carbon"].map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      className="rounded-full border-white/10 bg-white/5 hover:bg-primary hover:text-primary-foreground uppercase tracking-widest text-[10px] h-8 px-4"
                      onClick={() => setQuery(tag)}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};