import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DigitalGlobe() {
  const globeGroupRef = useRef();
  const outerRingRef = useRef();
  const innerCoreRef = useRef();
  const particlesRef = useRef();

  useFrame((state, delta) => {
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += delta * 0.45;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.3;
      outerRingRef.current.rotation.x += delta * 0.15;
    }
    if (innerCoreRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.08;
      innerCoreRef.current.scale.set(pulse, pulse, pulse);
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.2;
    }
  });

  // Hub nodes on the globe surface
  const hubNodes = [
    [0.45, 0.3, 0.25],
    [-0.35, 0.4, 0.3],
    [0.1, -0.2, 0.55],
    [-0.5, 0.1, -0.3],
    [0.3, -0.4, -0.35],
    [-0.2, -0.45, 0.35],
    [0.55, 0.05, -0.2],
  ];

  return (
    <group position={[-3.3, 0, -2.6]}>
      {/* ================= Modern Pedestal Plinth ================= */}
      {/* Cylindrical Base */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.32, 0.38, 0.9, 32]} />
        <meshStandardMaterial color="#12141a" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Top Brushed Metal Ring */}
      <mesh position={[0, 0.91, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.04, 32]} />
        <meshStandardMaterial color="#1e222d" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Cyan Light Emitter Ring */}
      <mesh position={[0, 0.935, 0]}>
        <ringGeometry args={[0.2, 0.28, 32]} />
        <meshBasicMaterial color="#00d2ff" side={THREE.DoubleSide} />
      </mesh>

      {/* Hologram projector glass lens */}
      <mesh position={[0, 0.94, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.02, 32]} />
        <meshStandardMaterial
          color="#00d2ff"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* ================= Digital Floating Holographic Globe ================= */}
      <group position={[0, 1.48, 0]}>
        {/* Soft Blue Holographic Point Light */}
        <pointLight color="#00d2ff" intensity={2.2} distance={3.8} decay={2} />

        {/* Continuous Rotating Globe Container */}
        <group ref={globeGroupRef}>
          {/* Main Wireframe Sphere */}
          <mesh>
            <sphereGeometry args={[0.42, 28, 20]} />
            <meshBasicMaterial color="#00d2ff" wireframe transparent opacity={0.65} />
          </mesh>

          {/* Latitude / Longitude accent rings */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.425, 0.005, 12, 48]} />
            <meshBasicMaterial color="#7ee7ff" />
          </mesh>
          <mesh rotation={[0, 0, 0]}>
            <torusGeometry args={[0.425, 0.005, 12, 48]} />
            <meshBasicMaterial color="#7ee7ff" />
          </mesh>

          {/* Glowing Hub Nodes */}
          {hubNodes.map(([x, y, z], idx) => (
            <mesh key={idx} position={[x, y, z]}>
              <sphereGeometry args={[0.025, 12, 12]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          ))}
        </group>

        {/* Inner Glowing Holographic Core */}
        <mesh ref={innerCoreRef}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshBasicMaterial color="#00e1ff" transparent opacity={0.35} />
        </mesh>

        {/* Orbiting Tech Ring 1 */}
        <group ref={outerRingRef} rotation={[0.4, 0.3, 0]}>
          <mesh>
            <torusGeometry args={[0.56, 0.006, 8, 64]} />
            <meshBasicMaterial color="#00b4d8" transparent opacity={0.7} />
          </mesh>
          {/* Orbiting Satellite Node */}
          <mesh position={[0.56, 0, 0]}>
            <boxGeometry args={[0.035, 0.035, 0.035]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Orbiting Tech Ring 2 (Polar Orbit) */}
        <mesh rotation={[1.1, 0.8, 0.4]}>
          <torusGeometry args={[0.62, 0.004, 8, 64]} />
          <meshBasicMaterial color="#90e0ef" transparent opacity={0.45} />
        </mesh>

        {/* Floating Data Ring / Particles */}
        <group ref={particlesRef}>
          {[...Array(16)].map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const r = 0.5 + Math.sin(i * 3) * 0.08;
            const y = Math.cos(i * 2) * 0.22;
            return (
              <mesh key={i} position={[Math.cos(angle) * r, y, Math.sin(angle) * r]}>
                <sphereGeometry args={[0.012, 8, 8]} />
                <meshBasicMaterial color="#48cae4" />
              </mesh>
            );
          })}
        </group>
      </group>
    </group>
  );
}
