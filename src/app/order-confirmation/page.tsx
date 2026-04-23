"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useOrders } from "@/components/OrderProvider";
import { Navigation } from "@/components/Navigation";
import { CheckCircle2, Package, Truck, ArrowRight, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const { getOrderById } = useOrders();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      const found = getOrderById(orderId);
      if (found) setOrder(found);
    }
  }, [orderId, getOrderById]);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/30">Authenticating Order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-32">
      <Navigation />

      <main className="container mx-auto px-6 pt-40">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          {/* Success Animation */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-32 h-32 bg-primary/20 border border-primary/40 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle2 className="w-16 h-16 text-primary" />
            </motion.div>
            
            {/* Particle Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -z-10" />
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-primary">Protocol Succeeded</span>
              <h1 className="text-5xl md:text-7xl font-headline font-bold uppercase tracking-tight mt-4">Order Confirmed</h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/50 text-sm uppercase tracking-widest"
            >
              Your acquisition has been verified. Order ID: <span className="text-white font-bold tracking-normal">{order.id}</span>
            </motion.p>
          </div>

          {/* Delivery Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-left space-y-10"
          >
            <div className="grid md:grid-cols-2 gap-12">
               <div className="space-y-6">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                     <Package className="w-5 h-5 text-primary" />
                   </div>
                   <div>
                     <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Shipment Details</h3>
                     <p className="text-sm font-bold uppercase mt-1">{order.shipping.fullName}</p>
                     <p className="text-xs text-white/50 mt-1">{order.shipping.address}, {order.shipping.city}</p>
                   </div>
                 </div>

                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                     <Truck className="w-5 h-5 text-primary" />
                   </div>
                   <div>
                     <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Estimated Arrival</h3>
                     <p className="text-sm font-bold uppercase mt-1 text-primary">{order.estimatedDelivery}</p>
                     <p className="text-xs text-white/50 mt-1">Priority Express Handling</p>
                   </div>
                 </div>
               </div>

               <div className="space-y-6 bg-white/5 rounded-3xl p-6 border border-white/5">
                 <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Order Summary</h3>
                 <div className="space-y-3">
                   {order.items.map((item: any) => (
                     <div key={item.id} className="flex justify-between text-xs uppercase tracking-widest">
                        <span className="text-white/60 truncate max-w-[180px]">{item.quantity}x {item.name}</span>
                        <span className="font-bold">{item.price}</span>
                     </div>
                   ))}
                   <div className="h-px bg-white/10 my-2" />
                   <div className="flex justify-between text-sm font-headline font-bold uppercase">
                     <span>Total Paid</span>
                     <span className="text-primary">${order.total.toFixed(2)}</span>
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Button asChild className="h-16 px-10 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-[0.3em] glow-red group">
              <Link href="/">CONTINUE SHOPPING <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
            </Button>
            <Button variant="outline" className="h-16 px-10 rounded-full border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white/5">
              <Download className="mr-2 w-4 h-4" /> DOWNLOAD RECEIPT
            </Button>
            <Button variant="ghost" size="icon" className="h-16 w-16 rounded-full border border-white/10 text-white/40 hover:text-primary">
              <Share2 className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center"><div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
