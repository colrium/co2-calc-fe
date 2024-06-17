/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	transpilePackages: ['@mui/x-charts'],
	async rewrites() {
		const destination =
			process.env.NODE_ENV === 'development'
				? 'https://co2-calc-be.onrender.com/v1/:slug*'
				: 'https://co2-calc-be.onrender.com/v1/:slug*';
		return [
			{
				source: '/api/:slug*',
				destination
			}
		];
	}
};

module.exports = nextConfig;
