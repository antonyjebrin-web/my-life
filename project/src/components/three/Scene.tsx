import { Suspense, lazy, type ReactNode } from 'react';
import { getDpr, shouldRender3D } from '@/lib/performance';

// Lazily load the R3F Canvas so the 3D bundle only loads when needed.
const Canvas = lazy(() =>
  import('@react-three/fiber').then((m) => ({ default: m.Canvas }))
);

type SafeCanvasProps = {
  children: ReactNode;
  className?: string;
  camera?: { position?: [number, number, number]; fov?: number };
  dpr?: [number, number];
  fallback?: ReactNode;
};

export function SafeCanvas({
  children,
  className = '',
  camera = { position: [0, 0, 5], fov: 45 },
  fallback,
}: SafeCanvasProps) {
  if (!shouldRender3D()) {
    return <>{fallback}</>;
  }

  return (
    <Suspense fallback={fallback ?? null}>
      <Canvas
        className={className}
        camera={{ position: camera.position, fov: camera.fov, near: 0.1, far: 100 }}
        dpr={getDpr()}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        {children}
      </Canvas>
    </Suspense>
  );
}
