"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

const CustomCursorInner = () => {
  const isVisibleRef = useRef(false);

  // Using raw motion values for zero-latency position updates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // MotionValue for hover state — avoids React re-renders entirely
  const hoverValue = useMotionValue(0);

  // High-performance spring configuration: 
  // Increased stiffness and lower mass to minimize perceived "lag" 
  // while maintaining a professional fluid motion.
  const springConfig = { damping: 25, stiffness: 800, mass: 0.2, restDelta: 0.001 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Derive animated values from hoverValue — no React state involved
  const cursorScale = useTransform(hoverValue, [0, 1], [1, 2.5]);
  const cursorBg = useTransform(hoverValue, [0, 1], ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.2)"]);
  const dotScale = useTransform(hoverValue, [0, 1], [1, 0]);
  const springScale = useSpring(cursorScale, { damping: 30, stiffness: 500 });
  const springDotScale = useSpring(dotScale, { damping: 30, stiffness: 500 });

  const opacity = useMotionValue(0);

  useEffect(() => {
    // Direct position updates to motion values bypass React's render cycle
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        opacity.set(1);
      }
    };

    // Hover detection — writes to MotionValue, no setState
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('.cursor-pointer') ||
        target.tagName === 'CANVAS' ||
        target.tagName === 'INPUT';
        
      hoverValue.set(isInteractive ? 1 : 0);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleHover, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [mouseX, mouseY, hoverValue, opacity]);

  // Early exit for touch devices to save resources
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference will-change-transform"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        opacity,
      }}
    >
      <motion.div
        style={{
          scale: springScale,
          backgroundColor: cursorBg,
        }}
        className="w-full h-full rounded-full border border-white flex items-center justify-center"
      >
        <motion.div 
          style={{ scale: springDotScale }}
          className="w-1.5 h-1.5 bg-white rounded-full" 
        />
      </motion.div>
    </motion.div>
  );
};

export const CustomCursor = React.memo(CustomCursorInner);
