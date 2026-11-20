'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import './sculpture.css';

const TAU = Math.PI * 2;
const RIBBON_SEGMENTS = 224;
const TRAIL_SEGMENTS = 32;
const ORBIT_RADIUS = 2.58;
const ARROW_ROTATION: Record<string, [number, number]> = {
  ArrowLeft: [-0.24, 0],
  ArrowRight: [0.24, 0],
  ArrowUp: [0, -0.18],
  ArrowDown: [0, 0.18],
};

// A beveled section gives the ribbon its broad faces and polished copper edges.
const RIBBON_PROFILE = [
  [0.034, -0.42],
  [0.052, -0.397],
  [0.052, 0.397],
  [0.034, 0.42],
  [-0.034, 0.42],
  [-0.052, 0.397],
  [-0.052, -0.397],
  [-0.034, -0.42],
];

function ribbonGeometry() {
  const geometry = new THREE.BufferGeometry();
  const positions: number[] = [];
  const normals: number[] = [];
  const tangents: number[] = [];
  const uvs: number[] = [];
  const faces: number[][] = [[], [], []];
  const frames = Array.from({ length: RIBBON_SEGMENTS + 1 }, (_, step) => {
    const t = (step / RIBBON_SEGMENTS) * TAU;
    const radial = new THREE.Vector3(Math.cos(2 * t), Math.sin(2 * t), 0);
    const radius = 1.5 + 0.54 * Math.cos(3 * t);
    const radiusSpeed = -1.62 * Math.sin(3 * t);
    const center = radial.clone().multiplyScalar(radius);
    center.z = 0.54 * Math.sin(3 * t);

    const tangent = new THREE.Vector3(
      radiusSpeed * radial.x - 2 * radius * radial.y,
      radiusSpeed * radial.y + 2 * radius * radial.x,
      1.62 * Math.cos(3 * t)
    ).normalize();
    const normal = new THREE.Vector3(
      radial.x * Math.cos(3 * t),
      radial.y * Math.cos(3 * t),
      Math.sin(3 * t)
    );
    normal.addScaledVector(tangent, -normal.dot(tangent)).normalize();
    // Periodic twist keeps the metal readable from front and oblique angles.
    normal.applyAxisAngle(tangent, 0.27 * Math.sin(t) + 0.16);
    const width = new THREE.Vector3().crossVectors(tangent, normal);

    return { center, normal, width, tangent };
  });

  RIBBON_PROFILE.forEach((start, side) => {
    const end = RIBBON_PROFILE[(side + 1) % RIBBON_PROFILE.length];
    const vertexOffset = positions.length / 3;
    const material = side === 1 ? 0 : side === 5 ? 1 : 2;
    const indices = faces[material];

    frames.forEach(({ center, normal, width, tangent }, step) => {
      const faceNormal = normal
        .clone()
        .multiplyScalar(end[1] - start[1])
        .addScaledVector(width, start[0] - end[0])
        .normalize();

      for (const [depth, across] of [start, end]) {
        const point = center
          .clone()
          .addScaledVector(normal, depth)
          .addScaledVector(width, across);
        positions.push(point.x, point.y, point.z);
        normals.push(faceNormal.x, faceNormal.y, faceNormal.z);
        tangents.push(tangent.x, tangent.y, tangent.z, material === 0 ? -1 : 1);
        uvs.push((step / RIBBON_SEGMENTS) * 7, across / 0.84 + 0.5);
      }

      if (step === RIBBON_SEGMENTS) return;
      const first = vertexOffset + step * 2;
      indices.push(
        first,
        first + 1,
        first + 2,
        first + 1,
        first + 3,
        first + 2
      );
    });
  });

  let indexStart = 0;
  faces.forEach((facesForMaterial, material) => {
    geometry.addGroup(indexStart, facesForMaterial.length, material);
    indexStart += facesForMaterial.length;
  });
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute(
    'tangent',
    new THREE.Float32BufferAttribute(tangents, 4)
  );
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(faces.flat());
  return geometry;
}

function brushedRoughness() {
  const width = 64;
  const height = 128;
  const values = new Uint8Array(width * height * 4);

  for (let y = 0; y < height; y += 1) {
    const grain = 189 + ((y * 97 + y * y * 19) % 42);
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const value = grain + ((x * 61 + y * x * 13) % 5);
      values.set([value, value, value, 255], index);
    }
  }

  const texture = new THREE.DataTexture(values, width, height);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

function orbitLine(
  radius: number,
  start: number,
  length: number,
  color: number,
  opacity: number
) {
  const curve = new THREE.EllipseCurve(
    0,
    0,
    radius,
    radius,
    start,
    start + length
  );
  const geometry = new THREE.BufferGeometry().setFromPoints(
    curve.getPoints(96)
  );
  const material = new THREE.LineBasicMaterial({
    color,
    opacity,
    transparent: true,
  });
  return new THREE.Line(geometry, material);
}

