"use client";

import { useState } from "react";
import { Float, MeshWobbleMaterial, Text } from "@react-three/drei";
import { MENU_3D } from "./constants/sceneData";
import { sound } from "@/app/lib/sound"; // 1. Import utility audio

interface StepMenu3DProps {
  activeMenu: string | null;
  onSelectMenu: (menu: string | null) => void;
  onHoverMenu?: (menu: string | null) => void;
}

export function StepMenu3D({ activeMenu, onSelectMenu, onHoverMenu }: StepMenu3DProps) {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [clickedMenu, setClickedMenu] = useState<string | null>(null);

  return (
    <>
      {MENU_3D.map((card) => {
        const isActive = activeMenu === card.id;
        const isHovered = hoveredMenu === card.id;
        const isClicked = clickedMenu === card.id;

        let cardScale = isActive ? 0.92 : 1.0;
        if (isHovered) cardScale = 1.08;
        if (isClicked) cardScale = 0.88;

        return (
          <Float key={card.id} speed={1.2} rotationIntensity={0.05} floatIntensity={0.2}>
            <group
              position={card.position}
              rotation={card.rotation}
              scale={[cardScale, cardScale, cardScale]}
            >
              {/* Landasan Pod */}
              <mesh position={[0, -0.22, 0]}>
                <boxGeometry args={[1.45, 0.22, 0.85]} />
                <meshStandardMaterial
                  color={card.stepColor}
                  emissive={card.stepColor}
                  emissiveIntensity={isActive ? 0.8 : 0.4}
                  roughness={0.2}
                  metalness={0.7}
                />
              </mesh>

              {/* Badan Tombol Utama */}
              <mesh
                position={[0, 0.12, 0]}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  sound.playHover(); // 2. Suara saat kursor masuk/hover tombol 3D
                  setHoveredMenu(card.id);
                  if (onHoverMenu) onHoverMenu(card.id);
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={(e) => {
                  e.stopPropagation();
                  setHoveredMenu(null);
                  if (onHoverMenu) onHoverMenu(null);
                  document.body.style.cursor = "auto";
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  sound.playClick(); // 3. Suara efek "tekan" awal
                  setClickedMenu(card.id);
                }}
                onPointerUp={(e) => {
                  e.stopPropagation();
                  sound.playOpenPortal(); // 4. Suara utama saat menu 3D resmi dipilih/dibuka
                  setClickedMenu(null);
                  onSelectMenu(isActive ? null : card.id);
                }}
              >
                <boxGeometry args={[1.35, 0.58, 0.12]} />
                <MeshWobbleMaterial
                  color={card.color}
                  factor={isClicked || isActive ? 0.12 : 0.04}
                  speed={1.2}
                  roughness={0.15}
                  metalness={0.8}
                  transparent
                  opacity={isActive ? 0.8 : 0.95}
                />
              </mesh>

              {/* Label & Icon */}
              <group position={[0, 0.12, 0.08]}>
                <Text
                  position={[-0.42, 0, 0]}
                  fontSize={0.17}
                  color="#ffffff"
                  anchorX="center"
                  anchorY="middle"
                >
                  {card.icon}
                </Text>

                <Text
                  position={[-0.18, 0, 0]}
                  fontSize={0.105}
                  color="#ffffff"
                  anchorX="left"
                  anchorY="middle"
                  fontWeight="bold"
                  letterSpacing={0.06}
                >
                  {card.label}
                </Text>
              </group>
            </group>
          </Float>
        );
      })}
    </>
  );
}