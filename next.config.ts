import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "sn1odfv42uxzov8w.public.blob.vercel-storage.com"
    }, {
      protocol: "https",
      hostname: "image.tmdb.org"
    }]
  }
};

export default nextConfig;