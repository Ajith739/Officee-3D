import { useState, Suspense, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from '../components/three/Experience';
import Header from '../components/layout/Header';
import HeroContent from '../components/layout/HeroContent';
import HeroFooter from '../components/layout/HeroFooter';
import CustomCursor from '../components/layout/CustomCursor';
import { useCameraAnimation } from '../hooks/useCameraAnimation';

function LoadingScreen() {
  return (
    <div className="scene-loading-overlay">
      <div className="scene-loading-spinner"></div>
      <span className="loading-text">Loading Gracewell 3D Experience</span>
    </div>
  );
}

export default function Hero() {
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [isInside, setIsInside] = useState(false);
  const [isHoveringDoor, setIsHoveringDoor] = useState(false);

  const { mouseRef } = useCameraAnimation(isInside);

  // Enter Office Action
  const handleEnterOffice = useCallback(() => {
    setIsDoorOpen(true);
    setIsInside(true);
  }, []);

  // Exit Office Action
  const handleExitOffice = useCallback(() => {
    setIsDoorOpen(false);
    setIsInside(false);
  }, []);

  // Toggle Action
  const handleToggleDoor = useCallback(() => {
    if (!isInside) {
      handleEnterOffice();
    } else {
      handleExitOffice();
    }
  }, [isInside, handleEnterOffice, handleExitOffice]);

  // Scroll to explore interaction
  useEffect(() => {
    let scrollTimeout;
    const handleWheel = (e) => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 30 && !isInside) {
          handleEnterOffice();
        } else if (e.deltaY < -30 && isInside) {
          handleExitOffice();
        }
      }, 50);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [isInside, handleEnterOffice, handleExitOffice]);

  return (
    <div className="hero-wrapper">
      {/* Cinematic Vignette Overlays */}
      <div className="cinematic-vignette" />
      <div className="cinematic-noise" />

      {/* Header Navigation */}
      <Header />

      {/* 3D Canvas */}
      <div className="canvas-container">
        <Suspense fallback={<LoadingScreen />}>
          <Canvas
            shadows
            camera={{
              position: [0, 1.55, 5.2],
              fov: 48,
              near: 0.1,
              far: 60,
            }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: 'high-performance',
            }}
          >
            <Experience
              isDoorOpen={isDoorOpen}
              isInside={isInside}
              onToggleDoor={handleToggleDoor}
              setHoveringDoor={setIsHoveringDoor}
              mouseRef={mouseRef}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Hero Typography & Content (Left Side) */}
      <HeroContent
        isInside={isInside}
        onEnterOffice={handleEnterOffice}
        onExitOffice={handleExitOffice}
      />

      {/* Bottom Exploration Status & Controls */}
      <HeroFooter isInside={isInside} />

      {/* Custom Cursor Indicator */}
      <CustomCursor isHoveringDoor={isHoveringDoor} isInside={isInside} />
    </div>
  );
}
