"use client";

import { useState, useMemo, memo, useCallback } from "react";
import { ExternalLink, Code2, Server, UserCheck, ArrowLeft, Globe } from "lucide-react";
import { sound } from "@/app/lib/sound"; // IMPORT SOUND UTILS

const GithubIcon = memo(() => (
  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
  </svg>
));
GithubIcon.displayName = "GithubIcon";

interface ProjectLinks {
  demo?: string;
  github?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  frontend: string;
  backend: string;
  artefactIcon: string;
  image: string;
  links: ProjectLinks;
}

const PROJECTS_DATA: Project[] = [
  {
    id: "10",
    title: "COOP-FLOW (Digital Agricultural Ecosystem)",
    description:
      "Platform ekosistem digital berbasis GIS dan Machine Learning yang dirancang untuk mentransformasi manajemen sektor pertanian dan koperasi. Platform ini memfasilitasi pendataan ketersediaan lahan, pemantauan alokasi dan distribusi pupuk bersubsidi secara tepat sasaran, analisis kesehatan tanaman menggunakan pemrosesan pencitraan satelit NDVI (Normalized Difference Vegetation Index), serta integrasi fitur Text-to-Navigation untuk mempermudah navigasi geografis bagi para petani di lapangan.",
    role: "Full Stack & ML Engineer",
    frontend: "Next.js, Tailwind CSS, Leaflet GIS",
    backend: "Laravel, FastAPI (Python ML), Docker, Citra Satelit NDVI, Text-to-Navigation API",
    artefactIcon: "/img/compass-map.webp",
    image: "/img/projects/coopflow.jpeg",
    links: {
      demo: "https://coopflow.up.railway.app/",
      github: "https://github.com/Putra-pkwl03/coop-flow.git",
    },
  },

   {
    id: "14",
    title: "K24Klik Order API Monitoring Stack",
    description:
      "Pengembangan arsitektur pemantauan infrastruktur terpusat (centralized monitoring stack) untuk memantau kesehatan dan performa microservices pada sistem transaksi pemesanan K24Klik. Solusi ini mencakup pengumpulan metrik beban CPU/RAM/Disk, performa kontainer Docker, hingga antrean pesan Redis Message Queue secara terisolasi menggunakan Prometheus, Alertmanager, Node Exporter, dan cAdvisor yang divisualisasikan melalui Grafana Dashboard secara real-time.",
    role: "DevOps / Infrastructure Engineer",
    frontend: "Grafana Dashboards",
    backend: "Prometheus, Alertmanager, Node Exporter, cAdvisor, Redis Exporter, Docker",
    artefactIcon: "/img/crystal-brain.webp",
    image: "/img/projects/k24.png",
    links: {
      github: "https://github.com/Putra-pkwl03/Monitoring-Sistem-K24Klik-Order-API.git",
    },
  },
  {
    id: "13",
    title: "SC CLAIMS (Sistem Klaim Tambang)",
    description:
      "Dashboard sistem manajemen dan pemetaan spasial klaim lahan pertambangan berbasis SIG. Sistem ini membantu tim operasional dan legal dalam mencatat, memverifikasi, serta memvisualisasikan sengketa atau klaim batas wilayah tambang secara interaktif melalui peta digital yang memuat pembagian hierarki lokasi site, pit, hingga blok/zona eksplorasi pertambangan.",
    role: "Full Stack Developer",
    frontend: "Next.js, Tailwind CSS, Leaflet GIS",
    backend: "Laravel, MySQL, Spatial Data API",
    artefactIcon: "/img/compass-map.webp",
    image: "/img/projects/sclaim.jpeg",
    links: {
      github: "https://github.com/Putra-pkwl03/claim-app.git",
    },
  },
    {
    id: "11",
    title: "BPBD Rescue-Log (Disaster Management System)",
    description:
      "Sistem informasi manajemen penanganan bencana terpadu yang dirancang khusus untuk BPBD dalam menyelaraskan operasional tanggap darurat. Aplikasi ini menghubungkan Posko Komando Utama dengan Sub-Posko Lapangan secara real-time untuk koordinasi pemetaan lokasi bencana, pemantauan titik posko pengungsian, pengelolaan ketersediaan stok logistik, hingga otomatisasi pencatatan distribusi bantuan logistik agar transparan dan efisien.",
    role: "Full Stack Developer",
    frontend: "Blade / React, Leaflet GIS",
    backend: "Laravel, FastAPI (ML Model), REST API",
    artefactIcon: "/img/warning-shield.webp",
    image: "/img/projects/rg.jpeg",
    links: {
      demo: "https://rescue-log.up.railway.app/",
      github: "https://github.com/Putra-pkwl03/rescue-log.git",
    },
  },

   {
    id: "12",
    title: "EWS FLOTIM (Early Warning System Flores Timur)",
    description:
      "Platform peringatan dini dan pemantauan maritim terintegrasi untuk mitigasi bencana di wilayah Kabupaten Flores Timur. Platform ini secara otomatis sinkron dengan data seismik BMKG untuk mendeteksi gempa terkini, menyediakan prediksi cuaca laut dan gelombang dari multi-sumber API (WeatherAPI, Stormglass, OpenWeather), serta dilengkapi fitur rekomendasi kecerdasan buatan (Gemini AI) untuk menganalisis potensi dampak bencana dan panduan keselamatan bagi masyarakat maritim.",
    role: "Frontend & Integration Dev",
    frontend: "Next.js, Tailwind CSS, Leaflet GIS",
    backend: "BMKG API, WeatherAPI, Stormglass API, OpenWeather API, Gemini AI",
    artefactIcon: "/img/compass-map.webp",
    image: "/img/projects/flotim.jpg",
    links: {
      demo: "https://ews-flotim.vercel.app/",
      github: "https://github.com/Putra-pkwl03/ews-flotim.git",
    },
  },
  {
    id: "1",
    title: "E-Learning Siswa Disabilitas",
    description:
      "Aplikasi sistem pembelajaran digital inklusif yang dirancang khusus untuk mendukung aksesibilitas siswa berkebutuhan khusus. Dilengkapi dengan antarmuka yang sangat responsif serta fitur bantu interaktif seperti Text-to-Speech (TTS) untuk siswa tunanetra, Speech-to-Text (STT) untuk pembantu dikte, dan integrasi dengan API Userawai untuk penyesuaian gaya kontras dan ukuran font.",
    role: "Full Stack Developer",
    frontend: "Laravel, Bootstrap, jQuery, JavaScript",
    backend: "Python-Flask, MongoDB, API Userawai, API TTS-STT",
    artefactIcon: "/img/feather-scroll.webp",
    image: "/img/projects/4.png",
    links: {
      github: "https://github.com/Putra-pkwl03/E-Learning_siswa_disabilias.git",
    },
  },
  {
    id: "2",
    title: "Pariwisata Ramah Disabilitas",
    description:
      "Platform direktori dan navigasi tempat wisata terintegrasi yang berfokus pada aksesibilitas ramah disabilitas. Menyediakan fitur navigasi berbasis arahan suara, filter rekomendasi fasilitas ramah disabilitas (seperti bidang miring/ramp dan toilet khusus), serta kontrol suara interaktif. Proyek ini dikembangkan untuk kompetisi Inhack GDSC Telkom Purwokerto.",
    role: "Full Stack Developer",
    frontend: "Vite.js, JavaScript, Bootstrap",
    backend: "Laravel, MySQL, API Endpoint, TTS API, STT API",
    artefactIcon: "/img/feather-scroll.webp",
    image: "/img/projects/6.png",
    links: {
      github: "https://github.com/Putra-pkwl03/Tectitans.git",
    },
  },
  {
    id: "3",
    title: "Prediksi Kesehatan Mental",
    description:
      "Aplikasi web berbasis Machine Learning yang dikembangkan untuk membantu mendeteksi dan memprediksi indikasi tingkat stres awal pengguna. Menggunakan pemrosesan data survei kesehatan mental dengan algoritma Logistic Regression, serta didukung fitur pembaca hasil otomatis (Text-to-Speech) untuk pengalaman pengguna yang lebih inklusif.",
    role: "Backend Developer",
    frontend: "-",
    backend: "Python-Flask, MySQL, API Endpoint, TTS API, ML Model",
    artefactIcon: "/img/crystal-brain.webp",
    image: "/img/projects/8.png",
    links: {
      github: "https://github.com/Putra-pkwl03/Prediction-Mental-Health-Menggunakan-Model-Logistic-Regresi.git",
    },
  },
  {
    id: "5",
    title: "CMS Cendana Solution Center",
    description:
      "Sistem Manajemen Konten (CMS) dan Company Profile interaktif untuk Cendana Solution Center. Dilengkapi dengan manajemen katalog layanan perusahaan, fitur integrasi cepat ke WhatsApp Customer Service, optimasi performa pemuatan halaman, SEO on-page, serta proses deployment dan konfigurasi domain pada hosting Niagahoster.",
    role: "Backend Developer",
    frontend: "-",
    backend: "Laravel, API Endpoint",
    artefactIcon: "/img/wax-seal-letter.webp",
    image: "/img/projects/16.png",
    links: {
      demo: "https://cendanasolution.com",
    },
  },
  {
    id: "6",
    title: "Tlogo Putri Doc (Postman API)",
    description: "Dokumentasi RESTful API terstruktur dan komprehensif untuk backend ekosistem sistem informasi Tlogo Putri. Dibuat menggunakan Postman Interaktive Documentation yang mencakup penjelasan endpoint autentikasi JWT, penanganan error, contoh skenario request-response, dan dipublikasikan pada VPS publik untuk memudahkan integrasi oleh pengembang lain.",
    role: "Backend Developer",
    frontend: "-",
    backend: "Laravel, API Endpoint, Postman, MySQL, JWT",
    artefactIcon: "/img/ancient-tome.webp",
    image: "/img/projects/p1.jpg",
    links: {
      demo: "https://documenter.getpostman.com/view/34659815/2sB2izFESR#2b47e77f-985e-40cc-9e4c-9a6c26f3f2cb",
    },
  },
  {
    id: "7",
    title: "Search Engine Mini",
    description:
      "Mesin pencari khusus artikel dan referensi kesehatan dengan kecepatan respons tinggi. Memanfaatkan algoritma indexing dan pencarian tingkat kemiripan (similarity search) melalui package Wosh pada backend Laravel, serta diintegrasikan dengan AI Chatbot pintar dari Chatbase.co untuk menjawab pertanyaan medis dasar secara langsung.",
    role: "Full Stack Developer",
    frontend: "React, Next.js, Tailwind CSS, TypeScript",
    backend: "Laravel, API Endpoint, Postman, Wosh, Chatbase.co, MySQL",
    artefactIcon: "/img/magnifying-glass-hourglass.webp",
    image: "/img/projects/p2.jpg",
    links: {
      github: "https://github.com/Putra-pkwl03/Search-Engine-Mini-Be.git",
    },
  },
  {
    id: "8",
    title: "EWS Risk Management",
    description:
      "Aplikasi Sistem Peringatan Dini dan Manajemen Risiko yang dirancang khusus untuk kebutuhan operasional Dinas Kesehatan Kabupaten Sleman. Memiliki fitur pencatatan dan evaluasi tingkat risiko operasional, sistem pengamanan login via JWT, serta notifikasi peringatan instan real-time yang terhubung langsung melalui WebSocket Pusher dan API email Gmail.",
    role: "Full Stack Developer",
    frontend: "React, Next.js, Tailwind CSS, Pusher",
    backend: "Laravel, API Endpoint, Postman, JWT, Pusher, Gmail API, MySQL",
    artefactIcon: "/img/warning-shield.webp",
    image: "/img/projects/p3.jpg",
    links: {
      github: "https://github.com/Putra-pkwl03/ews-risk-register-be.git",
    },
  },
  {
    id: "9",
    title: "Sistem Rekrutmen Karyawan",
    description:
      "Sistem E-Recruitment end-to-end yang dirancang untuk merampingkan alur perekrutan calon karyawan. Mencakup fitur manajemen lowongan kerja, pengiriman lamaran online, penilaian kualifikasi pelamar, serta otomatisasi pengiriman status kelulusan atau panggilan wawancara melalui integrasi Gmail API.",
    role: "Full Stack Developer",
    frontend: "React, Next.js, Tailwind CSS, TypeScript",
    backend: "Laravel, API Endpoint, Postman, JWT, Gmail API, MySQL",
    artefactIcon: "/img/quill-contract.webp",
    image: "/img/projects/p4.jpg",
    links: {
      github: "https://github.com/Putra-pkwl03/Recruitment-System-Be.git",
    },
  },
];

