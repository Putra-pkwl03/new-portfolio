"use client";

import { motion, Variants } from "framer-motion";
import { Terminal, Sparkles, Layers, Database, Globe, Cpu, Code2, MessageSquare } from "lucide-react";
import { sound } from "@/app/lib/sound"; // IMPORT SOUND UTILS

interface HeroSectionProps {
  activeMenu: string | null;
  onSelectMenu: (menuId: string) => void;
}

export function HeroSection({ activeMenu, onSelectMenu }: HeroSectionProps) {
  // Variant animasi container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  // Variant animasi jatuh dengan rotasi awal 3D perspektif
  const dropDownItemVariants: Variants = {
    hidden: { opacity: 0, y: -45, scale: 0.9, rotateX: -25 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 110,
        damping: 14,
      },
    },
  };

  // Handler untuk memilih menu dengan efek suara
  const handleSelect = (menuId: string) => {
    sound.playClick?.();
    onSelectMenu(menuId);
  };

  // Ganti dengan nomor WhatsApp kamu (format internasional tanpa tanda + atau 0)
  const WHATSAPP_NUMBER = "6282314969109"; 
  const WHATSAPP_MESSAGE = encodeURIComponent("Halo Ma'ruf, saya ingin berdiskusi mengenai proyek.");
  const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    /* Perspective Wrapper utama untuk efek ruang 3D tanpa Background */
    <div className="[perspective:1200px] w-full md:w-[48%] xl:w-[45%] relative pb-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          rotateX: 4,
          rotateY: 6,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        style={{ transformStyle: "preserve-3d" }}
        className={`relative transition-all duration-500 space-y-5 pointer-events-auto w-full ${
          activeMenu ? "hidden md:block" : "max-w-xl"
        }`}
      >
        {/* ================= ELEMEN DEKORATIF 3D MELAYANG (KIRI & KANAN) ================= */}
        <div 
          style={{ transformStyle: "preserve-3d", transform: "translateZ(-30px)" }} 
          className="absolute -top-24 left-0 right-0 -z-10 h-32 pointer-events-none select-none"
        >
          {/* === SISI KIRI === */}
          <div className="absolute -top-10 -left-6 w-40 h-40 bg-cyan-500/20 rounded-full blur-[60px] animate-pulse" />
          
          {/* Cube Kiri #1 */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotateX: [15, 35, 15],
              rotateY: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute -left-4 top-2 w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-transparent border border-cyan-400/40 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.25)] flex items-center justify-center"
          >
            <Code2 className="w-5 h-5 text-cyan-300 opacity-90" />
          </motion.div>

          {/* Cube Kiri #2 */}
          <motion.div
            animate={{
              y: [0, 10, 0],
              rotateZ: [0, 45, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute left-20 -top-6 w-7 h-7 rounded-md bg-gradient-to-tr from-blue-600/30 to-cyan-500/10 border border-blue-400/30 backdrop-blur-sm flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.3)]"
          >
            <Cpu className="w-3.5 h-3.5 text-sky-300" />
          </motion.div>

          {/* Circuit Line Kiri */}
          <div className="absolute left-10 top-12 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-ping" />
            <div className="w-16 h-[1px] bg-gradient-to-r from-cyan-500/50 via-blue-500/20 to-transparent" />
          </div>

          {/* === SISI KANAN === */}
          <div className="absolute -top-10 right-20 sm:right-28 w-40 h-40 bg-blue-500/20 rounded-full blur-[60px] animate-pulse" />

          {/* Cube Kanan #1 */}
          <motion.div
            animate={{
              y: [0, 14, 0],
              rotateX: [0, -35, 0],
              rotateY: [360, 180, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute right-24 sm:right-32 top-0 w-9 h-9 rounded-lg bg-gradient-to-bl from-blue-400/20 via-cyan-500/10 to-transparent border border-blue-400/40 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.25)] flex items-center justify-center"
          >
            <Sparkles className="w-4 h-4 text-blue-300 opacity-90" />
          </motion.div>

          {/* Circuit Line Kanan */}
          <div className="absolute right-36 sm:right-44 top-10 flex items-center gap-2 flex-row-reverse">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa] animate-pulse" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-blue-500/50 via-cyan-500/20 to-transparent" />
          </div>
        </div>

        {/* 1. Badge Developer */}
        <motion.div 
          variants={dropDownItemVariants} 
          style={{ transformStyle: "preserve-3d" }}
          className="[transform:translateZ(20px)]"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-[10px] sm:text-xs font-mono font-semibold backdrop-blur-md shadow-[0_10px_20px_rgba(0,0,0,0.4),0_0_15px_rgba(6,182,212,0.2)]">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>SOFTWARE ENGINEER</span>
          </div>
        </motion.div>

        {/* 2. Nama & Title */}
        <motion.div 
          variants={dropDownItemVariants} 
          style={{ transformStyle: "preserve-3d" }}
          className="space-y-2 [transform:translateZ(40px)]"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
            Ma'ruf{" "}
            <span className="bg-gradient-to-r from-cyan-100 via-sky-200 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_12px_25px_rgba(56,189,248,0.4)]">
              Hariam
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base font-medium text-slate-300 leading-relaxed max-w-lg drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
            Secangkir kopi, kebebasan bernalar, dan baris kode yang saling terhubung, mewujudkan ide abstrak menjadi solusi digital nyata.
          </p>
        </motion.div>

        {/* 3. Stack Mini Pills */}
        <motion.div
          variants={dropDownItemVariants}
          style={{ transformStyle: "preserve-3d" }}
          className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 font-mono text-[10px] sm:text-xs text-slate-300 [transform:translateZ(30px)]"
        >
          <div 
            onMouseEnter={() => sound.playHover?.()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-[0_8px_16px_rgba(0,0,0,0.5)] hover:border-cyan-400/60 hover:-translate-y-1 transition-all cursor-default"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Backend API</span>
          </div>
          <div 
            onMouseEnter={() => sound.playHover?.()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-[0_8px_16px_rgba(0,0,0,0.5)] hover:border-blue-400/60 hover:-translate-y-1 transition-all cursor-default"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Frontend</span>
          </div>
          <div 
            onMouseEnter={() => sound.playHover?.()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-[0_8px_16px_rgba(0,0,0,0.5)] hover:border-sky-400/60 hover:-translate-y-1 transition-all cursor-default"
          >
            <Database className="w-3.5 h-3.5 text-sky-400" />
            <span>Arsitektur Data</span>
          </div>
        </motion.div>

        {/* 4. Call to Action Buttons */}
        <motion.div
          variants={dropDownItemVariants}
          style={{ transformStyle: "preserve-3d" }}
          className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-2 [transform:translateZ(50px)]"
        >
          <button
            onClick={() => handleSelect("projects")}
            onMouseEnter={() => sound.playHover?.()}
            className="group relative px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-xl bg-gradient-to-r from-cyan-200 via-sky-200 to-blue-300 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_12px_28px_rgba(6,182,212,0.45),inset_0_2px_0_rgba(255,255,255,0.5)] transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0 flex items-center gap-2 cursor-pointer border-b-4 border-cyan-700 active:border-b-0"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Jelajahi Portofolio</span>
          </button>

          {/* TOMBOL DISKUSI PROYEK DIARAHKAN KE WHATSAPP */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick?.()}
            onMouseEnter={() => sound.playHover?.()}
            className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-xl bg-blue-200/90 hover:bg-slate-800 text-gray-800 hover:text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-slate-700 hover:border-cyan-500/60 shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0 cursor-pointer border-b-4 border-slate-950 active:border-b-0"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600 group-hover:text-emerald-400 transition-colors" />
            <span>Diskusi Proyek</span>
          </a>
        </motion.div>

        {/* ================== DUDUKAN / PODIUM SEGI EMPAT 3D (PEDESTAL) =================== */}
        <div 
          style={{ transformStyle: "preserve-3d", transform: "translateZ(-10px) rotateX(65deg) rotateZ(45deg)" }}
          className="hidden md:flex absolute -bottom-40 w-86 left-4 h-84 -z-20 pointer-events-none select-none items-center justify-center origin-center"
        >
          <div className="absolute w-full h-full rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-br from-cyan-500/10 via-blue-600/5 to-transparent blur-[0.5px] shadow-[0_0_35px_rgba(6,182,212,0.3)] animate-pulse" />
          <div className="absolute w-[82%] h-[82%] rounded-xl border border-blue-400/40 bg-slate-950/85 backdrop-blur-md shadow-[inset_0_0_20px_rgba(34,211,238,0.2)]" />
          <div className="absolute w-[40%] h-[40%] rounded-lg bg-cyan-400/25 blur-lg animate-ping" />
          <div className="absolute w-full h-full rounded-2xl bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:12px_12px] opacity-30" />
          <div className="absolute -bottom-2 w-[70%] h-[70%] bg-cyan-500/25 blur-2xl -z-10" />
        </div>
      </motion.div>
    </div>
  );
}