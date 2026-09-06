"use client";

import { memo } from "react";
import { Calendar, MapPin, Building2, ChevronRight, ExternalLink, Code2 } from "lucide-react";
import { sound } from "@/app/lib/sound"; // IMPORT SOUND UTILS

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  type: string;
  period: string;
  bullets: string[];
  techStack: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Full Stack Developer",
    company: "PT Multi Media Access",
    location: "Remote",
    type: "Contract / Full-time",
    period: "November 2025 - Februari 2026",
    bullets: [
      "Merancang dan membangun CMS backend berbasis Laravel untuk manajemen konten IPTV, distribusi kanal secara real-time, serta integrasi API yang efisien.",
      "Mengembangkan aplikasi Android TV menggunakan Kotlin yang dioptimalkan khusus untuk perangkat STB dan Mi Stick, dengan fokus pada responsivitas navigasi remote control dan efisiensi streaming.",
    ],
    techStack: ["Laravel", "Kotlin", "Android TV (STB/Mi Stick)", "REST API", "IPTV Streaming", "MySQL"],
  },
  {
    id: "exp-2",
    role: "Web Developer",
    company: "Sevenpion",
    location: "Yogyakarta",
    type: "Magang",
    period: "Juli 2025 - September 2025",
    bullets: [
      "Menerapkan desain responsif dan logika backend yang mengoptimalkan website untuk klien, menghasilkan peningkatan lalu lintas permintaan dan meningkatkan waktu pengerjaan secara efisien.",
      "Mengembangkan solusi web untuk klien global termasuk pemerintahan, UMKM, dan merek produk konsumen.",
    ],
    techStack: ["Laravel", "PHP", "JavaScript", "Next.js", "Tailwind CSS", "Bootstrap", "MySQL"],
  },
  {
    id: "exp-3",
    role: "Full Stack Developer",
    company: "PT Winnicode Garuda Indonesia",
    location: "Remote",
    type: "Magang",
    period: "Januari 2025 - Juli 2025",
    bullets: [
      "Mengembangkan Dashboard Admin HR untuk sistem perekrutan karyawan dari awal hingga selesai, mencapai penyelesaian tepat waktu dengan fitur CRUD yang diatur menggunakan RBAC (Role Based Access Control) untuk mengelola data pendaftar lebih mudah dan cepat.",
    ],
    techStack: ["Laravel", "RBAC", "MySQL", "Bootstrap", "REST API", "Gmail API"],
  },
  {
    id: "exp-4",
    role: "Staff Web Development",
    company: "House Ilmu Indonesia (HI)",
    location: "Remote / Hybrid",
    type: "Magang",
    period: "Juli 2024 - Juli 2025",
    bullets: [
      "Memperbarui dan mengelola konten pada website utama agar informasi selalu tepercaya dan relevan bagi pengguna.",
      "Membangun Dashboard Internal untuk mempermudah pengelolaan artikel dan publikasi konten secara langsung ke website utama.",
    ],
    techStack: ["Laravel", "Livewire", "JavaScript", "Axios", "jQuery", "Tailwind CSS"],
  },
];

export const ExperienceSection = memo(function ExperienceSection() {
  return (
    <div className="space-y-5 text-slate-200 select-none pb-2">
      {/* Tombol Lihat Lengkap Pengalaman (Google Drive Link) */}
      <div className="flex items-center justify-between gap-3 p-3 bg-slate-900/80 border border-cyan-500/30 rounded-xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <p className="text-xs text-slate-300 font-mono hidden sm:block">
            Dokumentasi dan Portofolio Pengalaman Lengkap
          </p>
        </div>
        <a
          href="https://drive.google.com/drive/folders/1kX8_QhRLXFFXaT7DlNUCUzo1FgR4pWp1?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => sound.playHover?.()}
          onClick={() => sound.playClick?.()}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-cyan-500/20 hover:bg-cyan-400 hover:text-slate-950 border border-cyan-400/50 text-cyan-300 rounded-lg text-xs font-mono font-bold transition-all duration-200 shadow-[0_0_15px_rgba(6,182,212,0.2)] active:scale-95 w-full sm:w-auto justify-center"
        >
          <span>Lihat Lengkap Pengalaman Saya</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Timeline List */}
      <div className="relative pl-3 sm:pl-4 border-l-2 border-cyan-500/30 space-y-6 my-2">
        {EXPERIENCES.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Glowing Timeline Dot */}
            <div className="absolute -left-[19px] sm:-left-[23px] top-1.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:bg-cyan-400 group-hover:border-cyan-300 transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />

            {/* Experience Card */}
            <div
              onMouseEnter={() => sound.playHover?.()}
              onClick={() => sound.playClick?.()}
              className="bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-400/50 hover:bg-slate-900/80 p-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.12)] space-y-3 cursor-pointer"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-slate-800/80">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-cyan-300 font-sans tracking-wide">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300 mt-0.5">
                    <span className="flex items-center gap-1 font-semibold text-slate-200">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      {exp.company}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                      {exp.location} ({exp.type})
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-1 rounded-full shrink-0 w-fit">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2 text-xs sm:text-[13px] text-slate-300 font-sans leading-relaxed">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-1" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Badges */}
              <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold text-slate-400 mr-1">
                  Tech Stack:
                </span>
                {exp.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});