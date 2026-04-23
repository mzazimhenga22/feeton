"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign,
  ArrowUpRight,
  Package,
  Clock
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const StatCard = ({ label, value, icon: Icon, trend, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6 hover:border-primary/30 transition-all duration-500 group"
  >
    <div className="flex justify-between items-start">
      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
        <Icon className="w-6 h-6 text-white/60 group-hover:text-primary transition-colors" />
      </div>
      <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
        <ArrowUpRight className="w-4 h-4" />
        {trend}
      </div>
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-2">{label}</p>
      <h3 className="text-4xl font-headline font-bold uppercase tracking-tight">{value}</h3>
    </div>
  </motion.div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    revenue: "$0.00",
    orders: "0",
    customers: "0",
    products: "0"
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    async function fetchStats() {
      if (!supabase) return;

      // Real stats from DB
      const { data: orders } = await supabase.from("orders").select("*");
      const { data: profiles } = await supabase.from("profiles").select("*");
      const { data: products } = await supabase.from("products").select("id");

      if (orders) {
        const totalRev = orders.reduce((acc, curr) => acc + Number(curr.total), 0);
        setStats({
          revenue: `$${totalRev.toLocaleString()}`,
          orders: orders.length.toString(),
          customers: profiles?.length.toString() || "0",
          products: products?.length.toString() || "0"
        });
        setRecentOrders(orders.slice(0, 5));
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-headline font-bold uppercase tracking-tighter">Command Center</h1>
          <p className="text-white/30 uppercase tracking-[0.4em] text-[10px] mt-2">Operational Overview & Acquisition Analytics</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-full px-6 py-3 flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Systems Optimal</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        <StatCard label="Net Revenue" value={stats.revenue} icon={DollarSign} trend="+12.5%" delay={0.1} />
        <StatCard label="Total Acquisitions" value={stats.orders} icon={ShoppingBag} trend="+8.2%" delay={0.2} />
        <StatCard label="Identified Users" value={stats.customers} icon={Users} trend="+14.1%" delay={0.3} />
        <StatCard label="Inventory Stock" value={stats.products} icon={Package} trend="+2 new" delay={0.4} />
      </div>

      <div className="grid xl:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="xl:col-span-2 bg-white/5 border border-white/10 rounded-[3rem] p-10 space-y-8"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-headline font-bold uppercase tracking-tight">Recent Acquisitions</h3>
            <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-white transition-colors">View All Archive</button>
          </div>
          
          <div className="space-y-4">
            {recentOrders.length > 0 ? recentOrders.map((order) => (
              <div key={order.id} className="group flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white/20" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm">{order.id}</h4>
                    <p className="text-xs text-white/30 uppercase mt-1">{(order.shipping as any).fullName} • {new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-headline font-bold text-primary">${Number(order.total).toFixed(2)}</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500 mt-1">{order.status}</div>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 text-white/20 uppercase tracking-widest text-xs">No Recent Protocols Found</div>
            )}
          </div>
        </motion.div>

        {/* Growth/Activity Chart Mockup */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-[3rem] p-10 flex flex-col justify-between"
        >
          <div className="space-y-2">
            <h3 className="text-2xl font-headline font-bold uppercase tracking-tight">System Growth</h3>
            <p className="text-xs text-white/30 uppercase tracking-widest">Biometric Interaction Index</p>
          </div>
          
          <div className="flex items-end justify-between h-48 gap-2">
             {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
               <motion.div 
                 key={i}
                 initial={{ height: 0 }}
                 animate={{ height: `${h}%` }}
                 transition={{ delay: 0.7 + (i * 0.1), duration: 1 }}
                 className={`flex-1 rounded-t-xl ${i === 3 ? 'bg-primary' : 'bg-white/10 hover:bg-white/20 transition-colors'}`}
               />
             ))}
          </div>

          <div className="space-y-6 pt-8">
             <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/40">
               <span>Efficiency Rate</span>
               <span className="text-white">98.4%</span>
             </div>
             <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "98.4%" }}
                 transition={{ delay: 1.5, duration: 2 }}
                 className="h-full bg-primary"
               />
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
