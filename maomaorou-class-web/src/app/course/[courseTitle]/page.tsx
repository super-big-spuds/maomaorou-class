import { gql } from "@/__generated__";
import CourseAddToCartButton from "@/components/cart/course-add-to-cart-button";
import { createApolloSSRClient } from "@/lib/apollo-client";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Metadata } from "next";
import CourseActionSection from "@/components/course/course-action-section";
export const metadata: Metadata = {
  title: "課程簡介 - 貓貓肉線上課程網站",
  description: "貓貓肉線上課程網站貓貓肉課程簡介",
};

const QUERY = gql(`
query GetCourseQueryData($title: String!) {
    courseByTitle(title: $title) {
      data {
        id
        attributes {
          title
          goal
          description
          firstPrice
          renewPrice
          firstDurationDay
          renewDurationDay
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
        goal: z.string(),
        description: z.string(),
        firstPrice: z.number(),
        renewPrice: z.number(),
        firstDurationDay: z.number(),
        renewDurationDay: z.number(),
        updatedAt: z.string().transform((v) => new Date(v)),
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

export default async function CoursePage({
  params,
}: {
  params: { courseTitle: string };
}) {
  const courseTitle = decodeURI(params.courseTitle);

  const { data: rawData } = await createApolloSSRClient().query({
    query: QUERY,
    variables: {
      title: courseTitle,
    },
  });

  const data = schema.parse(rawData);

  // sort chapters by sequence
  data.courseByTitle.data.attributes.chapters.data.sort(
    (a, b) => a.attributes.sequence - b.attributes.sequence
  );

  // sort lessons by sequence
  data.courseByTitle.data.attributes.chapters.data.forEach((chapter) => {
    chapter.attributes.lessons.data.sort(
      (a, b) => a.attributes.sequence - b.attributes.sequence
    );
  });

  return (
    <div className="flex md:flex-row flex-col justify-center relative h-full gap-4 w-full">
      <Card className="flex flex-col px-10 py-5 gap-6 max-w-3xl w-full">
        <CardTitle>
          線上影音課程-{data.courseByTitle.data.attributes.title}
        </CardTitle>

        <CardContent className="p-0">
          <div className="flex flex-col gap-y-8">
            <div className="w-full flex justify-center items-center">
              <Image
                className="lg:w-2/3 md:w-1/2"
                src={
                  data.courseByTitle.data.attributes.image.data.attributes.url
                }
                alt="課程介紹"
                loading="lazy"
                width={600}
                height={600}
              />
            </div>
            <div>
              <p className="text-xl font-bold">關於此課程</p>
              <p>{data.courseByTitle.data.attributes.description}</p>
            </div>
            <div>
              <p className="text-xl font-bold">你將會學到什麼?</p>
              <p>{data.courseByTitle.data.attributes.goal}</p>
            </div>
            <div>
              <p className="text-xl font-bold">課程大綱</p>
              <Accordion type="multiple">
                {data.courseByTitle.data.attributes.chapters.data.length ===
                  0 && (
                    <p className="text-center text-gray-200">該課程還沒有章節</p>
                  )}
                {data.courseByTitle.data.attributes.chapters.data.map(
                  (chapter) => (
                    <AccordionItem
                      value={chapter.id}
                      className="border border-gray-300 rounded-xl mb-1"
                      key={chapter.id}
                    >
                      <AccordionTrigger className="border-3 border-gray-800 rounded-xl px-5  font-bold">
                        {chapter.attributes.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        {chapter.attributes.lessons.data.length > 0 ? (
                          chapter.attributes.lessons.data.map((lesson) => (
                            <div key={lesson.id} className="px-5 py-2.5 mx-2">
                              <p>
                                {lesson.attributes.name}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="px-5 py-2.5 mx-2">無章節</div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  )
                )}
              </Accordion>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="sticky top-20 flex flex-col md:w-fit w-full h-full gap-3 p-4">
        <CardTitle>課程價格</CardTitle>
        <CardDescription>
          <p>
            首次購買:
            {data.courseByTitle.data.attributes.firstPrice.toLocaleString()}元
          </p>
          <p>
            續訂:
            {data.courseByTitle.data.attributes.renewPrice.toLocaleString()}元
          </p>
        </CardDescription>
        <Separator />
        <CardContent className="p-0 flex flex-col gap-y-2">
          <div>
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
          </div>
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
          />
        </CardFooter>
      </Card>
    </div>
  );
}
