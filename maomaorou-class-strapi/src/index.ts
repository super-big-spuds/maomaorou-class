import { Strapi } from "@strapi/strapi";
import { NewebPaymentService } from "./lib/newebpay";
import { errors } from "@strapi/utils";
const { ForbiddenError, NotFoundError } = errors;

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
          newByTitle(title: String!): NewEntityResponse
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
                publicationState: "preview",
              });

              const response = toEntityResponse(data.results[0]);

              return response;
            },
          },
          newByTitle: {
            resolve: async (parent, args, context) => {
              const { toEntityResponse } = strapi.service(
                "plugin::graphql.format"
              ).returnTypes;

              const data = await strapi.services["api::new.new"].find({
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
        "Query.newByTitle": {
          auth: false,
        },
      },
    }));

    extensionService.use(({ strapi }) => ({
      typeDefs: `
      type createOrderWithPaymentResponse {
        paymentUrl: String
        orderId: ID
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
                  const userCourseStatus = await strapi.services[
                    "api::user-courses-status.user-courses-status"
                  ].find({
                    filters: {
                      user: context.state.user.id,
                      course: course.id,
                    },
                  });

                  const isFirstBuy = userCourseStatus.results.length === 0;

                  const costPrice = isFirstBuy
                    ? course.firstPrice
                    : course.renewPrice;

                  const durationDay = isFirstBuy
                    ? course.firstDurationDay
                    : course.renewDurationDay;

                  return await strapi.services[
                    "api::order-course.order-course"
                  ].create({
                    data: {
                      course: course.id,
                      order: order.id,
                      price: costPrice,
                      durationDay: durationDay,
                    },
                    populate: ["course"],
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
                        courses: orderCourses.map((orderCourse) => ({
                          courseId: orderCourse.course.id,
                          name: orderCourse.course.title,
                          price: orderCourse.price,
                        })),
                        paymentId: payment.id,
                        orderId: order.id,
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
                orderId: order.id,
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
                populate: {
                  course: {
                    publicationState: "preview",
                  },
                },
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
          myOrder(orderId: ID!): OrderEntityResponse
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
          myOrder: {
            resolve: async (parent, args, context) => {
              const { toEntityResponse } = strapi.service(
                "plugin::graphql.format"
              ).returnTypes;

              const user = context.state.user;
              const orderId = args.orderId;

              const data = await strapi.services["api::order.order"].find({
                filters: { user: user.id, id: orderId },
              });

              if (data.results.length === 0) {
                throw new NotFoundError("Order not found");
              }

              return toEntityResponse(data.results[0]);
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

    extensionService.use(({ strapi }) => ({
      typeDefs: `
        type Query {
          myLesson(id: ID!): LessonEntityResponse
        }
      `,
      resolvers: {
        Query: {
          myLesson: {
            resolve: async (parent, args, context) => {
              const { toEntityResponse } = strapi.service(
                "plugin::graphql.format"
              ).returnTypes;

              const user = context.state.user;

              const lesson = await strapi.services["api::lesson.lesson"].find({
                filters: {
                  id: args.id,
                },
                publicationState: "preview",
                populate: ["chapter", "chapter.course"],
              });

              if (lesson.results.length === 0) {
                throw new NotFoundError("未找到該小節");
              }

              //Check auth
              const userCourseStatus = await strapi.services[
                "api::user-courses-status.user-courses-status"
              ].find({
                filters: {
                  user: user.id,
                  course: lesson.results[0].chapter.course.id,
                },
              });

              if (userCourseStatus.results.length === 0) {
                throw new ForbiddenError("使用者未購買此課程");
              }

              if (userCourseStatus.results[0].expiredAt < new Date()) {
                throw new ForbiddenError("使用者課程已過期");
              }

              return toEntityResponse(lesson.results[0]);
            },
          },
        },
      },
    }));

    extensionService.use(({ strapi }) => ({
      typeDefs: `
        type Course {
          withUserStatus: UserCoursesStatusEntityResponse
          staredLessons: [LessonEntityResponse]
          isFirstBuy: Boolean
        }
      `,
      resolvers: {
        Course: {
          withUserStatus: {
            resolve: async (parent, args, context) => {
              const { toEntityResponse } = strapi.service(
                "plugin::graphql.format"
              ).returnTypes;

              const user = context?.state?.user;

              if (user === null) {
                throw new ForbiddenError("使用者未登入");
              }

              const userCourseStatus = await strapi.services[
                "api::user-courses-status.user-courses-status"
              ].find({
                filters: {
                  user: user.id,
                  course: parent.id,
                },
              });

              return toEntityResponse(userCourseStatus.results[0]);
            },
          },
          staredLessons: {
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
                  course: parent.id,
                },
              });

              if (userCourseStatus.results.length === 0) {
                throw new ForbiddenError("使用者未購買此課程");
              }

              const lessons = await strapi.services["api::lesson.lesson"].find({
                filters: {
                  chapter: {
                    course: parent.id,
                  },
                  isStar: true,
                },
              });

              const lessonEntities = lessons.results.map((lesson) => {
                return toEntityResponse(lesson);
              });

              return lessonEntities;
            },
          },
          isFirstBuy: {
            resolve: async (parent, args, context) => {
              const user = context?.state?.user;

              if (!user) {
                return true;
              }

              const userCourseStatus = await strapi.services[
                "api::user-courses-status.user-courses-status"
              ].find({
                filters: {
                  user: user.id,
                  course: parent.id,
                },
              });

              return userCourseStatus.results.length === 0;
            },
          },
        },
      },
      resolversConfig: {
        "Course.staredLessons": {
          auth: false,
        },
        "Course.withUserStatus": {
          auth: false,
        },
        "Course.isFirstBuy": {
          auth: false,
        },
      },
    }));

    extensionService.use(({ strapi }) => ({
      typeDefs: `
          type Mutation {
            AddZeroPriceCourseToMyCourse(courseId: ID): UserCoursesStatusEntityResponse
          }
        `,
      resolvers: {
        Mutation: {
          AddZeroPriceCourseToMyCourse: {
            resolve: async (parent, args, context) => {
              const { toEntityResponse } = strapi.service(
                "plugin::graphql.format"
              ).returnTypes;

              const userId = context.state.user.id;
              const courseResult = await strapi.services[
                "api::course.course"
              ].find({
                filters: { id: args.courseId },
              });

              if (courseResult.results.length === 0) {
                throw new NotFoundError("找不到該課程");
              }

              const course = courseResult.results[0];

              const userCourseStatus = await strapi.services[
                "api::user-courses-status.user-courses-status"
              ].find({
                filters: {
                  user: userId,
                  course: args.courseId,
                },
              });

              // 第一次領取該課程
              if (userCourseStatus.results.length === 0) {
                if (course.firstPrice !== 0) {
                  throw new ForbiddenError("此課程不是免費課程");
                }

                const newUserCourseStatus = await strapi.services[
                  "api::user-courses-status.user-courses-status"
                ].create({
                  data: {
                    user: userId,
                    course: args.courseId,
                    expiredAt: new Date(
                      new Date().getTime() +
                        course.firstDurationDay * 1000 * 60 * 60 * 24
                    ),
                  },
                });
                return toEntityResponse(newUserCourseStatus);
              }

              // 已經擁有課程
              if (course.renewPrice !== 0) {
                throw new ForbiddenError("此課程不是續訂免費課程");
              }

              const isExpired =
                userCourseStatus.results[0].expiredAt < new Date();

              const newExpiredAt = isExpired
                ? new Date(
                    new Date().getTime() +
                      course.firstDurationDay * 1000 * 60 * 60 * 24
                  )
                : new Date(
                    new Date(userCourseStatus.results[0].expiredAt).getTime() +
                      course.renewDurationDay * 1000 * 60 * 60 * 24
                  );

              const newUserCourseStatus = await strapi.services[
                "api::user-courses-status.user-courses-status"
              ].update(userCourseStatus.results[0].id, {
                data: {
                  expiredAt: newExpiredAt,
                },
              });

              return toEntityResponse(newUserCourseStatus);
            },
          },
        },
      },
    }));

    extensionService.use(({ strapi }) => ({
      typeDefs: `

      type Mutation {
        userDoneHandlePayment(orderId: ID!): OrderEntityResponse
      }

      `,
      resolvers: {
        Mutation: {
          userDoneHandlePayment: {
            resolve: async (parent, args, context) => {
              const { toEntityResponse } = strapi.service(
                "plugin::graphql.format"
              ).returnTypes;

              const orderId = args.orderId;

              const orderResult = await strapi.services[
                "api::order.order"
              ].find({
                filters: { id: orderId },
                populate: ["user", "order_courses", "order_courses.course"],
              });

              if (orderResult.results.length === 0) {
                throw new NotFoundError("Order not found");
              }

              const user = context.state.user;

              const order = orderResult.results[0];

              if (order.user.id !== user.id) {
                throw new ForbiddenError("User not match");
              }

              const orderCourseString = order.order_courses
                .map((orderCourse) => {
                  return orderCourse.course.title;
                })
                .join(", ");

              const totalPrice = order.order_courses.reduce(
                (acc, orderCourse) => {
                  return Number(acc) + Number(orderCourse.price);
                },
                0
              );

              // send email
              const isDev = process.env.NODE_ENV === "development";
              await strapi.plugins["email"].services.email.send({
                to: isDev ? "rgok307085@gmail.com" : process.env.SMTP_USERNAME,
                from: process.env.SMTP_USERNAME,
                cc: process.env.SMTP_USERNAME,
                bcc: process.env.SMTP_USERNAME,
                replyTo: process.env.SMTP_USERNAME,
                subject: `貓貓肉課程網站, 訂單編號${orderId}已繳費`,
                html: `
                <!DOCTYPE html>
                <html>
                <head>
                <title>使用者繳款通知</title>
                </head>
                <body>

                <h1>訂單編號${orderId}已由使用者${user.username}進行繳費</h1>

                <p>購買的課程內容為：${orderCourseString}</p>
                <p>總金額為： ${Number(totalPrice).toLocaleString()}</p>
                <p>請確認款項是否已入帳</p>

                <a href="${
                  process.env.BACKEND_URL
                }/api/order/admin-confirmPayment/${orderId}">已入帳請點擊我為使用者確認款項</a>

                </body>
                </html>

                `,
              });

              return toEntityResponse(order);
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
