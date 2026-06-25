import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            // Legacy /en URLs → root (English, SEO)
            { source: '/en', destination: '/', permanent: true },
            { source: '/en/:path*', destination: '/:path*', permanent: true },
        ];
    },
    compress: true,
    images: {
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 31536000,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
            },
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
            },
            {
                protocol: 'https',
                hostname: 'pub-635765e60e044bfc82141478ad1f9dbb.r2.dev',
            },
            {
                protocol: 'https',
                hostname: 'blog.panaceamedcare.com',
            },
            {
                protocol: 'https',
                hostname: 'www.panaceamedcare.com',
            },
            {
                protocol: 'https',
                hostname: 'panaceamedcare.com',
            },
        ],
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, './src'),
        };
        return config;
    },
};

export default withNextIntl(nextConfig);