const ProjectCard = memo(({ project, onSelect }: { project: Project; onSelect: (id: string) => void }) => {
  return (
    <button
      type="button"
      onMouseEnter={() => sound.playHover?.()}
      onClick={() => {
        sound.playClick?.();
        onSelect(project.id);
      }}
      className="group relative cursor-pointer text-left rounded-xl border border-cyan-500/25 hover:border-cyan-400 bg-slate-900/80 hover:bg-slate-900 p-4 min-h-[140px] flex flex-col justify-between transition-all duration-200 overflow-hidden shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] focus:outline-none focus:ring-1 focus:ring-cyan-400"
    >
      {/* Background Icon */}
      <div
        className="absolute right-2 bottom-2 w-20 h-20 group-hover:opacity-20 group-hover:scale-110 transition-all duration-300 pointer-events-none bg-contain bg-no-repeat bg-right-bottom"
        style={{ backgroundImage: `url(${project.artefactIcon})` }}
      />

      <div className="relative z-10 space-y-2">
        <span className="inline-block text-[10px] font-mono font-semibold text-cyan-300 bg-cyan-950/90 border border-cyan-500/40 px-2.5 py-0.5 rounded-full">
          {project.role}
        </span>
        <h3 className="font-bold text-sm text-slate-100 font-sans group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug pr-16">
          {project.title}
        </h3>
      </div>

      <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-300 font-mono pt-2 border-t border-slate-800/80">
        <span className="font-medium">Detail Proyek</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </button>
  );
});
ProjectCard.displayName = "ProjectCard";

