
/** @type {import('next').NextConfig} **/
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    basePath: '/3rdAnniversary.github.io',
    assetPrefix: '/3rdAnniversary.github.io/',
    distDir: 'out', // Add this line
};

export default nextConfig;
