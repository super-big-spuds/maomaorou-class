"use client";

import * as React from "react";
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
  selectedOption?: {
    id: string;
    name: string;
    price: number;
  };
  isFirstBuy: boolean
};

export default function CourseActionSection({ course, selectedOption, isFirstBuy }: Props) {
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
        // 有 selectedOption 的話就根據 option的價格和天數來加入購物車
        <CourseAddToCartButton
          className="w-full"
          course={{
            id: course.id,
            title: course.title,
            price: selectedOption
              ? selectedOption.price
              : isFirstBuy
              ? course.firstPrice
              : course.renewPrice,
            durationDay: selectedOption
              ? 99999
              : isFirstBuy
              ? course.firstDurationDay
              : course.renewDurationDay,
          }}
          selectedOption={selectedOption}
        />
      )}
      <UserCourseStatusText
        className="text-center w-full"
        courseId={course.id}
      />
    </>
  );
}
