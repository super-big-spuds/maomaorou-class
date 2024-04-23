import { gql } from "@/__generated__/gql";
import StrapiMdxToHtmlConverter from "@/components/mdx-converter/strapi-mdx-to-html-converter";
import { createApolloSSRClient } from "@/lib/apollo-client";
import { z } from "zod";
import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
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
          content
          updatedAt
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
        content: z.string(),
        updatedAt: z.string(),
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
      <h1 className="text-4xl text-primary-100">關於我們</h1>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <span className="py-1 text-gray-200">最新更新日期:</span>
          <p className="ml-2 text-gray-200">
            {parsedData.newByTitle.data.attributes.updatedAt}
          </p>
        </div>
      </div>
      <hr />
      <StrapiMdxToHtmlConverter
        mdx={parsedData.newByTitle.data.attributes.content}
      />
    </Card>
  );
}
