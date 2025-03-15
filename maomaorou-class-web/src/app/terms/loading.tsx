import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default async function TermsPage() {
  return (
    <Card className="mx-auto flex h-fit w-4/5 flex-col gap-y-2 p-4">
      <Skeleton className="w-2/3 h-16" />
      <Skeleton className="w-1/3 h-8" />
      <hr />
      <Skeleton className="w-full h-24" />
    </Card>
  );
}
