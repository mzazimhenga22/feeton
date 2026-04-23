"use client";

import React from "react";
import Image from "next/image";
import { X, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useWishlist } from "./WishlistProvider";
import { useCart } from "./CartProvider";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

export const WishlistDrawer = () => {
  const { items, removeFromWishlist, wishlistCount } = useWishlist();
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleMoveToCart = (item: typeof items[0]) => {
    addItem(item);
    removeFromWishlist(item.id);
    toast({ title: "Moved to Cart", description: `${item.name} has been added to your cart.` });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:text-primary transition-colors relative">
          <Heart className="w-5 h-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {wishlistCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-background border-l border-white/10 glass p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-white/10">
          <SheetTitle className="text-2xl font-headline font-bold uppercase tracking-widest flex items-center justify-between">
            Wishlist
            <span className="text-sm text-muted-foreground">{wishlistCount} saved</span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4">
            <Heart className="w-16 h-16 text-muted-foreground opacity-20" />
            <p className="text-muted-foreground uppercase tracking-widest text-sm text-center">
              No saved items yet
            </p>
          </div>
        ) : (
          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center group bg-white/5 p-4 rounded-2xl border border-white/5">
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
                        <p className="text-sm text-muted-foreground uppercase tracking-widest">{item.price}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-red-500 shrink-0" onClick={() => removeFromWishlist(item.id)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      className="h-9 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white text-[10px] uppercase tracking-[0.2em] font-bold"
                      onClick={() => handleMoveToCart(item)}
                    >
                      <ShoppingBag className="w-3 h-3 mr-1" /> Move to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
};
