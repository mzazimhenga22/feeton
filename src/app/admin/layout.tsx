"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/AdminSidebar";
import { supabase } from "@/lib/supabase";
import { Package, Users, ShoppingCart } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAdmin() {
      if (!user) {
        if (!loading) router.push("/");
        return;
      }

      if (!supabase) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (data && !error) {
        setIsAdmin(data.is_admin || false);
        if (!data.is_admin) router.push("/");
      } else {
        setIsAdmin(false);
        router.push("/");
      }
    }

    if (!loading) {
      checkAdmin();
    }
  }, [user, loading, router]);

  if (loading || isAdmin === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto glow-red" />
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30">Authorizing Command Access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <AdminSidebar />
      <main className="pl-72 min-h-screen">
        <div className="p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
