"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Plus, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MicroCopyReveal } from "./MicroCopyReveal";
import { useCart } from "./CartProvider";
import { useWishlist } from "./WishlistProvider";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "./ThemeProvider";

interface ProductCardProps {
  id: string;
  slug?: string;
  name: string;
  price: string;
  image: string;
  tag: string;
  description: string;
  category?: string;
  gallery?: string[];
  colorway?: string;
  releaseStatus?: string;
  dropDate?: string;
  supportingNote?: string;
  story?: string;
  highlights?: string[];
  specs?: any[];
  sizes?: string[];
}

export const ProductCard = ({
  id,
  slug,
  name,
  price,
  image,
  tag,
  description,
  category = "UNSPECIFIED",
  ...rest
}: ProductCardProps) => {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const { setTheme } = useTheme();

  const isSaved = isInWishlist(id);

  const product = {
    id,
    slug: slug || "",
    name,
    price,
    image,
    tag,
    description,
    category,
    gallery: rest.gallery || [image],
    colorway: rest.colorway || "",
    releaseStatus: rest.releaseStatus || "",
    dropDate: rest.dropDate || "",
    supportingNote: rest.supportingNote || "",
    story: rest.story || "",
    highlights: rest.highlights || [],
    specs: rest.specs || [],
    sizes: rest.sizes || ["40", "41", "42", "43", "44", "45"]
  };

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to Collection",
      description: `${name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
    toast({
      title: isSaved ? "Removed from Wishlist" : "Added to Wishlist",
      description: isSaved ? `${name} removed.` : `${name} saved to your collection.`,
    });
  };

  const handleMouseEnter = () => {
    const lowerCat = category.toLowerCase();
    if (lowerCat.includes("performance")) setTheme("performance");
    else if (lowerCat.includes("limited")) setTheme("limited");
    else if (lowerCat.includes("lifestyle")) setTheme("lifestyle");
    else setTheme("default");
  };

  const handleMouseLeave = () => {
    setTheme("default");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div 
          className="group relative bg-card rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-primary/50 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="aspect-square relative overflow-hidden">
            {image ? (
              <Image 
                src={image} 
                alt={name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                data-ai-hint="luxury sneaker"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Image Unavailable</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary/20 text-primary border-primary/50 backdrop-blur-md uppercase tracking-tighter transition-colors duration-500">
                {tag}
              </Badge>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex space-x-2">
                {slug ? (
                  <Button
                    asChild
                    size="icon"
                    className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-primary hover:text-primary-foreground"
                  >
                    <Link
                      href={`/products/${slug}`}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Open ${name} dossier`}
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                  </Button>
                ) : (
                  <Button size="icon" className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-primary hover:text-primary-foreground">
                    <Eye className="w-5 h-5" />
                  </Button>
                )}
                <Button 
                  size="icon" 
                  className={`rounded-full backdrop-blur-md border border-white/20 hover:bg-primary hover:text-primary-foreground transition-all ${isSaved ? "bg-primary text-primary-foreground" : "bg-white/10"}`}
                  onClick={handleToggleWishlist}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
                </Button>
                <Button 
                  size="icon" 
                  className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-primary hover:text-primary-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart();
                  }}
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-2">
            <h3 className="font-headline text-lg font-bold group-hover:text-primary transition-colors duration-500">{name}</h3>
            <div className="flex items-center justify-between">
              <p className="text-foreground/60 font-body text-sm uppercase tracking-widest">{price}</p>
              <div className="w-8 h-px bg-white/20" />
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-4xl bg-background border-primary/20 glass p-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto">
            {image ? (
              <Image src={image} alt={name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Image Unavailable</span>
              </div>
            )}
          </div>
          <div className="p-8 space-y-8 flex flex-col justify-center">
            <DialogHeader>
              <Badge className="w-fit mb-2 bg-secondary/20 text-secondary border-secondary/50">{tag}</Badge>
              <DialogTitle className="text-5xl font-headline font-bold mb-2 text-primary transition-colors duration-500">{name}</DialogTitle>
              <p className="text-2xl font-body text-primary font-bold transition-colors duration-500">{price}</p>
            </DialogHeader>

            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/40">The Vision</h4>
              <p className="text-foreground/70 leading-relaxed font-body">
                {description}
              </p>
            </div>

            <MicroCopyReveal productName={name} description={description} />

            <div className="flex gap-4">
              <Button 
                className="flex-1 h-14 bg-primary text-primary-foreground font-bold rounded-xl glow-red transition-all duration-500"
                onClick={handleAddToCart}
              >
                ADD TO COLLECTION
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`h-14 w-14 rounded-xl border-white/20 transition-all duration-500 ${isSaved ? "bg-primary text-primary-foreground" : "hover:bg-primary/20"}`}
                onClick={handleToggleWishlist}
              >
                <Heart className={`w-6 h-6 ${isSaved ? "fill-current" : ""}`} />
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-14 rounded-xl border-white/20 px-5 hover:bg-primary hover:text-primary-foreground transition-all duration-500"
              >
                <Link href={slug ? `/products/${slug}` : "#"}>FULL DOSSIER</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
