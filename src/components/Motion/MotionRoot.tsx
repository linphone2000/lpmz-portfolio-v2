'use client';

import { useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { usePageMotion } from '@/hooks/usePageMotion';

interface MotionRootProps {
  children: ReactNode;
  className?: string;
}

/** Scopes GSAP reveals/magnetic to this subtree; refreshes on route change. */
export default function MotionRoot({ children, className }: MotionRootProps) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  usePageMotion(rootRef, pathname);

  return (
    <div ref={rootRef} className={className ?? 'motion-root min-h-[100dvh]'}>
      {children}
    </div>
  );
}
