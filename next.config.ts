import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		instrumentationHook: true,
		serverActions: {
			bodySizeLimit: "10mb",
		},
	},
	async redirects() {
		return [{ source: "/", destination: "/inicio", permanent: true }];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
};

export default nextConfig;
