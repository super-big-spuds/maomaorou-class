"use client";

import { useCart } from "@/provider/cart-provider";
import CourseAddToCartButton from "../cart/course-add-to-cart-button";
import AddZeroPriceCourseButton from "../user/add-zero-price-course-button";
import UserCourseStatusText from "../user/user-course-status-text";
import { useUser } from "./../../provider/user-provider";
import { useQuery } from "@apollo/client";
import { z } from "zod";
import { gql } from "@/__generated__";
import { Skeleton } from "../ui/skeleton";

type Props = {
  course: {
    id: string;
    title: string;
    firstPrice: number;
    firstDurationDay: number;
    renewPrice: number;
    renewDurationDay: number;
  };
};

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

export default function CourseActionSection({ course }: Props) {
  const userContext = useUser();

  const { data, loading } = useQuery(query, {
    skip: userContext.isLoading,
    variables: {
      courseId: course.id,
    },
    context: {
      headers: {
        authorization: `Bearer ${userContext.token}`,
      },
    },
  });

  const parsedResult = schema.safeParse(data);

  if (loading) {
    return <Skeleton className="w-full h-10" />;
  }
  if (!parsedResult.success) {
    return <div>系統發生錯誤, 無法加入課程!</div>;
  }

  const isFirstBuy = parsedResult.data.course.data.attributes.isFirstBuy;

  return (
    <>
      {(course.firstPrice === 0 && isFirstBuy) ||
      (course.renewPrice === 0 && !isFirstBuy) ? (
        <AddZeroPriceCourseButton
          className="w-full"
          courseId={course.id}
          courseTitle={course.title}
        />
      ) : (
        <CourseAddToCartButton
          className="w-full"
          course={{
            id: course.id,
            title: course.title,
            price: isFirstBuy ? course.firstPrice : course.renewPrice,
            durationDay: isFirstBuy
              ? course.firstDurationDay
              : course.renewDurationDay,
          }}
        />
      )}
      <UserCourseStatusText
        className="text-center w-full"
        courseId={course.id}
      />
    </>
  );
}
