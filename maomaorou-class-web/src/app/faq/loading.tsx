import { Skeleton } from "@/components/ui/skeleton";

export default async function FaqLoadingPage() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
            常見問題
          </h1>
          <div className="space-y-4">
            <div className="flex flex-col gap-y-4">
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
