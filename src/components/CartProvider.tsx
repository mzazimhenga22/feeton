"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "@/lib/products";

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

const PROMO_CODES: Record<string, number> = {
  FEETON10: 0.1,
  FIRST20: 0.2,
  KICKS15: 0.15,
};

const FREE_SHIPPING_THRESHOLD = 500;
const FLAT_SHIPPING = 25;
const TAX_RATE = 0.08;

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  cartTotal: number;
  promoCode: string | null;
  discount: number;
  shippingCost: number;
  tax: number;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try { setItems(JSON.parse(savedCart)); } catch (e) { console.error("Failed to parse cart", e); }
    }
    const savedPromo = localStorage.getItem("promoCode");
    if (savedPromo) setPromoCode(savedPromo);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, isMounted]);

  useEffect(() => {
    if (isMounted) {
      if (promoCode) localStorage.setItem("promoCode", promoCode);
      else localStorage.removeItem("promoCode");
    }
  }, [promoCode, isMounted]);

  const addItem = (product: Product, size?: string) => {
    setItems((curr) => {
      const existing = curr.find((item) => item.id === product.id);
      if (existing) {
        return curr.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...curr, { ...product, quantity: 1, selectedSize: size }];
    });
  };

  const removeItem = (id: string) => {
    setItems((curr) => curr.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) { removeItem(id); return; }
    setItems((curr) => curr.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const clearCart = () => { setItems([]); setPromoCode(null); };

  const cartCount = items.reduce((t, i) => t + i.quantity, 0);

  const subtotal = items.reduce((total, item) => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return total + numericPrice * item.quantity;
  }, 0);

  const discountRate = promoCode ? (PROMO_CODES[promoCode] || 0) : 0;
  const discount = subtotal * discountRate;
  const afterDiscount = subtotal - discount;
  const shippingCost = items.length === 0 ? 0 : afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const tax = afterDiscount * TAX_RATE;
  const cartTotal = afterDiscount + shippingCost + tax;

  const applyPromo = useCallback((code: string) => {
    const upper = code.trim().toUpperCase();
    if (PROMO_CODES[upper]) {
      setPromoCode(upper);
      return { success: true, message: `${Math.round(PROMO_CODES[upper] * 100)}% discount applied!` };
    }
    return { success: false, message: "Invalid promo code" };
  }, []);

  const removePromo = useCallback(() => setPromoCode(null), []);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, cartCount, subtotal, cartTotal, promoCode, discount, shippingCost, tax, applyPromo, removePromo }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error("useCart must be used within a CartProvider");
  return context;
};
