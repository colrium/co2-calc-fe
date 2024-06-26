import { Head, Html, Main, NextScript } from 'next/document';
export const metadata = {
	title: 'CO2 Calculator',
	description: 'Textile manufacturing Carbon Footprint'
};
export default function Document() {
  return (
		<Html lang="en">
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
  );
}
