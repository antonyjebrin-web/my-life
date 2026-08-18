import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;
    setEnabled(true);

    // Hide the native cursor
    document.documentElement.classList.add('custom-cursor-active');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let glowX = mouseX;
    let glowY = mouseY;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Detect hovering over interactive elements
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [role="button"], input, select, textarea, label, [data-cursor-hover]'
      );
      setHoveringInteractive(!!interactive);
    };

    const onMouseDown = () => setPressed(true);
    const onMouseUp = () => setPressed(false);
    const onMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };
    const onMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (glowRef.current) glowRef.current.style.opacity = '1';
    };

    const animate = () => {
      // Dot follows instantly
      dotX += (mouseX - dotX) * 0.9;
      dotY += (mouseY - dotY) * 0.9;

      // Glow trails behind smoothly
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Glow trail */}
      <div
        ref={glowRef}
        className={`cursor-glow ${hoveringInteractive ? 'cursor-glow--hover' : ''} ${
          pressed ? 'cursor-glow--pressed' : ''
        }`}
        aria-hidden="true"
      />
      {/* Dot */}
      <div
        ref={dotRef}
        className={`cursor-dot ${hoveringInteractive ? 'cursor-dot--hover' : ''} ${
          pressed ? 'cursor-dot--pressed' : ''
        }`}
        aria-hidden="true"
      />
    </>
  );
}