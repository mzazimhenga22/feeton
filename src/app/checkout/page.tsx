"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { ShippingForm, type ShippingFormData } from "@/components/checkout/ShippingForm";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import { OrderReview } from "@/components/checkout/OrderReview";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { useCart } from "@/components/CartProvider";
import { useOrders } from "@/components/OrderProvider";
import { useAuth } from "@/components/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, subtotal, discount, shippingCost, tax, promoCode, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();
  
  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !isProcessing) {
      // router.push("/"); // Commented out for dev flexibility, but good for prod
    }
  }, [items, router, isProcessing]);

  const handleShippingNext = (data: ShippingFormData) => {
    setShippingData(data);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentNext = (data: any) => {
    setPaymentData(data);
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async () => {
    if (!shippingData) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const order = await placeOrder({
      items,
      shipping: shippingData,
      subtotal,
      discount,
      shippingCost,
      tax,
      total: cartTotal,
      promoCode,
    });
    
    clearCart();
    setIsProcessing(false);
    router.push(`/order-confirmation?id=${order.id}`);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-white pb-32">
      <Navigation />

      {/* Decorative Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary/5 to-transparent blur-[120px]" />
      </div>

      <main className="container mx-auto px-6 pt-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Main Checkout Area */}
            <div className="flex-1">
              <div className="mb-12">
                <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 hover:text-primary transition-colors mb-8">
                  <ArrowLeft className="w-4 h-4" /> Return to Archive
                </Link>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">Transaction Protocol</span>
                  <h1 className="text-5xl md:text-7xl font-headline font-bold uppercase tracking-tight">Checkout</h1>
                </div>
              </div>

              <CheckoutSteps currentStep={step} />

              <div className="mt-12">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="shipping"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ShippingForm 
                        initialData={shippingData || (user ? { fullName: user.user_metadata?.full_name, email: user.email } : {})} 
                        onNext={handleShippingNext} 
                      />
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PaymentForm 
                        onBack={() => setStep(1)} 
                        onNext={handlePaymentNext} 
                      />
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="review"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <OrderReview 
                        shippingData={shippingData} 
                        paymentData={paymentData} 
                        onBack={() => setStep(2)} 
                        onPlaceOrder={handlePlaceOrder}
                        isProcessing={isProcessing}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:w-[400px] shrink-0">
               <OrderSummary />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
