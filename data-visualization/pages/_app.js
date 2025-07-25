import React from 'react';
import Head from 'next/head';
import 'src/style/style.css';
import 'src/style/reset.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Real-time Data Visualization Dashboard</title>
        <meta name="description" content="Interactive business intelligence dashboard with real-time data streaming" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
