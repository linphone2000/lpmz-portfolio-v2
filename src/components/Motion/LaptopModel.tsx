'use client';

import { useEffect, useMemo, useRef } from 'react';
import { createPortal, useFrame } from '@react-three/fiber';
import { Float, useGLTF, useTexture } from '@react-three/drei';
import {
  DoubleSide,
  MathUtils,
  SRGBColorSpace,
  type Group,
  type Mesh,
  type MeshStandardMaterial,
  type Object3D,
} from 'three';
import { canHoverFinePointer, prefersReducedMotion } from '@/lib/motion/gsap';

/** MacBook — CC0 via pmndrs market (sriniwasjha). See public/models/CREDITS.md */
export const LAPTOP_URL = '/models/laptop.glb';
/** Portfolio UI on the lid (stock Screen mesh has no UVs). Bump ?v= when replacing the file. */
export const LAPTOP_SCREEN_URL = '/models/laptop-screen.jpg?v=2';

/** DisplayGlass local bounds from the GLB (Top space). */
const SCREEN = {
  width: 5.011,
  height: 3.107,
  position: [0, -0.08, -1.913] as [number, number, number],
  // Rx puts the plane on the lid; Rz flips the UI right-side-up toward the camera.
  rotation: [Math.PI / 2, 0, Math.PI] as [number, number, number],
};

/** Extra tilt toward the pointer (radians), added to the base pose. */
const POINTER_TILT = { x: 0.22, y: 0.45, z: 0.08 };

type LaptopModelProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  float?: boolean;
  /** Smoothly tilt toward the window cursor (desktop only). */
  followPointer?: boolean;
};

function isScreenMaterial(name: string | undefined) {
  return name === 'Screen' || name === 'ScreenGlass' || name === 'DisplayGlass';
}

/** Shared CC0 MacBook — clones so hero + featured can both mount it. */
export function LaptopModel({
  position = [0.9, -0.45, 0],
  rotation = [0.22, -0.55, 0.08],
  scale = 0.38,
  float = true,
  followPointer = true,
}: LaptopModelProps) {
  const groupRef = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const tracking = useRef(false);

  const { scene } = useGLTF(LAPTOP_URL, true);
  const screenMap = useTexture(LAPTOP_SCREEN_URL);
  screenMap.colorSpace = SRGBColorSpace;
  screenMap.anisotropy = 8;

  useEffect(() => {
    if (!followPointer) return;
    if (prefersReducedMotion() || !canHoverFinePointer()) return;

    tracking.current = true;
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      tracking.current = false;
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [followPointer]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const targetX =
      rotation[0] + (tracking.current ? pointer.current.y * POINTER_TILT.x : 0);
    const targetY =
      rotation[1] + (tracking.current ? pointer.current.x * POINTER_TILT.y : 0);
    const targetZ =
      rotation[2] + (tracking.current ? pointer.current.x * POINTER_TILT.z : 0);

    group.rotation.x = MathUtils.damp(group.rotation.x, targetX, 5, delta);
    group.rotation.y = MathUtils.damp(group.rotation.y, targetY, 5, delta);
    group.rotation.z = MathUtils.damp(group.rotation.z, targetZ, 5, delta);
  });

  const { cloned, top } = useMemo(() => {
    const root = scene.clone(true);
    root.traverse((obj) => {
      const mesh = obj as Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      if (Array.isArray(mesh.material)) {
        mesh.material = mesh.material.map((m) => m.clone());
      } else if (mesh.material) {
        mesh.material = mesh.material.clone();
      }
      const mats = (
        Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      ) as MeshStandardMaterial[];
      mats.forEach((m) => {
        if (!isScreenMaterial(m.name)) return;
        // Stock display has no UVs — hide it so the textured plane is the screen.
        m.colorWrite = false;
        m.depthWrite = false;
        m.transparent = true;
        m.opacity = 0;
        m.emissive?.set('#000000');
        m.emissiveIntensity = 0;
      });
    });
    return {
      cloned: root,
      top: root.getObjectByName('Top') as Object3D | undefined,
    };
  }, [scene]);

  const model = (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={cloned} />
      {top
        ? createPortal(
            <mesh
              position={SCREEN.position}
              rotation={SCREEN.rotation}
              scale={[-1, 1, 1]}
            >
              <planeGeometry args={[SCREEN.width, SCREEN.height]} />
              <meshStandardMaterial
                map={screenMap}
                emissiveMap={screenMap}
                emissive="#ffffff"
                emissiveIntensity={0.55}
                roughness={0.9}
                metalness={0}
                toneMapped={false}
                side={DoubleSide}
              />
            </mesh>,
            top
          )
        : null}
    </group>
  );

  if (!float) return model;

  return (
    <Float
      speed={1.1}
      // Pointer owns yaw/pitch; keep only a light bob so they do not fight.
      rotationIntensity={followPointer ? 0.04 : 0.15}
      floatIntensity={0.28}
    >
      {model}
    </Float>
  );
}

useGLTF.preload(LAPTOP_URL, true);
useTexture.preload(LAPTOP_SCREEN_URL);
