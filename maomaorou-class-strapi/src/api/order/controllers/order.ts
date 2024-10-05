/**
 * order controller
 */

import { factories } from "@strapi/strapi";
import { NewebPaymentService } from "../../../lib/newebpay";

type INewebPayReturnCallbackBody = {
  Status: string;
  MerchantID: string;
  Version: string;
  TradeInfo: string;
  TradeSha: string;
};

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async newebPayNotifyCallback(ctx) {
      const newebPaymentService = new NewebPaymentService();
      const newBody = ctx.request.body as INewebPayReturnCallbackBody;

      const decodedInfo = newebPaymentService.confirmOrderPayment(
        newBody.TradeInfo,
        newBody.TradeSha
      );

      const payments = await strapi.services["api::payment.payment"].find({
        filters: { id: decodedInfo.Result.MerchantOrderNo },
        populate: [
          "order",
          "order.order_courses",
          "order.order_courses.course",
          "order.user",
        ],
      });

      if (payments === null || payments.results.length < 1) {
        return;
      }

      const payment = payments.results[0];

      await strapi.services["api::order.order"].update(payment.order.id, {
        data: {
          status: "success",
        },
      });

      await strapi.services["api::payment.payment"].update(payment.id, {
        data: {
          status: "success",
        },
      });

      await Promise.all(
        payment.order.order_courses.map(async (orderCourse) => {
          const userCourseStatuses = await strapi.services[
            "api::user-courses-status.user-courses-status"
          ].find({
            filters: {
              user: payment.order.user.id,
              course: orderCourse.course.id,
            },
          });

          const userCourseStatus = userCourseStatuses.results;

          const perDay = 1000 * 60 * 60 * 24;

          if (userCourseStatus.length === 0) {
            // 如果沒有購買過這門課
            await strapi.services[
              "api::user-courses-status.user-courses-status"
            ].create({
              data: {
                user: payment.order.user.id,
                course: orderCourse.course.id,
                expiredAt: new Date(
                  new Date().getTime() +
                    orderCourse.course.firstDurationDay * perDay
                ),
              },
            });
          } else {
            // 如果有購買過這門課

            const isOriginalStatusExpired =
              new Date(userCourseStatus[0].expiredAt) < new Date();

            const newExpiredAt = isOriginalStatusExpired
              ? new Date(
                  new Date().getTime() +
                    orderCourse.course.firstDurationDay * perDay
                )
              : new Date(
                  new Date(userCourseStatus[0].expiredAt).getTime() +
                    orderCourse.course.renewDurationDay * perDay
                );

            await strapi.services[
              "api::user-courses-status.user-courses-status"
            ].update(userCourseStatus[0].id, {
              data: {
                expiredAt: newExpiredAt,
              },
            });
          }
        })
      );

      ctx.send(
        {
          message: "The Payment successs!",
        },
        200
      );
    },
    async adminConfirmPayment(ctx: any) {
      const requestUrl = ctx.request.url;
      const orderId = Number(requestUrl.split("/").pop());

      const orderResult = await strapi.services["api::order.order"].find({
        filters: { id: orderId },
        populate: ["order_courses", "order_courses.course", "payments", "user"],
      });

      if (orderResult === null || orderResult.results.length < 1) {
        return;
      }

      const order = orderResult.results[0];

      const payments = order.payments;

      if (payments === null || payments.length < 1) {
        return;
      }

      // find the latest
      const payment = payments.reduce((acc, cur) => {
        const latestCreateAtAcc = new Date(acc.createdAt).toTimeString();
        const latestCreateAtCur = new Date(cur.createdAt).toTimeString();

        if (latestCreateAtAcc > latestCreateAtCur) {
          return acc;
        } else {
          return cur;
        }
      }, payments[0]);

      await strapi.services["api::order.order"].update(order.id, {
        data: {
          status: "success",
        },
      });

      await strapi.services["api::payment.payment"].update(payment.id, {
        data: {
          status: "success",
        },
      });

      await Promise.all(
        order.order_courses.map(async (orderCourse) => {
          const userCourseStatuses = await strapi.services[
            "api::user-courses-status.user-courses-status"
          ].find({
            filters: {
              user: order.user.id,
              course: orderCourse.course.id,
            },
          });

          const userCourseStatus = userCourseStatuses.results;

          const perDay = 1000 * 60 * 60 * 24;

          if (userCourseStatus.length === 0) {
            // 如果沒有購買過這門課
            await strapi.services[
              "api::user-courses-status.user-courses-status"
            ].create({
              data: {
                user: order.user.id,
                course: orderCourse.course.id,
                expiredAt: new Date(
                  new Date().getTime() +
                    orderCourse.course.firstDurationDay * perDay
                ),
              },
            });
          } else {
            // 如果有購買過這門課

            const isOriginalStatusExpired =
              new Date(userCourseStatus[0].expiredAt) < new Date();

            const newExpiredAt = isOriginalStatusExpired
              ? new Date(
                  new Date().getTime() +
                    orderCourse.course.firstDurationDay * perDay
                )
              : new Date(
                  new Date(userCourseStatus[0].expiredAt).getTime() +
                    orderCourse.course.renewDurationDay * perDay
                );

            await strapi.services[
              "api::user-courses-status.user-courses-status"
            ].update(userCourseStatus[0].id, {
              data: {
                expiredAt: newExpiredAt,
              },
            });
          }
        })
      );

      const orderCourseString = order.order_courses
        .map((orderCourse) => {
          return `${orderCourse.course.title} - ${orderCourse.option}`;
        })
        .join(", ");

      const totalPrice = order.order_courses.reduce((acc, orderCourse) => {
        return Number(acc) + Number(orderCourse.price);
      }, 0);

      const isDev = process.env.NODE_ENV === "development";
      await strapi.plugins["email"].services.email.send({
        to: isDev ? "rgok307085@gmail.com" : order.user.email,
        from: process.env.SMTP_USERNAME,
        cc: process.env.SMTP_USERNAME,
        bcc: process.env.SMTP_USERNAME,
        replyTo: process.env.SMTP_USERNAME,
        subject: `您於貓貓肉課程網站中訂單編號${orderId}已繳款成功`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
          <title>使用者繳款通知</title>
          </head>
          <body>

          <h1>您的訂單編號${orderId}已繳費成功</h1>

          <p>購買的課程內容為：${orderCourseString}</p>
          <p>總金額為： ${Number(totalPrice).toLocaleString()}</p>
          <p>請回到網站 > 我的課程 開始瀏覽課程內容吧！</p>

          </body>
          </html>

          `,
      });

      ctx.send(
        {
          message: "The Payment successs!",
        },
        200
      );
    },
  })
);
