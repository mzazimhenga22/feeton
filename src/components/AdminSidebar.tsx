"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  ArrowLeft,
  LogOut,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "./AuthProvider";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Personnel", href: "/admin/users", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <div className="w-72 h-screen fixed left-0 top-0 bg-[#050505] border-r border-white/5 flex flex-col p-8 z-50">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center glow-red">
          <Sparkles className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-headline font-bold uppercase tracking-widest text-lg">FEETON</h1>
          <p className="text-[10px] text-primary font-bold uppercase tracking-[0.3em]">Command Center</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                isActive ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,51,51,0.2)]" : "text-white/40 hover:text-white hover:bg-white/5"
              }`}>
                <item.icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : "group-hover:text-primary transition-colors"}`} />
                <span className="font-bold uppercase tracking-widest text-[11px]">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-pill" 
                    className="ml-auto w-1.5 h-1.5 bg-primary-foreground rounded-full" 
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <Link href="/">
          <div className="flex items-center gap-4 px-6 py-4 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all group">
            <ArrowLeft className="w-5 h-5 group-hover:text-primary transition-colors" />
            <span className="font-bold uppercase tracking-widest text-[11px]">Storefront</span>
          </div>
        </Link>
        
        <button 
          onClick={() => signOut()}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-white/40 hover:text-primary hover:bg-primary/5 transition-all group"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-bold uppercase tracking-widest text-[11px]">Terminate Session</span>
        </button>
      </div>
    </div>
  );
};
