const path = require('path')
/** @type {import('next').NextConfig} */
const nextConfig = {
     webpack: (config) => {
         config.resolve.alias['@'] = path.join(__dirname, 'src')
         return config
     },
     output: 'export',
     images: {
         unoptimized: true,
     },
     basePath: '/3rdAnniversary.github.io',
     assetPrefix: '/3rdAnniversary.github.io/',
     distDir: 'out', // Add this line
};

export default nextConfig;
