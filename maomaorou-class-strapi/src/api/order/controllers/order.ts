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
  })
);
