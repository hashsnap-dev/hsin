import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'antd/dist/antd.css';
import '../styles/globals.css'; // antd.css 보다 뒤에 선언하여 우선순위

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools />}
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
