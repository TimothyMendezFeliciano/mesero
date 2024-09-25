import '../styles/global.css';
import 'react-chat-widget/lib/styles.css';
import type { Session } from 'next-auth';
import { getSession, SessionProvider } from 'next-auth/react';
import type { AppType } from 'next/app';
import { trpc } from 'utils/trpc';
import Head from 'next/head';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <meta name="application-name" content="Mesero" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mesero" />
        <meta
          name="description"
          content="Schedule your employees efficiently."
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <meta name="twitter:card" content="Mesero" />
        <meta name="twitter:url" content="https://meseropr.com" />
        <meta name="twitter:title" content="Mesero" />
        <meta
          name="twitter:description"
          content="Schedule your employees hassle free"
        />
        <meta
          name="twitter:image"
          content="https://meseropr.com/icons/android-chrome-192x192.png"
        />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mesero" />
        <meta
          property="og:description"
          content="Schedule your employees hassle free"
        />
        <meta property="og:site_name" content="MeseroPR" />
        <meta property="og:url" content="https://meseropr.com" />
        <meta
          property="og:image"
          content="https://meseropr.com/icons/apple-touch-icon.png"
        />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    session: await getSession(ctx),
  };
};

export default trpc.withTRPC(MyApp);