export function ProjectsSection() {
  const [searchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return PROJECTS_DATA;

    return PROJECTS_DATA.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.frontend.toLowerCase().includes(query) ||
        item.backend.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const selectedProject = useMemo(() => {
    return PROJECTS_DATA.find((p) => p.id === expandedId);
  }, [expandedId]);

  const handleSelectProject = useCallback((id: string) => {
    setExpandedId(id);
  }, []);

  return (
    <div className="space-y-3 text-slate-200 h-full flex flex-col justify-between select-none">
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar min-h-[360px]">
        {expandedId && selectedProject ? (
          <div className="bg-slate-900/80 rounded-xl border border-cyan-500/30 p-4 space-y-4 text-xs text-left">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <button
                type="button"
                onMouseEnter={() => sound.playHover?.()}
                onClick={() => {
                  sound.playClick?.();
                  setExpandedId(null);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-300 hover:text-cyan-200 bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/40 px-3 py-1.5 rounded-lg transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
              <h3 className="font-bold text-sm sm:text-base text-cyan-300 font-mono truncate max-w-[200px] sm:max-w-[320px]">
                {selectedProject.title}
              </h3>
            </div>

            {/* Container Gambar */}
            <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden border border-cyan-500/30 bg-slate-950 flex items-center justify-center p-2">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {selectedProject.description}
            </p>

            <div className="space-y-2 bg-slate-950/80 p-3 rounded-lg border border-cyan-500/20 text-xs font-mono">
              <div className="flex items-start gap-2">
                <UserCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p><strong className="text-cyan-300">Role:</strong> {selectedProject.role}</p>
              </div>

              {selectedProject.frontend !== "-" && (
                <div className="flex items-start gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p><strong className="text-cyan-300">Frontend / UI:</strong> {selectedProject.frontend}</p>
                </div>
              )}

              <div className="flex items-start gap-2">
                <Server className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p><strong className="text-cyan-300">Backend & Infrastructure:</strong> {selectedProject.backend}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 flex-wrap">
              {selectedProject.links.demo && (
                <a
                  href={selectedProject.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover?.()}
                  onClick={() => sound.playClick?.()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-400 hover:text-slate-950 border border-emerald-400/60 text-emerald-300 rounded-lg text-xs font-mono font-bold transition-all duration-200 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                >
                  <Globe className="w-4 h-4" />
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {selectedProject.links.github && (
                <a
                  href={selectedProject.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover?.()}
                  onClick={() => sound.playClick?.()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-400 hover:text-slate-950 border border-cyan-400/60 text-cyan-300 rounded-lg text-xs font-mono font-bold transition-all duration-200 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                >
                  <GithubIcon />
                  <span>Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 items-start">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={handleSelectProject}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}