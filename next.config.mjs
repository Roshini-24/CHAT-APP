/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ hostname: "youthful-mongoose-779.convex.cloud" },
			//{ hostname: "oaidalleapiprodscus.blob.core.windows.net" }, host name taken from the base url of generated image
		],
	},
};

export default nextConfig;
