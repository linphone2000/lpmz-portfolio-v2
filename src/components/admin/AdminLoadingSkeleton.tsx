'use client';

export function AdminLoadingSkeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/40 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <div className="border-b border-neutral-200/80 bg-white/80 px-4 py-4 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/80 md:px-8">
        <div className="mx-auto flex max-w-7xl animate-pulse items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-7 w-48 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
            <div className="h-4 w-72 rounded bg-neutral-100 dark:bg-neutral-800" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-28 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
            <div className="h-10 w-24 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 md:px-8">
        <div className="hidden w-56 shrink-0 animate-pulse lg:block">
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-14 rounded-xl bg-neutral-200/80 dark:bg-neutral-800"
              />
            ))}
          </div>
        </div>
        <div className="min-h-[50vh] flex-1 space-y-4 animate-pulse">
          <div className="h-40 rounded-2xl bg-neutral-200/80 dark:bg-neutral-800" />
          <div className="h-32 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80" />
          <div className="h-32 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80" />
        </div>
      </div>
    </main>
  );
}
