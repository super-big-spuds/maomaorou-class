import Image from "next/image";
import { gql } from "@/__generated__/gql";
import { createApolloSSRClient } from "@/lib/apollo-client";
import Link from "next/link";

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
  const { data, error } = await createApolloSSRClient().query({
    query: QUERY,
  });

  return (
    <div className="flex flex-col items-center justify-between py-4 w-full">
      {/* Banner */}
      <Image
        className="aspect-[4/1] w-full"
        src={
          data.decorationSetting?.data?.attributes?.landingPageBackgroundImage
            .data?.attributes?.url || ""
        }
        alt="MaoMaoRou Background Image"
        width={500}
        height={500}
      />

      {/* Courses */}
      <div className="flex">
        <h2>課程介紹</h2>
        <div className="flex gap-x-4  w-5/6 relative z-10 p-10 justify-center items-center">
          {data?.courses?.data.map((course) => (
            <Link
              key={course.id}
              href={`/course/${course.attributes?.title}`}
              className="w-full aspect-[1/1] hover:-translate-y-[40px] opacity-75 hover:opacity-100 transition-all duration-700"
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
