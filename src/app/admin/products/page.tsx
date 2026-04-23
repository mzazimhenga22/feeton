"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Filter,
  Image as ImageIcon
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data && !error) setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!supabase || !confirm("Are you sure you want to delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) fetchProducts();
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-headline font-bold uppercase tracking-tighter">Inventory Management</h1>
          <p className="text-white/30 uppercase tracking-[0.4em] text-[10px] mt-2">Catalogue Registry & Artifact Metadata</p>
        </div>
        <Button asChild className="h-16 px-10 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-[0.3em] glow-red group">
          <Link href="/admin/products/new">
            <Plus className="mr-2 w-5 h-5 group-hover:rotate-90 transition-transform duration-500" /> 
            Deploy New Artifact
          </Link>
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 border border-white/10 rounded-[2.5rem] p-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Registry ID or Name..." 
            className="h-14 pl-14 pr-6 bg-white/5 border-transparent focus:border-primary/50 rounded-full text-xs uppercase tracking-widest"
          />
        </div>
        <div className="flex gap-2">
           <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full border border-white/10 text-white/40">
             <Filter className="w-5 h-5" />
           </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Artifact</th>
              <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Status</th>
              <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Category</th>
              <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Price</th>
              <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.tr 
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-black border border-white/10 shrink-0">
                        {product.image ? (
                          <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/10"><ImageIcon className="w-6 h-6" /></div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold uppercase tracking-widest text-sm mb-1">{product.name}</h4>
                        <p className="text-[10px] font-mono text-white/20 uppercase">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <Badge className="bg-primary/10 text-primary border-primary/20 uppercase tracking-widest text-[9px] font-bold">
                      {product.release_status || 'Prototype'}
                    </Badge>
                  </td>
                  <td className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-white/60">
                    {product.category}
                  </td>
                  <td className="px-8 py-6 font-headline font-bold text-lg">
                    {product.price}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                       <Button asChild variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-white/10 text-white/40 hover:text-white">
                         <Link href={`/products/${product.slug}`} target="_blank"><ExternalLink className="w-4 h-4" /></Link>
                       </Button>
                       <Button asChild variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-white/10 text-white/40 hover:text-primary">
                         <Link href={`/admin/products/edit/${product.id}`}><Edit2 className="w-4 h-4" /></Link>
                       </Button>
                       <Button 
                        onClick={() => handleDelete(product.id)}
                        variant="ghost" 
                        size="icon" 
                        className="h-10 w-10 rounded-full hover:bg-primary/10 text-white/40 hover:text-primary"
                       >
                         <Trash2 className="w-4 h-4" />
                       </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
             <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
             <p className="text-[10px] uppercase tracking-widest text-white/20">Syncing Registry...</p>
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="py-32 text-center space-y-4">
             <p className="text-[10px] uppercase tracking-widest text-white/20">No matching artifacts found in the registry</p>
             <Button variant="link" className="text-primary font-bold uppercase tracking-widest text-[10px]" onClick={() => setSearch("")}>Reset Search</Button>
          </div>
        )}
      </div>
    </div>
  );
}
