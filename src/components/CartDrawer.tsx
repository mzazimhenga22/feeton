"use client";

import React from "react";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "./CartProvider";
import { ScrollArea } from "@/components/ui/scroll-area";

export const CartDrawer = () => {
  const { items, removeItem, updateQuantity, cartCount, cartTotal } = useCart();

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
            <div className="p-6 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center group bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-muted">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground uppercase">No Img</div>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-headline font-bold uppercase leading-tight line-clamp-1 group-hover:text-primary transition-colors">{item.name}</h4>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest">{item.price}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 -mt-2 -mr-2" onClick={() => removeItem(item.id)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-white/10 rounded-full bg-black/50">
                        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:text-primary" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:text-primary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <div className="p-6 border-t border-white/10 space-y-6 bg-black/40">
          <div className="space-y-2">
            <div className="flex justify-between text-muted-foreground text-sm uppercase tracking-widest">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground text-sm uppercase tracking-widest">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="h-px w-full bg-white/10 my-4" />
            <div className="flex justify-between font-bold font-headline text-xl uppercase tracking-tighter">
              <span>Total</span>
              <span className="text-primary">${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <Button className="w-full h-14 bg-primary text-primary-foreground font-bold rounded-xl glow-red uppercase tracking-widest text-lg" disabled={items.length === 0}>
            Checkout Now
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
