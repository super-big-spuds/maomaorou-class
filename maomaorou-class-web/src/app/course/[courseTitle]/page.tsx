import { gql } from "@/__generated__";
import CourseAddToCartButton from "@/components/cart/course-add-to-cart-button";
import { createApolloSSRClient } from "@/lib/apollo-client";
import { redirect } from "next/navigation";
import { z } from "zod";

const QUERY = gql(`
query GetCourseQueryData($title: String!) {
    courseByTitle(title: $title) {
      data {
        id
        attributes {
          title
          goal
          description
          price
          durationDay
          chapters {
          	data {
              id
              attributes {
                name
                sequence
                lessons {
                  data {
                    id
                    attributes {
                      name
                      sequence 
                    }
                  }
                }
              }
            }
        	}
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
  courseByTitle: z.object({
    data: z.object({
      id: z.string(),
      attributes: z.object({
        title: z.string(),
        goal: z.string(),
        description: z.string(),
        price: z.number(),
        durationDay: z.number(),
        chapters: z.object({
          data: z.array(
            z.object({
              id: z.string(),
              attributes: z.object({
                name: z.string(),
                sequence: z.number(),
                lessons: z.object({
                  data: z.array(
                    z.object({
                      id: z.string(),
                      attributes: z.object({
                        name: z.string(),
                        sequence: z.number(),
                      }),
                    })
                  ),
                }),
              }),
            })
          ),
        }),
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
  }),
});

export default async function CoursePage({
  params,
}: {
  params: { courseTitle: string };
}) {
  const courseTitle = decodeURI(params.courseTitle);

  const { data: rawData } = await createApolloSSRClient().query({
    query: QUERY,
    variables: {
      title: courseTitle,
    },
  });

  const result = schema.safeParse(rawData);

  if (!result.success) {
    redirect("/not-found");
  }
  const { data } = result;

  return (
    <div>
      <p>Course Title:{data.courseByTitle.data.attributes.title}</p>
      <p>{data.courseByTitle.data.attributes.image.data.attributes.url}</p>
      <p>Course Price:{data.courseByTitle.data.attributes.price}</p>
      <p>
        Course Description:
        {data.courseByTitle.data.attributes.description}
      </p>
      <p>Course Goal:{data.courseByTitle.data.attributes.goal}</p>

      <ul>
        {data.courseByTitle.data.attributes.chapters.data.map((chapter) => (
          <li key={chapter.id}>
            <p>Chapter Name:{chapter.attributes.name}</p>
            <p>Chapter Sequence:{chapter.attributes.sequence}</p>
            <ul>
              {chapter.attributes.lessons.data.map((lesson) => (
                <li key={lesson.id}>
                  <p>Lesson Name:{lesson.attributes.name}</p>
                  <p>Lesson Sequence:{lesson.attributes.sequence}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <CourseAddToCartButton
        courseId={data.courseByTitle.data.id}
        title={data.courseByTitle.data.attributes.title}
        price={data.courseByTitle.data.attributes.price}
      />
    </div>
  );
}
