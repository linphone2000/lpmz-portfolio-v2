'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { LaptopModel } from '@/components/Motion/LaptopModel';
import { prefersReducedMotion } from '@/lib/motion/gsap';

const ACCENT = '#0ea5e9';

function Scene({ dark }: { dark: boolean }) {
  return (
    <>
      <ambientLight intensity={dark ? 0.35 : 0.55} />
      <directionalLight
        position={[3, 4, 2]}
        intensity={dark ? 1.1 : 0.95}
        color="#ffffff"
      />
      <pointLight position={[-2, 1, 2]} intensity={0.7} color={ACCENT} />
      <Suspense fallback={null}>
        <LaptopModel
          position={[0.15, -0.35, 0]}
          rotation={[0.2, -0.5, 0.05]}
          scale={0.32}
        />
      </Suspense>
      <ContactShadows
        position={[0.35, -0.95, 0]}
        opacity={0.35}
        scale={8}
        blur={2.4}
        far={4}
      />
    </>
  );
}

/** Featured-section WebGL — same CC0 MacBook as hero (paused offscreen). */
export default function FeaturedDeviceField() {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(true);
  const [dark, setDark] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () =>
      setDark(document.documentElement.classList.contains('dark'));
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    setActive(true);

    const host = hostRef.current;
    const io =
      host &&
      new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
        threshold: 0.08,
      });
    if (host && io) io.observe(host);

    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      io?.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  if (prefersReducedMotion()) return null;

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0 opacity-90"
    >
      {active && visible ? (
        <Suspense fallback={null}>
          <Canvas
            dpr={[1, 1.25]}
            camera={{ position: [0.2, 0.2, 4], fov: 40 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
            style={{ width: '100%', height: '100%' }}
          >
            <Scene dark={dark} />
          </Canvas>
        </Suspense>
      ) : null}
    </div>
  );
}
