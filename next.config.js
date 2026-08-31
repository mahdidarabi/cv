/** @type {import('next').NextConfig} */
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  output: isGitHubPagesBuild ? "export" : "standalone",
  trailingSlash: true,
};

module.exports = nextConfig;
