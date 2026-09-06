"use client";

import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

export function CameraRig({
  isMenuActive,
  isLoading,
}: {
  isMenuActive: boolean;
  isLoading: boolean;
}) {
  useFrame((state, delta) => {
    // 1. Tentukan posisi target [X, Y, Z]
    // Saat loading: Mundur jauh [0, 0, 14]
    // Saat menu aktif: Geser X ke -1.4 (dorong 3D ke kanan), Y naik ke 0.4, Z di 5.2
    // Saat normal: Kamera di tengah [0, 0, 5.8]
    const targetPosition: [number, number, number] = isLoading
      ? [0, 0, 14]
      : isMenuActive
      ? [-1.4, 0.4, 5.2]
      : [0, 0, 5.8];

    // 2. Efek Parallax halus mengikuti pergerakan kursor mouse
    const mouseX = state.pointer.x * 0.25;
    const mouseY = state.pointer.y * 0.25;

    // 3. Smooth damp seluruh sumbu (X, Y, Z) sekaligus
    easing.damp3(
      state.camera.position,
      [
        targetPosition[0] + mouseX,
        targetPosition[1] + mouseY,
        targetPosition[2],
      ],
      0.45,
      delta
    );

    // 4. Fokuskan kamera selalu ke arah tengah scene
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}