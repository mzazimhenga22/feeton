
"use client";

import React from "react";
import Image from "next/image";
import { Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MicroCopyReveal } from "./MicroCopyReveal";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  tag: string;
  description: string;
}

export const ProductCard = ({ name, price, image, tag, description }: ProductCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative bg-card rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-primary/50 cursor-pointer">
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
              <Badge className="bg-primary/20 text-primary border-primary/50 backdrop-blur-md uppercase tracking-tighter">
                {tag}
              </Badge>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex space-x-2">
                <Button size="icon" className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-primary hover:text-primary-foreground">
                  <Eye className="w-5 h-5" />
                </Button>
                <Button size="icon" className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-primary hover:text-primary-foreground">
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-2">
            <h3 className="font-headline text-lg font-bold group-hover:text-primary transition-colors">{name}</h3>
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
              <DialogTitle className="text-5xl font-headline font-bold mb-2">{name}</DialogTitle>
              <p className="text-2xl font-body text-primary font-bold">{price}</p>
            </DialogHeader>

            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/40">The Vision</h4>
              <p className="text-foreground/70 leading-relaxed font-body">
                {description}
              </p>
            </div>

            <MicroCopyReveal productName={name} description={description} />

            <div className="flex gap-4">
              <Button className="flex-1 h-14 bg-primary text-primary-foreground font-bold rounded-xl glow-red">
                ADD TO COLLECTION
              </Button>
              <Button variant="outline" className="h-14 w-14 rounded-xl border-white/20">
                <Plus />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
