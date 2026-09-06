"use client";

import { Mouse, Mail } from "lucide-react";

export function FooterHud() {
  return (
    <footer className="flex flex-row items-center sm:items-end justify-between w-full pointer-events-auto gap-2 sm:gap-0">
      <div className="flex flex-col sm:space-y-3 w-full sm:w-auto">
        
        {/* Teks Instruksi Mouse (Hanya Tampil di Desktop) */}
        <div className="hidden sm:flex items-center gap-2.5 text-slate-400 text-xs font-mono">
          <Mouse className="w-4 h-4 text-cyan-400 animate-bounce" />
          <span>Gunakan mouse untuk rotasi 3D</span>
        </div>

        {/* Seksi Sosial Media */}
        <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-2 sm:gap-1.5 w-full">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-slate-500 uppercase block">
            KONEKSI SOSIAL
          </span>

          <div className="flex items-center gap-2 sm:gap-4 text-slate-400">
            <a
              href="https://github.com/Putra-pkwl03"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 transition"
              aria-label="GitHub"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/ma-ruf-hariam-1b894b267/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 transition"
              aria-label="LinkedIn"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>

            <a
              href="mailto:putrapongkowulu@gmail.com"
              className="p-1.5 sm:p-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 transition"
              aria-label="Email"
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}