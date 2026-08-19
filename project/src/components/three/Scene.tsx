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
  bordered?: boolean;
};

export function SafeCanvas({
  children,
  className = '',
  camera = { position: [0, 0, 5], fov: 45 },
  fallback,
  bordered = false,
}: SafeCanvasProps) {
  if (!shouldRender3D()) {
    return <>{fallback}</>;
  }

  const canvasInner = (
    <Canvas
      className={className}
      camera={{ position: camera.position, fov: camera.fov, near: 0.1, far: 100 }}
      dpr={getDpr()}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      {children}
    </Canvas>
  );

  if (!bordered) {
    return (
      <Suspense fallback={fallback ?? null}>
        {canvasInner}
      </Suspense>
    );
  }

  return (
    <Suspense fallback={fallback ?? null}>
      <div
        className={className}
        style={{
          position: 'absolute',
          inset: 0,
          border: '2px solid rgba(0,0,0,0.4)',
          boxShadow: '0 0 20px rgba(0,0,0,0.5)',
          borderRadius: '0.5rem',
          overflow: 'hidden',
        }}
      >
        <Canvas
          camera={{ position: camera.position, fov: camera.fov, near: 0.1, far: 100 }}
          dpr={getDpr()}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {children}
        </Canvas>
      </div>
    </Suspense>
  );
}
