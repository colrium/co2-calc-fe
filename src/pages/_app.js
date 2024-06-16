// import '@/api';
import RootLayout from '@/layouts';
import { wrapper, store, persistor } from '@/store';
import "@/styles/globals.css";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
		<Provider store={store}>
			<PersistGate
				persistor={persistor}
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
		</Provider>
  );
}
export default wrapper.withRedux(App);
