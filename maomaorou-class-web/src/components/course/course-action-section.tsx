"use client";

import * as React from "react";
import CourseAddToCartButton from "../cart/course-add-to-cart-button";
import AddZeroPriceCourseButton from "../user/add-zero-price-course-button";
import UserCourseStatusText from "../user/user-course-status-text";
import { useUser } from "./../../provider/user-provider";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

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
  isFirstBuy: boolean;
};

export default function CourseActionSection({
  course,
  selectedOption,
  isFirstBuy,
}: Props) {
  const userContext = useUser();
  const router = useRouter();

  const handleUserNotLoginActionButton = React.useCallback(() => {
    return (
      <Button onClick={() => router.push("/login")} className="w-full">
        前往登入
      </Button>
    );
  }, [router]);

  const handleAddToCartActionButton = React.useCallback(() => {
    return (
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
    );
  }, [
    course.firstDurationDay,
    course.firstPrice,
    course.id,
    course.renewDurationDay,
    course.renewPrice,
    course.title,
    isFirstBuy,
    selectedOption,
  ]);

  const handleAddZeroPriceCourseActionButton = React.useCallback(() => {
    return (
      <AddZeroPriceCourseButton
        className="w-full"
        courseId={course.id}
        courseTitle={course.title}
      />
    );
  }, [course.id, course.title]);

  const actionButton = React.useMemo(() => {
    if (userContext.userData == null) {
      return handleUserNotLoginActionButton();
    }

    if (
      (course.firstPrice === 0 && isFirstBuy) ||
      (course.renewPrice === 0 && !isFirstBuy)
    ) {
      return handleAddZeroPriceCourseActionButton();
    }

    return handleAddToCartActionButton();
  }, [
    course.firstPrice,
    course.renewPrice,
    handleAddToCartActionButton,
    handleAddZeroPriceCourseActionButton,
    handleUserNotLoginActionButton,
    isFirstBuy,
    userContext.userData,
  ]);

  return (
    <>
      {actionButton}
      <UserCourseStatusText
        className="text-center w-full"
        courseId={course.id}
      />
    </>
  );
}
