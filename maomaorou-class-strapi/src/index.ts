import { Strapi } from "@strapi/strapi";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Strapi }) {
    const extensionService = strapi.service("plugin::graphql.extension");

    extensionService.use(({ strapi }) => ({
      typeDefs: `
            type Query {
              courseByTitle(title: String!): CourseEntityResponse
            }
          `,
      resolvers: {
        Query: {
          courseByTitle: {
            resolve: async (parent, args, context) => {
              const { toEntityResponse } = strapi.service(
                "plugin::graphql.format"
              ).returnTypes;

              const data = await strapi.services["api::course.course"].find({
                filters: { title: args.title },
              });

              const response = toEntityResponse(data.results[0]);

              return response;
            },
          },
        },
      },
      resolversConfig: {
        "Query.courseByTitle": {
          auth: false,
        },
      },
    }));
  },
  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
