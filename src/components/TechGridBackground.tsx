"use client";

import React, { useEffect, useRef } from "react";

export const TechGridBackground = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    let lastScroll = -1;

    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY !== lastScroll && gridRef.current) {
          lastScroll = scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
          const yOffset = -80 * progress;
          gridRef.current.style.transform = `translateY(${yOffset}px) translateZ(0)`;
        }
        rafId.current = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background">
      <div 
        ref={gridRef}
        className="absolute inset-0 opacity-[0.03] will-change-transform"
      >
        <div 
          className="w-full h-[120%] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px]"
        />
      </div>
      
      {/* Static gradients are cheaper to render than dynamic ones if they don't need to move */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      
      {/* Optimized light orb - using CSS animations which are highly optimized by browsers */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 translate-z-0 animate-pulse-glow will-change-[opacity,filter]" />
    </div>
  );
};
