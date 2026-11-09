import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraController({ isInside, mouseRef }) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 1.55, 5.2));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.35, 0));

  useFrame((_, delta) => {
    const mouseX = mouseRef?.current?.x || 0;
    const mouseY = mouseRef?.current?.y || 0;

    let targetX, targetY, targetZ;
    let lookX, lookY, lookZ;

    if (!isInside) {
      // Outside perspective: standing before the glass entrance
      targetX = mouseX * 0.45;
      targetY = 1.55 + mouseY * 0.2;
      targetZ = 5.2;

      lookX = mouseX * 0.3;
      lookY = 1.35 + mouseY * 0.15;
      lookZ = 0;
    } else {
      // Inside perspective: forward through the entrance inside the reception lobby
      targetX = -0.15 + mouseX * 0.6;
      targetY = 1.45 + mouseY * 0.25;
      targetZ = 0.2;

      lookX = mouseX * 0.8;
      lookY = 1.4 + mouseY * 0.35;
      lookZ = -4.5;
    }

    const targetPosVec = new THREE.Vector3(targetX, targetY, targetZ);
    const targetLookVec = new THREE.Vector3(lookX, lookY, lookZ);

    // Smoothly damp camera position & look-at vector
    currentPos.current.lerp(targetPosVec, Math.min(1, delta * 3.2));
    currentLookAt.current.lerp(targetLookVec, Math.min(1, delta * 3.5));

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
