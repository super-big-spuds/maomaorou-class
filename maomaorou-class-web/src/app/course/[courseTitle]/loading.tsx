import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseTitleLoadingPage() {
  return (
    <div className="flex md:flex-row flex-col justify-center relative h-full w-full gap-4">
      <Card className="flex flex-col px-10 py-5 gap-6 max-w-3xl border bg-white ">
        <Skeleton className="w-[60vw] max-w-full h-24" />
        <Skeleton className="w-2/3 h-12" />
        <Skeleton className="w-full h-12" />
      </Card>

      <Card className="sticky top-20 flex flex-col max-w-lg gap-6 mt-5 w-full bg-white p-3 items-start rounded shadow-full">
        <Skeleton className="w-[20vw] h-16" />
        <Skeleton className="w-2/3 h-12" />
        <Skeleton className="w-full h-12" />
      </Card>
    </div>
  );
}
