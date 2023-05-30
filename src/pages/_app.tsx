import '../styles/global.css';

import type { AppProps } from 'next/app';

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{ initializeZustand: any }>) => {
  return <Component {...pageProps} />;
};

export default MyApp;
