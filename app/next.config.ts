import type { NextConfig } from "next";
import path from "path";


const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/lid-trainer',
  assetPrefix: '/lid-trainer',
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
