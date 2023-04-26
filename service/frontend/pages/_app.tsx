import '../styles/globals.css';
import 'core-js/stable';
import 'whatwg-fetch';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/index.scss';
import { SWRConfig } from 'swr';
import { Provider } from 'react-redux';
import store from '@/store';

import {GA_TRACKING_ID} from '../lib/gtag';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as gtag from '../lib/gtag';

const NAVER_TRACKING_ID = 'e9f0de4039caf';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [router.events]);

  return (
    <Provider store={store}>
      <SWRConfig
        value={{
          fetcher: (resource, init: any) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <Head>
          <title>건강기능식품 정보포털</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <meta name="description" content="건강기능식품 정보포털은 허위과대광고, 오인혼동구매, 이상사례 발생 등 소비자 피해를 예방하기 위해 올바른 건강기능식품 정보를 제공합니다." />
          <meta name="author" content="한국건강기능식품협회" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.hsinportal.com/" />
          <meta property="og:title" content="건강기능식품 정보포털" />
          <meta property="og:image" content="/assets/og_image.png" />
          <meta property="og:description" content="건강기능식품 정보포털은 허위과대광고, 오인혼동구매, 이상사례 발생 등 소비자 피해를 예방하기 위해 올바른 건강기능식품 정보를 제공합니다." />
          <meta property="og:site_name" content="건강기능식품 정보포털" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <link rel="canonical" href="https://www.hsinportal.com/"></link>
          <link rel="icon" href="/assets/favicon_16x16.png" sizes="16x16" />
          <link rel="icon" href="/assets/favicon_32x32.png" sizes="32x32" />
          <link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css" />
          <meta name="naver-site-verification" content="cb8cde98269f7ce50369d6472475efbfeb4cc821" />
          {/* Global site tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}></script>
          <script dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname
            });
            `
          }} />
          {/* Naver Analytics */}
          <script type="text/javascript" src="//wcs.naver.net/wcslog.js"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
            if(!wcs_add) var wcs_add = {};
            wcs_add["wa"] = "${NAVER_TRACKING_ID}";
            if(window.wcs) {
              wcs_do();
            }`
          }} />
        </Head>
        <Component {...pageProps} />
      </SWRConfig>
    </Provider>
  );
}

export default MyApp;
