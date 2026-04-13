import type { NextConfig } from "next";
import path from "path";


const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/LebenInDeutschland',
  assetPrefix: '/LebenInDeutschland',
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
