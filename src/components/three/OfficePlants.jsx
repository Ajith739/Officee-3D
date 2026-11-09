import { useMemo } from 'react';
import * as THREE from 'three';

export default function OfficePlants() {
  // Deep lush green leaf material
  const leafMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#295437',
        roughness: 0.38,
        metalness: 0.06,
        side: THREE.DoubleSide,
      }),
    []
  );

  // Lighter tender green leaf material for highlights
  const youngLeafMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3d784d',
        roughness: 0.32,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
    []
  );

  // Matte black architectural planter ceramic material
  const planterMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#15171b',
        roughness: 0.4,
        metalness: 0.3,
      }),
    []
  );

  // Soil material
  const soilMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1e1814',
        roughness: 0.9,
      }),
    []
  );

  // Organic stem material
  const stemMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#344534',
        roughness: 0.6,
      }),
    []
  );

  return (
    <group>
      {/* ================= Large Left Entrance Plant (x = -2.6, z = 0.8) ================= */}
      <group position={[-2.6, 0, 0.8]}>
        {/* Tall Modern Fluted Planter */}
        <mesh position={[0, 0.45, 0]} material={planterMaterial} castShadow>
          <cylinderGeometry args={[0.34, 0.24, 0.9, 28]} />
        </mesh>
        <mesh position={[0, 0.9, 0]} material={soilMaterial}>
          <cylinderGeometry args={[0.32, 0.32, 0.04, 24]} />
        </mesh>

        {/* Plant Stem 1 */}
        <mesh position={[0, 1.25, 0]} rotation={[0.08, 0, 0.1]} material={stemMaterial}>
          <cylinderGeometry args={[0.02, 0.035, 0.7, 10]} />
        </mesh>
        {/* Plant Stem 2 */}
        <mesh position={[-0.05, 1.3, -0.05]} rotation={[-0.1, 0, -0.15]} material={stemMaterial}>
          <cylinderGeometry args={[0.018, 0.03, 0.8, 10]} />
        </mesh>
        {/* Plant Stem 3 */}
        <mesh position={[0.06, 1.2, 0.04]} rotation={[0.15, 0, -0.08]} material={stemMaterial}>
          <cylinderGeometry args={[0.016, 0.025, 0.65, 10]} />
        </mesh>

        {/* Fiddle-leaf broad sculptural foliage leaves */}
        {[
          { pos: [0.15, 1.6, 0.12], rot: [0.35, 0.4, -0.4], scale: [0.45, 0.7, 0.02] },
          { pos: [-0.18, 1.55, -0.1], rot: [-0.3, -0.6, 0.5], scale: [0.42, 0.65, 0.02] },
          { pos: [0.05, 1.8, -0.15], rot: [-0.5, 0.2, 0.2], scale: [0.48, 0.75, 0.02] },
          { pos: [-0.12, 1.85, 0.12], rot: [0.45, -0.3, -0.2], scale: [0.44, 0.68, 0.02] },
          { pos: [0.22, 1.4, -0.08], rot: [-0.2, 0.8, -0.5], scale: [0.4, 0.6, 0.02] },
          { pos: [-0.2, 1.35, 0.18], rot: [0.5, -0.8, 0.3], scale: [0.38, 0.58, 0.02] },
          { pos: [0, 2.05, 0], rot: [0.1, 0.1, 0], scale: [0.42, 0.65, 0.02] },
        ].map((leaf, idx) => (
          <mesh
            key={idx}
            position={leaf.pos}
            rotation={leaf.rot}
            material={idx % 2 === 0 ? leafMaterial : youngLeafMaterial}
            castShadow
          >
            {/* Elliptical broad leaf */}
            <sphereGeometry args={[1, 16, 12]} />
            {/* Scale into a flattened broad leaf blade */}
          </mesh>
        ))}

        {/* Warm Golden Uplight Spotlight beneath the Plant */}
        <pointLight position={[0, 0.95, 0]} color="#ffc107" intensity={0.9} distance={2.5} />
      </group>

      {/* ================= Large Right Entrance Plant (x = 2.6, z = 0.8) ================= */}
      <group position={[2.6, 0, 0.8]}>
        {/* Tall Architectural Planter */}
        <mesh position={[0, 0.45, 0]} material={planterMaterial} castShadow>
          <cylinderGeometry args={[0.34, 0.24, 0.9, 28]} />
        </mesh>
        <mesh position={[0, 0.9, 0]} material={soilMaterial}>
          <cylinderGeometry args={[0.32, 0.32, 0.04, 24]} />
        </mesh>

        {/* Stem structure */}
        <mesh position={[0, 1.3, 0]} rotation={[-0.08, 0, -0.12]} material={stemMaterial}>
          <cylinderGeometry args={[0.02, 0.035, 0.8, 10]} />
        </mesh>
        <mesh position={[0.05, 1.25, 0.05]} rotation={[0.12, 0, 0.1]} material={stemMaterial}>
          <cylinderGeometry args={[0.018, 0.03, 0.7, 10]} />
        </mesh>

        {/* Leaves */}
        {[
          { pos: [-0.15, 1.62, 0.1], rot: [0.35, -0.4, 0.4], scale: [0.44, 0.68, 0.02] },
          { pos: [0.18, 1.58, -0.12], rot: [-0.3, 0.6, -0.5], scale: [0.46, 0.7, 0.02] },
          { pos: [-0.06, 1.82, -0.14], rot: [-0.45, -0.2, -0.2], scale: [0.48, 0.72, 0.02] },
          { pos: [0.14, 1.88, 0.1], rot: [0.4, 0.3, 0.25], scale: [0.42, 0.65, 0.02] },
          { pos: [0, 2.08, 0], rot: [0.15, -0.1, 0], scale: [0.4, 0.62, 0.02] },
        ].map((leaf, idx) => (
          <mesh
            key={idx}
            position={leaf.pos}
            rotation={leaf.rot}
            material={idx % 2 === 0 ? leafMaterial : youngLeafMaterial}
            castShadow
          >
            <sphereGeometry args={[1, 16, 12]} />
          </mesh>
        ))}

        <pointLight position={[0, 0.95, 0]} color="#ffc107" intensity={0.9} distance={2.5} />
      </group>

      {/* ================= Interior Plant (x = -4.2, z = -4.5) ================= */}
      <group position={[-4.2, 0, -4.5]}>
        <mesh position={[0, 0.35, 0]} material={planterMaterial} castShadow>
          <cylinderGeometry args={[0.28, 0.2, 0.7, 24]} />
        </mesh>
        <mesh position={[0, 0.7, 0]} material={soilMaterial}>
          <cylinderGeometry args={[0.26, 0.26, 0.03, 20]} />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={i}
            position={[Math.cos(i * 1.5) * 0.1, 1.1 + i * 0.15, Math.sin(i * 1.5) * 0.1]}
            rotation={[0.3, i * 1.5, -0.2]}
            material={leafMaterial}
          >
            <sphereGeometry args={[0.35, 12, 10]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
