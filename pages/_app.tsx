import { useEffect } from 'react';
import { Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Global } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import { LicenseInfo } from '@mui/x-license-pro';
import { ToastContextProvider } from '@hooks/utils/useToastContext';
import { theme } from '@styles/theme';
import globals from '@styles/globals';
import { useRouter } from 'next/router';
import { UserInfoProvider } from '@hooks/contexts/user/UserInfoContext';
import Script from 'next/script';
import * as gtag from '@utils/gtag';
import ReactQueryClientProvider from '@hooks/contexts/user/ReactQueryClientProvider';
import { AxiosProvider } from '@hooks/contexts/user/AxiosContext';

LicenseInfo.setLicenseKey(`${process.env.NEXT_PUBLIC_MUI_PRO_KEY}`);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => storePathValues, [router.asPath]);

  function storePathValues() {
    const storage = globalThis?.sessionStorage;

    if (!storage) return;
    const prevPath = storage.getItem('currentPath');
    if (prevPath) {
      storage.setItem('prevPath', prevPath);
    }
    storage.setItem('currentPath', globalThis.location.pathname);
  }

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // Disable keyboard shortcut for opening developer tools
      window.addEventListener('keydown', function (e) {
        if (e.keyCode === 123) {
          e.preventDefault();
        }
      });
      window.addEventListener('contextmenu', function (e) {
        e.preventDefault();
      });
    }
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
 window.dataLayer = window.dataLayer || [];
 function gtag(){dataLayer.push(arguments);}
 gtag('js', new Date());
 gtag('config', '${gtag.GA_TRACKING_ID}', {
   page_path: window.location.pathname,
 });
`,
        }}
      />
      <UserInfoProvider>
        <ReactQueryClientProvider>
          <Global styles={globals} />
          <ThemeProvider theme={theme}>
            <ToastContextProvider>
              <AxiosProvider>
                <Hydrate state={pageProps.dehydratedState}>
                  <ReactQueryDevtools initialIsOpen={true} />
                  <Head>
                    <title>어다아파 약국 앱</title>
                  </Head>
                  <Component {...pageProps} />
                </Hydrate>
              </AxiosProvider>
            </ToastContextProvider>
          </ThemeProvider>
        </ReactQueryClientProvider>
      </UserInfoProvider>
    </>
  );
}
