"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { ProductCard } from "@/components/ProductCard";
import { getProducts, Product } from "@/lib/products";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, SlidersHorizontal, ChevronDown, Search, X, Grid3X3, LayoutList, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = ["ALL", "PERFORMANCE", "LIMITED", "LIFESTYLE"];
const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Alphabetical", value: "name" },
];

export default function ArchivePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "showcase">("grid");
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const featuredProducts = useMemo(() => products.slice(0, 3), [products]);

  useEffect(() => {
    if (featuredProducts.length === 0) return;
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredProducts]);

  const filteredAndSortedProducts = useMemo(() => {
    // ... same as before
    let result = [...products];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (activeCategory !== "ALL") {
      result = result.filter(p => p.category === activeCategory);
    }

    // Sort
    result.sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
      const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));

      switch (sortOrder) {
        case "price-asc": return priceA - priceB;
        case "price-desc": return priceB - priceA;
        case "name": return a.name.localeCompare(b.name);
        default: return 0; // In a real app, we'd have a date field
      }
    });

    return result;
  }, [products, searchQuery, activeCategory, sortOrder]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-white pb-40">
      <Navigation />

      {/* Live Intelligence Marquee */}
      <div className="bg-primary text-primary-foreground py-2 overflow-hidden border-y border-primary relative z-50 mt-20">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-20 text-[10px] font-bold uppercase tracking-[0.5em]"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center gap-4">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Intelligence: New artifact detected in performance category • Limited restock of Genesis Protocol in 24h • Biometric sync active •
            </span>
          ))}
        </motion.div>
      </div>

      {/* Featured Showcase */}
      <section className="relative h-[80vh] flex items-center overflow-hidden border-b border-white/5">
        <AnimatePresence mode="wait">
          {featuredProducts.length > 0 && (
            <motion.div
              key={featuredIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <img 
                src={featuredProducts[featuredIndex].image} 
                className="w-full h-full object-cover opacity-50 scale-105 animate-slow-zoom" 
                alt="featured" 
              />
              
              <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-20">
                <div className="max-w-2xl space-y-8">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge className="bg-primary/20 text-primary border-primary/50 px-4 py-1 uppercase tracking-[0.3em] font-bold">
                      Featured Artifact
                    </Badge>
                  </motion.div>
                  
                  <motion.h1
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-7xl md:text-9xl font-headline font-bold uppercase tracking-tighter leading-[0.8]"
                  >
                    {featuredProducts[featuredIndex].name.split(" ").map((word, i) => (
                      <span key={i} className={i === 1 ? "text-primary block" : "block"}>{word}</span>
                    ))}
                  </motion.h1>

                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-8"
                  >
                    <div className="space-y-1">
                       <span className="text-[10px] uppercase tracking-widest text-white/40">Category</span>
                       <p className="text-sm font-bold uppercase tracking-widest">{featuredProducts[featuredIndex].category}</p>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="space-y-1">
                       <span className="text-[10px] uppercase tracking-widest text-white/40">Acquisition</span>
                       <p className="text-sm font-bold uppercase tracking-widest text-primary">{featuredProducts[featuredIndex].price}</p>
                    </div>
                    <Button asChild className="h-14 px-10 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-widest glow-red ml-4">
                       <Link href={`/products/${featuredProducts[featuredIndex].slug}`}>EXPLORE DOSSIER</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-12 right-6 z-30 flex flex-col gap-4">
           {featuredProducts.map((_, i) => (
             <button 
               key={i} 
               onClick={() => setFeaturedIndex(i)}
               className={`w-1 h-12 rounded-full transition-all duration-500 ${featuredIndex === i ? 'bg-primary' : 'bg-white/10'}`}
             />
           ))}
        </div>
      </section>

      {/* Toolbar */}
      <section className="sticky top-20 z-40 glass border-y border-white/5 py-4">
        <div className="container mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
             <Button 
               variant="ghost" 
               className={`text-[10px] font-bold uppercase tracking-widest gap-2 h-10 px-4 rounded-full border border-white/10 ${isFilterVisible ? 'bg-primary text-primary-foreground' : 'hover:bg-white/5'}`}
               onClick={() => setIsFilterVisible(!isFilterVisible)}
             >
               <SlidersHorizontal className="w-4 h-4" /> 
               {isFilterVisible ? "Close Filters" : "Filters"}
             </Button>
             
             <div className="hidden md:flex bg-white/5 p-1 rounded-full border border-white/10">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`w-8 h-8 rounded-full ${viewMode === 'grid' ? 'bg-white/10 text-primary' : 'text-white/40'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`w-8 h-8 rounded-full ${viewMode === 'list' ? 'bg-white/10 text-primary' : 'text-white/40'}`}
                  onClick={() => setViewMode('list')}
                >
                  <LayoutList className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`w-8 h-8 rounded-full ${viewMode === 'showcase' ? 'bg-white/10 text-primary' : 'text-white/40'}`}
                  onClick={() => setViewMode('showcase')}
                  title="Showcase Mode"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
             </div>
          </div>

          <div className="flex-1 max-w-md relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
             <input 
               type="text" 
               placeholder="SEARCH ARCHIVE..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full h-10 bg-white/5 border border-white/10 rounded-full pl-12 pr-4 text-[10px] uppercase tracking-widest focus:outline-none focus:border-primary/50 transition-colors"
             />
             {searchQuery && (
               <button 
                 onClick={() => setSearchQuery("")}
                 className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white"
               >
                 <X className="w-3.5 h-3.5" />
               </button>
             )}
          </div>

          <div className="flex items-center gap-4">
             <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 hidden lg:inline">Sort By:</span>
             <DropdownMenu>
               <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest gap-2 h-10 px-4 rounded-full border border-white/10 hover:bg-white/5 min-w-[160px] justify-between">
                   {SORT_OPTIONS.find(o => o.value === sortOrder)?.label}
                   <ChevronDown className="w-4 h-4 text-white/40" />
                 </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="bg-[#0a0a0a] border-white/10 text-white rounded-xl">
                 {SORT_OPTIONS.map(opt => (
                   <DropdownMenuItem 
                     key={opt.value} 
                     onClick={() => setSortOrder(opt.value)}
                     className="text-[10px] uppercase tracking-widest focus:bg-primary focus:text-primary-foreground py-3 cursor-pointer"
                   >
                     {opt.label}
                   </DropdownMenuItem>
                 ))}
               </DropdownMenuContent>
             </DropdownMenu>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {isFilterVisible && (
              <motion.aside
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="w-full lg:w-64 space-y-12 shrink-0"
              >
                <div className="space-y-6">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Catalog</h3>
                  <div className="flex flex-wrap lg:flex-col gap-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-xl border transition-all text-left flex justify-between items-center ${activeCategory === cat ? 'bg-primary/10 border-primary text-primary' : 'border-white/5 text-white/40 hover:border-white/20 hover:text-white'}`}
                      >
                        {cat}
                        {activeCategory === cat && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                   <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Price Range</h3>
                   <div className="space-y-4">
                      {["$0 - $500", "$500 - $700", "$700+"].map(range => (
                        <label key={range} className="flex items-center gap-3 cursor-pointer group">
                           <div className="w-4 h-4 rounded border border-white/20 group-hover:border-primary/50 transition-colors" />
                           <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{range}</span>
                        </label>
                      ))}
                   </div>
                </div>

                <div className="p-6 bg-primary/5 border border-primary/20 rounded-[2rem] space-y-4">
                   <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary">Feeton Pro</h4>
                   <p className="text-[9px] text-white/40 uppercase tracking-widest leading-relaxed">Unlock limited archive access and priority acquisition tokens.</p>
                   <Button className="w-full h-10 rounded-full bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-widest">Enroll Now</Button>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
               <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                 {Array(6).fill(0).map((_, i) => (
                   <div key={i} className="space-y-6">
                     <Skeleton className="aspect-square w-full rounded-[2.5rem] bg-white/5" />
                     <div className="space-y-2">
                       <Skeleton className="h-6 w-2/3 bg-white/5" />
                       <Skeleton className="h-4 w-1/3 bg-white/5" />
                     </div>
                   </div>
                 ))}
               </div>
            ) : filteredAndSortedProducts.length === 0 ? (
              <div className="py-40 text-center space-y-8">
                 <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto opacity-20">
                    <Search className="w-10 h-10" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-headline font-bold uppercase tracking-tight">Zero Artifacts Found</h3>
                    <p className="text-white/30 text-xs uppercase tracking-widest">Adjust your filters to discover other technical masterpieces.</p>
                 </div>
                 <Button 
                   variant="outline" 
                   onClick={() => { setActiveCategory("ALL"); setSearchQuery(""); }}
                   className="rounded-full border-white/10 px-8 h-12 text-[10px] font-bold uppercase tracking-widest"
                 >
                   Reset Protocol
                 </Button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid md:grid-cols-2 xl:grid-cols-3 gap-8" 
                : viewMode === 'list' ? "flex flex-col gap-6"
                : "flex flex-col gap-32"
              }>
                <AnimatePresence mode="popLayout">
                  {filteredAndSortedProducts.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                    >
                      {viewMode === 'grid' ? (
                        <ProductCard {...product} />
                      ) : viewMode === 'list' ? (
                        <div className="group flex flex-col md:flex-row gap-8 bg-white/5 border border-white/10 rounded-[2.5rem] p-6 hover:border-primary/50 transition-all duration-500">
                           <div className="relative w-full md:w-48 aspect-square rounded-3xl overflow-hidden shrink-0">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                           </div>
                           <div className="flex-1 flex flex-col justify-center space-y-6">
                              <div className="space-y-2">
                                <Badge className="bg-primary/20 text-primary border-primary/50 uppercase tracking-tighter">{product.tag}</Badge>
                                <h3 className="text-3xl font-headline font-bold uppercase group-hover:text-primary transition-colors">{product.name}</h3>
                                <p className="text-white/40 text-sm line-clamp-2 max-w-xl">{product.description}</p>
                              </div>
                              <div className="flex items-center justify-between">
                                 <span className="text-xl font-bold">{product.price}</span>
                                 <Button asChild className="h-12 px-8 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-widest glow-red">
                                    <Link href={`/products/${product.slug}`}>View Dossier</Link>
                                 </Button>
                              </div>
                           </div>
                        </div>
                      ) : (
                        /* Showcase Mode */
                        <div className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden rounded-[3rem] border border-white/10 group">
                           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                           <img 
                            src={product.image} 
                            alt={product.name} 
                            className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 group-hover:scale-110 transition-transform duration-1000" 
                           />
                           
                           <div className="relative z-20 text-center max-w-2xl px-6 space-y-8">
                             <div className="space-y-4">
                               <Badge className="bg-primary text-primary-foreground border-none px-6 py-2 uppercase tracking-[0.4em] font-bold text-[10px]">
                                 {product.category}
                               </Badge>
                               <h2 className="text-6xl md:text-8xl font-headline font-bold uppercase tracking-tighter">
                                 {product.name}
                               </h2>
                             </div>
                             <p className="text-white/60 text-lg uppercase tracking-widest font-body line-clamp-3">
                               {product.description}
                             </p>
                             <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <Button asChild size="lg" className="h-16 px-12 bg-primary text-primary-foreground rounded-full font-bold uppercase tracking-[0.2em] glow-red">
                                   <Link href={`/products/${product.slug}`}>Launch Detailed Experience</Link>
                                </Button>
                                <div className="text-3xl font-headline font-bold">
                                   {product.price}
                                </div>
                             </div>
                           </div>
                           
                           {/* Decorative Corners */}
                           <div className="absolute top-10 left-10 w-20 h-20 border-l border-t border-primary/40 rounded-tl-3xl pointer-events-none" />
                           <div className="absolute bottom-10 right-10 w-20 h-20 border-r border-b border-primary/40 rounded-br-3xl pointer-events-none" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer Meta */}
      <section className="container mx-auto px-6 pt-40 border-t border-white/5 text-center space-y-8">
         <p className="text-[10px] text-white/20 uppercase tracking-[0.8em] font-bold">
            Total Artifacts Indexed: {products.length} • Last Sync: {new Date().toLocaleDateString()}
         </p>
      </section>
    </div>
  );
}
