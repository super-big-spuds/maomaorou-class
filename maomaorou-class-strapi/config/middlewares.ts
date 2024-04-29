export default ({ env }) => [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            `${env("AWS_BUCKET")}.s3.${env("AWS_REGION")}.amazonaws.com`,
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            `${env("AWS_BUCKET")}.s3.${env("AWS_REGION")}.amazonaws.com`,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      headers: ["*"],
      origin: [
        process.env.FRONTEND_URL,
        process.env.BACKEND_URL,
        process.env.DOMAIN_URL,
        process.env.DOMAIN_URL_BK,
        "http://103.17.11.140:1338",
        process.env.UN_SECURE_BACKEND_URL,
      ],
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  {
    name: "strapi::body",
    config: {
      jsonLimit: "256mb",
      formLimit: "256mb",
      textLimit: "256mb",
      formidable: {
        maxFileSize: 1024 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
