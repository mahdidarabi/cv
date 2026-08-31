/** @type {import('next').NextConfig} */
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath =
  isGitHubPagesBuild && repositoryName ? `/${repositoryName}` : undefined;

const nextConfig = {
  output: isGitHubPagesBuild ? "export" : "standalone",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
};

module.exports = nextConfig;
