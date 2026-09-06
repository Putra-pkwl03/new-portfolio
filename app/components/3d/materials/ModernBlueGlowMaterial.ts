import { extend, ThreeElement } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

export const ModernBlueGlowMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStrength: 5.5,
  },
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform float uColorStrength;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      float glow = pow(0.85 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 1.5);
      vec3 colorA = vec3(0.0, 0.5, 1.0);
      vec3 colorB = vec3(0.0, 1.0, 0.95);
      
      float pulse = 0.85 + 0.15 * sin(uTime * 3.0);
      vec3 finalColor = mix(colorA, colorB, sin(vUv.x * 6.28 + uTime) * 0.5 + 0.5);
      
      gl_FragColor = vec4(finalColor * uColorStrength * pulse + vec3(glow * 1.5), 0.98);
    }
  `
);

extend({ ModernBlueGlowMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    modernBlueGlowMaterial: ThreeElement<typeof THREE.ShaderMaterial> & {
      uTime?: number;
      uColorStrength?: number;
      transparent?: boolean;
      opacity?: number;
    };
  }
}