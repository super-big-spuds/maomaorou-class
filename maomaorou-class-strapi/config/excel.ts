export default {
  config: {
    "api::order.order": {
      columns: ["id", "status"],
      relation: {
        user: {
          column: ["username", "email"],
        },
        order_courses: {
          column: ["price"],
        },
      },
      locale: "false",
    },
  },
};
