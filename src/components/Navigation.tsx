"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search as SearchIcon, Menu, X, User, LogOut, Package, ChevronRight, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "./CartDrawer";
import { WishlistDrawer } from "./WishlistDrawer";
import { SearchOverlay } from "./SearchOverlay";
import { AuthModal } from "./AuthModal";
import { useAuth } from "./AuthProvider";
import { motion, AnimatePresence } from "framer-motion";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
  </svg>
);

const NAV_LINKS = [
  { label: "Archive", href: "/archive" },
  { label: "Science", href: "/science" },
  { label: "Orders", href: "/orders" },
  { label: "Waitlist", href: "/#newsletter" },
];

export const Navigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, signOut, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      if (!user || !supabase) return;
      const { data } = await supabase.from("profiles").select("is_admin").eq("id", user.id).maybeSingle();
      if (data) setIsAdmin(data.is_admin || false);
    }
    checkAdmin();
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= 100 || currentScrollY < lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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
                {NAV_LINKS.map((link) => (
                  <Link key={link.label} href={link.href} className="text-[10px] font-bold hover:text-primary transition-colors uppercase tracking-[0.4em]">
                    {link.label}
                  </Link>
                ))}
                <a href="https://www.tiktok.com/@feetoncollections" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
                  <TikTokIcon />
                </a>
              </nav>

              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors" onClick={() => setIsSearchOpen(true)}>
                  <SearchIcon className="w-5 h-5" />
                </Button>
                <WishlistDrawer />
                <CartDrawer />

                {/* Auth */}
                {!loading && (
                  user ? (
                    <div className="relative" ref={userMenuRef}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-primary transition-colors"
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                          <span className="text-[11px] font-bold text-primary">
                            {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
                          </span>
                        </div>
                      </Button>
                      <AnimatePresence>
                        {isUserMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-12 w-56 rounded-2xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-2xl overflow-hidden shadow-2xl"
                          >
                            <div className="p-4 border-b border-white/5">
                              <p className="text-xs font-bold text-white truncate">{user.user_metadata?.full_name || "Member"}</p>
                              <p className="text-[10px] text-white/30 truncate mt-0.5">{user.email}</p>
                            </div>
                            <div className="p-2">
                              {isAdmin && (
                                <Link
                                  href="/admin"
                                  onClick={() => setIsUserMenuOpen(false)}
                                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs uppercase tracking-[0.15em] text-primary hover:bg-primary/10 transition-all border border-primary/20 mb-1"
                                >
                                  <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Admin Command</span>
                                  <ChevronRight className="w-3 h-3" />
                                </Link>
                              )}
                              <Link
                                href="/orders"
                                onClick={() => setIsUserMenuOpen(false)}
                                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs uppercase tracking-[0.15em] text-white/60 hover:text-primary hover:bg-white/5 transition-all"
                              >
                                <span className="flex items-center gap-2"><Package className="w-4 h-4" /> Orders</span>
                                <ChevronRight className="w-3 h-3" />
                              </Link>
                              <button
                                onClick={() => { signOut(); setIsUserMenuOpen(false); }}
                                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs uppercase tracking-[0.15em] text-white/60 hover:text-red-400 hover:bg-red-500/5 transition-all"
                              >
                                <LogOut className="w-4 h-4" /> Sign Out
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="hidden md:flex border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 h-10 text-[10px] font-bold tracking-widest transition-all duration-300 glow-red"
                      onClick={() => setIsAuthOpen(true)}
                    >
                      ENROLL
                    </Button>
                  )
                )}

                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileOpen(true)}>
                  <Menu className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80]"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-[#0a0a0a] border-l border-white/10 p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">Navigation</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <nav className="space-y-6 flex-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="text-2xl font-headline font-bold uppercase tracking-tight hover:text-primary transition-colors flex items-center justify-between group"
                    >
                      {link.label}
                      <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              {!user && (
                <Button
                  className="w-full h-14 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-widest glow-red"
                  onClick={() => { setIsMobileOpen(false); setIsAuthOpen(true); }}
                >
                  Enroll Now
                </Button>
              )}
              {user && (
                <div className="space-y-3">
                  <p className="text-xs text-white/30 truncate">{user.email}</p>
                  <Button variant="outline" className="w-full h-12 rounded-full border-white/10 text-xs uppercase tracking-widest" onClick={() => { signOut(); setIsMobileOpen(false); }}>
                    Sign Out
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};
