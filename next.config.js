/** @type {import('next').NextConfig} */
const isStaticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig = {
  output: isStaticExport ? "export" : "standalone",
  trailingSlash: true,
};

module.exports = nextConfig;
