"use client";

import React from "react";
import { Check, ArrowLeft, ArrowRight, MapPin, CreditCard, ShoppingBag, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "../CartProvider";
import { motion } from "framer-motion";

interface OrderReviewProps {
  shippingData: any;
  paymentData: any;
  onBack: () => void;
  onPlaceOrder: () => void;
  isProcessing: boolean;
}

export const OrderReview = ({ 
  shippingData, 
  paymentData, 
  onBack, 
  onPlaceOrder,
  isProcessing 
}: OrderReviewProps) => {
  const { items, cartTotal } = useCart();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">Final Verification</div>
        <h2 className="text-4xl font-headline font-bold uppercase tracking-tight">Review Your Order</h2>
      </div>

      <div className="grid gap-6">
        {/* Shipping Summary */}
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Shipping Destination
            </h3>
            <Button variant="ghost" onClick={onBack} className="text-[10px] uppercase tracking-widest text-primary hover:bg-primary/10 h-8 rounded-full">
              Edit
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-1">
              <div className="text-[10px] uppercase tracking-widest text-white/30">Recipient</div>
              <div className="text-sm font-bold uppercase">{shippingData.fullName}</div>
              <div className="text-xs text-white/60">{shippingData.email}</div>
              <div className="text-xs text-white/60">{shippingData.phone}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] uppercase tracking-widest text-white/30">Address</div>
              <div className="text-sm font-bold uppercase">{shippingData.address}</div>
              <div className="text-xs text-white/60 uppercase">{shippingData.city}, {shippingData.state} {shippingData.zip}</div>
              <div className="text-xs text-white/60 uppercase">{shippingData.country}</div>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" /> Payment Method
            </h3>
            <Button variant="ghost" onClick={onBack} className="text-[10px] uppercase tracking-widest text-primary hover:bg-primary/10 h-8 rounded-full">
              Edit
            </Button>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-14 h-10 bg-black rounded-lg border border-white/10 flex items-center justify-center">
               <CreditCard className="w-6 h-6 text-white/40" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-widest">•••• •••• •••• {paymentData.cardNumber.slice(-4)}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/30 mt-1">{paymentData.name} • Exp: {paymentData.expiry}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
             <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="space-y-2">
           <p className="text-xs uppercase tracking-[0.3em] text-white/80 leading-relaxed max-w-sm mx-auto">
             By placing this order, you authorize the kinetic acquisition of these performance artifacts.
           </p>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button 
          variant="outline" 
          onClick={onBack} 
          disabled={isProcessing}
          className="h-16 rounded-full border-white/10 px-8 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white/5"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> BACK
        </Button>
        <Button 
          onClick={onPlaceOrder}
          disabled={isProcessing}
          className="flex-1 h-16 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-[0.4em] glow-red group transition-all relative overflow-hidden"
        >
          {isProcessing ? (
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
            />
          ) : (
            <>PLACE ORDER <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" /></>
          )}
        </Button>
      </div>
    </div>
  );
};
