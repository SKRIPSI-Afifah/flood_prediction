import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 lg:gap-10">
        <section className="rounded-3xl border border-border/60 bg-surface p-6 shadow-layered sm:p-8">
          <Skeleton className="h-4 w-32 rounded-full" />
          <Skeleton className="mt-4 h-12 w-full max-w-2xl rounded-2xl" />
          <Skeleton className="mt-3 h-5 w-full max-w-3xl rounded-full" />
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-3xl border border-border/60 bg-surface p-6 shadow-layered">
              <Skeleton className="h-3 w-24 rounded-full" />
              <Skeleton className="mt-5 h-10 w-32 rounded-2xl" />
              <Skeleton className="mt-4 h-4 w-full rounded-full" />
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-layered">
            <Skeleton className="h-5 w-40 rounded-full" />
            <Skeleton className="mt-6 aspect-square w-full rounded-[28px]" />
          </div>
          <div className="rounded-3xl border border-border/60 bg-surface p-6 shadow-layered">
            <Skeleton className="h-5 w-40 rounded-full" />
            <Skeleton className="mt-6 h-[320px] w-full rounded-[28px]" />
          </div>
        </section>

        <section className="rounded-3xl border border-border/60 bg-surface p-6 shadow-layered">
          <Skeleton className="h-5 w-56 rounded-full" />
          <div className="mt-6 space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-16 w-full rounded-2xl" />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
