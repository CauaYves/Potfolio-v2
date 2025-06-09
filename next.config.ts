import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async redirects() {
		return [{ source: "/", destination: "/inicio", permanent: true }];
	},
};

export default nextConfig;
