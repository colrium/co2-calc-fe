import ThemeRegistry from '@/components/ThemeRegistry';

import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CO2 Calculator',
  description: 'Textile manufacturing Carbon Footprint',
}

export default function RootLayout({ children }) {
  return (
		<html lang="en">
			<head>
				<link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
			</head>
			<body className={inter.className}>
				<ThemeRegistry options={{ key: 'mui-theme' }}>{children}</ThemeRegistry>
			</body>
		</html>
  );
}
