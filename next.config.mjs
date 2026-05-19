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
            { source: '/doctors', destination: '/en/doctors', permanent: true },
            { source: '/doctors/:id', destination: '/en/doctors/:id', permanent: true },
            { source: '/hospitals', destination: '/en/hospitals', permanent: true },
            // Hospital slugs only — do not redirect /hospitals/*.jpg|.webp (static files in public/hospitals)
            { source: '/hospitals/:slug([^/.]+)', destination: '/en/hospitals/:slug', permanent: true },
            { source: '/treatments/:path*', destination: '/en/treatments/:path*', permanent: true },
            { source: '/services/:path*', destination: '/en/services/:path*', permanent: true },
            { source: '/about', destination: '/en/about', permanent: true },
            { source: '/contact', destination: '/en/contact', permanent: true },
            { source: '/blogs', destination: '/en/blogs', permanent: true },
            { source: '/blog', destination: '/en/blogs', permanent: true },
        ];
    },
    images: {
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
