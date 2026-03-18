
"use client";

import React from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
  </svg>
);

export const Navigation = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold font-headline tracking-tighter flex items-center gap-1 group">
          <span className="text-primary group-hover:text-glow-red transition-all duration-300">FEETON</span>
          <span className="text-foreground/80">KICKS</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#collections" className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest">Collections</Link>
          <Link href="#innovation" className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest">Innovation</Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest">Philosophy</Link>
          <a href="https://www.tiktok.com/@feetoncollections" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
            <TikTokIcon />
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:text-primary transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
          <Button variant="outline" className="hidden md:flex border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-6 transition-all duration-300 glow-red">
            JOIN FEETON
          </Button>
        </div>
      </div>
    </header>
  );
};
