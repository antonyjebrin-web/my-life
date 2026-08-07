// Performance + accessibility helpers for 3D scenes and animations.

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Heuristic: low-end / mobile devices should get lighter 3D (lower dpr, fewer particles).
export const isLowPoweredDevice = (): boolean => {
  if (typeof window === 'undefined') return true;
  const cores = navigator.hardwareConcurrency ?? 4;
  const lowMem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8;
  const mobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  return mobile && (cores <= 4 || lowMem <= 4);
};

export const shouldRender3D = (): boolean => {
  if (prefersReducedMotion()) return false;
  return true;
};

// Preferred device pixel ratio, clamped for performance.
export const getDpr = (): [number, number] => {
  if (isLowPoweredDevice()) return [1, 1.5];
  return [1, 2];
};
