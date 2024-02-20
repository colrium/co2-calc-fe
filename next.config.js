/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	transpilePackages: ['@mui/x-charts'],
	async rewrites() {
		return [
			{
				source: '/api/:slug*',
				destination: 'http://localhost:5000/v1/:slug*',
				// destination: 'http://146.190.50.223:5000/v1/:slug*'
			}
		];
	}
};

module.exports = nextConfig;
