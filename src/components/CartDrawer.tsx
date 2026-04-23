"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, Tag, Truck, Percent } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "./CartProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

export const CartDrawer = () => {
  const { items, removeItem, updateQuantity, cartCount, subtotal, cartTotal, promoCode, discount, shippingCost, tax, applyPromo, removePromo } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [promoMsg, setPromoMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const handleApplyPromo = () => {
    const result = applyPromo(promoInput);
    setPromoMsg({ text: result.message, ok: result.success });
    if (result.success) setPromoInput("");
    setTimeout(() => setPromoMsg(null), 3000);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:text-primary transition-colors relative">
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-background border-l border-white/10 glass p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-white/10">
          <SheetTitle className="text-2xl font-headline font-bold uppercase tracking-widest flex items-center justify-between">
            Your Cart
            <span className="text-sm text-muted-foreground">{cartCount} items</span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4">
            <ShoppingBag className="w-16 h-16 text-muted-foreground opacity-20" />
            <p className="text-muted-foreground uppercase tracking-widest text-sm text-center">Your collection is empty</p>
          </div>
        ) : (
          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-4 items-center group bg-white/5 p-4 rounded-2xl border border-white/5"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted shrink-0">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground uppercase">No Img</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="min-w-0">
                        <h4 className="font-headline font-bold uppercase leading-tight line-clamp-1 text-sm group-hover:text-primary transition-colors">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.price}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:text-red-500 shrink-0" onClick={() => removeItem(item.id)}>
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center border border-white/10 rounded-full bg-black/50 w-fit">
                      <Button variant="ghost" size="icon" className="w-7 h-7 rounded-full hover:text-primary" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="w-7 h-7 rounded-full hover:text-primary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* Footer */}
        <div className="p-6 border-t border-white/10 space-y-4 bg-black/40">
          {/* Promo Code */}
          {items.length > 0 && (
            <div className="space-y-2">
              {promoCode ? (
                <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{promoCode}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="w-6 h-6 text-primary hover:text-red-400" onClick={removePromo}>
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                    <input
                      type="text"
                      placeholder="PROMO CODE"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                      className="w-full h-10 pl-9 pr-3 rounded-xl border border-white/10 bg-white/[0.03] text-xs uppercase tracking-[0.2em] placeholder:text-white/20 focus:outline-none focus:border-primary/40"
                    />
                  </div>
                  <Button onClick={handleApplyPromo} className="h-10 px-4 rounded-xl bg-white/10 hover:bg-primary text-xs font-bold uppercase tracking-[0.15em]">
                    Apply
                  </Button>
                </div>
              )}
              <AnimatePresence>
                {promoMsg && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`text-[11px] uppercase tracking-[0.15em] ${promoMsg.ok ? "text-green-400" : "text-red-400"}`}
                  >
                    {promoMsg.text}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Totals */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground uppercase tracking-widest text-xs">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-400 uppercase tracking-widest text-xs">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground uppercase tracking-widest text-xs">
              <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Shipping</span>
              <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-muted-foreground uppercase tracking-widest text-xs">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="h-px w-full bg-white/10 my-2" />
            <div className="flex justify-between font-bold font-headline text-lg uppercase tracking-tighter">
              <span>Total</span>
              <span className="text-primary">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <Button asChild className="w-full h-14 bg-primary text-primary-foreground font-bold rounded-xl glow-red uppercase tracking-widest text-sm" disabled={items.length === 0}>
            <Link href="/checkout">Checkout Now</Link>
          </Button>
          {subtotal > 0 && subtotal < 500 && (
            <p className="text-center text-[10px] uppercase tracking-[0.2em] text-white/25">
              Add ${(500 - subtotal).toFixed(0)} more for free shipping
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
