import '../lib/styles/globals.css';
import type { AppProps } from 'next/app';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
