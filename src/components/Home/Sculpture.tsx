'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface SculptureProps {
  motion: boolean;
}

export default function Sculpture({ motion }: SculptureProps) {
  const host = useRef<HTMLDivElement>(null);
  const moving = useRef(motion);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    moving.current = motion;
  }, [motion]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'low-power',
      });
    } catch {
      setFailed(true);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x090a0c, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 100);
    camera.position.set(0, 0, 9.5);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.035);
    scene.environment = env.texture;
    room.dispose();
    pmrem.dispose();

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.TorusKnotGeometry(1.36, 0.48, 200, 32, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xff7037,
      metalness: 0.85,
      roughness: 0.23,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
      envMapIntensity: 1.6,
    });
    const sculpture = new THREE.Mesh(geometry, material);
    sculpture.rotation.set(0.34, -0.45, -0.18);
    group.add(sculpture);

    const light = new THREE.DirectionalLight(0xffebd6, 5);
    light.position.set(-3, 4, 5);
    scene.add(light);

    const rim = new THREE.DirectionalLight(0x8fafff, 3.3);
    rim.position.set(4, -2, -2);
    scene.add(rim);

    const fill = new THREE.DirectionalLight(0xff591f, 3);
    fill.position.set(3, 1, 4);
    scene.add(fill);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(2.52, 0.008, 6, 160),
      new THREE.MeshBasicMaterial({
        color: 0x73809d,
        transparent: true,
        opacity: 0.25,
      })
    );
    orbit.rotation.set(1.05, 0.5, -0.4);
    group.add(orbit);

    const secondOrbit = new THREE.Mesh(
      new THREE.TorusGeometry(2.7, 0.004, 5, 160),
      new THREE.MeshBasicMaterial({
        color: 0x6b7896,
        transparent: true,
        opacity: 0.22,
      })
    );
    secondOrbit.rotation.set(0.15, 0.6, 0.4);
    group.add(secondOrbit);

    const satellite = new THREE.Mesh(
      new THREE.SphereGeometry(0.115, 24, 16),
      new THREE.MeshStandardMaterial({
        color: 0xe9dcd3,
        metalness: 0.85,
        roughness: 0.18,
      })
    );
    group.add(satellite);

    const points = new Float32Array(90);
    for (let i = 0; i < 30; i += 1) {
      const angle = i * 2.399963;
      const radius = 3.2 + (i % 4) * 0.23;
      points[i * 3] = Math.cos(angle) * radius;
      points[i * 3 + 1] = Math.sin(angle) * radius;
      points[i * 3 + 2] = -0.5 - (i % 3) * 0.4;
    }

    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute('position', new THREE.BufferAttribute(points, 3));
    const pointMat = new THREE.PointsMaterial({
      color: 0xb4a99f,
      size: 0.018,
      transparent: true,
      opacity: 0.55,
    });
    scene.add(new THREE.Points(pointGeo, pointMat));

    const pointer = { x: 0, y: 0 };
    const drag = {
      active: false,
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
    };
    let frame = 0;
    let time = 0;
    let last = 0;
    let visible = true;

    const resize = () => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      renderer.setSize(rect.width, rect.height);
      camera.aspect = rect.width / rect.height;
      camera.position.z = camera.aspect < 0.85 ? 11 : 9.5;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(el);
    resize();

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
    });
    visibility.observe(el);

    const move = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
      if (!drag.active) return;
      drag.rotationY += (event.clientX - drag.x) * 0.007;
      drag.rotationX += (event.clientY - drag.y) * 0.007;
      drag.x = event.clientX;
      drag.y = event.clientY;
    };

    const down = (event: PointerEvent) => {
      drag.active = true;
      drag.x = event.clientX;
      drag.y = event.clientY;
      el.setPointerCapture(event.pointerId);
    };

    const up = (event: PointerEvent) => {
      drag.active = false;
      if (el.hasPointerCapture(event.pointerId)) {
        el.releasePointerCapture(event.pointerId);
      }
    };

    const leave = () => {
      if (drag.active) return;
      pointer.x = 0;
      pointer.y = 0;
    };

    const key = (event: KeyboardEvent) => {
      const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'ArrowLeft') drag.rotationY -= 0.2;
      if (event.key === 'ArrowRight') drag.rotationY += 0.2;
      if (event.key === 'ArrowUp') drag.rotationX -= 0.2;
      if (event.key === 'ArrowDown') drag.rotationX += 0.2;
    };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('pointerleave', leave);
    el.addEventListener('keydown', key);

    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      const delta = Math.min((now - last) / 1000, 0.04);
      last = now;
      if (!visible || document.hidden) return;

      if (moving.current) time += delta;
      sculpture.rotation.y = -0.45 + time * 0.12 + drag.rotationY;
      sculpture.rotation.x =
        0.34 + Math.sin(time * 0.22) * 0.13 + drag.rotationX;
      sculpture.rotation.z = -0.18 + Math.sin(time * 0.16) * 0.12;
      group.rotation.y += (pointer.x * 0.24 - group.rotation.y) * 0.035;
      group.rotation.x += (-pointer.y * 0.15 - group.rotation.x) * 0.035;
      group.position.y = moving.current ? Math.sin(time * 0.7) * 0.075 : 0;
      satellite.position.set(
        Math.cos(time * 0.3 + 0.7) * 2.58,
        Math.sin(time * 0.3 + 0.7) * 1.4,
        Math.sin(time * 0.3 + 0.7) * 1.55
      );
      renderer.render(scene, camera);
    };

    frame = requestAnimationFrame(render);
    setReady(true);

    const lost = (event: Event) => {
      event.preventDefault();
      setFailed(true);
      cancelAnimationFrame(frame);
    };
    renderer.domElement.addEventListener('webglcontextlost', lost);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      el.removeEventListener('pointerleave', leave);
      el.removeEventListener('keydown', key);
      renderer.domElement.removeEventListener('webglcontextlost', lost);
      scene.traverse((obj) => {
        if (!(obj instanceof THREE.Mesh)) return;
        obj.geometry.dispose();
        const materials = Array.isArray(obj.material)
          ? obj.material
          : [obj.material];
        materials.forEach((item) => item.dispose());
      });
      pointGeo.dispose();
      pointMat.dispose();
      env.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <>
      <div
        ref={host}
        className={`sculpture ${ready ? 'ready' : ''}`}
        role="img"
        aria-label="Interactive copper 3D knot. Drag or use arrow keys to rotate."
        tabIndex={0}
      />
      {failed ? (
        <div className="sculpture-fallback" aria-hidden="true">
          ✳
        </div>
      ) : null}
      <p className="drag-hint">
        {failed ? 'A DIFFERENT PERSPECTIVE.' : 'DRAG TO EXPLORE'}
        <span>↔</span>
      </p>
    </>
  );
}