function orbitTrails() {
  const assembly = new THREE.Group();
  const primary = new THREE.Group();
  primary.rotation.set(0.9, 0.56, -0.5);
  primary.add(orbitLine(ORBIT_RADIUS, 0, TAU, 0xa1846d, 0.33));
  assembly.add(primary);

  const gauge = new THREE.Group();
  gauge.rotation.set(-0.44, 0.74, 0.48);
  gauge.add(
    orbitLine(2.85, 0.12, Math.PI * 1.6, 0x998b7c, 0.21),
    orbitLine(2.85, 0.7, 0.37, 0xffaa76, 0.62),
    orbitLine(2.93, 2.44, 0.35, 0xdca783, 0.3)
  );
  const indices: number[] = [];
  for (let step = 0; step < 26; step += 1) {
    const theta = 0.35 + step * 0.168;
    const inner = step % 5 === 0 ? 2.76 : 2.81;
    indices.push(
      Math.cos(theta) * inner,
      Math.sin(theta) * inner,
      0,
      Math.cos(theta) * 2.85,
      Math.sin(theta) * 2.85,
      0
    );
  }
  const ticks = new THREE.BufferGeometry().setAttribute(
    'position',
    new THREE.Float32BufferAttribute(indices, 3)
  );
  gauge.add(
    new THREE.LineSegments(
      ticks,
      new THREE.LineBasicMaterial({
        color: 0xb6a28f,
        opacity: 0.37,
        transparent: true,
      })
    )
  );
  assembly.add(gauge);

  const trail = new THREE.BufferGeometry();
  const position = new THREE.BufferAttribute(
    new Float32Array(TRAIL_SEGMENTS * 3),
    3
  );
  position.setUsage(THREE.DynamicDrawUsage);
  trail.setAttribute('position', position);
  const glow = new THREE.Color(0xff9c67);
  const rgb = new Float32Array(TRAIL_SEGMENTS * 3);
  for (let point = 0; point < TRAIL_SEGMENTS; point += 1) {
    const brightness = (point / (TRAIL_SEGMENTS - 1)) ** 2.5;
    rgb.set(
      [glow.r * brightness, glow.g * brightness, glow.b * brightness],
      point * 3
    );
  }
  trail.setAttribute('color', new THREE.BufferAttribute(rgb, 3));
  const path = new THREE.Line(
    trail,
    new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    })
  );
  path.frustumCulled = false;
  primary.add(path);

  const satellite = new THREE.Mesh(
    new THREE.SphereGeometry(0.034, 12, 8),
    new THREE.MeshBasicMaterial({ color: 0xffceaa })
  );
  primary.add(satellite);

  return {
    assembly,
    update(time: number, progress: number) {
      const angle = 0.4 + time * 0.43 + progress * 2.8;
      for (let point = 0; point < TRAIL_SEGMENTS; point += 1) {
        const theta = angle - (1 - point / (TRAIL_SEGMENTS - 1)) * 0.53;
        position.setXYZ(
          point,
          Math.cos(theta) * ORBIT_RADIUS,
          Math.sin(theta) * ORBIT_RADIUS,
          0
        );
      }
      position.needsUpdate = true;
      satellite.position.set(
        Math.cos(angle) * ORBIT_RADIUS,
        Math.sin(angle) * ORBIT_RADIUS,
        0
      );
      gauge.rotation.z = 0.48 - time * 0.035;
    },
  };
}

