"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/app/lib/sound"; // Sesuaikan path utils sound Anda

interface LoadingScreenProps {
  isReady: boolean;    // bernilai true jika 3D scene sudah beres di-load
  onStart: () => void; // callback untuk mengubah state hasEntered di page.tsx
}

export function LoadingScreen({ isReady, onStart }: LoadingScreenProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleStart = () => {
    // Play SFX & Audio Ambient MP3
    sound.playOpenPortal();
    sound.startAmbient();

    setIsClicked(true);
    onStart();
  };

  return (
    <AnimatePresence>
      {!isClicked && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712] overflow-hidden p-4"
        >
          {/* Ambient Glow Background */}
          <div className="absolute w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

          <div className="relative flex flex-col items-center justify-center text-center">
            {/* Spinning Rings */}
            <div className="absolute w-28 h-28 sm:w-32 sm:h-32 border border-cyan-500/20 rounded-full animate-[spin_4s_linear_infinite]" />
            <div className="absolute w-36 h-36 sm:w-40 sm:h-40 border border-dashed border-blue-500/30 rounded-full animate-[spin_8s_linear_infinite_reverse]" />

            {/* 3D Logo Badge */}
            <motion.div
              animate={{
                rotateY: [0, 360],
                rotateX: [0, 15, 0, -15, 0],
              }}
              transition={{
                rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
                rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-slate-900/80 border border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center justify-center backdrop-blur-xl mb-6 sm:mb-8"
            >
              <span className="text-3xl sm:text-4xl font-black bg-gradient-to-tr from-cyan-400 via-sky-200 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(56,189,248,0.8)] font-mono">
                M
              </span>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
            </motion.div>

            {/* Status & Progress Bar */}
            <div className="space-y-3 mb-8">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-cyan-300 uppercase font-bold animate-pulse block">
                {isReady ? "PORTOFOLIO SAYA SIAP" : "MEMUAT ASET PORTOFOLIO..."}
              </span>

              <div className="w-36 sm:w-48 h-1 bg-slate-800 rounded-full overflow-hidden mx-auto">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                />
              </div>
            </div>

            {/* Tombol Mulai (Hanya aktif/muncul ketika 3D scene siap) */}
            <AnimatePresence>
              {isReady && (
                <motion.button
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  onClick={handleStart}
                  onMouseEnter={() => sound.playHover()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-6 sm:px-8 py-3 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono text-xs sm:text-sm font-bold tracking-widest uppercase overflow-hidden border border-cyan-300/50 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.8)] transition-all duration-300 cursor-pointer"
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    MULAI EKSPLORASI
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </motion.button>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}