
"use client";

import React from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold font-headline tracking-tighter flex items-center gap-1 group">
          <span className="text-primary group-hover:text-glow-orange transition-all duration-300">FEETON</span>
          <span className="text-foreground/80">KICKS</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/collections" className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest">Collections</Link>
          <Link href="/innovation" className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest">Innovation</Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest">Philosophy</Link>
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
          <Button variant="outline" className="hidden md:flex border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-6 transition-all duration-300 glow-orange">
            JOIN FEETON
          </Button>
        </div>
      </div>
    </header>
  );
};
