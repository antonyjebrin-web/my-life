import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { prefersReducedMotion } from '@/lib/performance';

export default function Particles({ count = 60 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      spd[i] = 0.2 + Math.random() * 0.6;
    }
    return { positions: pos, speeds: spd };
  }, [count]);

  const basePositions = useMemo(() => positions.slice(), [positions]);

  useFrame((state) => {
    if (!points.current || prefersReducedMotion()) return;
    const t = state.clock.elapsedTime;
    const attr = points.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const baseY = basePositions[i * 3 + 1];
      attr.setY(i, baseY + Math.sin(t * speeds[i] + i) * 0.4);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#90E0EF" size={0.05} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}
