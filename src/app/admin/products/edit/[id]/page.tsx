"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";

type EditPageProps = {
  params: {
    id: string;
  };
};

type ProductRecord = {
  id: string;
  slug: string;
  name: string;
  price: string;
  category: string;
  tag: string;
  description: string;
  image: string;
  colorway: string;
  release_status: string;
  drop_date: string;
  supporting_note: string;
  story: string;
};

const emptyForm: ProductRecord = {
  id: "",
  slug: "",
  name: "",
  price: "",
  category: "PERFORMANCE",
  tag: "",
  description: "",
  image: "",
  colorway: "",
  release_status: "Ready To Ship",
  drop_date: "",
  supporting_note: "",
  story: "",
};

export default function EditProductPage({ params }: EditPageProps) {
  const router = useRouter();
  const productId = params.id;
  const [formData, setFormData] = useState<ProductRecord>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!supabase || !productId) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .maybeSingle();

      if (data) {
        setFormData({
          ...emptyForm,
          ...data,
          tag: data.tag || data.category || "",
        });
      }

      setLoading(false);
    }

    fetchProduct();
  }, [productId]);

  const title = useMemo(
    () => (formData.name ? `Edit ${formData.name}` : "Edit Artifact"),
    [formData.name]
  );

  const handleChange =
    (field: keyof ProductRecord) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!supabase || !productId) return;

    setSaving(true);

    const payload = {
      slug: formData.slug,
      name: formData.name,
      price: formData.price,
      category: formData.category,
      tag: formData.tag,
      description: formData.description,
      image: formData.image,
      colorway: formData.colorway,
      release_status: formData.release_status,
      drop_date: formData.drop_date,
      supporting_note: formData.supporting_note,
      story: formData.story,
    };

    const { error } = await supabase.from("products").update(payload).eq("id", productId);

    setSaving(false);

    if (!error) {
      router.push("/admin/products");
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] uppercase tracking-widest text-white/20">Loading artifact...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex items-center gap-6">
        <Button asChild variant="ghost" size="icon" className="h-14 w-14 rounded-full border border-white/10 text-white/40 hover:text-white">
          <Link href="/admin/products">
            <ArrowLeft className="w-6 h-6" />
          </Link>
        </Button>
        <div>
          <h1 className="text-5xl font-headline font-bold uppercase tracking-tighter">{title}</h1>
          <p className="text-white/30 uppercase tracking-[0.4em] text-[10px] mt-2">Update catalog metadata without leaving the admin surface</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8 bg-white/5 border border-white/10 rounded-[3rem] p-10">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Name</label>
            <Input value={formData.name} onChange={handleChange("name")} className="h-14 bg-white/5 border-transparent focus:border-primary/50 rounded-2xl" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Slug</label>
            <Input value={formData.slug} onChange={handleChange("slug")} className="h-14 bg-white/5 border-transparent focus:border-primary/50 rounded-2xl" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Price</label>
            <Input value={formData.price} onChange={handleChange("price")} className="h-14 bg-white/5 border-transparent focus:border-primary/50 rounded-2xl" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Category</label>
            <select value={formData.category} onChange={handleChange("category")} className="w-full h-14 bg-white/5 border border-transparent focus:border-primary/50 rounded-2xl text-xs uppercase tracking-widest px-6 outline-none">
              <option value="PERFORMANCE">PERFORMANCE</option>
              <option value="LIFESTYLE">LIFESTYLE</option>
              <option value="LIMITED">LIMITED</option>
              <option value="ARCHIVE">ARCHIVE</option>
            </select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Image Source</label>
            <Input value={formData.image} onChange={handleChange("image")} className="h-14 bg-white/5 border-transparent focus:border-primary/50 rounded-2xl" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Description</label>
            <Textarea value={formData.description} onChange={handleChange("description")} className="min-h-[120px] bg-white/5 border-transparent focus:border-primary/50 rounded-3xl" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Colorway</label>
            <Input value={formData.colorway} onChange={handleChange("colorway")} className="h-14 bg-white/5 border-transparent focus:border-primary/50 rounded-2xl" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Release Status</label>
            <Input value={formData.release_status} onChange={handleChange("release_status")} className="h-14 bg-white/5 border-transparent focus:border-primary/50 rounded-2xl" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Drop Date</label>
            <Input value={formData.drop_date} onChange={handleChange("drop_date")} className="h-14 bg-white/5 border-transparent focus:border-primary/50 rounded-2xl" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Tag</label>
            <Input value={formData.tag} onChange={handleChange("tag")} className="h-14 bg-white/5 border-transparent focus:border-primary/50 rounded-2xl" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Supporting Note</label>
            <Textarea value={formData.supporting_note} onChange={handleChange("supporting_note")} className="min-h-[100px] bg-white/5 border-transparent focus:border-primary/50 rounded-3xl" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-2">Story</label>
            <Textarea value={formData.story} onChange={handleChange("story")} className="min-h-[160px] bg-white/5 border-transparent focus:border-primary/50 rounded-3xl" />
          </div>
        </div>

        <div className="flex justify-end gap-6 pt-8 border-t border-white/5">
          <Button asChild variant="ghost" className="h-16 px-10 rounded-full font-bold uppercase tracking-widest text-white/30 hover:text-white transition-all">
            <Link href="/admin/products">Cancel</Link>
          </Button>
          <Button disabled={saving} type="submit" className="h-16 px-12 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-[0.3em] glow-red">
            {saving ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : <Save className="mr-3 w-5 h-5" />}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
