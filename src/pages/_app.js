// import '@/api';
import RootLayout from '@/layouts';
import { wrapper } from '@/store';
import "@/styles/globals.css";
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


const App = ({ Component, pageProps }) => {
  const store = useStore();
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
		<PersistGate
			persistor={store.__persistor}
			loading={
				<div className="h-screen w-screen flex item-center justify-center">
					<span className="loading loading-spinner text-info"></span>
				</div>
			}
		>
			<RootLayout>
				{getLayout(<Component {...pageProps} />)}
				{/* <Component {...pageProps} /> */}
			</RootLayout>
		</PersistGate>
  );
}
export default wrapper.withRedux(App);
