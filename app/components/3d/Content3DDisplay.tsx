"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { MENU_3D } from "./constants/sceneData";
import { AboutSection } from "../AboutSection";
import { ProjectsSection } from "../ProjectsSection";
import { ExperienceSection } from "../ExperienceSection";
import { CertificationsSection } from "../CertificationsSection";
import { sound } from "@/app/lib/sound"; // IMPORT SOUND UTILS

interface Content3DDisplayProps {
  activeMenu: string | null;
  onClose: () => void;
}

export default function Content3DDisplay({ activeMenu, onClose }: Content3DDisplayProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeCard = MENU_3D.find((item) => item.id === activeMenu);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Handler untuk aksi tombol Back + SFX
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    sound.playClick?.(); // Putar SFX Klik / Close
    onClose();
  };

  if (!mounted || !activeMenu || !activeCard) return null;

  return (
    <div className="fixed inset-0 z-50 w-full h-full p-3 sm:p-6 md:p-10 flex flex-col items-center lg:items-end justify-center [perspective:1400px] pointer-events-none overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMenu}
          drag
          dragConstraints={{ left: -150, right: 150, top: -100, bottom: 100 }}
          dragElastic={0.05}
          dragSnapToOrigin={false}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, x: 80, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 80, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            transformOrigin: "right center",
          }}
          className="w-full h-full lg:h-auto lg:max-h-[85vh] lg:w-[58%] xl:w-[60%] flex flex-col space-y-3 sm:space-y-4 pointer-events-auto transform-gpu bg-slate-950/95 lg:bg-slate-950/85 backdrop-blur-2xl border-0 lg:border border-cyan-500/40 rounded-none lg:rounded-2xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_30px_rgba(6,182,212,0.2)] relative cursor-grab active:cursor-grabbing select-none"
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-cyan-500/30" />

          {/* HEADER PORTAL */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-cyan-500/30 shrink-0 mt-2 sm:mt-0 relative z-20">
            
            {/* Info Judul & Ikon */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-300 text-lg sm:text-xl shrink-0">
                {activeCard.icon}
              </div>
              <div className="min-w-0">
                <h2 className="text-base sm:text-xl md:text-2xl font-mono font-bold text-cyan-300 uppercase tracking-widest truncate">
                  {activeCard.label}
                </h2>
                <span className="text-[10px] sm:text-xs text-slate-400 font-mono block truncate">
                  System Portal // {activeCard.id}
                </span>
              </div>
            </div>

            {/* BUTTON BACK DENGAN AUDIO SFX */}
            <button
              type="button"
              onClick={handleClose}
              onMouseEnter={() => sound.playHover?.()} // SFX saat mouse diarahkan ke tombol
              onPointerDown={(e) => e.stopPropagation()}
              className="w-full lg:w-auto px-4 py-2 sm:py-2.5 text-xs font-mono font-bold rounded-xl bg-cyan-500/20 hover:bg-cyan-400 hover:text-slate-950 border border-cyan-400/60 text-cyan-300 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95 relative z-30"
            >
              ← <span>Kembali ke</span> Menu
            </button>
          </div>

          {/* AREA KONTEN SCROLLABLE */}
          <div
            className="flex-1 overflow-y-auto pr-1 text-slate-200 custom-scrollbar relative z-10 cursor-auto overscroll-contain"
            onPointerDown={(e) => e.stopPropagation()}
          >
            {activeMenu === "about" && <AboutSection onClose={onClose} />}
            {activeMenu === "projects" && <ProjectsSection />}
            {activeMenu === "pengalaman" && <ExperienceSection />}
            {activeMenu === "certs" && <CertificationsSection />}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}