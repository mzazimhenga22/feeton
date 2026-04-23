"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "@/lib/products";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: string) => boolean;
  wishlistCount: number;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Product[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuth();

  const fetchWishlist = useCallback(async () => {
    if (!supabase || !user) return;
    
    const { data, error } = await supabase
      .from("wishlists")
      .select("items")
      .eq("user_id", user.id)
      .maybeSingle();

    if (data && !error) {
      setItems(data.items as unknown as Product[]);
    }
  }, [user]);

  const saveWishlist = useCallback(async (newItems: Product[]) => {
    if (!supabase || !user) return;

    await supabase.from("wishlists").upsert({
      user_id: user.id,
      items: newItems as any,
      updated_at: new Date().toISOString(),
    });
  }, [user]);

  useEffect(() => {
    setIsMounted(true);
    if (user) {
      fetchWishlist();
    } else {
      const saved = localStorage.getItem("wishlist");
      if (saved) {
        try { setItems(JSON.parse(saved)); } catch {}
      }
    }
  }, [user, fetchWishlist]);

  useEffect(() => {
    if (isMounted && !user) localStorage.setItem("wishlist", JSON.stringify(items));
  }, [items, isMounted, user]);

  const addToWishlist = (product: Product) => {
    setItems((curr) => {
      const next = curr.find((i) => i.id === product.id) ? curr : [...curr, product];
      if (user) saveWishlist(next);
      return next;
    });
  };

  const removeFromWishlist = (id: string) => {
    setItems((curr) => {
      const next = curr.filter((i) => i.id !== id);
      if (user) saveWishlist(next);
      return next;
    });
  };

  const toggleWishlist = (product: Product) => {
    setItems((curr) => {
      const next = curr.find((i) => i.id === product.id)
        ? curr.filter((i) => i.id !== product.id)
        : [...curr, product];
      if (user) saveWishlist(next);
      return next;
    });
  };

  const isInWishlist = (id: string) => items.some((i) => i.id === id);
  const wishlistCount = items.length;
  const clearWishlist = () => {
    setItems([]);
    if (user) saveWishlist([]);
  };

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, wishlistCount, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
};
