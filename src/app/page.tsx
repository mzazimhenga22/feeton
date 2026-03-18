import React from "react";
import { Navigation } from "@/components/Navigation";
import { AuraThreeScene } from "@/components/AuraThreeScene";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Globe, Sparkles } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-sneaker");
  const collectionImages = [
    PlaceHolderImages.find(img => img.id === "shoe-1"),
    PlaceHolderImages.find(img => img.id === "shoe-2"),
    PlaceHolderImages.find(img => img.id === "shoe-3"),
  ];

  return (
    <div className="min-h-screen relative">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-12 relative z-10">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div>
              <Badge variant="outline" className="mb-6 border-primary/50 text-primary px-4 py-1.5 uppercase tracking-[0.2em] font-bold text-[10px] animate-bounce">
                Innovation in motion
              </Badge>
              <h1 className="text-7xl lg:text-9xl font-headline font-bold leading-tight tracking-tighter">
                FUTURE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-[gradient_8s_linear_infinite]">
                  BEYOND
                </span>
              </h1>
            </div>
            
            <p className="text-xl text-foreground/60 max-w-lg font-body leading-relaxed">
              Step into the neon-lit horizon with Aura. Designed for the elite, engineered for the futuristic, and crafted for ultimate distinction.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-16 px-10 text-lg font-bold bg-primary text-primary-foreground rounded-full glow-orange group transition-all duration-300">
                EXPLORE NOW <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button size="lg" variant="ghost" className="h-16 px-10 text-lg font-bold border border-white/10 rounded-full hover:bg-white/5 uppercase tracking-widest">
                View Film
              </Button>
            </div>
          </div>

          <div className="relative h-[600px] flex items-center justify-center animate-in fade-in zoom-in-75 duration-1000 delay-300">
             <AuraThreeScene />
             {/* Decorative element behind 3D model */}
             <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
                <div className="w-[400px] h-[400px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute w-[300px] h-[300px] border border-primary/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
             </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll for Essence</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* Stats/Highlight Section */}
      <section className="py-24 border-y border-white/5 bg-black/20">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { icon: Zap, label: "Energy Return", value: "98.4%" },
            { icon: Shield, label: "Durability Rank", value: "Aura Grade" },
            { icon: Globe, label: "Sustainable", value: "Eco-Futurist" },
            { icon: Sparkles, label: "Limited Drops", value: "Exclusive" }
          ].map((stat, i) => (
            <div key={i} className="space-y-3 group">
              <stat.icon className="w-6 h-6 mx-auto text-primary group-hover:scale-125 transition-transform" />
              <div className="text-3xl font-headline font-bold">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-foreground/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Curated Collection Section */}
      <section id="collections" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-headline font-bold">CURATED<br /><span className="text-primary text-glow-orange">COLLECTIONS</span></h2>
              <div className="w-24 h-1 bg-primary" />
            </div>
            <p className="text-foreground/40 max-w-sm font-body uppercase tracking-wider text-sm">
              Discover the pinnacle of technical craftsmanship. Each pair is a testament to the Aura philosophy of performance luxury.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ProductCard 
              id="c-1" 
              name="AURA CARBON FLUX" 
              price="$540.00" 
              image={collectionImages[0]?.imageUrl || ""} 
              tag="Performance"
              description="A masterpiece of carbon fiber integration and kinetic energy harnessing. Designed for those who move at the speed of thought."
            />
            <ProductCard 
              id="c-2" 
              name="NEON PULSE XT" 
              price="$620.00" 
              image={collectionImages[1]?.imageUrl || ""} 
              tag="Limited Edition"
              description="Featuring active illuminating soles and reactive pressure cushioning. The ultimate fusion of tech and high-street aesthetic."
            />
            <ProductCard 
              id="c-3" 
              name="CRIMSON EDGE 01" 
              price="$480.00" 
              image={collectionImages[2]?.imageUrl || ""} 
              tag="Lifestyle"
              description="Sharp edges meet soft landings. Engineered with surgical precision for a silhouette that dominates any landscape."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-black/40">
        <div className="container mx-auto px-6 text-center space-y-12">
          <Link href="/" className="text-4xl font-bold font-headline tracking-tighter inline-flex items-center gap-2">
            <span className="text-primary">AURA</span>
            <span className="text-foreground/80">FLOW</span>
          </Link>
          <div className="flex justify-center space-x-12">
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest">Privacy</Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest">Terms</Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest">Contact</Link>
          </div>
          <p className="text-foreground/20 text-xs uppercase tracking-[0.5em]">
            © 2025 AURA FLOW INC. ENGINEERED FOR THE FUTURE.
          </p>
        </div>
      </footer>
    </div>
  );
}

const Badge = ({ children, className, variant = "default" }: any) => {
  const variants: any = {
    default: "bg-primary text-primary-foreground",
    outline: "border border-input"
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Link = ({ href, children, className }: any) => (
  <a href={href} className={className}>{children}</a>
);
