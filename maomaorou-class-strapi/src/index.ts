import { Strapi } from "@strapi/strapi";
import { NewebPaymentService } from "./lib/newebpay";

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

    extensionService.use(({ strapi }) => ({
      typeDefs: `
      type createOrderWithPaymentResponse {
        paymentUrl: String
        error: String
      }

      type Mutation {
        createOrderWithPayment(courseIds: [ID]): createOrderWithPaymentResponse
      }

      `,
      resolvers: {
        Mutation: {
          createOrderWithPayment: {
            resolve: async (parent, args, context) => {
              const { toEntityResponse } = strapi.service(
                "plugin::graphql.format"
              ).returnTypes;

              const courses = await strapi.services["api::course.course"].find({
                filters: {
                  id: {
                    $in: args.courseIds,
                  },
                },
              });

              const order = await strapi.services["api::order.order"].create({
                data: {
                  user: context.state.user.id,
                },
              });

              const orderCourses = await Promise.all(
                courses.results.map(async (course) => {
                  await strapi.services[
                    "api::order-course.order-course"
                  ].create({
                    data: {
                      course: course.id,
                      order: order.id,
                      price: course.price,
                      expiredAt: new Date(
                        new Date().getTime() + course.durationDay * 1000
                      ),
                    },
                  });
                })
              );

              const payment = await strapi.services[
                "api::payment.payment"
              ].create({
                data: {
                  order: order.id,
                },
              });

              const paymentService = new NewebPaymentService();

              async function getPaymentURL() {
                return new Promise<{ paymentUrl: string; error: string }>(
                  (resolve, reject) => {
                    paymentService
                      .getPaymentUrl({
                        courses: courses.results.map((course) => ({
                          courseId: course.id,
                          name: course.title,
                          price: course.price,
                        })),
                        paymentId: payment.id,
                      })
                      .then((result) => {
                        resolve({
                          paymentUrl: result,
                          error: "",
                        });
                      })
                      .catch((error) => {
                        console.error(`Error whilte paying newebpay: ${error}`);
                        strapi.services["api::payment.payment"].update(
                          payment.id,
                          {
                            data: { status: "failed" },
                          }
                        );
                        resolve({
                          paymentUrl: "",
                          error: error.message,
                        });
                      });
                  }
                );
              }
              const { paymentUrl, error } = await getPaymentURL();

              return {
                paymentUrl: paymentUrl,
                error: error,
              };
            },
          },
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
