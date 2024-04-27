"use client";

import * as React from "react";
import { useQuery } from "@apollo/client";
import { useUser } from "@/provider/user-provider";
import { Skeleton } from "../ui/skeleton";
import { GET_USER_COURSE_STATUS_QUERY } from "@/lib/query";
import { cn } from "@/lib/utils";

interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  courseId: string;
}

export default function UserCourseStatusText({
  courseId,
  className,
  ...props
}: SpanProps) {
  const userContext = useUser();
  const { data, loading } = useQuery(GET_USER_COURSE_STATUS_QUERY, {
    skip: !userContext.token,
    variables: {
      courseId: courseId,
    },
    context: {
      headers: {
        Authorization: `Bearer ${userContext?.token}`,
      },
    },
  });
  const expiredAt =
    data?.course?.data?.attributes?.withUserStatus?.data?.attributes?.expiredAt;

  if (loading) {
    return <Skeleton className="h-6 w-full" />;
  }

  if (!expiredAt) {
    return (
      <p className={cn("text-gray-400", className)} {...props}>
        您尚未購買過該課程
      </p>
    );
  }

  const expiredAtDate = new Date(expiredAt);
  const yyyymmdd = `${expiredAtDate.getFullYear()}年${
    expiredAtDate.getMonth() + 1
  }月${expiredAtDate.getDate()}日`;

  return (
    <p className={cn("text-gray-400", className)} {...props}>
      原訂閱將至{yyyymmdd}過期
    </p>
  );
}
