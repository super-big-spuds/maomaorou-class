import Image from "next/image";
import { gql } from "@/__generated__/gql";
import { createApolloSSRClient } from "@/lib/apollo-client";
import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardTitle } from "@/components/ui/card";

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
  }
`);

export default async function Home() {
  const { data } = await createApolloSSRClient().query({
    query: QUERY,
  });

  return (
    <div className="flex justify-center w-full">
      <Card className="flex flex-col items-center justify-between px-6 pb-6 max-w-4xl">
        <CardTitle className="text-2xl md:text-3xl mt-4">
          貓貓肉數位交易學習網
        </CardTitle>

        {/* Banner */}
        <Image
          className="aspect-[4/1] w-full min-h-[200px] my-2"
          src={
            data.decorationSetting?.data?.attributes?.landingPageBackgroundImage
              .data?.attributes?.url || ""
          }
          alt="MaoMaoRou Background Image"
          width={500}
          height={500}
        />

        {/* Courses */}
        <div className="flex justify-center w-full flex-col">
          <div className="flex gap-4 md:flex-row flex-col relative z-10 pt-2 justify-center items-center">
            {data?.courses?.data.map((course) => (
              <Link
                key={course.id}
                href={`/course/${course.attributes?.title}`}
                className="w-fit aspect-[1/1] hover:-translate-y-[5px] opacity-75 hover:opacity-100 transition-all duration-700"
              >
                <Image
                  src={course.attributes?.image?.data?.attributes?.url || ""}
                  alt={course.attributes?.title || ""}
                  width={384}
                  height={384}
                />
              </Link>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
