import { gql } from "@/__generated__";
import { createApolloSSRClient } from "@/lib/apollo-client";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { Metadata } from "next";
import StrapiMdxToHtmlConverter from "@/components/mdx-converter/strapi-mdx-to-html-converter";
import CourseSideSection from "@/components/course/course-side-section";
export const metadata: Metadata = {
  title: "課程簡介 - 價量投機線上課程網站",
  description: "價量投機線上課程網站價量投機課程簡介",
};

const QUERY = gql(`
query GetCourseQueryData($title: String!) {
    courseByTitle(title: $title) {
      data {
        id
        attributes {
          title
          description
          firstPrice
          renewPrice
          firstDurationDay
          renewDurationDay
          updatedAt
          buyOption {
            id
            name
            price
          }
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
        buyOption: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            price: z.number(),
          })
        ),
      }),
    }),
  }),
});

export type CoursePageData = z.infer<typeof schema>;

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
              <StrapiMdxToHtmlConverter
                mdx={data.courseByTitle.data.attributes.description}
              />
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
                              <p>{lesson.attributes.name}</p>
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

      <CourseSideSection data={data} />
    </div>
  );
}
