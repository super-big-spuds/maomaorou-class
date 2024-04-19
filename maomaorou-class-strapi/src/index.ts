import { Strapi } from "@strapi/strapi";
import { NewebPaymentService } from "./lib/newebpay";
import { errors } from "@strapi/utils";
const { ForbiddenError } = errors;

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

    extensionService.use(({ strapi }) => ({
      typeDefs: `
        type Query {
          buyedCourses: [CourseEntityResponse]
        }
      `,
      resolvers: {
        Query: {
          buyedCourses: {
            resolve: async (parent, args, context) => {
              const { toEntityResponse } = strapi.service(
                "plugin::graphql.format"
              ).returnTypes;

              const user = context.state.user;

              const userCourseStatus = await strapi.services[
                "api::user-courses-status.user-courses-status"
              ].find({
                filters: {
                  user: user.id,
                },
                populate: ["course"],
              });

              const userBuyedCourses = userCourseStatus.results.map(
                (userCourseStatus) => {
                  return userCourseStatus.course;
                }
              );

              const courseEntities = userBuyedCourses.map((course) => {
                return toEntityResponse(course);
              });

              return courseEntities;
            },
          },
        },
      },
    }));

    extensionService.use(({ strapi }) => ({
      typeDefs: `
        type Query {
          myOrders: [OrderEntityResponse]
        }
      `,
      resolvers: {
        Query: {
          myOrders: {
            resolve: async (parent, args, context) => {
              const { toEntityResponse } = strapi.service(
                "plugin::graphql.format"
              ).returnTypes;

              const user = context.state.user;

              const data = await strapi.services["api::order.order"].find({
                filters: { user: user.id },
              });

              const response = data.results.map((order) =>
                toEntityResponse(order)
              );

              return response;
            },
          },
        },
      },
    }));

    extensionService.use(({ strapi }) => ({
      typeDefs: `
        type Order {
          totalPrice: Int
        }
      `,
      resolvers: {
        Order: {
          totalPrice: {
            resolve: async (parent, args, context) => {
              const { toEntityResponse } = strapi.service(
                "plugin::graphql.format"
              ).returnTypes;

              const orderId = parent.id;

              const orderCourses = await strapi.services[
                "api::order-course.order-course"
              ].find({
                filters: { order: orderId },
              });

              const totalPrice = orderCourses.results.reduce(
                (acc, orderCourse) => {
                  return acc + orderCourse.price;
                },
                0
              );

              return totalPrice;
            },
          },
        },
      },
    }));

    extensionService.use(({ strapi }) => ({
      typeDefs: `
          input UpdateSelfUserProfileInput {
            username: String
            email: String
          }

          input UpdateSelfUserPasswordInput {
            originalPassword: String!
            newPassword: String!
          }

          type Mutation {
            UpdateSelfUserProfile(userProfile: UpdateSelfUserProfileInput): UsersPermissionsUserEntityResponse
            UpdateSelfUserPassword(userNewPasswordInfo: UpdateSelfUserPasswordInput): UsersPermissionsUserEntityResponse
          }
        `,
      resolvers: {
        Mutation: {
          UpdateSelfUserProfile: {
            resolve: async (parent, args, context) => {
              const { toEntityResponse } = strapi.service(
                "plugin::graphql.format"
              ).returnTypes;

              const userId = context.state.user.id;

              const newUser = await strapi.entityService.update(
                "plugin::users-permissions.user",
                userId,
                {
                  data: args.userProfile,
                }
              );

              return toEntityResponse(newUser);
            },
          },
          UpdateSelfUserPassword: {
            resolve: async (parent, args, context) => {
              const { toEntityResponse } = strapi.service(
                "plugin::graphql.format"
              ).returnTypes;

              const userId = context.state.user.id;

              const user = await strapi.entityService.findOne(
                "plugin::users-permissions.user",
                userId
              );

              const isUserPasswordMatch = await strapi.plugins[
                "users-permissions"
              ].services.user.validatePassword(
                args.userNewPasswordInfo.originalPassword,
                user.password
              );

              if (!isUserPasswordMatch) {
                throw new ForbiddenError("Password not match");
              }

              const newUser = await strapi.entityService.update(
                "plugin::users-permissions.user",
                userId,
                {
                  data: {
                    password: args.userNewPasswordInfo.newPassword,
                  },
                }
              );

              return toEntityResponse(newUser);
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
