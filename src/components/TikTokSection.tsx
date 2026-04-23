"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Volume2, Share2, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample TikTok IDs from @feetoncollections (placeholders if not known)
const TIKTOK_VIDEOS = [
  { id: "7212345678901234567", title: "Genesis Protocol Launch", likes: "12.4K" },
  { id: "7212345678901234568", title: "Kinetic Core Testing", likes: "8.2K" },
  { id: "7212345678901234569", title: "Vapor-Link Technology", likes: "15.9K" },
  { id: "7212345678901234570", title: "The Art of Movement", likes: "22.1K" },
];

export const TikTokSection = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="py-40 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
          <div className="space-y-6">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">On-Chain Media</span>
            <h2 className="text-5xl md:text-7xl font-headline font-bold uppercase tracking-tighter leading-none">
              LIVE FROM <br /> <span className="text-white/20">THE FEED</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm uppercase tracking-widest max-w-xs leading-relaxed">
            Witness the artifacts in motion. Real-time captures from our global collective.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIKTOK_VIDEOS.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-[9/16] rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 cursor-pointer"
              onClick={() => setActiveVideo(video.id)}
            >
              {/* Thumbnail Placeholder with Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                  <Play className="w-6 h-6 text-white fill-current" />
                </div>
              </div>

              {/* Video Info */}
              <div className="absolute bottom-8 left-8 right-8 z-20 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest">{video.title}</h3>
                <div className="flex items-center gap-4 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-primary" /> {video.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> TikTok</span>
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute -inset-1 bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Button variant="outline" className="rounded-full border-white/10 px-10 h-14 uppercase tracking-widest text-[10px] font-bold gap-2 group">
            Follow @feetoncollections <ExternalLink className="w-4 h-4 group-hover:text-primary transition-colors" />
          </Button>
        </div>
      </div>

      {/* Fullscreen Video Overlay */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setActiveVideo(null)} />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-[450px] aspect-[9/16] bg-black rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white z-50 hover:bg-white/20 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              {/* TikTok Iframe */}
              <iframe
                src={`https://www.tiktok.com/embed/v2/${activeVideo}`}
                className="w-full h-full border-none"
                allowFullScreen
                allow="autoplay; encrypted-media"
              />

              {/* Interaction Bar (Visual) */}
              <div className="absolute right-4 bottom-20 flex flex-col gap-6 z-40">
                <div className="flex flex-col items-center gap-2">
                   <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"><Heart className="w-5 h-5 text-primary" /></div>
                   <span className="text-[10px] font-bold">LIVE</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                   <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"><Share2 className="w-5 h-5" /></div>
                   <span className="text-[10px] font-bold">SEND</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
