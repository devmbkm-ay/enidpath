import path from "path";
import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname),
};

export default withPayload(nextConfig);
