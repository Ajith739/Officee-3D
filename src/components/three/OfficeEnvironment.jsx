import { useMemo } from 'react';
import * as THREE from 'three';
import {
  createConcreteFloorTexture,
  createWoodSlatTexture,
  createCitySkylineTexture,
  createMonitorTexture,
  createGracewellWallLogoTexture,
} from '../../utils/proceduralTextures';

export default function OfficeEnvironment() {
  // Textures
  const floorTexture = useMemo(() => createConcreteFloorTexture(), []);
  const ceilingTexture = useMemo(() => createWoodSlatTexture(), []);
  const skylineTexture = useMemo(() => createCitySkylineTexture(), []);
  const monitorTexture1 = useMemo(() => createMonitorTexture(0), []);
  const monitorTexture2 = useMemo(() => createMonitorTexture(1), []);
  const logoTexture = useMemo(() => createGracewellWallLogoTexture(), []);

  // Floor PBR Material
  const floorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: floorTexture,
        roughness: 0.22,
        metalness: 0.45,
      }),
    [floorTexture]
  );

  // Ceiling Material
  const ceilingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: ceilingTexture,
        roughness: 0.75,
        metalness: 0.1,
      }),
    [ceilingTexture]
  );

  // Architectural Dark Charcoal Wall Material
  const darkWallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0e1014',
        roughness: 0.85,
        metalness: 0.15,
      }),
    []
  );

  // Column Material
  const columnMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#161920',
        roughness: 0.6,
        metalness: 0.25,
      }),
    []
  );

  // Workstation Desk Material
  const deskMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1d24',
        roughness: 0.5,
        metalness: 0.2,
      }),
    []
  );

  return (
    <group>
      {/* ================= 1. Polished Concrete Reflective Floor ================= */}
      <mesh position={[0, -0.01, -2.5]} rotation={[-Math.PI / 2, 0, 0]} material={floorMaterial} receiveShadow>
        <planeGeometry args={[26, 32]} />
      </mesh>

      {/* ================= 2. Modern Wooden Slatted Ceiling ================= */}
      <mesh position={[0, 3.65, -2.5]} rotation={[Math.PI / 2, 0, 0]} material={ceilingMaterial}>
        <planeGeometry args={[26, 32]} />
      </mesh>

      {/* Ceiling Architectural Cove Light Strips */}
      <mesh position={[-5.8, 3.63, -2.5]}>
        <boxGeometry args={[0.08, 0.02, 28]} />
        <meshBasicMaterial color="#ffe6b0" />
      </mesh>
      <mesh position={[5.8, 3.63, -2.5]}>
        <boxGeometry args={[0.08, 0.02, 28]} />
        <meshBasicMaterial color="#ffe6b0" />
      </mesh>

      {/* ================= 3. Feature Wall with Gracewell Branding (z = -6.4) ================= */}
      <group position={[0, 0, -6.4]}>
        {/* Main Acoustic Slat Wall Backing */}
        <mesh position={[0, 1.82, 0]} material={darkWallMaterial} receiveShadow>
          <boxGeometry args={[12.5, 3.65, 0.18]} />
        </mesh>

        {/* Vertical Fluted Accent Mullions on Feature Wall */}
        {[-3.6, -1.8, 1.8, 3.6].map((x, i) => (
          <mesh key={i} position={[x, 1.82, 0.1]} material={columnMaterial}>
            <boxGeometry args={[0.04, 3.65, 0.04]} />
          </mesh>
        ))}

        {/* Gracewell Technologies Wall Brand Sign Badge */}
        <group position={[0, 2.35, 0.11]}>
          {/* Backing plaque with warm halo backlighting */}
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[4.2, 1.4]} />
            <meshBasicMaterial color="#0c0e14" />
          </mesh>
          {/* Backlight glow quad */}
          <mesh position={[0, 0, -0.02]}>
            <planeGeometry args={[4.4, 1.6]} />
            <meshBasicMaterial color="#d4af37" transparent opacity={0.2} />
          </mesh>

          {/* Gracewell Brand Logo Canvas Texture Mesh */}
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[4.0, 1.35]} />
            <meshBasicMaterial map={logoTexture} transparent />
          </mesh>

          {/* Focused Golden Spotlights pointed at Logo */}
          <pointLight position={[0, 0.8, 0.8]} color="#ffe29c" intensity={2.8} distance={4.5} decay={2} />
        </group>
      </group>

      {/* ================= 4. Interior Glass Partition & Workstations (z = -8 to -12) ================= */}
      {/* Interior Glass Partition Wall */}
      <group position={[0, 0, -8.0]}>
        {/* Glass panel left */}
        <mesh position={[-3.2, 1.82, 0]}>
          <boxGeometry args={[4.8, 3.65, 0.03]} />
          <meshPhysicalMaterial
            transmission={0.88}
            roughness={0.1}
            ior={1.5}
            transparent
            opacity={0.85}
            color="#ffffff"
          />
        </mesh>
        {/* Glass panel right */}
        <mesh position={[3.2, 1.82, 0]}>
          <boxGeometry args={[4.8, 3.65, 0.03]} />
          <meshPhysicalMaterial
            transmission={0.88}
            roughness={0.1}
            ior={1.5}
            transparent
            opacity={0.85}
            color="#ffffff"
          />
        </mesh>
        {/* Center Opening Doorway Mullions */}
        <mesh position={[-0.8, 1.82, 0]} material={columnMaterial}>
          <boxGeometry args={[0.06, 3.65, 0.1]} />
        </mesh>
        <mesh position={[0.8, 1.82, 0]} material={columnMaterial}>
          <boxGeometry args={[0.06, 3.65, 0.1]} />
        </mesh>
      </group>

      {/* Background Workstations (Desks & Glowing Monitors) */}
      {/* Left Workstation */}
      <group position={[-2.8, 0, -10.2]}>
        {/* Desk surface */}
        <mesh position={[0, 0.72, 0]} material={deskMaterial} castShadow>
          <boxGeometry args={[2.2, 0.05, 0.9]} />
        </mesh>
        {/* Desk legs */}
        <mesh position={[-1.0, 0.36, 0]} material={columnMaterial}>
          <boxGeometry args={[0.06, 0.72, 0.8]} />
        </mesh>
        <mesh position={[1.0, 0.36, 0]} material={columnMaterial}>
          <boxGeometry args={[0.06, 0.72, 0.8]} />
        </mesh>

        {/* Dual Monitors Left */}
        <mesh position={[-0.42, 1.08, -0.15]} rotation={[0, 0.15, 0]}>
          <boxGeometry args={[0.7, 0.44, 0.02]} />
          <meshBasicMaterial map={monitorTexture1} />
        </mesh>
        <mesh position={[0.42, 1.08, -0.15]} rotation={[0, -0.15, 0]}>
          <boxGeometry args={[0.7, 0.44, 0.02]} />
          <meshBasicMaterial map={monitorTexture2} />
        </mesh>

        {/* Glowing screen light */}
        <pointLight position={[0, 1.1, 0.1]} color="#8ae3ff" intensity={1.0} distance={2.5} />

        {/* Ergonomic Office Chair */}
        <mesh position={[0, 0.5, 0.55]} material={darkWallMaterial}>
          <boxGeometry args={[0.45, 0.5, 0.45]} />
        </mesh>
      </group>

      {/* Right Workstation */}
      <group position={[2.8, 0, -10.2]}>
        <mesh position={[0, 0.72, 0]} material={deskMaterial} castShadow>
          <boxGeometry args={[2.2, 0.05, 0.9]} />
        </mesh>
        <mesh position={[-1.0, 0.36, 0]} material={columnMaterial}>
          <boxGeometry args={[0.06, 0.72, 0.8]} />
        </mesh>
        <mesh position={[1.0, 0.36, 0]} material={columnMaterial}>
          <boxGeometry args={[0.06, 0.72, 0.8]} />
        </mesh>

        {/* Dual Monitors Right */}
        <mesh position={[-0.42, 1.08, -0.15]} rotation={[0, 0.15, 0]}>
          <boxGeometry args={[0.7, 0.44, 0.02]} />
          <meshBasicMaterial map={monitorTexture2} />
        </mesh>
        <mesh position={[0.42, 1.08, -0.15]} rotation={[0, -0.15, 0]}>
          <boxGeometry args={[0.7, 0.44, 0.02]} />
          <meshBasicMaterial map={monitorTexture1} />
        </mesh>

        <pointLight position={[0, 1.1, 0.1]} color="#ffd285" intensity={1.0} distance={2.5} />

        <mesh position={[0, 0.5, 0.55]} material={darkWallMaterial}>
          <boxGeometry args={[0.45, 0.5, 0.45]} />
        </mesh>
      </group>

      {/* ================= 5. Panoramic Exterior Windows & City Skyline (z = -13.2) ================= */}
      {/* City Skyline Horizon Backdrop */}
      <mesh position={[0, 3.2, -13.2]}>
        <planeGeometry args={[24, 10]} />
        <meshBasicMaterial map={skylineTexture} />
      </mesh>

      {/* Panoramic Window Mullions */}
      {[-7, -3.5, 0, 3.5, 7].map((x, i) => (
        <mesh key={i} position={[x, 1.82, -12.9]} material={columnMaterial}>
          <boxGeometry args={[0.08, 3.65, 0.15]} />
        </mesh>
      ))}
      <mesh position={[0, 2.2, -12.9]} material={columnMaterial}>
        <boxGeometry args={[20, 0.08, 0.15]} />
      </mesh>

      {/* ================= 6. Architectural Structural Columns ================= */}
      {/* Left Front Column */}
      <mesh position={[-4.8, 1.82, 0.8]} material={columnMaterial} castShadow>
        <boxGeometry args={[0.55, 3.65, 0.55]} />
      </mesh>
      {/* Right Front Column */}
      <mesh position={[4.8, 1.82, 0.8]} material={columnMaterial} castShadow>
        <boxGeometry args={[0.55, 3.65, 0.55]} />
      </mesh>
      {/* Left Rear Column */}
      <mesh position={[-4.8, 1.82, -4.8]} material={columnMaterial} castShadow>
        <boxGeometry args={[0.55, 3.65, 0.55]} />
      </mesh>
      {/* Right Rear Column */}
      <mesh position={[4.8, 1.82, -4.8]} material={columnMaterial} castShadow>
        <boxGeometry args={[0.55, 3.65, 0.55]} />
      </mesh>

      {/* Outer Side Walls */}
      <mesh position={[-6.2, 1.82, -2.5]} material={darkWallMaterial}>
        <boxGeometry args={[0.2, 3.65, 24]} />
      </mesh>
      <mesh position={[6.2, 1.82, -2.5]} material={darkWallMaterial}>
        <boxGeometry args={[0.2, 3.65, 24]} />
      </mesh>
    </group>
  );
}
