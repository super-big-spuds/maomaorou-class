import Image from "next/image";
import { gql } from "@/__generated__/gql";
import { createApolloSSRClient } from "@/lib/apollo-client";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "貓貓肉課程",
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
    <div className="flex flex-col items-center justify-between py-4 w-full">
      {/* Banner */}
      <Image
        className="aspect-[4/1] w-full min-h-[200px]"
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
        <h2 className="text-2xl font-bold my-4 text-center">課程介紹</h2>
        <div className="flex gap-x-4 md:flex-row flex-col relative z-10 md:p-10 sm:p-6 justify-center items-center">
          {data?.courses?.data.map((course) => (
            <Link
              key={course.id}
              href={`/course/${course.attributes?.title}`}
              className="w-fit aspect-[1/1] hover:-translate-y-[40px] opacity-75 hover:opacity-100 transition-all duration-700"
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
    </div>
  );
}
