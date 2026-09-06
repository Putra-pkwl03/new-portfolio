import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import "@/app/components/3d/materials/ModernBlueGlowMaterial";

export function MainIsland() {
  const portalShaderRef = useRef<THREE.ShaderMaterial & { uTime: number }>(null!);
  const ringMeshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    if (portalShaderRef.current) portalShaderRef.current.uTime = elapsedTime;
    if (ringMeshRef.current) ringMeshRef.current.rotation.z = elapsedTime * 0.15;
  });

  return (
    <group position={[-0.4, -0.2, -0.4]}>
      {/* Portal Ring */}
      <group position={[-0.4, 1.0, -1.2]}>
        <pointLight position={[0, 0, 0.2]} intensity={8.0} distance={5} color="#00ffff" />
        <mesh ref={ringMeshRef} position={[0, 0, 0]}>
          <torusGeometry args={[2.5, 0.38, 36, 120]} />
          <modernBlueGlowMaterial ref={portalShaderRef} uColorStrength={5.5} transparent opacity={0.98} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <torusGeometry args={[2.1, 0.08, 16, 100]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={6.0} />
        </mesh>
        <mesh position={[0, 0, -0.05]}>
          <ringGeometry args={[2.1, 3.1, 64]} />
          <meshBasicMaterial color="#00d8ff" transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, -0.15]}>
          <circleGeometry args={[2.45, 64]} />
          <meshBasicMaterial color="#020817" />
        </mesh>
      </group>

      {/* Meja Kerja */}
      <mesh position={[-0.4, -0.3, 0.1]}>
        <boxGeometry args={[2.2, 0.08, 1.1]} />
        <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Monitor */}
      <group position={[-0.4, 0.25, -0.15]}>
        <mesh>
          <cylinderGeometry args={[1.4, 1.4, 0.75, 32, 1, true, Math.PI * 0.7, Math.PI * 0.6]} />
          <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={2.2} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0.95, -0.05, 0.2]} rotation={[0, -0.5, 0]}>
          <planeGeometry args={[0.6, 0.6]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={2.0} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Karakter */}
      <group position={[-0.4, -0.05, 0.5]}>
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.7} />
        </mesh>
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.28, 0.35, 0.55, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </mesh>
      </group>

      {/* Kursi */}
      <mesh position={[-0.4, -0.28, 0.5]}>
        <boxGeometry args={[0.55, 0.7, 0.1]} />
        <meshStandardMaterial color="#0284c7" roughness={0.3} />
      </mesh>

      {/* Base Platform */}
      <mesh position={[-0.4, -1.1, 0.0]}>
        <cylinderGeometry args={[2.6, 2.1, 1.0, 16]} />
        <meshStandardMaterial color="#0f2b48" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Code Snippet Overlay */}
      <Html position={[-0.5, -1.45, 1.2]} center transform sprite={false} distanceFactor={4.2}>
        <div className="select-none pointer-events-none p-3.5 rounded-xl bg-slate-900/95 border border-cyan-400/60 backdrop-blur-md shadow-[0_0_25px_rgba(56,189,248,0.2)] font-mono text-[10px] text-cyan-300 min-w-[210px]">
          <div className="text-cyan-400 font-bold">const developer = &#123;</div>
          <div className="pl-3 text-slate-200">passion: <span className="text-sky-300">'Building Solutions'</span>,</div>
          <div className="pl-3 text-slate-200">focus: <span className="text-blue-300">'Clean Code'</span>,</div>
          <div className="pl-3 text-slate-200">goal: <span className="text-cyan-300">'Impact & Innovation'</span>,</div>
          <div className="text-cyan-400 font-bold">&#125;;</div>
        </div>
      </Html>
    </group>
  );
}