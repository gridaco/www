import type { NextConfig } from "next";
import { site } from "./site.config";

const config: NextConfig = {
  basePath: site.basePath,
  // Match the main site's slash policy to avoid redirects between deployments.
  trailingSlash: false,
  reactStrictMode: true,
  // Repository guidance is maintained in the root AGENTS.md.
  agentRules: false,
  async redirects() {
    return [
      {
        source: site.basePath,
        destination: site.homeUrl,
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default config;
