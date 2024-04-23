import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "貓貓肉課程",
  description: "貓貓肉課程介紹",
};

export default async function Home() {
  return (
    <div className="flex justify-center w-full">
      <Card className="flex flex-col items-center justify-between p-4 max-w-4xl">
        <CardTitle>
          <Skeleton className="w-full h-8" />
        </CardTitle>

        <Skeleton className="aspect-[4/1] w-full min-h-[200px] my-2" />

        {/* Courses */}
        <div className="flex justify-center w-full flex-col">
          <div className="flex gap-4 md:flex-row flex-col relative z-10 pt-2 justify-center items-center">
            <Skeleton className="w-1/3 aspect-square" />
            <Skeleton className="w-1/3 aspect-square" />
            <Skeleton className="w-1/3 aspect-square" />
          </div>
        </div>
      </Card>
    </div>
  );
}
