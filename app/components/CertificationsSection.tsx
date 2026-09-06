"use client";

import React, { memo } from "react";
import Image from "next/image";
import { Award } from "lucide-react";

interface CertificationItem {
  id: string;
  image: string;
  date: string;
  title: string;
  description: string;
  institution: string;
}

const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert-10",
    image: "/img/sertif/11.jpg",
    date: "4 Jul 2026",
    title: "Juara 1 Web Design",
    description: "Kompetisi Nasional Rapat Kerja Nasional (RAKERNAS) IndoCEISS 2026",
    institution: "IndoCEISS",
  },
  {
    id: "cert-11",
    image: "/img/sertif/12.jpg",
    date: "23 Jun 2026",
    title: "Juara 1 Best Presentation - Hackathon Web App",
    description: "Kompetisi Nasional Play IT yang diselenggarakan oleh Politeknik Negeri Malang",
    institution: "Politeknik Negeri Malang",
  },
  {
    id: "cert-1",
    image: "/img/sertif/10.jpg",
    date: "2025",
    title: "Junior Web Developer",
    description: "Lulus Sertifikasi Pengembang web junior pertama",
    institution: "BNSP",
  },
  {
    id: "cert-2",
    image: "/img/sertif/1.png",
    date: "25 Feb 2023",
    title: "InHack Competition",
    description: "Penghargaan sebagai top 10 semifinal, GDSC",
    institution: "Telkom Purwokerto",
  },
  {
    id: "cert-3",
    image: "/img/sertif/win.png",
    date: "22 Feb 2025",
    title: "Magang Mandiri Kampus Merdeka",
    description: "Partisipasi dalam program magang mandiri di PT.Winnicode",
    institution: "PT.Winnicode Garuda Teknologi",
  },
  {
    id: "cert-4",
    image: "/img/sertif/sn8n.jpg",
    date: "22 Jul 2025",
    title: "Workflow N8N Course, No Code AI Agent Builder",
    description: "Menyelesaikan kursus n8n: No Code AI Agent Builder tanpa coding menggunakan n8n workflow automation.",
    institution: "Simplilearn SkillUp",
  },
  {
    id: "cert-5",
    image: "/img/sertif/2.png",
    date: "Des 2023",
    title: "Alibaba Cloud Certification",
    description: "Menyelesaikan pelatihan Database Management System SQL",
    institution: "Alibaba Cloud",
  },
  {
    id: "cert-6",
    image: "/img/sertif/3.png",
    date: "Feb 2024",
    title: "Kelas Python Lanjutan",
    description: "Menyelesaikan pembelajaran pemrograman Python lanjutan",
    institution: "Skilvul",
  },
  {
    id: "cert-7",
    image: "/img/sertif/4.png",
    date: "19 Jul 2024",
    title: "Front-End Developer Certification",
    description: "Studi kasus membangun Landing Page dengan Bootstrap",
    institution: "CodePolitan",
  },
  {
    id: "cert-8",
    image: "/img/sertif/5.png",
    date: "Jan 2024",
    title: "SAP Analytics Cloud",
    description: "Analisis data menggunakan SAP Analytics Cloud",
    institution: "Alibaba Cloud",
  },
  {
    id: "cert-9",
    image: "/img/sertif/6.png",
    date: "Des 2024",
    title: "Kelas Laravel",
    description: "Toko Online dengan Midtrans payment",
    institution: "CodePolitan",
  },
];

export const CertificationsSection = memo(function CertificationsSection() {
  return (
    <div className="space-y-4 text-slate-200 select-none pb-4">
      {/* Header Info */}
      <div className="p-3.5 bg-slate-900/80 border border-cyan-500/30 rounded-xl backdrop-blur-md flex flex-col sm:flex-row items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
          <Award className="w-5 h-5" />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-sans text-center sm:text-left">
          Daftar <span className="text-cyan-300 font-semibold">Sertifikasi</span> yang telah berhasil saya selesaikan sebagai bukti kompetensi, keterampilan, dan komitmen pembelajaran berkelanjutan di bidang <span className="text-cyan-300 font-semibold">Teknologi</span>.
        </p>
      </div>

      {/* Grid Layout 3 Kolom Kebawah */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.id}
            className="bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-400/50 hover:bg-slate-900/90 rounded-xl p-3 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group"
          >
            {/* Certification Image Container */}
            <div className="relative w-full h-40 bg-slate-950 rounded-lg overflow-hidden border border-slate-800 mb-2.5">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold text-cyan-300 bg-slate-950/80 border border-cyan-500/40 backdrop-blur-md">
                {cert.date}
              </div>
            </div>

            {/* Certification Content */}
            <div className="space-y-1 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold block truncate">
                  {cert.institution}
                </span>
                <h4 className="text-sm font-bold text-slate-100 font-sans group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {cert.title}
                </h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2 mt-1">
                  {cert.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});