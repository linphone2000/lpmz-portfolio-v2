'use client';

import Image from 'next/image';
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from '@heroicons/react/24/outline';
import { Modal } from '@/components/Common/Modal';
import type { ProjectPreviewScreenshot } from '@/lib/types';
import styles from '@/components/Portfolio/case-gallery.module.css';

interface CaseGalleryProps {
  children: ReactNode;
  screenshots: ProjectPreviewScreenshot[];
  title: string;
}

export default function CaseGallery({
  children,
  screenshots,
  title,
}: CaseGalleryProps) {
  const [current, setCurrent] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const selected = current === null ? null : screenshots[current];

  useEffect(() => {
    const strip = stripRef.current;
    const thumb = strip?.querySelector<HTMLButtonElement>(
      '[aria-pressed="true"]'
    );
    if (!strip || !thumb) return;

    const left = thumb.offsetLeft - 6;
    const right = thumb.offsetLeft + thumb.offsetWidth + 6;
    if (left < strip.scrollLeft) strip.scrollLeft = left;
    else if (right > strip.scrollLeft + strip.clientWidth) {
      strip.scrollLeft = right - strip.clientWidth;
    }
  }, [current]);

  function openShot(event: MouseEvent<HTMLDivElement>) {
    if (
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      !(event.target instanceof Element)
    ) {
      return;
    }

    const trigger = event.target.closest<HTMLAnchorElement>('[data-case-shot]');
    if (!trigger) return;

    const index = screenshots.findIndex(
      (shot) => String(shot.id) === trigger.dataset.caseShot
    );
    if (index < 0) return;

    event.preventDefault();
    setCurrent(index);
  }

  function move(delta: number) {
    setCurrent((currentIndex) =>
      currentIndex === null
        ? null
        : (currentIndex + delta + screenshots.length) % screenshots.length
    );
  }

  return (
    <div
      onClick={openShot}
      onKeyDown={(event) => {
        if (
          selected &&
          screenshots.length > 1 &&
          (event.key === 'ArrowLeft' || event.key === 'ArrowRight')
        ) {
          event.preventDefault();
          move(event.key === 'ArrowLeft' ? -1 : 1);
        }
      }}
    >
      {children}
      <Modal
        isOpen={selected !== null}
        onClose={() => setCurrent(null)}
        title={`${title} screenshots`}
        size="xl"
      >
        {selected && current !== null && (
          <div className={styles.viewer}>
            <figure>
              <div className={styles.viewerImage}>
                <Image
                  key={selected.id}
                  src={selected.src}
                  alt={selected.description || selected.title}
                  width={1440}
                  height={900}
                  sizes="(max-width: 768px) 88vw, 820px"
                />
              </div>
              <figcaption className={styles.viewerCaption}>
                <p aria-live="polite">
                  <strong>{selected.title}</strong>
                  {' · '}
                  {current + 1} of {screenshots.length}
                </p>
                <a
                  href={selected.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-text-link"
                >
                  Full size <ArrowUpRightIcon aria-hidden="true" />
                </a>
              </figcaption>
            </figure>
            {screenshots.length > 1 && (
              <div className={styles.viewerControls}>
                <button
                  type="button"
                  className={styles.viewerControl}
                  aria-label="Previous screenshot"
                  onClick={() => move(-1)}
                >
                  <ArrowLeftIcon aria-hidden="true" />
                </button>
                <div
                  className={styles.viewerIndex}
                  role="group"
                  aria-label="Choose a screenshot"
                  ref={stripRef}
                >
                  {screenshots.map((shot, index) => (
                    <button
                      key={shot.id}
                      type="button"
                      aria-label={`Screenshot ${index + 1}: ${shot.title}`}
                      aria-pressed={index === current}
                      onClick={() => setCurrent(index)}
                    >
                      <Image
                        src={shot.src}
                        alt=""
                        width={64}
                        height={48}
                        sizes="56px"
                      />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className={styles.viewerControl}
                  aria-label="Next screenshot"
                  onClick={() => move(1)}
                >
                  <ArrowRightIcon aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
