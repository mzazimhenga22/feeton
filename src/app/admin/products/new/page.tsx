"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Upload, 
  Plus, 
  X, 
  Save,
  Loader2
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  
  const [formData, setFormData] = useState({
    id: "",
    slug: "",
    name: "",
    price: "",
    category: "PERFORMANCE",
    tag: "Performance",
    description: "",
    colorway: "",
    releaseStatus: "Ready To Ship",
    dropDate: "",
    supportingNote: "",
    story: "",
    highlights: ["", "", ""],
    specs: [
      { label: "Weight", value: "" },
      { label: "Stack", value: "" },
      { label: "Ride", value: "" },
      { label: "Use Case", value: "" },
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"]
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);

    try {
      let imageUrl = "";
      
      // Upload image if selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError, data } = await supabase.storage
          .from('products')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(fileName);
          
        imageUrl = publicUrl;
      }

      // Save product to DB
      const { error } = await supabase.from("products").insert({
        id: formData.id || formData.slug,
        slug: formData.slug,
        name: formData.name,
        price: formData.price,
        category: formData.category,
        tag: formData.tag,
        description: formData.description,
        image: imageUrl,
        gallery: [imageUrl, imageUrl, imageUrl], // Default gallery to the same image
        colorway: formData.colorway,
        release_status: formData.releaseStatus,
        drop_date: formData.dropDate,
        supporting_note: formData.supportingNote,
        story: formData.story,
        highlights: formData.highlights.filter(h => h),
        specs: formData.specs as any,
        sizes: formData.sizes,
      });

      if (error) throw error;
      
      router.push("/admin/products");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex items-center gap-6">
        <Button asChild variant="ghost" size="icon" className="h-14 w-14 rounded-full border border-white/10 text-white/40 hover:text-white">
          <Link href="/admin/products"><ArrowLeft className="w-6 h-6" /></Link>
        </Button>
        <div>
          <h1 className="text-5xl font-headline font-bold uppercase tracking-tighter">Deploy New Artifact</h1>
          <p className="text-white/30 uppercase tracking-[0.4em] text-[10px] mt-2">Configuration Hub for Upcoming Drops</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid xl:grid-cols-3 gap-12">
        {/* Left: Image Upload & Primary Info */}
        <div className="xl:col-span-1 space-y-8">
           <div className="relative aspect-square bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden group">
              {previewUrl ? (
                <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white/20" />
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30">Upload Visual Identity</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {previewUrl && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <p className="text-[10px] font-bold uppercase tracking-widest">Change Visual</p>
                </div>
              )}
           </div>

           <div className="space-y-6 bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Core Metadata</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Registry ID</label>
                   <Input 
                    required 
                    value={formData.slug}
                    onChange={e => setFormData({...formData, slug: e.target.value})}
                    placeholder="feeton-artifact-01" 
                    className="h-14 bg-white/5 border-transparent focus:border-primary/50 rounded-2xl text-xs uppercase tracking-widest" 
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Acquisition Cost</label>
                   <Input 
                    required 
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    placeholder="$0.00" 
                    className="h-14 bg-white/5 border-transparent focus:border-primary/50 rounded-2xl text-xs uppercase tracking-widest" 
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Classification</label>
                   <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full h-14 bg-white/5 border border-transparent focus:border-primary/50 rounded-2xl text-xs uppercase tracking-widest px-6 outline-none"
                   >
                     <option value="PERFORMANCE">PERFORMANCE</option>
                     <option value="LIFESTYLE">LIFESTYLE</option>
                     <option value="LIMITED">LIMITED</option>
                     <option value="ARCHIVE">ARCHIVE</option>
                   </select>
                </div>
              </div>
           </div>
        </div>

        {/* Right: Detailed Config */}
        <div className="xl:col-span-2 space-y-12">
           <div className="space-y-8 bg-white/5 border border-white/10 rounded-[3rem] p-10">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-headline font-bold uppercase tracking-tight">Artifact Specification</h3>
                <Badge className="bg-primary text-primary-foreground">V0.1.0-RC</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2 md:col-span-2">
                   <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Artifact Designation (Name)</label>
                   <Input 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="FEETON PROTOCOL X" 
                    className="h-16 text-xl bg-white/5 border-transparent focus:border-primary/50 rounded-3xl uppercase tracking-tighter font-headline font-bold" 
                   />
                </div>

                <div className="space-y-2 md:col-span-2">
                   <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Mission Briefing (Description)</label>
                   <Textarea 
                    required
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe the operational capabilities..." 
                    className="min-h-[120px] bg-white/5 border-transparent focus:border-primary/50 rounded-3xl text-sm tracking-wide" 
                   />
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Colorway Spec</label>
                   <Input 
                    value={formData.colorway}
                    onChange={e => setFormData({...formData, colorway: e.target.value})}
                    placeholder="Obsidian / Crimson" 
                    className="h-14 bg-white/5 border-transparent focus:border-primary/50 rounded-2xl text-xs uppercase tracking-widest" 
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Drop Date Protocol</label>
                   <Input 
                    value={formData.dropDate}
                    onChange={e => setFormData({...formData, dropDate: e.target.value})}
                    placeholder="May 20, 2026" 
                    className="h-14 bg-white/5 border-transparent focus:border-primary/50 rounded-2xl text-xs uppercase tracking-widest" 
                   />
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-white/5">
                <h4 className="text-[10px] uppercase tracking-widest text-primary font-bold">Performance Highlights</h4>
                <div className="grid md:grid-cols-2 gap-4">
                   {formData.highlights.map((h, i) => (
                     <Input 
                      key={i}
                      value={h}
                      onChange={e => {
                        const next = [...formData.highlights];
                        next[i] = e.target.value;
                        setFormData({...formData, highlights: next});
                      }}
                      placeholder={`Highlight Module 0${i+1}`} 
                      className="h-12 bg-white/5 border-transparent focus:border-primary/50 rounded-xl text-[11px] uppercase tracking-widest" 
                     />
                   ))}
                   <Button type="button" variant="ghost" onClick={() => setFormData({...formData, highlights: [...formData.highlights, ""]})} className="h-12 rounded-xl border border-dashed border-white/10 text-white/30 hover:text-white">
                      <Plus className="w-4 h-4 mr-2" /> Add Module
                   </Button>
                </div>
              </div>
           </div>

           <div className="flex justify-end gap-6 pt-8 border-t border-white/5">
              <Button asChild variant="ghost" className="h-16 px-10 rounded-full font-bold uppercase tracking-widest text-white/30 hover:text-white transition-all">
                <Link href="/admin/products">Abort Mission</Link>
              </Button>
              <Button 
                disabled={loading}
                type="submit" 
                className="h-16 px-12 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-[0.3em] glow-red group"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-3" />
                ) : (
                  <Save className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform" />
                )}
                Authorize Deployment
              </Button>
           </div>
        </div>
      </form>
    </div>
  );
}
