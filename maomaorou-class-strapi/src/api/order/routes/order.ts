/**
 * order router
 */

import { factories } from "@strapi/strapi";
import { customRouter } from "../../../lib/helper";

const defaultRoutes = factories.createCoreRouter("api::order.order");

const customRoutes = [
  {
    method: "POST",
    path: "/order/neweb-pay-notify-callback",
    handler: "order.newebPayNotifyCallback",
  },
];

export default customRouter(defaultRoutes, customRoutes);
