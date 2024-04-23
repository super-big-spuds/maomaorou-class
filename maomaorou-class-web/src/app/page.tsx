import Image from "next/image";
import { gql } from "@/__generated__/gql";
import { createApolloSSRClient } from "@/lib/apollo-client";
import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { z } from "zod";

export const metadata: Metadata = {
  title: "首頁 - 貓貓肉線上課程網站",
  description: "貓貓肉課程介紹",
};

const QUERY = gql(`
query GetMainPageQueryData {
  courses {
    data {
      id
      attributes {
        title
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

export default async function Home() {
  const { data } = await createApolloSSRClient().query({
    query: QUERY,
  });

  const parsedData = schema.parse(data);

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
        <Card className="flex flex-col items-center justify-between px-6 pb-6">
          <CardTitle className="text-2xl md:text-3xl mt-4">
            貓貓肉數位交易學習網
          </CardTitle>

          {/* Banner */}
          <Image
            className="aspect-[4/1] w-full min-h-[200px] my-2"
            src={
              parsedData.decorationSetting.data.attributes
                .landingPageBackgroundImage.data.attributes.url
            }
            alt="MaoMaoRou Background Image"
            width={500}
            height={500}
          />

          {/* Courses */}
          <div className="flex justify-center w-full flex-col">
            <div className="flex gap-4 md:flex-row flex-col relative z-10 pt-2 justify-center items-center">
              {parsedData.courses.data.map((course) => (
                <Link
                  key={course.id}
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
        </Card>

        {/* News */}
        <Card className="flex flex-col items-center justify-between px-6 pb-6">
          <CardTitle className="text-2xl md:text-3xl my-4">最新消息</CardTitle>
          <CardContent className="flex flex-wrap flex-row gap-4 justify-start items-start">
            {sortedArticles &&
              sortedArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden dark:bg-gray-950 relative hover:-translate-y-[5px] opacity-75 hover:opacity-100 transition-all duration-700"
                >
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
                </article>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
