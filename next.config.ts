import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/api/auth/callback/google",
        destination: "/api/auth/callback/google",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
