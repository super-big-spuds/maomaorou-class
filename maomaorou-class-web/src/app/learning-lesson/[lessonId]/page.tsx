"use client";

import { gql } from "@/__generated__";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/provider/user-provider";
import { useQuery } from "@apollo/client";
import { z } from "zod";
import StrapiMdxToHtmlConverter from "@/components/mdx-converter/strapi-mdx-to-html-converter";
import { Separator } from "@/components/ui/separator";
import BlockedDownloadVideo from "@/components/ui/blocked-download-video";

const QUERY = gql(`
query getMyLesson($id: ID!) {
  myLesson(id: $id) {
    data {
      id
      attributes {
        name
        sequence
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
  myLesson: z.object({
    data: z.object({
      id: z.string(),
      attributes: z.object({
        name: z.string(),
        sequence: z.number(),
        updatedAt: z.string().transform((v) => new Date(v).toLocaleString()),
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

export default function LearningLesson({
  params,
}: {
  params: {
    lessonId: string;
  };
}) {
  const { token } = useUser();
  const { data, loading } = useQuery(QUERY, {
    skip: !token,
    variables: { id: params.lessonId },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const parseResult = schema.safeParse(data);

  return (
    <div className="flex justify-center h-full items-center w-full m-4">
      <Card className="flex flex-col px-10 py-5 gap-6 w-full max-w-3xl">
        {loading || data === undefined ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ) : !parseResult.success ? (
          <p className="text-center text-red-400 text-xl font-bold">
            伺服器發生錯誤
          </p>
        ) : (
          <>
            <CardTitle>
              {parseResult.data.myLesson.data.attributes.name}
            </CardTitle>
            <CardDescription>
              上次更新: {parseResult.data.myLesson.data.attributes.updatedAt}
            </CardDescription>
            <Separator />
            <CardContent>
              {parseResult.data.myLesson.data.attributes.content.length < 1 ? (
                <div>尚未新增該小節的內容, 請稍後再來~</div>
              ) : parseResult.data.myLesson.data.attributes.content[0]
                  .__typename === "ComponentLessonContentVideoContent" ? (
                <BlockedDownloadVideo
                  url={
                    parseResult.data.myLesson.data.attributes.content[0].video
                      .data.attributes.url
                  }
                />
              ) : (
                <StrapiMdxToHtmlConverter
                  mdx={
                    parseResult.data.myLesson.data.attributes.content[0]
                      .richText
                  }
                />
              )}
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
