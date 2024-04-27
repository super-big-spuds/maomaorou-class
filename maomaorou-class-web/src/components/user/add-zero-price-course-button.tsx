"use client";

import { useUser } from "@/provider/user-provider";
import { Button } from "../ui/button";
import { gql } from "@/__generated__";
import { useMutation } from "@apollo/client";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  courseId: string;
  courseTitle: string;
}

const ADD_ZERO_PRICE_COURSE = gql(`
mutation AddZeroPriceCourse($courseId: ID) {
  AddZeroPriceCourseToMyCourse(courseId: $courseId) {
    data {
      id
    }
  }
}
`);

// Check is price outside of the component
export default function AddZeroPriceCourseButton({
  courseId,
  courseTitle,
  ...props
}: Props) {
  const userContext = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const [addZeroPriceCourse, { loading }] = useMutation(ADD_ZERO_PRICE_COURSE, {
    onCompleted: () => {
      toast({
        title: "添加成功",
        description: "為您導向至課程頁面",
      });
      router.push(`/learning-course/${courseTitle}`);
    },
    onError: (error) => {
      toast({
        title: "添加失敗",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSendMutation = () => {
    if (!userContext.token && !userContext.userData) {
      toast({
        title: "您尚未登入",
        description: "請先登入後再進行操作",
      });
      router.push("/login");
      return;
    }

    addZeroPriceCourse({
      variables: {
        courseId,
      },
      context: {
        headers: {
          Authorization: `Bearer ${userContext.token}`,
        },
      },
    });
  };

  return (
    <Button onClick={onSendMutation} disabled={loading} {...props}>
      免費獲取課程
    </Button>
  );
}
