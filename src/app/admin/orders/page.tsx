"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { ShoppingBag, Clock } from "lucide-react";

type AdminOrder = {
  id: string;
  total: number | string;
  status: string;
  created_at: string;
  shipping: {
    fullName?: string;
    city?: string;
    state?: string;
  } | null;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      setOrders((data as AdminOrder[]) ?? []);
      setLoading(false);
    }

    fetchOrders();
  }, []);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-5xl font-headline font-bold uppercase tracking-tighter">Order Registry</h1>
        <p className="text-white/30 uppercase tracking-[0.4em] text-[10px] mt-2">Live acquisition log and fulfillment status</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] uppercase tracking-widest text-white/20">Syncing orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-6 h-6 text-white/20" />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-white/20">No orders found</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="text-lg font-headline font-bold tracking-tight text-primary">{order.id}</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                    {(order.shipping?.fullName || "Unknown recipient").toUpperCase()}
                  </div>
                  <div className="text-sm text-white/50">
                    {[order.shipping?.city, order.shipping?.state].filter(Boolean).join(", ") || "Location unavailable"}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-1">Placed</div>
                    <div className="text-sm font-bold">
                      {order.created_at ? new Date(order.created_at).toLocaleDateString() : "Unknown"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-1">Total</div>
                    <div className="text-xl font-headline font-bold">
                      ${Number(order.total || 0).toFixed(2)}
                    </div>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20 uppercase tracking-widest text-[9px] font-bold">
                    <Clock className="w-3 h-3 mr-1" />
                    {order.status || "processing"}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
