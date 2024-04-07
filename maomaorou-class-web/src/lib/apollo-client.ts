import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { LOCAL_BACKEND_URL } from "./env";

export const { getClient: createApolloSSRClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${LOCAL_BACKEND_URL}/graphql`,
    }),
  });
});
