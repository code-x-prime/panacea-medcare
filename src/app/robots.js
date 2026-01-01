export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/',
        },
        sitemap: 'https://panacea-medcare.vercel.app/sitemap.xml',
    }
}
