import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      './src/**/*': true
    }
  }
};

export default nextConfig;
