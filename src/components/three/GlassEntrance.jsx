import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

export default function GlassEntrance({ isOpen, onToggleDoor, setHoveringDoor, isInside }) {
  const leftDoorGroup = useRef();
  const rightDoorGroup = useRef();
  const leftHandleRef = useRef();
  const rightHandleRef = useRef();

  // Glass PBR material
  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        transmission: 0.94,
        opacity: 1,
        transparent: true,
        roughness: 0.04,
        ior: 1.52,
        reflectivity: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
      }),
    []
  );

  // Black metal frame material
  const frameMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#15171c',
        metalness: 0.85,
        roughness: 0.35,
      }),
    []
  );

  // Warm golden metallic handles material
  const handleMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#d4af37',
        metalness: 0.92,
        roughness: 0.22,
        emissive: '#4d3b0c',
        emissiveIntensity: 0.2,
      }),
    []
  );

  // Handle door opening animation with smooth easing
  useFrame((_, delta) => {
    // Target rotation: open = ~75 deg (1.3 radians), closed = 0
    const targetLeft = isOpen ? -1.35 : 0;
    const targetRight = isOpen ? 1.35 : 0;

    if (leftDoorGroup.current && rightDoorGroup.current) {
      leftDoorGroup.current.rotation.y = THREE.MathUtils.damp(
        leftDoorGroup.current.rotation.y,
        targetLeft,
        4.0,
        delta
      );
      rightDoorGroup.current.rotation.y = THREE.MathUtils.damp(
        rightDoorGroup.current.rotation.y,
        targetRight,
        4.0,
        delta
      );
    }
  });

  const handlePointerEnter = () => {
    setHoveringDoor(true);
    if (leftHandleRef.current && rightHandleRef.current) {
      gsap.to([leftHandleRef.current.scale, rightHandleRef.current.scale], {
        x: 1.08,
        y: 1.02,
        z: 1.08,
        duration: 0.25,
      });
    }
  };

  const handlePointerLeave = () => {
    setHoveringDoor(false);
    if (leftHandleRef.current && rightHandleRef.current) {
      gsap.to([leftHandleRef.current.scale, rightHandleRef.current.scale], {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.25,
      });
    }
  };

  const doorWidth = 1.05;
  const doorHeight = 3.0;
  const doorThickness = 0.04;
  const frameThickness = 0.06;

  return (
    <group position={[0, 0, 2.0]}>
      {/* ================= Outer Architectural Doorway Frame ================= */}
      {/* Top Header Beam */}
      <mesh position={[0, doorHeight + frameThickness / 2, 0]} material={frameMaterial}>
        <boxGeometry args={[3.8, frameThickness, 0.12]} />
      </mesh>

      {/* Floor Threshold Bar */}
      <mesh position={[0, frameThickness / 4, 0]} material={frameMaterial}>
        <boxGeometry args={[3.8, frameThickness / 2, 0.14]} />
      </mesh>

      {/* Outer Left Post */}
      <mesh position={[-1.9, doorHeight / 2, 0]} material={frameMaterial}>
        <boxGeometry args={[frameThickness, doorHeight + frameThickness, 0.12]} />
      </mesh>

      {/* Outer Right Post */}
      <mesh position={[1.9, doorHeight / 2, 0]} material={frameMaterial}>
        <boxGeometry args={[frameThickness, doorHeight + frameThickness, 0.12]} />
      </mesh>

      {/* Left Sidelight Fixed Glass Panel */}
      <mesh position={[-1.48, doorHeight / 2, 0]} material={glassMaterial}>
        <boxGeometry args={[0.78, doorHeight, 0.02]} />
      </mesh>
      {/* Left Sidelight Mullion */}
      <mesh position={[-1.09, doorHeight / 2, 0]} material={frameMaterial}>
        <boxGeometry args={[0.04, doorHeight, 0.08]} />
      </mesh>

      {/* Right Sidelight Fixed Glass Panel */}
      <mesh position={[1.48, doorHeight / 2, 0]} material={glassMaterial}>
        <boxGeometry args={[0.78, doorHeight, 0.02]} />
      </mesh>
      {/* Right Sidelight Mullion */}
      <mesh position={[1.09, doorHeight / 2, 0]} material={frameMaterial}>
        <boxGeometry args={[0.04, doorHeight, 0.08]} />
      </mesh>

      {/* Transom Glass Above Doors */}
      <mesh position={[0, doorHeight + 0.35, 0]} material={glassMaterial}>
        <boxGeometry args={[3.8, 0.6, 0.02]} />
      </mesh>
      <mesh position={[0, doorHeight + 0.65, 0]} material={frameMaterial}>
        <boxGeometry args={[3.8, 0.05, 0.12]} />
      </mesh>

      {/* ================= Left Glass Door (Hinged at x = -1.05) ================= */}
      <group
        ref={leftDoorGroup}
        position={[-doorWidth, 0, 0]}
        onClick={onToggleDoor}
        onPointerOver={handlePointerEnter}
        onPointerOut={handlePointerLeave}
        cursor="pointer"
      >
        {/* Door Glass Leaf (offsets from hinge at x=0 to x=+doorWidth) */}
        <mesh position={[doorWidth / 2, doorHeight / 2, 0]} material={glassMaterial}>
          <boxGeometry args={[doorWidth - 0.01, doorHeight - 0.02, doorThickness]} />
        </mesh>

        {/* Black Perimeter Border on Door */}
        <group position={[doorWidth / 2, doorHeight / 2, 0]}>
          {/* Top rail */}
          <mesh position={[0, doorHeight / 2 - 0.02, 0]} material={frameMaterial}>
            <boxGeometry args={[doorWidth, 0.04, doorThickness + 0.01]} />
          </mesh>
          {/* Bottom rail */}
          <mesh position={[0, -doorHeight / 2 + 0.04, 0]} material={frameMaterial}>
            <boxGeometry args={[doorWidth, 0.08, doorThickness + 0.01]} />
          </mesh>
          {/* Left stile */}
          <mesh position={[-doorWidth / 2 + 0.015, 0, 0]} material={frameMaterial}>
            <boxGeometry args={[0.03, doorHeight, doorThickness + 0.01]} />
          </mesh>
          {/* Right meeting stile */}
          <mesh position={[doorWidth / 2 - 0.015, 0, 0]} material={frameMaterial}>
            <boxGeometry args={[0.03, doorHeight, doorThickness + 0.01]} />
          </mesh>
        </group>

        {/* Left Long Vertical Metallic Handle */}
        <group ref={leftHandleRef} position={[doorWidth - 0.1, doorHeight / 2 - 0.1, 0]}>
          {/* Front handle rod */}
          <mesh position={[0, 0, 0.06]} material={handleMaterial}>
            <cylinderGeometry args={[0.014, 0.014, 1.35, 24]} />
          </mesh>
          {/* Back handle rod */}
          <mesh position={[0, 0, -0.06]} material={handleMaterial}>
            <cylinderGeometry args={[0.014, 0.014, 1.35, 24]} />
          </mesh>
          {/* Top Standoff connector */}
          <mesh position={[0, 0.45, 0]} rotation={[Math.PI / 2, 0, 0]} material={handleMaterial}>
            <cylinderGeometry args={[0.012, 0.012, 0.14, 16]} />
          </mesh>
          {/* Bottom Standoff connector */}
          <mesh position={[0, -0.45, 0]} rotation={[Math.PI / 2, 0, 0]} material={handleMaterial}>
            <cylinderGeometry args={[0.012, 0.012, 0.14, 16]} />
          </mesh>
        </group>
      </group>

      {/* ================= Right Glass Door (Hinged at x = +1.05) ================= */}
      <group
        ref={rightDoorGroup}
        position={[doorWidth, 0, 0]}
        onClick={onToggleDoor}
        onPointerOver={handlePointerEnter}
        onPointerOut={handlePointerLeave}
        cursor="pointer"
      >
        {/* Door Glass Leaf (offsets from hinge at x=0 to x=-doorWidth) */}
        <mesh position={[-doorWidth / 2, doorHeight / 2, 0]} material={glassMaterial}>
          <boxGeometry args={[doorWidth - 0.01, doorHeight - 0.02, doorThickness]} />
        </mesh>

        {/* Black Perimeter Border on Door */}
        <group position={[-doorWidth / 2, doorHeight / 2, 0]}>
          {/* Top rail */}
          <mesh position={[0, doorHeight / 2 - 0.02, 0]} material={frameMaterial}>
            <boxGeometry args={[doorWidth, 0.04, doorThickness + 0.01]} />
          </mesh>
          {/* Bottom rail */}
          <mesh position={[0, -doorHeight / 2 + 0.04, 0]} material={frameMaterial}>
            <boxGeometry args={[doorWidth, 0.08, doorThickness + 0.01]} />
          </mesh>
          {/* Right stile */}
          <mesh position={[doorWidth / 2 - 0.015, 0, 0]} material={frameMaterial}>
            <boxGeometry args={[0.03, doorHeight, doorThickness + 0.01]} />
          </mesh>
          {/* Left meeting stile */}
          <mesh position={[-doorWidth / 2 + 0.015, 0, 0]} material={frameMaterial}>
            <boxGeometry args={[0.03, doorHeight, doorThickness + 0.01]} />
          </mesh>
        </group>

        {/* Right Long Vertical Metallic Handle */}
        <group ref={rightHandleRef} position={[-doorWidth + 0.1, doorHeight / 2 - 0.1, 0]}>
          {/* Front handle rod */}
          <mesh position={[0, 0, 0.06]} material={handleMaterial}>
            <cylinderGeometry args={[0.014, 0.014, 1.35, 24]} />
          </mesh>
          {/* Back handle rod */}
          <mesh position={[0, 0, -0.06]} material={handleMaterial}>
            <cylinderGeometry args={[0.014, 0.014, 1.35, 24]} />
          </mesh>
          {/* Top Standoff connector */}
          <mesh position={[0, 0.45, 0]} rotation={[Math.PI / 2, 0, 0]} material={handleMaterial}>
            <cylinderGeometry args={[0.012, 0.012, 0.14, 16]} />
          </mesh>
          {/* Bottom Standoff connector */}
          <mesh position={[0, -0.45, 0]} rotation={[Math.PI / 2, 0, 0]} material={handleMaterial}>
            <cylinderGeometry args={[0.012, 0.012, 0.14, 16]} />
          </mesh>
        </group>
      </group>

      {/* Floating 3D Interaction Tag Indicator (when outside & doors closed) */}
      {!isInside && !isOpen && (
        <Html position={[0, 1.45, 0.08]} center distanceFactor={7}>
          <div className="door-beacon-tag" onClick={onToggleDoor}>
            <span className="door-beacon-pulse"></span>
            <span>CLICK TO ENTER</span>
          </div>
        </Html>
      )}
    </group>
  );
}
