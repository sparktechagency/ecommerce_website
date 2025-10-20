import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'lerirides.nyc3.digitaloceanspaces.com',
      'avatar.iran.liara.run', // add this
    ],
  },
};

export default nextConfig;
