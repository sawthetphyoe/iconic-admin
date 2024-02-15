

/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ['iconic.sgp1.digitaloceanspaces.com']
    },
    env: {
        API_URL: process.env.API_URL,
        STORAGE_URL: process.env.STORAGE_URL,
    },
};

export default nextConfig;
