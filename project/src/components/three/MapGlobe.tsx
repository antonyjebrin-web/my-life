import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { isLowPoweredDevice, prefersReducedMotion } from '@/lib/performance';

// Convert lat/lon to 3D position on a sphere.
const latLonToVec3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

function Globe() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current || prefersReducedMotion()) return;
    mesh.current.rotation.y += 0.0015;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.4, 48, 48]} />
      <meshStandardMaterial
        color="#0e7490"
        roughness={0.5}
        metalness={0.6}
        wireframe
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

function Markers({ markers }: { markers: number }) {
  const count = Math.min(markers || 6, isLowPoweredDevice() ? 4 : 8);
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    // Kanyakumari region ~8.08N 77.54E
    const base = latLonToVec3(8.08, 77.54, 1.42);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = base.x + (Math.random() - 0.5) * 0.6;
      arr[i * 3 + 1] = base.y + (Math.random() - 0.5) * 0.6;
      arr[i * 3 + 2] = base.z + (Math.random() - 0.5) * 0.6;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!points.current || prefersReducedMotion()) return;
    const size = 0.06 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
    (points.current.material as THREE.PointsMaterial).size = size;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#FFD54F" size={0.08} sizeAttenuation transparent opacity={0.95} />
    </points>
  );
}

export default function MapGlobe({ markers = 6 }: { markers?: number }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 3]} intensity={1.2} />
      <pointLight position={[0, 3, 2]} intensity={0.6} color="#90E0EF" />
      <Globe />
      <Markers markers={markers} />
    </>
  );
}
