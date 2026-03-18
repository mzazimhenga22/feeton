
"use client";

import React, { useState } from "react";
import { generateProductMicroCopy, type GenerateProductMicroCopyOutput } from "@/ai/flows/generate-product-micro-copy";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MicroCopyRevealProps {
  productName: string;
  description: string;
}

export const MicroCopyReveal = ({ productName, description }: MicroCopyRevealProps) => {
  const [data, setData] = useState<GenerateProductMicroCopyOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateProductMicroCopy({
        productName,
        productDescription: description,
        keyFeatures: ["Rim lighting", "Aerodynamic", "Limited Edition"]
      });
      setData(result);
    } catch (error) {
      console.error("AI Generation failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!data && (
        <Button 
          onClick={handleGenerate} 
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground glow-red group relative overflow-hidden h-12 px-8"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
          )}
          {loading ? "Decrypting Style..." : "Reveal Design Vision"}
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </Button>
      )}

      {data && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl font-headline font-bold mb-4 text-glow-red">{data.tagline}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.microCopyHighlights.map((highlight, idx) => (
              <Card key={idx} className="bg-white/5 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-4 flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary glow-red shrink-0" />
                  <p className="text-sm text-foreground/80 font-body leading-relaxed">{highlight}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
