import { gql } from "@/__generated__";
import CourseAddToCartButton from "@/components/cart/course-add-to-cart-button";
import { createApolloSSRClient } from "@/lib/apollo-client";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "課程分類 - 貓貓肉線上課程網站",
  description: "貓貓肉線上課程網站貓貓肉課程分類",
};

const QUERY = gql(`
query getCategoryData($categoryId: ID!) {
  category(id: $categoryId) {
    data {
      attributes {
        courses {
          data {
            attributes {
              title
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

`);

const schema = z.object({
  category: z.object({
    data: z.object({
      attributes: z.object({
        courses: z.object({
          data: z.array(
            z.object({
              attributes: z.object({
                title: z.string(),
                image: z.object({
                  data: z.object({
                    attributes: z.object({
                      url: z.string(),
                    }),
                  }),
                }),
              }),
            })
          ),
        }),
      }),
    }),
  }),
});

export default async function CoursePage({
  params,
}: {
  params: { categoryId: string };
}) {
  const { data: rawData } = await createApolloSSRClient().query({
    query: QUERY,
    variables: {
      categoryId: params.categoryId,
    },
  });

  const data = schema.parse(rawData);

  return (
    <div className="flex md:flex-row flex-col justify-center relative h-full gap-4 w-full">
      <Card className="flex flex-col px-10 py-5 gap-6 max-w-3xl w-full">
        <CardContent className="p-0">
          <div className="flex justify-center w-full flex-col">
            <div className="flex gap-4 md:flex-row flex-col relative z-10 pt-2 justify-center items-center">
              {data.category.data.attributes.courses.data.map((course) => (
                <Link
                  key={course.attributes.title}
                  href={`/course/${course.attributes.title}`}
                  className="w-fit aspect-[1/1] hover:-translate-y-[5px] opacity-75 hover:opacity-100 transition-all duration-700"
                >
                  <Image
                    src={course.attributes.image.data.attributes.url}
                    alt={course.attributes.title}
                    width={384}
                    height={384}
                  />
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
