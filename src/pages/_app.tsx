import type { AppProps } from 'next/app';
import { wrapper } from '../redux/store';
import { ErrorBoundary } from '../components/ErrorBoundary';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(App);
