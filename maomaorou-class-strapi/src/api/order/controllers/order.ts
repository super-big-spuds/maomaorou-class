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
    async newebPayNotifyCallback({ body }) {
      const newebPaymentService = new NewebPaymentService();
      const newBody = body as INewebPayReturnCallbackBody;

      const decodedInfo = newebPaymentService.confirmOrderPayment(
        newBody.TradeInfo,
        newBody.TradeSha
      );

      const payment = await strapi.services["api::payment.payment"].find({
        filters: { id: decodedInfo.Result.MerchantOrderNo },
        populate: "order",
      });

      if (payment === null) {
        return;
      }

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
    },
  })
);
