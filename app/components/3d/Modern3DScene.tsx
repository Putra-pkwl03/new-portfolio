"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";

import { MainIsland } from "./MainIsland";
import { TechStackBadges } from "./TechStackBadges";
import { StepMenu3D } from "./StepMenu3D";
import { DecorIsland } from "./DecorIsland";
import { CameraRig } from "./CameraRig";

interface Modern3DSceneProps {
  activeMenu: string | null;
  hoveredMenu?: string | null;
  isLoading: boolean;
  onSelectMenu: (menu: string | null) => void;
  onHoverMenu?: (menu: string | null) => void;
  onLoaded?: () => void;
  className?: string;
}

function Interactive3DHub({
  activeMenu,
  hoveredMenu: externalHoveredMenu,
  isLoading,
  onSelectMenu,
  onHoverMenu: externalOnHoverMenu,
  isMobile,
  isTablet,
}: {
  activeMenu: string | null;
  hoveredMenu?: string | null;
  isLoading: boolean;
  onSelectMenu: (menu: string | null) => void;
  onHoverMenu?: (menu: string | null) => void;
  isMobile: boolean;
  isTablet: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const [internalHoveredMenu, setInternalHoveredMenu] = useState<string | null>(null);
  const currentHoveredMenu = externalHoveredMenu !== undefined ? externalHoveredMenu : internalHoveredMenu;

  const handleHover = (id: string | null) => {
    setInternalHoveredMenu(id);
    if (externalOnHoverMenu) externalOnHoverMenu(id);
  };

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const isMenuActive = Boolean(activeMenu);

    let targetPosX = 1.1;
    let targetPosY = -0.5;
    let targetScale = 0.72;

    if (isMobile) {
      targetPosX = 0;
      targetPosY = -0.8;
      targetScale = 0.32;
    } else if (isTablet) {
      targetPosX = 0.55;
      targetPosY = -0.3;
      targetScale = 0.28;
    }

    // Jika isLoading (hasEntered masih false), sembunyikan seluruh pulau & badge di posisi y: -15
    if (isLoading) {
      targetPosY = -15;
      targetScale = 0.001;
    } else if (isMenuActive) {
      targetPosX = isMobile ? 0 : 12;
      targetScale = 0;
    }

    easing.damp(groupRef.current.position, "x", targetPosX, 0.5, delta);
    easing.damp(groupRef.current.position, "y", targetPosY, 0.6, delta);
    
    easing.damp(groupRef.current.scale, "x", targetScale, 0.5, delta);
    easing.damp(groupRef.current.scale, "y", targetScale, 0.5, delta);
    easing.damp(groupRef.current.scale, "z", targetScale, 0.5, delta);

    const { x, y } = state.pointer;
    const factor = isMobile ? 0.2 : isTablet ? 0.5 : 1;
    const targetRotX = (0.08 - y * 0.35) * factor;
    const targetRotY = (-0.2 + x * 0.45) * factor;
    const targetRotZ = (x * 0.1) * factor;

    easing.damp(groupRef.current.rotation, "x", targetRotX, 0.25, delta);
    easing.damp(groupRef.current.rotation, "y", targetRotY, 0.25, delta);
    easing.damp(groupRef.current.rotation, "z", targetRotZ, 0.25, delta);
  });

  return (
    <group ref={groupRef} position={[0, -15, 0]} rotation={[0.08, -0.2, 0]}>
      <MainIsland />
      {/* Jika TechStackBadges punya prop terpisah untuk visibility, bisa di-pass juga */}
      <TechStackBadges activeMenu={activeMenu} />
      <StepMenu3D
        activeMenu={activeMenu}
        onSelectMenu={onSelectMenu}
        onHoverMenu={handleHover}
      />
      <DecorIsland hoveredMenu={currentHoveredMenu} activeMenu={activeMenu} />
    </group>
  );
}

export default function Modern3DScene({
  activeMenu,
  hoveredMenu,
  isLoading,
  onSelectMenu,
  onHoverMenu,
  onLoaded,
  className = "",
}: Modern3DSceneProps) {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [eventTarget, setEventTarget] = useState<HTMLElement | undefined>(undefined);

  useEffect(() => {
    setEventTarget(document.body);

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={setContainerRef} className={`relative w-full h-full bg-[#030816] overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(14,165,233,0.12),_transparent_70%)] pointer-events-none" />

      <Canvas
        eventSource={eventTarget || containerRef || undefined}
        eventPrefix="client"
        camera={{ 
          position: [0, 0, isMobile ? 7.5 : isTablet ? 7.0 : 6.5],
          fov: 45 
        }}
        dpr={[1, 2]}
        className="w-full h-full"
        onCreated={() => {
          if (onLoaded) onLoaded();
        }}
      >
        <ambientLight intensity={1.6} />
        <directionalLight position={[10, 10, 8]} intensity={3.5} color="#38bdf8" />
        <pointLight position={[-5, -5, -5]} intensity={2.5} color="#0284c7" />
        <pointLight position={[2.0, 1.0, 1.0]} intensity={5.0} color="#00f0ff" />

        <CameraRig isMenuActive={!!activeMenu} isLoading={isLoading} />

        <Suspense fallback={null}>
          <Interactive3DHub
            activeMenu={activeMenu}
            hoveredMenu={hoveredMenu}
            isLoading={isLoading}
            onSelectMenu={onSelectMenu}
            onHoverMenu={onHoverMenu}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </Suspense>

        <OrbitControls
          enableZoom={!isMobile && !isTablet}
          enablePan={false}
          enabled={!activeMenu && !isLoading}
          rotateSpeed={isMobile || isTablet ? 0.3 : 0.5}
          maxDistance={12}
          minDistance={3}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={0.1}
        />
      </Canvas>
    </div>
  );
}