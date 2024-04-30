import { gql } from "@/__generated__/gql";
import StrapiMdxToHtmlConverter from "@/components/mdx-converter/strapi-mdx-to-html-converter";
import { createApolloSSRClient } from "@/lib/apollo-client";
import { z } from "zod";
import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import BlockedDownloadVideo from "@/components/ui/blocked-download-video";
export const metadata: Metadata = {
  title: "文章內容 - 貓貓肉線上課程網站",
  description: "貓貓肉線上課程網站文章內容",
};

const QUERY = gql(`
  query getArticleContent($title: String!) {
    newByTitle(title: $title){
      data {
        id
        attributes {
          title
          updatedAt
          content {
            __typename
            ... on ComponentLessonContentVideoContent {
              video {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            ... on ComponentLessonContentTextContent {
              richText
            }
          }
        }
      }
    }
  }
`);

const schema = z.object({
  newByTitle: z.object({
    data: z.object({
      id: z.string(),
      attributes: z.object({
        title: z.string(),
        updatedAt: z.string(),
        content: z.array(
          z.union([
            z.object({
              __typename: z.literal("ComponentLessonContentVideoContent"),
              video: z.object({
                data: z.object({
                  attributes: z.object({
                    url: z.string(),
                  }),
                }),
              }),
            }),
            z.object({
              __typename: z.literal("ComponentLessonContentTextContent"),
              richText: z.string(),
            }),
          ])
        ),
      }),
    }),
  }),
});

export default async function ArticlePage({
  params,
}: {
  params: {
    articleTitle: string;
  };
}) {
  const title = decodeURI(params.articleTitle);
  const { data } = await createApolloSSRClient().query({
    query: QUERY,
    variables: {
      title: title,
    },
  });

  const parsedData = schema.parse(data);

  return (
    <Card className="mx-auto flex h-fit w-4/5 flex-col p-4 gap-y-2">
      <h1 className="text-4xl text-primary-100">
        {parsedData.newByTitle.data.attributes.title}
      </h1>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <span className="py-1 text-gray-200">最新更新日期:</span>
          <p className="ml-2 text-gray-200">
            {parsedData.newByTitle.data.attributes.updatedAt}
          </p>
        </div>
      </div>
      <hr />
      {parsedData.newByTitle.data.attributes.content.length < 1 ? (
        <div>該文章尚未新增內容, 請稍後再來~</div>
      ) : parsedData.newByTitle.data.attributes.content[0].__typename ===
        "ComponentLessonContentVideoContent" ? (
        <BlockedDownloadVideo
          url={
            parsedData.newByTitle.data.attributes.content[0].video.data
              .attributes.url
          }
        />
      ) : (
        <StrapiMdxToHtmlConverter
          mdx={parsedData.newByTitle.data.attributes.content[0].richText}
        />
      )}
    </Card>
  );
}
