"use client";

import { gql } from "@/__generated__";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/provider/user-provider";
import { useQuery } from "@apollo/client";
import { Text, Video, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";

const QUERY = gql(`
query GetLearningCourseData($title: String!) {
    courseByTitle(title: $title) {
      data {
        id
        attributes {
          title
          description
          updatedAt
          chapters {
          	data {
              id
              attributes {
                name
                sequence
                lessons {
                  data {
                    id
                    attributes {
                      name
                      sequence
                      content {
                      	__typename
                      }
                    }
                  }
                }
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
  courseByTitle: z.object({
    data: z.object({
      id: z.string(),
      attributes: z.object({
        title: z.string(),
        description: z.string(),
        updatedAt: z.string(),
        chapters: z.object({
          data: z.array(
            z.object({
              id: z.string(),
              attributes: z.object({
                name: z.string(),
                sequence: z.number(),
                lessons: z.object({
                  data: z.array(
                    z.object({
                      id: z.string(),
                      attributes: z.object({
                        name: z.string(),
                        sequence: z.number(),
                        content: z.array(
                          z.union([
                            z.object({
                              __typename: z.literal(
                                "ComponentLessonContentVideoContent"
                              ),
                            }),
                            z.object({
                              __typename: z.literal(
                                "ComponentLessonContentTextContent"
                              ),
                            }),
                            z.object({
                              __typename: z.literal(
                                "ComponentLessonContentYoutubeLesson"
                              ),
                            }),
                          ])
                        ),
                      }),
                    })
                  ),
                }),
              }),
            })
          ),
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
  }),
});

export default function LearningCoursePage({
  params,
}: {
  params: { courseTitle: string };
}) {
  const courseTitle = decodeURI(params.courseTitle);
  const { token } = useUser();
  const { data, loading } = useQuery(QUERY, {
    skip: !token,
    variables: {
      title: courseTitle,
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const parsedData = schema.safeParse(data);

  return (
    <div className="flex justify-center h-full items-center w-full m-2 sm:m-4">
      {loading ? (
        <Card className="flex flex-col px-10 py-5 gap-6 w-full max-w-3xl">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </Card>
      ) : !parsedData.success ? (
        <Card className="flex flex-col px-10 py-5 gap-6 w-full max-w-3xl">
          載入失敗
        </Card>
      ) : (
        <Card className="flex flex-col px-10 py-5 gap-6 w-full max-w-3xl">
          <p className="text-3xl font-semibold mx-auto">
            {parsedData.data.courseByTitle.data.attributes.title}
          </p>
          <Image
            src={
              parsedData.data.courseByTitle.data.attributes.image.data
                .attributes.url
            }
            alt={parsedData.data.courseByTitle.data.attributes.title}
            className=" min-w-[200px] w-1/2 h-1/2 mx-auto"
            width={200}
            height={200}
          />

          <Accordion className="flex flex-col gap-y-2" type="multiple">
            {parsedData.data.courseByTitle.data.attributes.chapters.data.map(
              (chapter) => (
                <AccordionItem
                  value={chapter.id}
                  className="border border-gray-300 rounded-xl py-2 px-4"
                  key={chapter.id}
                >
                  <AccordionTrigger className="border-3 border-gray-800 rounded-xl font-bold text-lg hover:underline-none">
                    {chapter.attributes.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    {chapter.attributes.lessons.data.length > 0 ? (
                      chapter.attributes.lessons.data.map((lesson) => (
                        <Link
                          key={lesson.id}
                          href={`/learning-lesson/${lesson.id}`}
                          className="border p-2 flex justify-between items-center transition-all hover:bg-gray-50"
                        >
                          <p>{lesson.attributes.name}</p>
                          {lesson.attributes.content[0].__typename ===
                          "ComponentLessonContentVideoContent" ? (
                            <Video className="text-gray-200" />
                          ) : lesson.attributes.content[0].__typename ===
                            "ComponentLessonContentTextContent" ? (
                            <Text className="text-gray-200" />
                          ) : (
                            <Youtube className="text-gray-200" />
                          )}
                        </Link>
                      ))
                    ) : (
                      <div className="text-center text-gray-200">
                        該章節暫無內容
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>
        </Card>
      )}
    </div>
  );
}
