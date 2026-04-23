"use client";

import React from "react";
import { Navigation } from "@/components/Navigation";
import { useOrders, type Order } from "@/components/OrderProvider";
import { Package, Truck, CheckCircle, ChevronRight, ShoppingBag, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function OrdersPage() {
  const { orders } = useOrders();

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "processing": return <Clock className="w-4 h-4 text-yellow-500" />;
      case "shipped": return <Truck className="w-4 h-4 text-blue-500" />;
      case "delivered": return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-32">
      <Navigation />

      <main className="container mx-auto px-6 pt-40">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4" /> Return to Archive
              </Link>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">Member Dashboard</span>
                <h1 className="text-5xl md:text-7xl font-headline font-bold uppercase tracking-tight">Acquisitions</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-6 pb-2">
               <div className="text-center">
                 <div className="text-2xl font-bold font-headline">{orders.length}</div>
                 <div className="text-[8px] uppercase tracking-widest text-white/30">Total Orders</div>
               </div>
               <div className="w-px h-10 bg-white/10" />
               <div className="text-center">
                 <div className="text-2xl font-bold font-headline">
                   {orders.filter(o => o.status === "delivered").length}
                 </div>
                 <div className="text-[8px] uppercase tracking-widest text-white/30">Delivered</div>
               </div>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="py-40 text-center space-y-8 bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem]">
               <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                 <ShoppingBag className="w-8 h-8 text-white/20" />
               </div>
               <div className="space-y-4">
                 <h3 className="text-2xl font-headline font-bold uppercase tracking-tight">No Acquisitions Yet</h3>
                 <p className="text-white/40 text-sm uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
                   Your technical performance collection is currently empty.
                 </p>
               </div>
               <Button asChild className="h-14 px-10 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-[0.3em] glow-red">
                 <Link href="/#collections">INITIALIZE DISCOVERY</Link>
               </Button>
            </div>
          ) : (
            <div className="grid gap-8">
              {orders.map((order, idx) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-primary/30 transition-all duration-500"
                >
                  <div className="p-8 md:p-10 flex flex-col md:flex-row gap-10">
                    {/* Order Meta */}
                    <div className="md:w-64 space-y-6">
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">Order Reference</div>
                        <div className="text-lg font-headline font-bold tracking-tight text-primary">{order.id}</div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">Placed On</div>
                        <div className="text-sm font-bold uppercase">{new Date(order.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">Status</div>
                        <div className="flex items-center gap-2 bg-black/40 w-fit px-3 py-1.5 rounded-full border border-white/5">
                           {getStatusIcon(order.status)}
                           <span className="text-[10px] font-bold uppercase tracking-widest">{order.status}</span>
                        </div>
                      </div>

                      <div className="pt-4">
                         <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Recipient</div>
                         <p className="text-xs text-white/60 leading-relaxed uppercase">
                           {order.shipping.fullName}<br />
                           {order.shipping.city}, {order.shipping.state}
                         </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="flex-1 space-y-6">
                       <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">Acquired Artifacts</div>
                       <div className="grid sm:grid-cols-2 gap-4">
                         {order.items.map((item) => (
                           <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-black/30 border border-white/5 group-hover:border-primary/10 transition-colors">
                              <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-[11px] font-bold uppercase truncate">{item.name}</h4>
                                <p className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">Size: {item.selectedSize || "N/A"}</p>
                                <p className="text-[10px] font-bold text-primary mt-1">{item.price}</p>
                              </div>
                           </div>
                         ))}
                       </div>
                    </div>

                    {/* Order Actions */}
                    <div className="md:w-48 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-10">
                       <div className="space-y-1 text-right">
                         <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">Total Acquisition</div>
                         <div className="text-2xl font-headline font-bold text-white">${order.total.toFixed(2)}</div>
                       </div>
                       
                       <div className="space-y-3 pt-8">
                         <Button className="w-full h-12 rounded-full bg-white/5 hover:bg-primary hover:text-primary-foreground border border-white/10 text-[10px] font-bold uppercase tracking-widest transition-all">
                           TRACK SHIPMENT
                         </Button>
                         <Button variant="ghost" className="w-full text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-primary">
                           DETAILS <ChevronRight className="ml-1 w-3 h-3" />
                         </Button>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