function mountSculpture(
  host: HTMLDivElement,
  setReady: (ready: boolean) => void
) {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  const compact = window.matchMedia('(pointer: coarse)').matches;
  const settings = {
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  } as const;
  let renderer: THREE.WebGLRenderer;
  try {
    const context = canvas.getContext(
      'webgl2',
      settings
    ) as WebGL2RenderingContext | null;
    if (!context) return;
    renderer = new THREE.WebGLRenderer({ canvas, context, ...settings });
  } catch {
    return;
  }

  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 32);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  let environment: THREE.WebGLRenderTarget;
  try {
    environment = pmrem.fromScene(room, 0.04, 0.1, 40, {
      size: compact ? 64 : 128,
    });
  } catch {
    renderer.dispose();
    renderer.forceContextLoss();
    return;
  } finally {
    room.dispose();
    pmrem.dispose();
  }
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.94;
  host.appendChild(canvas);

  const roughnessMap = brushedRoughness();
  const ribbon = new THREE.Mesh(ribbonGeometry(), [
    new THREE.MeshPhysicalMaterial({
      color: 0x373136,
      metalness: 0.96,
      roughness: 0.6,
      roughnessMap,
      anisotropy: 0.52,
      anisotropyRotation: Math.PI / 2,
    }),
    new THREE.MeshPhysicalMaterial({
      color: 0xb7512c,
      metalness: 0.78,
      roughness: 0.43,
      roughnessMap,
      anisotropy: 0.62,
      anisotropyRotation: Math.PI / 2,
    }),
    new THREE.MeshPhysicalMaterial({
      color: 0xc2855f,
      metalness: 0.86,
      roughness: 0.24,
      clearcoat: 0.66,
    }),
  ]);
  ribbon.scale.set(1, 1.11, 1);

  const lights = [
    [0xffdebb, 2.45, -4, 5, 4],
    [0xb0b9ca, 1.5, 4, 2, -4],
    [0xff8060, 1.35, 0, -4, 2],
  ];
  for (const [color, intensity, x, y, z] of lights) {
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    scene.add(light);
  }

  const orbit = orbitTrails();
  const sculpture = new THREE.Group();
  sculpture.add(ribbon, orbit.assembly);
  scene.add(sculpture);

  const pointer = { x: 0, y: 0 };
  const rotation = { yaw: 0, pitch: 0 };
  let drag:
    | { id: number; x: number; y: number; touch: boolean; moved: boolean }
    | undefined;
  let width = 0;
  let height = 0;
  let scrollTarget = 0;
  let progress = 0;
  let frame = 0;
  let previousTime: number | undefined;
  let unfoldedTime = 0;
  let visible = false;
  let painted = false;
  let contextLost = false;
  let disposed = false;

  const schedule = () => {
    if (
      !frame &&
      visible &&
      !document.hidden &&
      !contextLost &&
      width &&
      height
    ) {
      frame = requestAnimationFrame(render);
    }
  };

  function stopFrame() {
    cancelAnimationFrame(frame);
    frame = 0;
    previousTime = undefined;
  }

  const readScroll = () => {
    if (visible)
      scrollTarget = THREE.MathUtils.clamp(
        window.scrollY / (window.innerHeight * 0.82),
        0,
        1
      );
  };

  function render(now: number) {
    frame = 0;
    const milliseconds = previousTime === undefined ? 17 : now - previousTime;
    if (previousTime !== undefined && compact && milliseconds < 27) {
      schedule();
      return;
    }
    previousTime = now;
    const delta = Math.min(milliseconds / 1000, 0.056);
    unfoldedTime += delta;
    const time = unfoldedTime;
    const arrival = 1 - (1 - Math.min(time / 1.55, 1)) ** 3;
    const drift = THREE.MathUtils.damp;
    progress = drift(progress, scrollTarget, 5, delta);

    ribbon.rotation.x = drift(
      ribbon.rotation.x,
      -0.43 + Math.sin(time * 0.31) * 0.15 + rotation.pitch + progress * 0.39,
      9,
      delta
    );
    ribbon.rotation.y = drift(
      ribbon.rotation.y,
      -0.28 +
        Math.sin(time * 0.34) * 0.2 +
        rotation.yaw -
        progress * 0.75 -
        (1 - arrival) * 1.4,
      9,
      delta
    );
    ribbon.rotation.z =
      0.51 +
      Math.sin(time * 0.24) * 0.1 -
      progress * 0.5 -
      (1 - arrival) * 0.55;
    sculpture.position.y =
      Math.sin(time * 0.92) * 0.12 + progress * 0.42 - (1 - arrival) * 0.86;
    sculpture.scale.setScalar(0.71 + arrival * 0.29 + progress * 0.11);
    orbit.assembly.rotation.y = time * 0.06 - progress * 0.47;
    orbit.assembly.rotation.z = progress * 0.64;
    orbit.update(time, progress);

    camera.position.x = drift(
      camera.position.x,
      pointer.x * 0.45 + progress * 0.58,
      4,
      delta
    );
    camera.position.y = drift(
      camera.position.y,
      -pointer.y * 0.32 + progress * 0.31,
      4,
      delta
    );
    camera.position.z =
      Math.max(9.0, 8.8 / camera.aspect) + (1 - arrival) * 1.1 + progress * 0.7;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    if (!painted) {
      painted = true;
      setReady(true);
    }
    schedule();
  }

  const size = new ResizeObserver(([entry]) => {
    if (!entry) return;
    ({ width, height } = entry.contentRect);
    if (!width || !height) return;
    const limit = compact ? 1.25 : 1.55;
    const pixelBudget = Math.sqrt(1_250_000 / (width * height));
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, limit, pixelBudget)
    );
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    schedule();
  });
  size.observe(host);

  const visibility = new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting);
    if (visible) {
      readScroll();
      schedule();
    } else stopFrame();
  });
  visibility.observe(host);

  const move = (event: PointerEvent) => {
    if (event.pointerType === 'mouse') {
      pointer.x = (event.offsetX / width - 0.5) * 2;
      pointer.y = (event.offsetY / height - 0.5) * 2;
    }
    if (drag?.id !== event.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.moved && Math.max(Math.abs(dx), Math.abs(dy)) < 6) return;
    drag.moved = true;
    rotation.yaw += dx * 0.009;
    if (!drag.touch)
      rotation.pitch = THREE.MathUtils.clamp(
        rotation.pitch + dy * 0.009,
        -1.6,
        1.6
      );
    drag.x = event.clientX;
    drag.y = event.clientY;
    host.dataset.dragging = 'true';
  };
  const down = (event: PointerEvent) => {
    if (drag || !event.isPrimary || event.button !== 0) return;
    drag = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      touch: event.pointerType === 'touch',
      moved: false,
    };
    host.setPointerCapture(event.pointerId);
  };
  const up = (event: PointerEvent) => {
    if (drag?.id !== event.pointerId) return;
    if (!drag.moved && event.type === 'pointerup') {
      rotation.yaw += event.offsetX > width / 2 ? 0.24 : -0.24;
    }
    drag = undefined;
    delete host.dataset.dragging;
    if (host.hasPointerCapture(event.pointerId))
      host.releasePointerCapture(event.pointerId);
  };
  const leave = () => {
    pointer.x = 0;
    pointer.y = 0;
  };
  const key = (event: KeyboardEvent) => {
    const adjustment = ARROW_ROTATION[event.key];
    if (!adjustment) return;
    event.preventDefault();
    rotation.yaw += adjustment[0];
    rotation.pitch = THREE.MathUtils.clamp(
      rotation.pitch + adjustment[1],
      -1.6,
      1.6
    );
  };
  const changeVisibility = () => {
    if (document.hidden) stopFrame();
    else schedule();
  };
  const contextLoss = () => {
    contextLost = true;
    host.blur();
    setReady(false);
    dispose();
  };

  host.addEventListener('pointermove', move);
  host.addEventListener('pointerdown', down);
  host.addEventListener('pointerup', up);
  host.addEventListener('pointercancel', up);
  host.addEventListener('lostpointercapture', up);
  host.addEventListener('pointerleave', leave);
  host.addEventListener('keydown', key);
  window.addEventListener('scroll', readScroll, { passive: true });
  document.addEventListener('visibilitychange', changeVisibility);
  canvas.addEventListener('webglcontextlost', contextLoss);

  function dispose() {
    if (disposed) return;
    disposed = true;
    stopFrame();
    size.disconnect();
    visibility.disconnect();
    host.removeEventListener('pointermove', move);
    host.removeEventListener('pointerdown', down);
    host.removeEventListener('pointerup', up);
    host.removeEventListener('pointercancel', up);
    host.removeEventListener('lostpointercapture', up);
    host.removeEventListener('pointerleave', leave);
    host.removeEventListener('keydown', key);
    window.removeEventListener('scroll', readScroll);
    document.removeEventListener('visibilitychange', changeVisibility);
    canvas.removeEventListener('webglcontextlost', contextLoss);
    delete host.dataset.dragging;
    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh || object instanceof THREE.Line))
        return;
      object.geometry.dispose();
      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      for (const material of materials) material.dispose();
    });
    roughnessMap.dispose();
    environment.dispose();
    renderer.dispose();
    if (!contextLost) renderer.forceContextLoss();
    canvas.remove();
  }

  return dispose;
}

export default function Sculpture({ active }: { active: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!element || !active) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    let disposeScene: (() => void) | undefined;

    const stop = () => {
      observer?.disconnect();
      disposeScene?.();
      disposeScene = undefined;
    };
    const sync = () => {
      stop();
      setReady(false);
      if (reducedMotion.matches) return;
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          observer?.disconnect();
          disposeScene = mountSculpture(element, setReady);
        },
        { rootMargin: '80px' }
      );
      observer.observe(element);
    };

    sync();
    reducedMotion.addEventListener('change', sync);
    return () => {
      reducedMotion.removeEventListener('change', sync);
      stop();
    };
  }, [active]);

  const interactive = active && ready;
  return (
    <div
      ref={host}
      className="sculpture-stage"
      data-ready={interactive}
      role={interactive ? 'group' : undefined}
      aria-label={
        interactive
          ? 'Copper sculpture. Use the arrow keys to rotate.'
          : undefined
      }
      aria-hidden={interactive ? undefined : true}
      tabIndex={interactive ? 0 : undefined}
    >
      {interactive && (
        <span className="sculpture-instruction" aria-hidden="true">
          <span>↔</span> Drag to rotate
        </span>
      )}
    </div>
  );
}
