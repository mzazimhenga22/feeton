"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "../CartProvider";
import { Truck, ShieldCheck, Zap } from "lucide-react";

export const OrderSummary = () => {
  const { items, subtotal, cartTotal, promoCode, discount, shippingCost, tax } = useCart();

  return (
    <div className="space-y-8 sticky top-32">
      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-8 backdrop-blur-xl">
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-primary">Your Collection</h3>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0 border border-white/5 group-hover:border-primary/30 transition-colors">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[8px] text-muted-foreground uppercase">No Img</div>
                  )}
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background">
                    {item.quantity}
                  </div>
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-xs font-bold uppercase truncate group-hover:text-primary transition-colors">{item.name}</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{item.selectedSize ? `Size: ${item.selectedSize}` : "Universal Size"}</p>
                  <p className="text-xs font-bold text-white/90">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-white/5" />

        <div className="space-y-3">
          <div className="flex justify-between text-[11px] uppercase tracking-widest text-white/40">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-[11px] uppercase tracking-widest text-green-400">
              <span className="flex items-center gap-1">Discount {promoCode && `(${promoCode})`}</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-[11px] uppercase tracking-widest text-white/40">
            <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Shipping</span>
            <span>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-[11px] uppercase tracking-widest text-white/40">
            <span>Estimated Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          
          <div className="pt-4 flex justify-between items-end">
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Total Acquisition</div>
              <div className="text-3xl font-headline font-bold uppercase tracking-tighter text-white">
                ${cartTotal.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-start gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-white/70">Secure Checkout</h5>
            <p className="text-[9px] text-white/40 uppercase leading-relaxed mt-1">Encrypted SSL protocol active</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
          <Zap className="w-5 h-5 text-primary shrink-0" />
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-white/70">Priority Handling</h5>
            <p className="text-[9px] text-white/40 uppercase leading-relaxed mt-1">Expedited lab verification included</p>
          </div>
        </div>
      </div>
    </div>
  );
};
