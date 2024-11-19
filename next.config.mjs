/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cloud.appwrite.io"],
  },
  env: {
    API_URL: process.env.API_URL,
    STORAGE_URL: process.env.STORAGE_URL,
    APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
    BUCKET_ID: process.env.BUCKET_ID,
  },
};

export default nextConfig;
