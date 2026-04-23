"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Phone, MapPin, Globe, Navigation as NavIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const shippingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "Zip code is required"),
  country: z.string().min(2, "Country is required"),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;

interface ShippingFormProps {
  initialData?: Partial<ShippingFormData>;
  onNext: (data: ShippingFormData) => void;
}

export const ShippingForm = ({ initialData, onNext }: ShippingFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">Full Name</Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              {...register("fullName")}
              className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="ENTER FULL NAME"
            />
          </div>
          {errors.fullName && <p className="text-[10px] text-red-500 uppercase tracking-widest ml-1">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              {...register("email")}
              className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="EMAIL@EXAMPLE.COM"
            />
          </div>
          {errors.email && <p className="text-[10px] text-red-500 uppercase tracking-widest ml-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              {...register("phone")}
              className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          {errors.phone && <p className="text-[10px] text-red-500 uppercase tracking-widest ml-1">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">Country</Label>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              {...register("country")}
              className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="UNITED STATES"
            />
          </div>
          {errors.country && <p className="text-[10px] text-red-500 uppercase tracking-widest ml-1">{errors.country.message}</p>}
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">Street Address</Label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              {...register("address")}
              className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="123 LAB STREET"
            />
          </div>
          {errors.address && <p className="text-[10px] text-red-500 uppercase tracking-widest ml-1">{errors.address.message}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">City</Label>
          <input
            {...register("city")}
            className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            placeholder="CITY"
          />
          {errors.city && <p className="text-[10px] text-red-500 uppercase tracking-widest ml-1">{errors.city.message}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">State / Province</Label>
          <input
            {...register("state")}
            className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            placeholder="STATE"
          />
          {errors.state && <p className="text-[10px] text-red-500 uppercase tracking-widest ml-1">{errors.state.message}</p>}
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] text-white/40 ml-1">Zip / Postal Code</Label>
          <input
            {...register("zip")}
            className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            placeholder="00000"
          />
          {errors.zip && <p className="text-[10px] text-red-500 uppercase tracking-widest ml-1">{errors.zip.message}</p>}
        </div>
      </div>

      <Button type="submit" className="w-full h-16 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-[0.4em] glow-red mt-8 group transition-all">
        CONTINUE TO PAYMENT <NavIcon className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
      </Button>
    </form>
  );
};
