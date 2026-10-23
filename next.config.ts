import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Project listing lives at /studio; /projects/[slug] holds the case studies.
  // Phase C renames /studio to /work. When it ships, point /projects at /work
  // and add /studio -> /work, keeping every hop a single permanent redirect.
  async redirects() {
    return [
      { source: "/projects", destination: "/studio", permanent: true },
      { source: "/projects/pavillion-360", destination: "/projects/pavilion-360", permanent: true },
      { source: "/projects/oskaz-erp", destination: "/projects/obsidian-erp-v3.0", permanent: true },
    ];
  },
};

export default nextConfig;
