import OfficeEnvironment from './OfficeEnvironment';
import ReceptionDesk from './ReceptionDesk';
import GlassEntrance from './GlassEntrance';
import OfficeFurniture from './OfficeFurniture';
import OfficePlants from './OfficePlants';
import CeilingLights from './CeilingLights';
import DigitalGlobe from './DigitalGlobe';
import CameraController from './CameraController';

export default function Experience({
  isDoorOpen,
  isInside,
  onToggleDoor,
  setHoveringDoor,
  mouseRef,
}) {
  return (
    <>
      {/* Subtle architectural depth fog */}
      <fog attach="fog" args={['#07080c', 12, 28]} />

      {/* Camera Controller */}
      <CameraController isInside={isInside} mouseRef={mouseRef} />

      {/* Global Ambient & Hemisphere Lighting */}
      <ambientLight color="#fff0d6" intensity={0.65} />
      <hemisphereLight
        skyColor="#ffe5bf"
        groundColor="#0a0c10"
        intensity={0.45}
      />

      {/* Directional Key Architectural Light */}
      <directionalLight
        position={[5, 7, 5]}
        color="#fff1db"
        intensity={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />

      {/* Soft Secondary Fill Light */}
      <directionalLight position={[-6, 4, 2]} color="#a0c4ff" intensity={0.5} />

      {/* 3D Scene Components */}
      <OfficeEnvironment />
      <ReceptionDesk />
      <OfficeFurniture />
      <OfficePlants />
      <CeilingLights />
      <DigitalGlobe />

      {/* Foreground Interactive Glass Doors */}
      <GlassEntrance
        isOpen={isDoorOpen}
        onToggleDoor={onToggleDoor}
        setHoveringDoor={setHoveringDoor}
        isInside={isInside}
      />
    </>
  );
}
