import { gql } from "@/__generated__/gql";
import StrapiMdxToHtmlConverter from "@/components/mdx-converter/strapi-mdx-to-html-converter";
import { createApolloSSRClient } from "@/lib/apollo-client";
import { z } from "zod";
import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "服務條款",
  description: "貓貓肉課服務條款",
};
const QUERY = gql(`
  query getTerm {
    term {
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
  term: z.object({
    data: z.object({
      id: z.string(),
      attributes: z.object({
        content: z.string(),
        updatedAt: z
          .string()
          .transform((v) => new Date(v).toISOString().slice(0, 10)),
      }),
    }),
  }),
});

export default async function TermsPage() {
  const { data } = await createApolloSSRClient().query({
    query: QUERY,
  });

  const parsedData = schema.safeParse(data);

  if (!parsedData.success) {
    throw new Error("取得服務條款內容錯誤");
  }

  return (
    <Card className="mx-auto flex h-fit w-4/5 flex-col p-4 gap-y-2">
      <h1 className="text-4xl text-primary-100">服務條款</h1>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <span className="bg-primary-100 py-1 text-gray-200">
            最新更新日期:
          </span>
          <p className="ml-2 text-gray-200">
            {parsedData.data.term.data.attributes.updatedAt}
          </p>
        </div>
      </div>
      <hr />
      <StrapiMdxToHtmlConverter
        mdx={parsedData.data.term.data.attributes.content}
      />
    </Card>
  );
}
