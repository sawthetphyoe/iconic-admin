const cspHeader = `
    upgrade-insecure-requests
`

/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ['iconic.sgp1.digitaloceanspaces.com']
    },
    env: {
        API_URL: process.env.API_URL,
        STORAGE_URL: process.env.STORAGE_URL,
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: cspHeader.replace(/\n/g, ''),
                    },
                ],
            },
        ]
    },
};

export default nextConfig;
