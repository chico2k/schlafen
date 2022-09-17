import '../lib/styles/globals.css';
import type { AppProps } from 'next/app';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      setLoading(true);
    };
    const handleComplete = (url: string, { shallow }: { shallow: boolean }) => {
      setLoading(false);
    };
    router.events.on('routeChangeComplete', handleComplete);

    router.events.on('routeChangeStart', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  });

  return (
    <>
      {!loading && (
        <div>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      )}
      {loading && (
        <div className='flex justify-center items-center text-3xl'>
          {' '}
          Loading
        </div>
      )}
    </>
  );
}

export default MyApp;
