/** @type {import('next').NextConfig} */

// const nextConfig = {};

// export default nextConfig;

const nextConfig = {
  env: {
    // LOGIN_API_KEY: process.env.LOGIN_API_KEY,
    REQUEST_API_KEY: process.env.REQUEST_API_KEY,
    KMEMO_API_KEY: process.env.KMEMO_API_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
  },

  reactStrictMode: true,
  // webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  // async rewrite() {
  //   return [
  //     {
  //       source: "/email/:path*",
  //       destination: "http://localhost:8080/:path"
  //     }
  //   ]
  // }
  // async headers() {
  //   return [
  //       {
  //           // matching all API routes
  //           // source: "/api/:path*",
  //           source: "/:path*",
  //           headers: [
  //               { key: "Access-Control-Allow-Credentials", value: "true" },
  //               { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
  //               { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
  //               { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
  //           ]
  //       }
  //   ]
  // },
};

export default nextConfig;
