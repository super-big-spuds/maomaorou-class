"use client";

import Image from "next/image";
import { gql } from "@/__generated__/gql";
import Link from "next/link";
import useToken from "@/hook/useToken";
import { useQuery } from "@apollo/client";
import { z } from "zod";
import { useEffect, useState } from "react";

const QUERY = gql(`
query getBuyedCourses {
  buyedCourses {
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
}
`);

const schema = z.object({
  buyedCourses: z.array(
    z.object({
      data: z.object({
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
      }),
    })
  ),
});

export default function MyCoursesPage() {
  const { token } = useToken();
  const { data, loading } = useQuery(QUERY, {
    skip: !token,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  const [parsedData, setParsedData] = useState<z.infer<typeof schema> | null>(
    null
  );

  useEffect(() => {
    if (data) {
      const result = schema.safeParse(data);

      if (result.success) {
        setParsedData(result.data);
      }
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-between py-4 w-full">
      {/* Courses */}
      <div className="flex justify-center w-full flex-col">
        <h2 className="text-2xl font-bold my-4 text-center">課程介紹</h2>
        <div className="flex gap-x-4 md:flex-row flex-col relative z-10 md:p-10 sm:p-6 justify-center items-center">
          {loading && <div className="text-center">載入中...</div>}
          {!loading &&
            parsedData !== null &&
            parsedData.buyedCourses.length === 0 && (
              <div className="text-center">尚未購買課程</div>
            )}
          {!loading &&
            parsedData !== null &&
            parsedData.buyedCourses.map((course) => (
              <Link
                key={course.data.id}
                href={`/learning-course/${course.data.attributes.title}`}
                className="w-fit aspect-[1/1] hover:-translate-y-[40px] opacity-75 hover:opacity-100 transition-all duration-700"
              >
                <Image
                  src={course.data.attributes.image.data.attributes.url || ""}
                  alt={course.data.attributes.title || ""}
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
