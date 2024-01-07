import RootLayout from '@/layouts';
import { wrapper } from '@/store';
import "@/styles/globals.css";
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
const App = ({ Component, pageProps }) => {
  const store = useStore();
  return (
		<PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <RootLayout>
				<Component {...pageProps} />
			</RootLayout>
		</PersistGate>
  );
}
export default wrapper.withRedux(App);
