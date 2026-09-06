"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";
import { TECH_STACK } from "./constants/sceneData";

export function TechStackBadges({ activeMenu }: { activeMenu?: string | null }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Jika menu aktif: geser ke bawah (Y = -3) dan putar rotasi
    // Jika tidak ada menu aktif: kembalikan ke posisi awal (Y = 0)
    const targetY = activeMenu ? -3 : 0;
    const targetRotationY = activeMenu ? Math.PI : 0;
    const targetScale = activeMenu ? 0.001 : 1;

    easing.damp(groupRef.current.position, "y", targetY, 0.4, delta);
    easing.damp(groupRef.current.rotation, "y", targetRotationY, 0.5, delta);
    easing.damp(groupRef.current.scale, "x", targetScale, 0.3, delta);
    easing.damp(groupRef.current.scale, "y", targetScale, 0.3, delta);
    easing.damp(groupRef.current.scale, "z", targetScale, 0.3, delta);
  });

  return (
    <group ref={groupRef}>
      {TECH_STACK.map((tech, idx) => (
        <Float key={idx} speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
          <group position={tech.pos}>
            <Html center transform sprite={false} distanceFactor={5.0}>
              <div className="select-none pointer-events-none px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-400/60 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex items-center gap-2.5 text-white text-[11px] font-mono font-medium">
                <span className="w-5 h-5 rounded-md bg-cyan-950 flex items-center justify-center text-[10px] font-bold text-cyan-300 border border-cyan-400/50 shadow-inner">
                  {tech.icon}
                </span>
                {tech.label}
              </div>
            </Html>
          </group>
        </Float>
      ))}
    </group>
  );
}