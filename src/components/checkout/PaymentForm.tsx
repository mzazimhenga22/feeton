"use client";

import React, { useState } from "react";
import { CreditCard, Lock, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentFormProps {
  onBack: () => void;
  onNext: (data: any) => void;
}

export const PaymentForm = ({ onBack, onNext }: PaymentFormProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "");
    return digits.substring(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "");
    if (digits.length >= 3) {
      return digits.substring(0, 2) + " / " + digits.substring(2, 4);
    }
    return digits;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ cardNumber, expiry, cvv, name });
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Card Preview */}
      <div className="relative w-full aspect-[1.58/1] max-w-sm mx-auto perspective-1000">
        <motion.div 
          className="w-full h-full relative preserve-3d transition-transform duration-700"
          animate={{ rotateY: focused === "cvv" ? 180 : 0 }}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-zinc-800 to-black border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl">
            <div className="flex justify-between items-start">
              <div className="w-12 h-10 bg-yellow-500/20 rounded-md border border-yellow-500/30 flex items-center justify-center overflow-hidden">
                <div className="w-8 h-6 bg-yellow-500/40 rounded-sm" />
              </div>
              <CreditCard className="w-8 h-8 text-white/20" />
            </div>
            
            <div className="space-y-6">
               <div className="text-2xl font-mono tracking-[0.2em] text-white/90">
                 {cardNumber || "•••• •••• •••• ••••"}
               </div>
               
               <div className="flex justify-between items-end">
                 <div className="space-y-1">
                   <div className="text-[8px] uppercase tracking-widest text-white/30">Card Holder</div>
                   <div className="text-sm font-headline font-bold uppercase tracking-widest truncate max-w-[180px]">
                     {name || "YOUR NAME"}
                   </div>
                 </div>
                 <div className="space-y-1 text-right">
                   <div className="text-[8px] uppercase tracking-widest text-white/30">Expires</div>
                   <div className="text-sm font-mono font-bold tracking-widest">
                     {expiry || "MM/YY"}
                   </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-[2rem] flex flex-col justify-between shadow-2xl [transform:rotateY(180deg)]">
            <div className="mt-8 w-full h-12 bg-white/10" />
            <div className="p-8 space-y-6">
              <div className="flex justify-end">
                <div className="w-1/2 h-10 bg-white/5 rounded-md flex items-center justify-end px-4 border border-white/10">
                   <span className="font-mono text-sm tracking-widest italic">{cvv || "•••"}</span>
                </div>
              </div>
              <p className="text-[8px] text-white/20 leading-relaxed text-center">
                This digital performance artifact is authorized for global kinetic acquisition within the FEETON collective.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Form */}
      <form onSubmit={handleNext} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">Cardholder Name</Label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
              onFocus={() => setFocused("name")}
              className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="NAME AS IT APPEARS ON CARD"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">Card Number</Label>
            <div className="relative">
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                onFocus={() => setFocused("number")}
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="0000 0000 0000 0000"
                maxLength={19}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">Expiry Date</Label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                onFocus={() => setFocused("expiry")}
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="MM / YY"
                maxLength={7}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">CVV</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").substring(0, 4))}
                  onFocus={() => setFocused("cvv")}
                  onBlur={() => setFocused(null)}
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="000"
                  maxLength={4}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center gap-4">
          <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
          <p className="text-[10px] text-white/50 uppercase tracking-widest leading-relaxed">
            Encrypted performance-grade security ensures your acquisition details are protected.
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onBack} className="h-16 rounded-full border-white/10 px-8 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white/5">
            <ArrowLeft className="mr-2 w-4 h-4" /> BACK
          </Button>
          <Button type="submit" className="flex-1 h-16 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-[0.4em] glow-red group transition-all">
            REVIEW ORDER <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </form>

      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  );
};
