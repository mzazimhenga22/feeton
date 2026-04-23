"use client";

import React from "react";
import { Settings, Database, ShieldCheck } from "lucide-react";

const cards = [
  {
    title: "Storefront Settings",
    description: "Brand presentation, release copy, and public catalog controls remain file-driven in this build.",
    icon: Settings,
  },
  {
    title: "Supabase Connection",
    description: "Catalog, profile, wishlist, and order data are sourced from Supabase when public credentials are present.",
    icon: Database,
  },
  {
    title: "Access Control",
    description: "Admin access is enforced from the profiles table through the is_admin flag checked in the admin layout.",
    icon: ShieldCheck,
  },
];

export default function AdminSettingsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-5xl font-headline font-bold uppercase tracking-tighter">System Settings</h1>
        <p className="text-white/30 uppercase tracking-[0.4em] text-[10px] mt-2">Operational notes for this admin environment</p>
      </div>

      <div className="grid xl:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
              <card.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-headline font-bold uppercase tracking-tight">{card.title}</h2>
              <p className="text-sm text-white/50 leading-relaxed">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
