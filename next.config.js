/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	async rewrites() {
		return [
			{
				source: '/api/:slug*',
				destination: 'http://localhost:5000/v1/:slug*'
			}
		];
	}
};

module.exports = nextConfig
