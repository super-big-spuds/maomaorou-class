import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/accordion";
import { gql } from "@/__generated__/gql";
import { createApolloSSRClient } from "@/lib/apollo-client";
import { z } from "zod";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "常見問題",
  description: "常見問題介紹",
};

const QUERY = gql(`
  query getFAQ {
    faqs {
      data {
        id
        attributes {
          question
          answer
        }
      }
    }
  }
`);

const schema = z.object({
  faqs: z.object({
    data: z.array(
      z.object({
        id: z.string(),
        attributes: z.object({
          question: z.string(),
          answer: z.string(),
        }),
      })
    ),
  }),
});

export default async function FaqPage() {
  const { data } = await createApolloSSRClient().query({
    query: QUERY,
  });

  const parsedData = schema.parse(data);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
            常見問題
          </h1>
          <div className="space-y-4">
            <Accordion
              className="flex flex-col gap-y-4"
              collapsible
              type="single"
            >
              {parsedData.faqs.data.map((faq) => (
                <AccordionItem value={faq.id} key={faq.id}>
                  <AccordionTrigger className="p-2 flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 font-medium transition-colors hover:bg-gray-200 focus:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                    {faq.attributes.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2 pb-4 text-gray-500 dark:text-gray-400">
                    {faq.attributes.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
