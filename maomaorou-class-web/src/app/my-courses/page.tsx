"use client";

import Image from "next/image";
import { gql } from "@/__generated__/gql";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { z } from "zod";
import { useUser } from "@/provider/user-provider";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
import { Video, Text } from "lucide-react";

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

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center justify-between max-w-3xl w-full gap-y-4">
        <Card className="w-full p-4">
          <CardTitle className="mb-4">精選文章</CardTitle>
          <CardContent className="p-0 flex flex-col gap-y-2">
            {!parsedResult.success ? (
              <div>
                <Skeleton className="w-full h-6" />
              </div>
            ) : (
              staredLessons.map((lesson) => (
                <Link
                  key={lesson.data.id}
                  href={`/learning-lesson/${lesson.data.id}`}
                  className="border p-2 flex justify-between items-center transition-all hover:bg-gray-50"
                >
                  <p>{lesson.data.attributes.name}</p>
                  {lesson.data.attributes.content[0].__typename ===
                  "ComponentLessonContentVideoContent" ? (
                    <Video className="text-gray-200" />
                  ) : (
                    <Text className="text-gray-200" />
                  )}
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center justify-between p-4 w-full">
          <CardTitle>我的課程</CardTitle>

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
                      {
                        course.data.attributes.withUserStatus.data.attributes
                          .expiredAt
                      }
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        className={cn(buttonVariants())}
                        href={`/learning-course/${course.data.attributes.title}`}
                      >
                        前往課程
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
