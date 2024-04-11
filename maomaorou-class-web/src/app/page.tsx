import Image from "next/image";
import { gql } from "@/__generated__/gql";
import { createApolloSSRClient } from "@/lib/apollo-client";

const QUERY = gql(`
  query GetCourse {
    courses {
      data {
        id
      }
    }
  }
`);

export default async function Home() {
  const { data } = await createApolloSSRClient().query({
    query: QUERY,
  });
  console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Main Content
    </main>
  );
}
