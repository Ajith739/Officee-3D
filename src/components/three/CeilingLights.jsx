import { useMemo } from 'react';
import * as THREE from 'three';

export default function CeilingLights() {
  const fixtureRingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1c24',
        metalness: 0.85,
        roughness: 0.25,
      }),
    []
  );

  const ledGlowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#fff3db',
      }),
    []
  );

  // Grid coordinates for circular ceiling lights
  const lightPositions = [
    // Entrance foyer line (z = 1.2)
    { pos: [-2.0, 3.64, 1.2], hasLight: true },
    { pos: [0, 3.64, 1.2], hasLight: true },
    { pos: [2.0, 3.64, 1.2], hasLight: true },

    // Mid reception line (z = -1.2)
    { pos: [-2.4, 3.64, -1.2], hasLight: true },
    { pos: [0, 3.64, -1.2], hasLight: true },
    { pos: [2.4, 3.64, -1.2], hasLight: true },

    // Above reception desk line (z = -3.2)
    { pos: [-2.2, 3.64, -3.2], hasLight: true },
    { pos: [0, 3.64, -3.2], hasLight: true },
    { pos: [2.2, 3.64, -3.2], hasLight: true },

    // Background workstation area line (z = -5.8)
    { pos: [-2.5, 3.64, -5.8], hasLight: false },
    { pos: [0, 3.64, -5.8], hasLight: true },
    { pos: [2.5, 3.64, -5.8], hasLight: false },
  ];

  return (
    <group>
      {lightPositions.map((item, idx) => (
        <group key={idx} position={item.pos}>
          {/* Circular Recessed Bezel Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]} material={fixtureRingMaterial}>
            <torusGeometry args={[0.26, 0.03, 12, 32]} />
          </mesh>

          {/* LED Diffuser Disc */}
          <mesh rotation={[Math.PI / 2, 0, 0]} material={ledGlowMaterial}>
            <circleGeometry args={[0.24, 32]} />
          </mesh>

          {/* Warm Golden Point Light Source */}
          {item.hasLight && (
            <pointLight
              position={[0, -0.05, 0]}
              color="#ffc368"
              intensity={1.8}
              distance={7.0}
              decay={2}
            />
          )}
        </group>
      ))}

      {/* Modern Suspended Architectural Halo Chandelier above Central Reception */}
      <group position={[0, 3.1, -2.6]}>
        {/* Slender suspension cables */}
        <mesh position={[-0.9, 0.28, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 0.56, 8]} />
          <meshBasicMaterial color="#ffffff" opacity={0.4} transparent />
        </mesh>
        <mesh position={[0.9, 0.28, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 0.56, 8]} />
          <meshBasicMaterial color="#ffffff" opacity={0.4} transparent />
        </mesh>

        {/* Outer Golden Halo Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.05, 0.02, 16, 48]} />
          <meshStandardMaterial
            color="#d4af37"
            metalness={0.92}
            roughness={0.2}
            emissive="#5c4510"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Inner Warm LED Strip */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.04, 0.008, 12, 48]} />
          <meshBasicMaterial color="#ffeec9" />
        </mesh>

        {/* Ambient Halo Glow */}
        <pointLight position={[0, -0.05, 0]} color="#ffe0a3" intensity={2.2} distance={5.5} decay={2} />
      </group>
    </group>
  );
}
