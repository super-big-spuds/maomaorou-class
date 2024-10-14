/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maomaorou.s3.us-east-1.amazonaws.com",
        pathname: "**",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "ccore.newebpay.com",
        "core.newebpay.com",
        "maomaoro.com",
        "pajusdtdoit.com",
        "localhost",
      ],
      allowedForwardedHosts: [
        "localhost",
        "maomaoro.com",
        "pajusdtdoit.com",
        "core.newebpay.com",
        "ccore.newebpay.com",
      ],
    },
  },
};

export default nextConfig;
