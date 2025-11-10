import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // helps Next's server components tracer include prisma packages
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
  },
  outputFileTracingIncludes: {
    // include engines for route handlers that use Prisma
    "app/api/**/route": [
      "./node_modules/.prisma/client",
      "./node_modules/@prisma/client",
    ],
    // include engines for pages that use Prisma directly
    "app/**/page": [
      "./node_modules/.prisma/client",
      "./node_modules/@prisma/client",
    ],
  },
};

export default nextConfig;
