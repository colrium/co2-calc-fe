/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	transpilePackages: ['@mui/x-charts'],
	async rewrites() {
		const destination =
			process.env.NODE_ENV === 'development' ? 'http://localhost:5000/v1/:slug*' : 'http://146.190.50.223:5000/v1/:slug*';
		return [
			{
				source: '/api/:slug*',
				destination
			}
		];
	}
};

module.exports = nextConfig;
