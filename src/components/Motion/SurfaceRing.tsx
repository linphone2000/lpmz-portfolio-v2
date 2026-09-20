'use client';

/** Lightweight stand-in for animations.md #18 / #26 — CSS 3D ring, no WebGL heat. */
export default function SurfaceRing({ className }: { className?: string }) {
  const faces = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div
      className={
        className ??
        'surface-ring-scene pointer-events-none absolute inset-0 flex items-center justify-center opacity-30'
      }
      aria-hidden
    >
      <div className="surface-ring">
        {faces.map((i) => (
          <span
            key={i}
            className="surface-ring-face"
            style={{ ['--i' as string]: i }}
          />
        ))}
      </div>
    </div>
  );
}
