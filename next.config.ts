import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ohmypizza.com.ua",
      },
    ],
  },
};

export default nextConfig;
