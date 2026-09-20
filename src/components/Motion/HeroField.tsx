'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import type { Points as PointsType } from 'three';
import { prefersReducedMotion } from '@/lib/motion/gsap';

function ParticleRibbon({ count = 900 }: { count?: number }) {
  const ref = useRef<PointsType>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const t = i / count;
      const angle = t * Math.PI * 6;
      const radius = 1.2 + Math.sin(t * Math.PI * 4) * 0.55;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = (t - 0.5) * 3.2;
      arr[i * 3 + 2] = Math.sin(angle) * radius * 0.7;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.08;
    ref.current.rotation.x = Math.sin(performance.now() * 0.0002) * 0.12;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0ea5e9"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <ParticleRibbon />
    </>
  );
}

/** Single home WebGL canvas — particle ribbon behind hero bento. */
export default function HeroField() {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(true);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cancelled = false;
    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;

    const start = () => {
      if (!cancelled) setActive(true);
    };

    if (typeof window.requestIdleCallback === 'function') {
      idleHandle = window.requestIdleCallback(start, { timeout: 1200 });
    } else {
      timeoutHandle = setTimeout(start, 200);
    }

    const host = hostRef.current;
    const io =
      host &&
      new IntersectionObserver(
        ([entry]) => setVisible(entry.isIntersecting),
        { threshold: 0.05 }
      );
    if (host && io) io.observe(host);

    const onVisibility = () => {
      setVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      if (idleHandle !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
      io?.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  if (prefersReducedMotion()) return null;

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0 opacity-60"
    >
      {active && visible ? (
        <Suspense fallback={null}>
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 4.5], fov: 45 }}
            gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
            style={{ width: '100%', height: '100%' }}
          >
            <Scene />
          </Canvas>
        </Suspense>
      ) : null}
    </div>
  );
}
