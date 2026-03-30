"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search as SearchIcon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "./CartDrawer";
import { SearchOverlay } from "./SearchOverlay";
import { motion, AnimatePresence } from "framer-motion";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
  </svg>
);

export const Navigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 glass"
          >
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold font-headline tracking-tighter flex items-center gap-1 group">
                <span className="text-primary group-hover:text-glow-red transition-all duration-300">FEETON</span>
                <span className="text-foreground/80">KICKS</span>
              </Link>

              <nav className="hidden md:flex items-center space-x-12">
                <Link href="#collections" className="text-[10px] font-bold hover:text-primary transition-colors uppercase tracking-[0.4em]">Archive</Link>
                <Link href="#innovation" className="text-[10px] font-bold hover:text-primary transition-colors uppercase tracking-[0.4em]">Science</Link>
                <Link href="#newsletter" className="text-[10px] font-bold hover:text-primary transition-colors uppercase tracking-[0.4em]">Waitlist</Link>
                <a href="https://www.tiktok.com/@feetoncollections" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
                  <TikTokIcon />
                </a>
              </nav>

              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:text-primary transition-colors"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <SearchIcon className="w-5 h-5" />
                </Button>
                <CartDrawer />
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
                <Button variant="outline" className="hidden md:flex border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 h-10 text-[10px] font-bold tracking-widest transition-all duration-300 glow-red">
                  ENROLL
                </Button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
