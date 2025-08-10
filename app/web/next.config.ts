import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    turbopack: {
        resolveExtensions: ['.mdx','.web.ts', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
    },
    webpack: (
        config
    ) => {
        config.resolve.extensions = ['.web.ts', '.ts', '.tsx','.js', '.json', ...config.resolve.extensions]
        // Important: return the modified config
        return config
    }
};

export default nextConfig;
