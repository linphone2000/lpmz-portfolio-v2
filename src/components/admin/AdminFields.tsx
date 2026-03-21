'use client';

import { cx } from '@/lib/utils';

export function SectionCard({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cx(
        'relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-sm ring-1 ring-black/[0.03] dark:border-neutral-700/90 dark:bg-neutral-800/90 dark:ring-white/[0.04]',
        'transition-shadow duration-200 hover:shadow-md hover:ring-black/[0.05] dark:hover:ring-white/[0.06]',
        className
      )}
    >
      <div
        className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-primary-500 to-primary-600 opacity-90"
        aria-hidden
      />
      <div className="pl-3">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        ) : null}
        <div className="mt-4 space-y-4">{children}</div>
      </div>
    </section>
  );
}

export function Field({
  label,
  hint,
  optional,
  children,
}: {
  label: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
          {label}
        </span>
        {optional ? (
          <span className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-500 dark:bg-neutral-700/80 dark:text-neutral-400">
            Optional
          </span>
        ) : null}
      </div>
      {hint ? (
        <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-500">
          {hint}
        </p>
      ) : null}
      {children}
    </div>
  );
}

const inputClass =
  'w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-400 transition-colors ' +
  'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/25 ' +
  'dark:border-neutral-600 dark:bg-neutral-900/80 dark:text-neutral-100 dark:placeholder:text-neutral-500';

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cx(inputClass, props.className)} />;
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className={cx(
        inputClass,
        'min-h-[96px] resize-y font-sans leading-relaxed',
        props.className
      )}
    />
  );
}

export function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-1 py-1 text-sm text-neutral-800 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800/50">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-2 focus:ring-primary-500/30 dark:border-neutral-600"
      />
      {label}
    </label>
  );
}

/** Primary actions in the admin (Save, etc.) */
export function AdminButtonPrimary({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function AdminButtonSecondary({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-800 shadow-sm transition-colors hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function AdminButtonGhost({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
