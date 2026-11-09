import { useMemo } from 'react';
import * as THREE from 'three';
import { createMarbleTexture } from '../../utils/proceduralTextures';

export default function ReceptionDesk() {
  const marbleTexture = useMemo(() => createMarbleTexture(), []);

  // Marble PBR Material
  const marbleMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: marbleTexture,
        roughness: 0.12,
        metalness: 0.05,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
        reflectivity: 0.8,
      }),
    [marbleTexture]
  );

  // Dark Brushed Bronze/Charcoal Accent Material
  const darkMetalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1917',
        metalness: 0.8,
        roughness: 0.3,
      }),
    []
  );

  // Warm Gold Emissive Trim / LED
  const goldLedMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ffc83b',
        emissive: '#d4af37',
        emissiveIntensity: 1.8,
        roughness: 0.2,
      }),
    []
  );

  return (
    <group position={[0, 0, -2.8]}>
      {/* ================= Main Marble Front Reception Counter ================= */}
      {/* Front Curved / Faceted Counter Section */}
      <mesh position={[0, 0.55, 0]} material={marbleMaterial} castShadow receiveShadow>
        <boxGeometry args={[3.4, 1.1, 0.9]} />
      </mesh>

      {/* Counter Top Slab (slightly overhanging with polished chamfer) */}
      <mesh position={[0, 1.12, 0]} material={marbleMaterial} castShadow>
        <boxGeometry args={[3.5, 0.06, 0.98]} />
      </mesh>

      {/* Recessed Plinth Base */}
      <mesh position={[0, 0.05, 0]} material={darkMetalMaterial} receiveShadow>
        <boxGeometry args={[3.2, 0.1, 0.78]} />
      </mesh>

      {/* Warm Golden LED Underglow Strip */}
      <mesh position={[0, 0.1, 0.42]} material={goldLedMaterial}>
        <boxGeometry args={[3.2, 0.02, 0.02]} />
      </mesh>
      {/* Subtle point light under desk casting golden glow on floor */}
      <pointLight position={[0, 0.12, 0.5]} color="#ffb834" intensity={1.2} distance={2.5} />

      {/* Recessed Accent Inset on Front Panel */}
      <mesh position={[0, 0.6, 0.46]} material={darkMetalMaterial}>
        <boxGeometry args={[2.2, 0.015, 0.01]} />
      </mesh>

      {/* ================= Desk Workstation Accessories ================= */}
      {/* Modern Sleek Minimalist Terminal / Monitor */}
      <group position={[0.4, 1.15, -0.05]}>
        {/* Stand base */}
        <mesh position={[0, 0.01, 0]} material={darkMetalMaterial}>
          <cylinderGeometry args={[0.08, 0.08, 0.015, 20]} />
        </mesh>
        {/* Stand arm */}
        <mesh position={[0, 0.15, -0.02]} rotation={[-0.15, 0, 0]} material={darkMetalMaterial}>
          <boxGeometry args={[0.025, 0.28, 0.015]} />
        </mesh>
        {/* Monitor Screen Frame */}
        <mesh position={[0, 0.28, 0]} rotation={[-0.08, 0, 0]} material={darkMetalMaterial}>
          <boxGeometry args={[0.62, 0.38, 0.015]} />
        </mesh>
        {/* Screen Display Glowing Face */}
        <mesh position={[0, 0.28, 0.009]} rotation={[-0.08, 0, 0]}>
          <planeGeometry args={[0.6, 0.36]} />
          <meshBasicMaterial color="#7ec8e3" />
        </mesh>
      </group>

      {/* Sleek Receptionist Keyboard & Mouse */}
      <mesh position={[0.4, 1.155, 0.22]} material={darkMetalMaterial}>
        <boxGeometry args={[0.36, 0.008, 0.12]} />
      </mesh>
      <mesh position={[0.7, 1.155, 0.22]} material={darkMetalMaterial}>
        <boxGeometry args={[0.06, 0.01, 0.09]} />
      </mesh>

      {/* Designer Minimalist Desk Succulent Planter */}
      <group position={[-0.9, 1.15, 0.1]}>
        {/* Ceramic bowl */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.08, 0.06, 0.1, 20]} />
          <meshStandardMaterial color="#22242a" roughness={0.3} />
        </mesh>
        {/* Succulent leaves */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[0, 0.12, 0]}
            rotation={[0.35, (i * Math.PI * 2) / 5, 0.2]}
          >
            <coneGeometry args={[0.03, 0.08, 6]} />
            <meshStandardMaterial color="#428752" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* Reception Desk Sign / Nameplate */}
      <mesh position={[-0.25, 1.165, 0.28]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.18, 0.05, 0.01]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}
