import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📊</text></svg>"
          />
          <meta name="keywords" content="data visualization, steel production, analytics, dashboard" />
          <meta
            name="description"
            content="Advanced steel production monitoring and analytics platform by Hrithik P Gowda."
          />
          <meta name="author" content="Hrithik P Gowda" />
          <meta property="og:title" content="Steel Production Analytics Dashboard" />
          <meta
            property="og:description"
            content="Advanced steel production monitoring and analytics platform by Hrithik P Gowda."
          />
          {/* <meta property="og:url" content={data.site.siteMetadata.siteUrl} /> */}
          {/* <link rel="canonical" href={`${data.site.siteMetadata.siteUrl}`} /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
