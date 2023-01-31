import '../styles/global.css';

import type { AppProps } from 'next/app';

import { Provider, useCreateStore } from '@/hooks/useStore';

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{ initializeZustand: any }>) => {
  const serverInitialState = pageProps.initialZustandState ?? {};
  const createStore = useCreateStore(serverInitialState);

  return (
    <Provider createStore={createStore}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
