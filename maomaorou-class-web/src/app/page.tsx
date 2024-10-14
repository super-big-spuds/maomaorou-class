import Image from "next/image";
import { gql } from "@/__generated__/gql";
import { createApolloSSRClient } from "@/lib/apollo-client";
import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { z } from "zod";

export const metadata: Metadata = {
  title: "首頁 - 價量投機線上課程網站",
  description: "價量投機課程介紹",
};

const QUERY = gql(`
query GetMainPageQueryData {
  courses {
    data {
      id
      attributes {
        title
        sequence
        category {
					data {
          	id
            attributes {
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
  decorationSetting {
    data {
      id
      attributes {
        landingPageBackgroundImage {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
  news {
    data {
      id
      attributes {
        title
        createdAt
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
  courses: z.object({
    data: z.array(
      z.object({
        id: z.string(),
        attributes: z.object({
          title: z.string(),
          sequence: z.number(),
          category: z.object({
            data: z.nullable(
              z.object({
                id: z.string(),
                attributes: z.object({
                  image: z.object({
                    data: z.object({
                      id: z.string(),
                      attributes: z.object({
                        url: z.string(),
                      }),
                    }),
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
      })
    ),
  }),
  decorationSetting: z.object({
    data: z.object({
      id: z.string(),
      attributes: z.object({
        landingPageBackgroundImage: z.object({
          data: z.object({
            attributes: z.object({
              url: z.string(),
            }),
          }),
        }),
      }),
    }),
  }),
  news: z.object({
    data: z.array(
      z.object({
        id: z.string(),
        attributes: z.object({
          title: z.string(),
          createdAt: z.string(),
          image: z.object({
            data: z.object({
              id: z.string(),
              attributes: z.object({
                url: z.string(),
              }),
            }),
          }),
        }),
      })
    ),
  }),
});

type Course = z.infer<typeof schema>["courses"]["data"][0];

export default async function Home() {
  const { data } = await createApolloSSRClient().query({
    query: QUERY,
  });

  const parsedData = schema.parse(data);

  const unDuplicateCourseWithCategory = parsedData.courses.data.reduce(
    (acc, course) => {
      const categoryOfThisCourse = course.attributes.category.data;
      if (categoryOfThisCourse === null) {
        return [...acc, course];
      }

      const isCategoryAlreadyInList = acc.find((c) => {
        if (c.attributes.category.data === null) return false;
        {
          return c.attributes.category.data.id === categoryOfThisCourse.id;
        }
      });

      if (!isCategoryAlreadyInList) {
        return [...acc, course];
      }

      return acc;
    },
    [] as Course[]
  );

  // sort with sequence
  unDuplicateCourseWithCategory.sort(
    (a, b) => a.attributes.sequence - b.attributes.sequence
  );

  const sortedArticles = [...parsedData.news.data].sort((a, b) => {
    return (
      new Date(b.attributes.createdAt).getTime() -
      new Date(a.attributes.createdAt).getTime()
    );
  });

  function getTimeString(str: string) {
    const date = new Date(str);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
  }

  return (
    <div className="flex justify-center w-full ">
      <div className="max-w-4xl flex flex-col gap-y-4">
        {/* Banner */}
        <Image
          className="aspect-[3/1] w-full min-h-[200px] my-2"
          src={
            parsedData.decorationSetting.data.attributes
              .landingPageBackgroundImage.data.attributes.url
          }
          unoptimized
          alt="Pajusdtdoit Background Image"
          width={500}
          height={500}
        />

        <Card className="flex flex-col items-center justify-between px-6 pb-6">
          <CardTitle className="text-2xl md:text-3xl mt-4">課程列表</CardTitle>

          {/* Courses */}
          <div className="flex justify-center items-center zw-full flex-col">
            <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 text-center relative z-10 pt-2 w-fit">
              {unDuplicateCourseWithCategory.map((course) => (
                <Link
                  key={course.id}
                  href={
                    course.attributes.category.data !== null
                      ? `/category/${course.attributes.category.data.id}`
                      : `/course/${course.attributes.title}`
                  }
                  className="w-fit aspect-[1/1] hover:-translate-y-[5px] transition-all duration-700"
                >
                  <Image
                    src={
                      course.attributes.category.data !== null
                        ? course.attributes.category.data.attributes.image.data
                            .attributes.url
                        : course.attributes.image.data.attributes.url
                    }
                    alt={course.attributes.title}
                    width={384}
                    height={384}
                  />
                </Link>
              ))}
            </div>
          </div>
        </Card>

        {/* News */}
        <Card className="flex flex-col items-center justify-between px-6 pb-6">
          <CardTitle className="text-2xl md:text-3xl my-4">精選文章</CardTitle>
          <CardContent className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {sortedArticles &&
              sortedArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden dark:bg-gray-950 relative border hover:-translate-y-[5px] transition-all duration-700"
                >
                  <Link href={`/article/${article.attributes.title}`}>
                    <Image
                      alt={article.attributes.title}
                      className="w-full h-52 object-cover"
                      height={225}
                      src={article.attributes.image.data.attributes.url}
                      style={{
                        aspectRatio: "400/225",
                        objectFit: "cover",
                      }}
                      width={400}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        <Link className="hover:underline" href="#">
                          {article.attributes.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        發文日期: {getTimeString(article.attributes.createdAt)}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
