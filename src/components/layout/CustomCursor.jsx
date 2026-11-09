import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor({ isHoveringDoor, isInside }) {
  const cursorRef = useRef(null);
  const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor-follower ${isHoveringDoor ? 'hovering-door' : ''}`}
      style={{
        display: window.matchMedia('(pointer: coarse)').matches ? 'none' : 'flex',
      }}
    >
      <div className="cursor-ring">
        <div className="cursor-dot"></div>
      </div>
      {!isInside && isHoveringDoor && (
        <span className="cursor-label">CLICK TO ENTER</span>
      )}
    </div>
  );
}
