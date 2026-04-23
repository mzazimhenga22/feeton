"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { CartItem } from "./CartProvider";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";

export interface ShippingInfo {
// ... same as before
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Order {
  id: string;
  user_id?: string;
  items: CartItem[];
  shipping: ShippingInfo;
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax: number;
  total: number;
  promoCode: string | null;
  status: "processing" | "shipped" | "delivered";
  createdAt: string;
  estimatedDelivery: string;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (order: Omit<Order, "id" | "status" | "createdAt" | "estimatedDelivery">) => Promise<Order>;
  getOrderById: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

function generateOrderId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "FT-";
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function getEstimatedDelivery() {
  const d = new Date();
  d.setDate(d.getDate() + 5 + Math.floor(Math.random() * 5));
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();

  const fetchOrders = useCallback(async () => {
    if (!supabase || !user) return;
    
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (data && !error) {
      const formattedOrders = data.map(o => ({
        ...o,
        id: o.id,
        user_id: o.user_id || undefined,
        items: o.items as any,
        shipping: o.shipping as any,
        subtotal: Number(o.subtotal),
        discount: Number(o.discount),
        shippingCost: Number(o.shipping_cost),
        tax: Number(o.tax),
        total: Number(o.total),
        promoCode: o.promo_code,
        status: o.status as any,
        createdAt: o.created_at || new Date().toISOString(),
        estimatedDelivery: o.estimated_delivery || "",
      }));
      setOrders(formattedOrders as Order[]);
    }
  }, [user]);

  useEffect(() => {
    setMounted(true);
    if (user) {
      fetchOrders();
    } else {
      const saved = localStorage.getItem("orders");
      if (saved) {
        try { setOrders(JSON.parse(saved)); } catch {}
      }
    }
  }, [user, fetchOrders]);

  useEffect(() => {
    if (mounted && !user) localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders, mounted, user]);

  const placeOrder = useCallback(
    async (data: Omit<Order, "id" | "status" | "createdAt" | "estimatedDelivery">) => {
      const newOrder: Order = {
        ...data,
        id: generateOrderId(),
        user_id: user?.id,
        status: "processing",
        createdAt: new Date().toISOString(),
        estimatedDelivery: getEstimatedDelivery(),
      };

      if (supabase && user) {
        const { error } = await supabase.from("orders").insert({
          id: newOrder.id,
          user_id: user.id,
          items: newOrder.items as any,
          shipping: newOrder.shipping as any,
          subtotal: newOrder.subtotal,
          discount: newOrder.discount,
          shipping_cost: newOrder.shippingCost,
          tax: newOrder.tax,
          total: newOrder.total,
          promo_code: newOrder.promoCode,
          status: newOrder.status,
          created_at: newOrder.createdAt,
          estimated_delivery: newOrder.estimatedDelivery,
        });

        if (error) {
          console.error("Error saving order to Supabase:", error);
          // Fallback to local state if Supabase fails
        }
      }

      setOrders((prev) => [newOrder, ...prev]);
      return newOrder;
    },
    [user]
  );

  const getOrderById = useCallback(
    (id: string) => orders.find((o) => o.id === id),
    [orders]
  );

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within an OrderProvider");
  return ctx;
};
