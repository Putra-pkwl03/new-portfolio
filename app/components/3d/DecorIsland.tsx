"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MENU_3D } from "./constants/sceneData";

interface DecorIslandProps {
  hoveredMenu?: string | null;
  activeMenu?: string | null;
}

export function DecorIsland({ hoveredMenu, activeMenu }: DecorIslandProps) {
  // Array ref untuk mengontrol material semua rumpun daun bersamaan
  const foliageRefs = useRef<THREE.MeshStandardMaterial[]>([]);
  const pointLightRef = useRef<THREE.PointLight>(null!);
  const treeGroupRef = useRef<THREE.Group>(null!);

  // Cek menu yang sedang aktif atau di-hover
  const targetMenuId = activeMenu || hoveredMenu;
  const activeCard = MENU_3D.find(
    (item) => String(item.id) === String(targetMenuId)
  );

  useFrame((_, delta) => {
    const isInteracting = Boolean(activeCard);
    const isActive = Boolean(activeMenu);

    // Tingkat intensitas lebih tinggi jika menu sedang aktif/diklik
    const targetEmissiveIntensity = isActive ? 5.0 : isInteracting ? 3.5 : 0.4;
    const targetLightIntensity = isActive ? 22.0 : isInteracting ? 14.0 : 2.0;

    const defaultColorHex = "#024b7a";
    const targetColorHex = activeCard
      ? activeCard.stepColor
      : defaultColorHex;
    const targetColor = new THREE.Color(targetColorHex);

    // 1. Update SEMUA bagian dedaunan sekaligus
    foliageRefs.current.forEach((mat) => {
      if (mat) {
        mat.emissiveIntensity = THREE.MathUtils.lerp(
          mat.emissiveIntensity,
          targetEmissiveIntensity,
          delta * 8
        );
        mat.emissive.lerp(targetColor, delta * 8);
        mat.color.lerp(targetColor, delta * 8);
      }
    });

    // 2. Update lampu sorot
    if (pointLightRef.current) {
      pointLightRef.current.intensity = THREE.MathUtils.lerp(
        pointLightRef.current.intensity,
        targetLightIntensity,
        delta * 8
      );
      pointLightRef.current.color.lerp(targetColor, delta * 8);
    }

    // 3. Efek rotasi/denyut halus pada pohon saat ada interaksi
    if (treeGroupRef.current) {
      const targetScale = isActive ? 1.08 : 1.0;
      treeGroupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        delta * 6
      );
    }
  });

  // Helper untuk menyimpan ref material ke dalam array
  const addMaterialRef = (el: THREE.MeshStandardMaterial | null) => {
    if (el && !foliageRefs.current.includes(el)) {
      foliageRefs.current.push(el);
    }
  };

  return (
    <group ref={treeGroupRef} position={[3.6, 2.3, 0.0]}>
      {/* Platform */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.9, 0.5, 0.6, 8]} />
        <meshStandardMaterial color="#0f2b48" roughness={0.7} />
      </mesh>

      {/* --- BATANG POHON ORGANIS --- */}
      <group position={[0, 0.1, 0]}>
        {/* Batang Utama */}
        <mesh position={[0, 0.25, 0]} rotation={[0.05, 0, -0.05]}>
          <cylinderGeometry args={[0.06, 0.14, 0.7, 7]} />
          <meshStandardMaterial color="#334155" roughness={0.9} />
        </mesh>
        {/* Cabang Kecil */}
        <mesh position={[0.1, 0.4, 0]} rotation={[0, 0, -0.6]}>
          <cylinderGeometry args={[0.03, 0.05, 0.3, 5]} />
          <meshStandardMaterial color="#334155" roughness={0.9} />
        </mesh>
      </group>

      {/* --- TAJUK DEDAUNAN LOW-POLY --- */}
      <group position={[0, 0.65, 0]}>
        {/* Rumpun Tengah Utama */}
        <mesh position={[0, 0.2, 0]}>
          <dodecahedronGeometry args={[0.38, 1]} />
          <meshStandardMaterial
            ref={addMaterialRef}
            color="#024b7a"
            emissive="#024b7a"
            emissiveIntensity={0.4}
            flatShading
            roughness={0.4}
          />
        </mesh>

        {/* Rumpun Kiri Bawah */}
        <mesh position={[-0.22, 0.05, 0.1]}>
          <dodecahedronGeometry args={[0.26, 1]} />
          <meshStandardMaterial
            ref={addMaterialRef}
            color="#024b7a"
            emissive="#024b7a"
            emissiveIntensity={0.4}
            flatShading
            roughness={0.4}
          />
        </mesh>

        {/* Rumpun Kanan Bawah */}
        <mesh position={[0.22, 0.08, -0.05]}>
          <dodecahedronGeometry args={[0.28, 1]} />
          <meshStandardMaterial
            ref={addMaterialRef}
            color="#024b7a"
            emissive="#024b7a"
            emissiveIntensity={0.4}
            flatShading
            roughness={0.4}
          />
        </mesh>

        {/* Rumpun Atas Puncak */}
        <mesh position={[0.02, 0.38, 0]}>
          <dodecahedronGeometry args={[0.22, 1]} />
          <meshStandardMaterial
            ref={addMaterialRef}
            color="#024b7a"
            emissive="#024b7a"
            emissiveIntensity={0.4}
            flatShading
            roughness={0.4}
          />
        </mesh>
      </group>

      {/* Lampu Sorot Lokal Pohon */}
      <pointLight
        ref={pointLightRef}
        position={[0, 0.8, 0.4]}
        intensity={2.0}
        distance={5}
        decay={1.5}
        color="#024b7a"
      />
    </group>
  );
}