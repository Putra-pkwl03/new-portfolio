export interface MenuItem {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  stepColor: string;
  label: string;
  icon: string;
  description: string;
  tags: string[];
}

export interface TechItem {
  label: string;
  pos: [number, number, number];
  icon: string;
}

export const MENU_3D: MenuItem[] = [
  { 
    id: "about", 
    position: [3.1, 1.2, 0.6],
    rotation: [0, -0.25, 0], 
    color: "#059669",
    stepColor: "#27a275",
    label: "TENTANG SAYA", 
    icon: "👤",
    description: "Full-stack Developer dengan fokus pada pengalaman Web 3D interaktif dan performa arsitektur modern.",
    tags: ["React", "Three.js", "TypeScript", "Tailwind"]
  },
  { 
    id: "projects", 
    position: [2.5, 0.4, 1.2],
    rotation: [-0.04, -0.25, 0], 
    color: "#0284c7",
    stepColor: "#39949b",
    label: "PROYEK", 
    icon: "⬡",
    description: "Portofolio proyek unggulan mencakup platform SaaS, integrasi 3D interaktif, dan aplikasi enterprise.",
    tags: ["Next.js", "Django", "PostgreSQL", "Supabase"]
  },
  { 
    id: "pengalaman", 
    position: [1.9, -0.4, 1.8],
    rotation: [-0.06, -0.25, 0], 
    color: "#7c3aed",
    stepColor: "#8254b0",
    label: "PENGALAMAN", 
    icon: "🎖️",
    description: "Sertifikasi profesional dalam pengembangan cloud, arsitektur perangkat lunak, dan keamanan sistem.",
    tags: ["AWS Certified", "CyberSecurity", "Agile Scrum"]
  },
  { 
    id: "certs", 
    position: [1.2, -1.2, 2.4],
    rotation: [-0.08, -0.25, 0], 
    color: "#d97706",
    stepColor: "#a38a4a",
    label: "SERTIFIKASI", 
    icon: "✈️",
    description: "Terbuka untuk kolaborasi proyek, kesempatan kerja, atau konsultasi arsitektur sistem modern.",
    tags: ["Email", "LinkedIn", "GitHub", "WhatsApp"]
  },
];

export const TECH_STACK: TechItem[] = [
  { label: "Next.js", pos: [-2.8, 1.4, 0.2], icon: "N" },
  { label: "TypeScript", pos: [-2.8, 0.5, 0.4], icon: "TS" },
  { label: "Django", pos: [-2.8, -0.4, 0.6], icon: "≈" },
  { label: "Node.js", pos: [0.5, 0.4, 2.0], icon: "JS" },
  { label: "PostgreSQL", pos: [1.2, 1.1, 1.4], icon: "🐘" },
  { label: "Laravel", pos: [1.1, 1.8, 0.8], icon: "L" },
];