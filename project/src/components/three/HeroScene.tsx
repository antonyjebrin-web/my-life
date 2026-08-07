import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { isLowPoweredDevice, prefersReducedMotion } from '@/lib/performance';

function Ocean() {
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(40, 20, 60, 40);
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);

  useFrame((state) => {
    if (!mesh.current || prefersReducedMotion()) return;
    const t = state.clock.elapsedTime;
    const pos = mesh.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y =
        Math.sin(x * 0.6 + t * 1.2) * 0.25 +
        Math.cos(z * 0.5 + t * 0.9) * 0.18 +
        Math.sin((x + z) * 0.4 + t * 0.7) * 0.12;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
    mesh.current.position.y = -2.2;
  });

  return (
    <mesh ref={mesh} geometry={geometry}>
      <meshStandardMaterial
        color="#0b7aa8"
        wireframe
        transparent
        opacity={0.35}
        roughness={0.4}
        metalness={0.3}
      />
    </mesh>
  );
}

function Sun() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current || prefersReducedMotion()) return;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
  });
  return (
    <group ref={group} position={[-4.5, 2.2, -4]}>
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial color="#FFBF40" />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial color="#FFBF40" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function Particles() {
  const count = isLowPoweredDevice() ? 200 : 400;
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = Math.random() * 8 - 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!points.current || prefersReducedMotion()) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#90E0EF" size={0.06} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 6, 4]} intensity={1.2} />
      <Ocean />
      <Sun />
      <Particles />
    </>
  );
}
