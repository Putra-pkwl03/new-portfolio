"use client";

import { useState, FormEvent } from "react";
import { ExternalLink, Code2, Rocket, GraduationCap, Send, MessageSquare, PhoneCall } from "lucide-react";
import { sound } from "@/app/lib/sound"; // IMPORT SOUND UTILS

export interface AboutSectionProps {
  onClose?: () => void;
}

export function AboutSection({ onClose }: AboutSectionProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const WHATSAPP_NUMBER = "6282314969109"; // Format nomor internasional tanpa +

  // Handler Kirim Pesan dengan Teks dari Form
  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    sound.playClick?.(); // Sound effect saat kirim pesan

    const formattedText = `Halo Ma'ruf, nama saya ${name || "Pengunjung Portfolio"}.\n\n*Pesan/Diskusi:* ${message}`;
    const encodedText = encodeURIComponent(formattedText);

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, "_blank");

    setName("");
    setMessage("");
  };

  const SOCIAL_LINKS = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ma-ruf-hariam-1b894b267/",
      handle: "Ma'ruf Hariam",
      color: "hover:bg-blue-500/10 hover:border-blue-500/40 text-blue-400",
      icon: (
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.48 1.48 0 1 0 0 2.96 1.48 1.48 0 0 0 0-2.96Z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/Putra-pkwl03",
      handle: "Putra-pkwl03",
      color: "hover:bg-slate-700/30 hover:border-slate-500/40 text-slate-200",
      icon: (
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/putra_pkwl03/",
      handle: "@putra_pkwl03",
      color: "hover:bg-rose-500/10 hover:border-rose-500/40 text-rose-400",
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61555411509506",
      handle: "Profile FB",
      color: "hover:bg-sky-500/10 hover:border-sky-500/40 text-sky-400",
      icon: (
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col space-y-6 max-w-6xl mx-auto p-2 select-none">
      {/* Sub-Header Ringkas (Role & Kampus) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/50 border border-cyan-500/20 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold">
          <Code2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Software Engineer • Fullstack Developer</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <GraduationCap className="w-4 h-4 shrink-0" />
          <span>Sistem Informasi — Universitas Jenderal Achmad Yani Yogyakarta</span>
        </div>
      </div>

      {/* Intro Text */}
      <div className="space-y-3 text-slate-300 leading-relaxed text-sm">
        <p className="text-slate-200 font-medium">
          Fresh Graduate dengan pengalaman sebagai <span className="text-cyan-300 font-semibold">Full Stack Developer</span>. Terbiasa membangun sistem berbasis web menggunakan Laravel,
          Python-Flask, JavaScript, React, Next.js, dan Vue.js, serta Flutter dan Kotlin untuk aplikasi Android. Berpengalaman
          mengelola frontend-backend maupun DevOps, menerapkan best practice, dan mengintegrasikan RESTful API dalam proyek
          pengembangan software.
        </p>
        <p className="text-slate-400 text-xs sm:text-sm">
          Berpengalaman dalam membangun aplikasi web modern yang responsif, berkinerja tinggi, dan terstruktur baik menggunakan ekosistem JavaScript/TypeScript maupun framework backend terkini.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center hover:border-cyan-500/30 transition-all">
          <span className="block text-2xl font-extrabold text-cyan-400">3+</span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-1 block">
            Years Experience
          </span>
        </div>
        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center hover:border-cyan-500/30 transition-all">
          <span className="block text-2xl font-extrabold text-cyan-400">20+</span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-1 block">
            Projects Built
          </span>
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400/80 flex items-center gap-2">
          <Rocket className="w-3.5 h-3.5" /> Social Links & Profiles
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover?.()}
              onClick={() => sound.playClick?.()}
              className={`flex items-center justify-between p-3 bg-slate-900/60 border border-slate-800 rounded-xl transition-all group ${social.color}`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                {social.icon}
                <div className="truncate">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">
                    {social.name}
                  </span>
                  <span className="text-xs font-semibold truncate block text-slate-200 group-hover:text-white">
                    {social.handle}
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 shrink-0 opacity-40 group-hover:opacity-100 transition" />
            </a>
          ))}
        </div>
      </div>

      {/* ================= FORM CHAT / HUBUNGI SAYA ================= */}
      <div className="pt-2 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400/80 flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> Hubungi Saya / Diskusi
          </h3>
        </div>

        <form onSubmit={handleSendMessage} className="p-4 bg-slate-900/70 rounded-xl border border-cyan-500/30 space-y-3 backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                Nama Anda
              </label>
              <input
                type="text"
                placeholder="Masukkan nama..."
                value={name}
                onFocus={() => sound.playHover?.()}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                Kontak WhatsApp
              </label>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-950/50 border border-slate-800 rounded-lg text-xs font-mono text-slate-300">
                <PhoneCall className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>082314969109</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              Pesan / Topik Diskusi
            </label>
            <textarea
              rows={3}
              required
              placeholder="Tuliskan topik diskusi atau tawaran proyek Anda..."
              value={message}
              onFocus={() => sound.playHover?.()}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition resize-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
            {/* Tombol Kirim Pesan Form */}
            <button
              type="submit"
              onMouseEnter={() => sound.playHover?.()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] active:scale-95 cursor-pointer"
            >
              <span>Kirim Pesan WhatsApp</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}