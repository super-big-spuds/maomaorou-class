import { gql } from "@/__generated__";
import { Button } from "@/components/ui/button";
import { createApolloSSRClient } from "@/lib/apollo-client";

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

export default async function CoursePage({
  params,
}: {
  params: { courseTitle: string };
}) {
  const courseTitle = decodeURI(params.courseTitle);

  const { data } = await createApolloSSRClient().query({
    query: QUERY,
    variables: {
      title: courseTitle,
    },
  });

  return (
    <div>
      <p>Course Title:{data.courseByTitle?.data?.attributes?.title}</p>
      <p>{data.courseByTitle?.data?.attributes?.image.data?.attributes?.url}</p>
      <p>Course Price:{data.courseByTitle?.data?.attributes?.price}</p>
      <p>
        Course Description:{data.courseByTitle?.data?.attributes?.description}
      </p>
      <p>Course Goal:{data.courseByTitle?.data?.attributes?.goal}</p>

      <ul>
        {data.courseByTitle?.data?.attributes?.chapters?.data?.map(
          (chapter) => (
            <li key={chapter.id}>
              <p>Chapter Name:{chapter.attributes?.name}</p>
              <p>Chapter Sequence:{chapter.attributes?.sequence}</p>
              <ul>
                {chapter.attributes?.lessons?.data.map((lesson) => (
                  <li key={lesson.id}>
                    <p>Lesson Name:{lesson.attributes?.name}</p>
                    <p>Lesson Sequence:{lesson.attributes?.sequence}</p>
                  </li>
                ))}
              </ul>
            </li>
          )
        )}
      </ul>

      <Button>Add to Cart</Button>
    </div>
  );
}
