"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorAuraRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const mousePos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const auraPos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest<HTMLElement>(
        "button, a, [role='button'], input, textarea, .cursor-hover"
      );

      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute("data-cursor-text");
        setHoverText(customText || "");
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);

    let animationFrameId: number;

    const render = () => {
      const lerp = (start: number, end: number, factor: number) =>
        start + (end - start) * factor;

      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;

      // Ring Sedang
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.15);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.15);

      // Lingkaran Super Besar (Sangat halus & melayang perlahan dengan LERP 0.04)
      auraPos.current.x = lerp(auraPos.current.x, mousePos.current.x, 0.04);
      auraPos.current.y = lerp(auraPos.current.y, mousePos.current.y, 0.04);

      const speed = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const stretch = Math.min(speed * 0.012, 0.4);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (cursorRingRef.current) {
        const scaleX = 1 + stretch;
        const scaleY = 1 - stretch * 0.4;
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
      }

      if (cursorAuraRef.current) {
        cursorAuraRef.current.style.transform = `translate3d(${auraPos.current.x}px, ${auraPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* 1. LINGKARAN SUPER BESAR (Giant Ambient Glow Spot / Flashlight) */}
      <div
        ref={cursorAuraRef}
        className={`fixed top-0 left-0 rounded-full border border-cyan-500/15 transition-all duration-700 ease-out ${
          isHovered
            ? "w-[320px] h-[320px] border-cyan-400/30 bg-cyan-500/10 shadow-[0_0_80px_rgba(6,182,212,0.25)] scale-110"
            : isMouseDown
            ? "w-[180px] h-[180px] border-cyan-400/20 bg-cyan-500/5 scale-90"
            : "w-[240px] h-[240px] bg-gradient-to-r from-cyan-500/5 to-blue-600/5 backdrop-blur-[0.5px] shadow-[0_0_60px_rgba(6,182,212,0.12)]"
        }`}
      />

      {/* 2. Titik Utama (Precision Dot) */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] transition-opacity duration-150 ${
          isMouseDown
            ? "scale-75 bg-cyan-200"
            : isHovered
            ? "opacity-0"
            : "opacity-100"
        }`}
      />

      {/* 3. Ring Sedang Modern (HUD Target) */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full border transition-all duration-300 ease-out ${
          isHovered
            ? "w-16 h-16 border-cyan-300 bg-cyan-500/10 backdrop-blur-[2px] shadow-[0_0_25px_rgba(6,182,212,0.4)]"
            : isMouseDown
            ? "w-7 h-7 border-cyan-400 bg-cyan-400/30 scale-90"
            : "w-10 h-10 border-cyan-400/40 bg-slate-950/20 backdrop-blur-[1px]"
        }`}
      >
        {!isHovered && !isMouseDown && (
          <>
            <div className="absolute -top-1 w-1 h-0.5 bg-cyan-400/80 rounded-full" />
            <div className="absolute -bottom-1 w-1 h-0.5 bg-cyan-400/80 rounded-full" />
            <div className="absolute -left-1 w-0.5 h-1 bg-cyan-400/80 rounded-full" />
            <div className="absolute -right-1 w-0.5 h-1 bg-cyan-400/80 rounded-full" />
          </>
        )}

        {isHovered && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-300 uppercase animate-pulse">
            {hoverText || "EXPLORE"}
          </span>
        )}
      </div>
    </div>
  );
}