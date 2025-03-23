"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CourseActionSection from "@/components/course/course-action-section";
import { CoursePageData } from "@/app/course/[courseTitle]/page";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { gql } from "@/__generated__";
import { useQuery } from "@apollo/client";
import { useUser } from "@/provider/user-provider";
import { Skeleton } from "../ui/skeleton";

const query = gql(`
 query getIsUserFirstBuyAndPrice($courseId: ID!) {
    course(id: $courseId) {
      data {
        id
        attributes {
          isFirstBuy
        }
      }
    }
  }
`);

const schema = z.object({
  course: z.object({
    data: z.object({
      id: z.string(),
      attributes: z.object({
        isFirstBuy: z.boolean(),
      }),
    }),
  }),
});

export default function CourseSideSection({ data }: { data: CoursePageData }) {
  const [selectedOption, setSelectedOption] = useState(
    data.courseByTitle.data.attributes.buyOption.length > 0
      ? data.courseByTitle.data.attributes.buyOption[0].id
      : ""
  );

  const userContext = useUser();

  const { data: courseStatusData, loading } = useQuery(query, {
    skip: userContext.isLoading,
    variables: {
      courseId: data.courseByTitle.data.id,
    },
    context: {
      headers: {
        authorization: `Bearer ${userContext.token}`,
      },
    },
  });

  const parsedResult = schema.safeParse(courseStatusData);

  if (loading) {
    return <Skeleton className="w-full h-10" />;
  }
  const isFirstBuy = parsedResult.success
    ? parsedResult.data.course.data.attributes.isFirstBuy
    : true;

  return (
    <Card className="sticky top-20 flex flex-col md:w-fit w-full h-full gap-3 p-4">
      <CardTitle>課程選項</CardTitle>
      <CardDescription>
        {isFirstBuy ? (
          data.courseByTitle.data.attributes.buyOption.map((option) => (
            <button
              className={cn(
                "flex w-full justify-between items-center p-2 rounded-l-xl rounded-r-xl border border-gray-300 my-1",
                {
                  "bg-black text-white": selectedOption === option.id,
                }
              )}
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
            >
              <p>{option.name}</p>
              <p>{option.price.toLocaleString()}元</p>
            </button>
          ))
        ) : (
          <p>
            續訂:
            {data.courseByTitle.data.attributes.renewPrice.toLocaleString()}元
          </p>
        )}
      </CardDescription>
      <Separator />
      <CardContent className="p-0 flex flex-col gap-y-2">
        {/*<div>
            <p className="text-lg font-semibold">課程有效期</p>
            <CardDescription>
              <p>
                首次購買： {data.courseByTitle.data.attributes.firstDurationDay}
                天
              </p>
              <p>
                續訂： {data.courseByTitle.data.attributes.renewDurationDay}天
              </p>
            </CardDescription>
          </div>*/}
        <div>
          <p className="text-lg font-semibold">課程包含</p>
          <CardDescription>
            <ul>
              <li>- 教學影片</li>
              <li>- 教材</li>
            </ul>
          </CardDescription>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col p-0 items-start gap-y-2">
        <p className="text-gray-400 font-xs">
          最後更新:
          {data.courseByTitle.data.attributes.updatedAt
            .toISOString()
            .slice(0, 10)}
        </p>
        <CourseActionSection
          course={{
            id: data.courseByTitle.data.id,
            ...data.courseByTitle.data.attributes,
          }}
          selectedOption={
            data.courseByTitle.data.attributes.buyOption.length > 0
              ? data.courseByTitle.data.attributes.buyOption.find(
                  (option) => option.id === selectedOption
                )
              : undefined
          }
          isFirstBuy={isFirstBuy}
        />
      </CardFooter>
    </Card>
  );
}
