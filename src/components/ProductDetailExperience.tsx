"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Minus, Plus, ShieldCheck, Sparkles, Truck, Heart } from "lucide-react";
import type { Product } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/CartProvider";
import { useWishlist } from "@/components/WishlistProvider";
import { useToast } from "@/hooks/use-toast";

interface ProductDetailExperienceProps {
  product: Product;
}

export function ProductDetailExperience({ product }: ProductDetailExperienceProps) {
  const [selectedImage, setSelectedImage] = useState(product.gallery[0] || product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2] || product.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let index = 0; index < quantity; index += 1) {
      addItem(product, selectedSize);
    }

    toast({
      title: "Added to Collection",
      description: `${product.name} in size ${selectedSize} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    toast({
      title: isSaved ? "Removed from Wishlist" : "Added to Wishlist",
      description: isSaved ? `${product.name} removed.` : `${product.name} saved to your collection.`,
    });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.18),transparent_48%)]" />
          <div className="relative aspect-[4/4.3]">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
          <div className="absolute left-6 top-6 flex gap-3">
            <Badge className="border-primary/40 bg-primary/15 px-4 py-1 text-[10px] uppercase tracking-[0.35em] text-primary">
              {product.releaseStatus}
            </Badge>
            <Badge variant="outline" className="border-white/10 bg-black/20 px-4 py-1 text-[10px] uppercase tracking-[0.35em]">
              {product.colorway}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {product.gallery.map((image, index) => {
            const isActive = image === selectedImage;

            return (
              <button
                key={`${product.id}-${index}`}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`group relative overflow-hidden rounded-[1.5rem] border bg-white/[0.03] transition-all ${
                  isActive ? "border-primary/60" : "border-white/10 hover:border-white/25"
                }`}
              >
                <div className="relative aspect-square">
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 33vw, 18vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-8 rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 md:p-10">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">
              Product Dossier
            </span>
            <div className="h-px w-16 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">
              {product.category}
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl font-headline font-black uppercase leading-none tracking-tight md:text-7xl">
              {product.name}
            </h1>
            <p className="max-w-xl text-sm uppercase tracking-[0.28em] text-white/45">
              {product.supportingNote}
            </p>
          </div>

          <div className="flex items-end justify-between gap-6 border-y border-white/10 py-6">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/35">
                Acquisition
              </div>
              <div className="mt-2 text-4xl font-headline font-bold tracking-tight text-primary">
                {product.price}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/35">
                Drop Window
              </div>
              <div className="mt-2 text-sm font-bold uppercase tracking-[0.25em] text-white/80">
                {product.dropDate}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-white/55">Select Size</h2>
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/35">
              True To Size
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.sizes.map((size) => {
              const isActive = size === selectedSize;

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-2xl border px-3 py-4 text-sm font-bold transition-colors ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-white/10 bg-black/20 text-white/75 hover:border-white/25"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex h-14 items-center justify-between rounded-full border border-white/10 bg-black/25 px-2 sm:w-44">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full hover:text-primary"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-sm font-bold">{quantity}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full hover:text-primary"
              onClick={() => setQuantity((current) => current + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            type="button"
            onClick={handleAddToCart}
            className="h-14 flex-1 rounded-full bg-primary text-sm font-bold uppercase tracking-[0.35em] text-primary-foreground glow-red"
          >
            Add To Collection
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className={`h-14 w-14 rounded-full border-white/10 transition-all duration-500 ${isSaved ? "bg-primary text-primary-foreground border-primary" : "hover:border-primary/50"}`}
            onClick={handleToggleWishlist}
          >
            <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>

        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-black/25 p-6 md:grid-cols-3">
          <div className="space-y-2">
            <Truck className="h-5 w-5 text-primary" />
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/70">
              Express Dispatch
            </div>
            <p className="text-sm leading-relaxed text-white/45">
              Priority packaging and tracked delivery on all archive orders.
            </p>
          </div>
          <div className="space-y-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/70">
              Feeton Care
            </div>
            <p className="text-sm leading-relaxed text-white/45">
              Material warranty and guided maintenance support included.
            </p>
          </div>
          <div className="space-y-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/70">
              Concierge Fit
            </div>
            <p className="text-sm leading-relaxed text-white/45">
              Dedicated fit recommendations available before shipment.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-white/55">Highlights</h2>
          <div className="space-y-3">
            {product.highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm text-white/70">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
