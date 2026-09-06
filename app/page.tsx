"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingScreen } from "./components/LoadingScreen";
import { HeroSection } from "./components/HeroSection";
import { FooterHud } from "./components/FooterHud";

const Modern3DScene = dynamic(() => import("@/app/components/3d/Modern3DScene"), {
  ssr: false,
});

const Content3DDisplay = dynamic(() => import("./components/3d/Content3DDisplay"), {
  ssr: false,
});

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  
  // State 1: Menandai apakah file 3D sudah selesai di-load di background
  const [is3DLoaded, setIs3DLoaded] = useState(false);
  
  // State 2: Menandai apakah user SUDAH mengklik tombol "MULAI EKSPLORASI"
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <main className="relative h-screen w-full overflow-hidden text-slate-100 font-sans bg-[#030712] select-none">
      
      {/* 1. Loading Screen: NONGKRONG TERUS sampai user klik tombol */}
      <LoadingScreen 
        isReady={is3DLoaded} 
        onStart={() => setHasEntered(true)} 
      />

      {/* 2. Interactive 3D Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: hasEntered ? 1 : 0,
          scale: hasEntered ? 1 : 0.95,
        }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.1,
        }}
        className="absolute inset-0 z-0 h-full w-full pointer-events-auto"
      >
        <Modern3DScene
          activeMenu={activeMenu}
          /* PERBAIKAN: Gunakan !hasEntered agar 3D tetap disembunyikan sampai tombol diklik */
          isLoading={!hasEntered}
          onSelectMenu={(id) => setActiveMenu(id)}
          onLoaded={() => setIs3DLoaded(true)}
        />
      </motion.div>

      {/* 3. HUD Overlay & Content */}
      <AnimatePresence>
        {hasEntered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
           className="relative z-10 h-[100dvh] w-full max-w-8xl mx-auto flex flex-col justify-between px-4 pt-4 pb-6 sm:p-6 md:p-10 lg:p-12 pointer-events-none"
          >
            {/* HERO SECTION */}
            <div
              className={`flex-shrink-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 w-full pt-2 md:pt-36 transition-opacity duration-300 ${
                activeMenu
                  ? "pointer-events-none opacity-30 sm:opacity-100"
                  : "pointer-events-auto opacity-100"
              }`}
            >
              <HeroSection activeMenu={activeMenu} onSelectMenu={(id) => setActiveMenu(id)} />
            </div>

            {/* FOOTER */}
            <div className="pointer-events-auto pb-1 sm:pb-0 mb-0 ml-0 md:ml-16">
              <FooterHud />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. CONTENT DISPLAY (Modal Portal) */}
      {activeMenu && (
        <div className="relative z-[100] pointer-events-none">
          <Content3DDisplay
            activeMenu={activeMenu}
            onClose={() => setActiveMenu(null)}
          />
        </div>
      )}

    </main>
  );
}