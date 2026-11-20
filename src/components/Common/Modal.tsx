'use client';

import { useId, useLayoutEffect, useRef, type ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import './modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  dismissible?: boolean;
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'lg',
  dismissible = true,
}: ModalProps) => {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointerStartedOutsidePanel = useRef(false);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open === isOpen) return;

    if (isOpen) dialog.showModal();
    else dialog.close();
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="portfolio-modal"
      aria-labelledby={titleId}
      inert={!isOpen}
      onCancel={(event) => {
        event.preventDefault();
        if (dismissible) onClose();
      }}
      onPointerDown={(event) => {
        pointerStartedOutsidePanel.current =
          event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (
          dismissible &&
          pointerStartedOutsidePanel.current &&
          event.target === event.currentTarget
        ) {
          onClose();
        }
        pointerStartedOutsidePanel.current = false;
      }}
    >
      <div
        className={`portfolio-modal-panel flex max-h-full w-full flex-col overflow-hidden rounded-2xl border shadow-2xl ${sizeClasses[size]}`}
      >
        <div className="portfolio-modal-header flex shrink-0 items-center justify-between gap-3 border-b p-4 sm:px-6">
          <h2 id={titleId} className="text-xl font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={!dismissible}
            className="portfolio-modal-close grid size-11 shrink-0 cursor-pointer place-items-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close dialog"
          >
            <XMarkIcon className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="overflow-y-auto overscroll-y-contain p-4 sm:p-6">
          {children}
        </div>
      </div>
    </dialog>
  );
};
