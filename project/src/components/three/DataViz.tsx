import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { prefersReducedMotion } from '@/lib/performance';

type Bar = { value: number; color: string; label?: string };

export default function DataViz({ data }: { data: Bar[] }) {
  const group = useRef<THREE.Group>(null);
  const bars = useRef<(THREE.Mesh | null)[]>([]);

  const items = useMemo(
    () =>
      data.map((d, i) => ({
        x: (i - (data.length - 1) / 2) * 0.65,
        height: d.value * 1.6,
        color: d.color,
      })),
    [data]
  );

  useFrame((state) => {
    if (!group.current || prefersReducedMotion()) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.35;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} />
      {items.map((item, i) => (
        <mesh
          key={i}
          ref={(el) => {
            bars.current[i] = el;
          }}
          position={[item.x, item.height / 2, 0]}
        >
          <boxGeometry args={[0.4, item.height, 0.4]} />
          <meshStandardMaterial
            color={item.color}
            roughness={0.35}
            metalness={0.4}
            emissive={item.color}
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}
