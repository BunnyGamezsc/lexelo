import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: 'export',

    turbopack: {
        resolveExtensions: ['.mdx','.desktop.ts', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
    },
    webpack: (
        config
    ) => {
        config.resolve.extensions = ['.desktop.ts', '.ts', '.tsx','.js', '.json', ...config.resolve.extensions]
        // Important: return the modified config
        return config
    }
};

export default nextConfig;
