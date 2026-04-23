"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CheckoutStepsProps {
  currentStep: number;
}

const STEPS = [
  { id: 1, label: "Shipping" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Review" },
];

export const CheckoutSteps = ({ currentStep }: CheckoutStepsProps) => {
  return (
    <div className="relative flex justify-between items-center max-w-lg mx-auto mb-16">
      {/* Progress Line Background */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0" />
      
      {/* Active Progress Line */}
      <motion.div 
        className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: (currentStep - 1) / (STEPS.length - 1) }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ width: "100%" }}
      />

      {STEPS.map((step, i) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;

        return (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={false}
              animate={{
                backgroundColor: isCompleted || isActive ? "hsl(var(--primary))" : "rgba(255,255,255,0.05)",
                borderColor: isCompleted || isActive ? "hsl(var(--primary))" : "rgba(255,255,255,0.1)",
                scale: isActive ? 1.2 : 1,
              }}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors duration-300 bg-background"
            >
              {isCompleted ? (
                <Check className="w-5 h-5 text-primary-foreground" />
              ) : (
                <span className={isActive ? "text-primary-foreground" : "text-white/40"}>
                  {step.id}
                </span>
              )}
            </motion.div>
            <span className={`absolute -bottom-8 text-[10px] uppercase tracking-[0.2em] font-bold whitespace-nowrap transition-colors duration-300 ${isActive ? "text-primary" : "text-white/30"}`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
