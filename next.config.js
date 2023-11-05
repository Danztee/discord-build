/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      "utf-validate-8": "commonjs-utf-8-validate",
      bufferutil: "common-js bufferutil",
    });

    return config;
  },
  images: {
    domains: ["uploadthing.com", "utfs.io"],
  },
};

module.exports = nextConfig;
