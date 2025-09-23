import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Image configuration (merged and optimized)
    images: {
        domains: [
            'img.shields.io',
            'shields.io',
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '/**',
            },
        ],
        unoptimized: true, // Helps reduce memory usage during build
    },
    
    // Build optimizations
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    
    // Standalone output for Docker
    output: 'standalone',
    
    // Compiler optimizations (valid for Next.js 15)
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    
    // Experimental features (removed invalid options)
    experimental: {
        // Add any valid experimental features here if needed
        // serverMinification: false, // Can help with build memory if needed
    },
};

export default nextConfig;
