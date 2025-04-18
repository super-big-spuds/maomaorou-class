"use client";

import * as React from "react";
import Image from "next/image";
import { gql } from "@/__generated__/gql";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { z } from "zod";
import { useUser } from "@/provider/user-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Video, Text, Youtube } from "lucide-react";

const QUERY = gql(`
query getBuyedCourses {
  buyedCourses {
    data {
      id
      attributes {
        title
        staredLessons {
          data {
            id
            attributes {
              name
              content {
                __typename
              }
            }
          }
        }
        withUserStatus {
          data {
            attributes {
              expiredAt
            }
          }
        }
        image {
          data {
            id
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`);

const schema = z.object({
  buyedCourses: z.array(
    z.object({
      data: z.object({
        id: z.string(),
        attributes: z.object({
          title: z.string(),
          staredLessons: z.array(
            z.object({
              data: z.object({
                id: z.string(),
                attributes: z.object({
                  name: z.string(),
                  content: z.array(
                    z.object({
                      __typename: z.union([
                        z.literal("ComponentLessonContentVideoContent"),
                        z.literal("ComponentLessonContentTextContent"),
                        z.literal("ComponentLessonContentYoutubeLesson"),
                      ]),
                    })
                  ),
                }),
              }),
            })
          ),
          withUserStatus: z.object({
            data: z.object({
              attributes: z.object({
                expiredAt: z.string(),
              }),
            }),
          }),
          image: z.object({
            data: z.object({
              id: z.string(),
              attributes: z.object({
                url: z.string(),
              }),
            }),
          }),
        }),
      }),
    })
  ),
});

export default function MyCoursesPage() {
  const { token } = useUser();
  const { data, loading } = useQuery(QUERY, {
    skip: !token,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const parsedResult = schema.safeParse(data);

  const staredLessons = !parsedResult.success
    ? []
    : parsedResult.data.buyedCourses.flatMap(
        (course) => course.data.attributes.staredLessons
      );

  const isCourseExpired = (expiredAt: string) => {
    const expiredDate = new Date(expiredAt);
    const currentDate = new Date();
    return currentDate > expiredDate;
  };

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center justify-between max-w-3xl w-full gap-y-4">
        <Card className="flex flex-col items-center justify-between p-4 w-full">
          <CardTitle>置頂文章</CardTitle>
          <CardContent className="p-0 flex flex-col gap-y-2 w-full">
            {!parsedResult.success ? (
              <div>
                <Skeleton className="w-full h-6" />
              </div>
            ) : staredLessons.length === 0 ? (
              <CardDescription className="text-center">
                您擁有的課程尚未有置頂文章
              </CardDescription>
            ) : (
              staredLessons.map((lesson) => (
                <Link
                  key={lesson.data.id}
                  href={`/learning-lesson/${lesson.data.id}`}
                  className="border p-2 flex justify-between items-center transition-all hover:bg-gray-50 w-full"
                >
                  <p>{lesson.data.attributes.name}</p>
                  {lesson.data.attributes.content[0].__typename ===
                  "ComponentLessonContentVideoContent" ? (
                    <Video className="text-gray-200" />
                  ) : lesson.data.attributes.content[0].__typename ===
                    "ComponentLessonContentTextContent" ? (
                    <Text className="text-gray-200" />
                  ) : (
                    <Youtube className="text-gray-200" />
                  )}
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center justify-between p-4 w-full">
          <CardTitle>我的課程</CardTitle>

          {parsedResult.success &&
          parsedResult.data.buyedCourses.length === 0 ? (
            <CardDescription>您尚未擁有任何課程</CardDescription>
          ) : (
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">封面</TableHead>
                  <TableHead>課程名稱</TableHead>
                  <TableHead>課程有效至</TableHead>
                  <TableHead className="text-right">行動</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading || data === undefined ? (
                  <>
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Skeleton className="h-6" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Skeleton className="h-6" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Skeleton className="h-6" />
                      </TableCell>
                    </TableRow>
                  </>
                ) : !parsedResult.success ? (
                  <TableRow>
                    <TableCell>
                      <p>取得課程內容時發生錯誤, 請通知管理員</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  parsedResult.data.buyedCourses.map((course) => (
                    <TableRow key={course.data.id}>
                      <TableCell>
                        <Image
                          src={course.data.attributes.image.data.attributes.url}
                          alt={course.data.attributes.title}
                          width={100}
                          height={100}
                        />
                      </TableCell>
                      <TableCell>{course.data.attributes.title}</TableCell>
                      <TableCell>
                        <p
                          className={cn({
                            "text-red-500": isCourseExpired(
                              course.data.attributes.withUserStatus.data
                                .attributes.expiredAt
                            ),
                          })}
                        >
                          {Number(
                            course.data.attributes.withUserStatus.data.attributes.expiredAt.split(
                              "-"
                            )[0]
                          ) > 2100
                            ? "永久"
                            : course.data.attributes.withUserStatus.data
                                .attributes.expiredAt}
                        </p>
                      </TableCell>
                      <TableCell className="text-right">
                        {isCourseExpired(
                          course.data.attributes.withUserStatus.data.attributes
                            .expiredAt
                        ) ? (
                          <Link
                            className={cn(buttonVariants())}
                            href={`/course/${course.data.attributes.title}`}
                          >
                            前往續訂
                          </Link>
                        ) : (
                          <Link
                            className={cn(buttonVariants())}
                            href={`/learning-course/${course.data.attributes.title}`}
                          >
                            前往課程
                          </Link>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
}
