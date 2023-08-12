/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "mars.nasa.gov",
        port: "",
      },
      {
        protocol: "http",
        hostname: "mars.jpl.nasa.gov",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
