import { useMemo } from 'react';
import * as THREE from 'three';

export default function OfficeFurniture() {
  // Charcoal leather / dark upholstery material
  const sofaMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1c22',
        roughness: 0.65,
        metalness: 0.1,
      }),
    []
  );

  // Gold accent cushion material
  const goldPillowMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c5a059',
        roughness: 0.5,
        metalness: 0.2,
      }),
    []
  );

  // Smoked glass coffee table material
  const smokedGlassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#1c1f26',
        transmission: 0.75,
        roughness: 0.08,
        ior: 1.5,
        transparent: true,
        opacity: 0.9,
      }),
    []
  );

  // Brushed brass table frame material
  const brassMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#d4af37',
        metalness: 0.9,
        roughness: 0.25,
      }),
    []
  );

  // Rug material
  const rugMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#12141a',
        roughness: 0.95,
      }),
    []
  );

  return (
    <group position={[3.1, 0, -2.4]}>
      {/* ================= Designer Area Rug ================= */}
      <mesh position={[0, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]} material={rugMaterial} receiveShadow>
        <planeGeometry args={[2.8, 3.2]} />
      </mesh>
      {/* Rug subtle golden border trim */}
      <mesh position={[0, 0.009, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.34, 4]} />
        <meshBasicMaterial color="#352e22" />
      </mesh>

      {/* ================= Modern Sectional Sofa ================= */}
      <group position={[0.2, 0, 0.2]}>
        {/* Main Seat Cushion */}
        <mesh position={[0, 0.25, 0]} material={sofaMaterial} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.32, 0.9]} />
        </mesh>

        {/* Backrest */}
        <mesh position={[0.82, 0.52, 0]} material={sofaMaterial} castShadow>
          <boxGeometry args={[0.22, 0.54, 0.9]} />
        </mesh>

        {/* Left Armrest */}
        <mesh position={[0, 0.42, 0.48]} material={sofaMaterial} castShadow>
          <boxGeometry args={[1.8, 0.38, 0.2]} />
        </mesh>

        {/* Right Armrest */}
        <mesh position={[0, 0.42, -0.48]} material={sofaMaterial} castShadow>
          <boxGeometry args={[1.8, 0.38, 0.2]} />
        </mesh>

        {/* Sofa Slim Metal Legs */}
        {[
          [-0.8, 0.05, 0.4],
          [0.8, 0.05, 0.4],
          [-0.8, 0.05, -0.4],
          [0.8, 0.05, -0.4],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]} material={brassMaterial}>
            <cylinderGeometry args={[0.018, 0.012, 0.12, 12]} />
          </mesh>
        ))}

        {/* Throw Cushions */}
        <mesh position={[0.62, 0.46, 0.18]} rotation={[0.1, -0.2, 0.15]} material={goldPillowMaterial} castShadow>
          <boxGeometry args={[0.15, 0.28, 0.28]} />
        </mesh>
        <mesh position={[0.62, 0.46, -0.18]} rotation={[-0.1, -0.1, -0.15]} material={sofaMaterial} castShadow>
          <boxGeometry args={[0.14, 0.28, 0.28]} />
        </mesh>
      </group>

      {/* ================= Smoked Glass Coffee Table ================= */}
      <group position={[-0.75, 0, 0.15]}>
        {/* Circular Smoked Glass Top */}
        <mesh position={[0, 0.38, 0]} material={smokedGlassMaterial} castShadow>
          <cylinderGeometry args={[0.48, 0.48, 0.025, 32]} />
        </mesh>

        {/* Brass Beveled Rim */}
        <mesh position={[0, 0.38, 0]} material={brassMaterial}>
          <torusGeometry args={[0.48, 0.01, 12, 32]} />
        </mesh>

        {/* Cross Brass Base / Legs */}
        <mesh position={[0, 0.19, 0]} material={brassMaterial}>
          <cylinderGeometry args={[0.018, 0.018, 0.38, 16]} />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[0, 0, 0]} material={brassMaterial}>
          <boxGeometry args={[0.6, 0.015, 0.04]} />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[0, Math.PI / 2, 0]} material={brassMaterial}>
          <boxGeometry args={[0.6, 0.015, 0.04]} />
        </mesh>

        {/* Architectural Magazine / Book on Table */}
        <mesh position={[0.08, 0.405, 0.05]} rotation={[0, 0.35, 0]}>
          <boxGeometry args={[0.22, 0.015, 0.16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        <mesh position={[0.06, 0.418, 0.07]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[0.18, 0.012, 0.14]} />
          <meshStandardMaterial color="#c5a059" roughness={0.3} metalness={0.2} />
        </mesh>
      </group>

      {/* Modern Floor Lamp next to Lounge */}
      <group position={[0.9, 0, -1.0]}>
        <mesh position={[0, 0.02, 0]} material={brassMaterial}>
          <cylinderGeometry args={[0.18, 0.2, 0.03, 24]} />
        </mesh>
        <mesh position={[0, 0.95, 0]} material={brassMaterial}>
          <cylinderGeometry args={[0.012, 0.012, 1.9, 16]} />
        </mesh>
        <mesh position={[-0.12, 1.88, 0]} rotation={[0, 0, 0.25]} material={brassMaterial}>
          <cylinderGeometry args={[0.012, 0.012, 0.35, 16]} />
        </mesh>
        {/* Lamp Shade */}
        <mesh position={[-0.24, 1.78, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.18, 0.22, 24, 1, true]} />
          <meshStandardMaterial color="#1a1c22" side={THREE.DoubleSide} metalness={0.6} />
        </mesh>
        {/* Warm Golden Bulb light */}
        <pointLight position={[-0.24, 1.72, 0]} color="#ffb74d" intensity={1.5} distance={3.2} decay={2} />
      </group>
    </group>
  );
}
