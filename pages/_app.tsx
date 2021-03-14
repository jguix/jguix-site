import "../styles/base.css";

import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import React, { FC } from "react";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { globals } from "../globals";

const App: FC = ({ Component, pageProps }: any) => {
  return (
    <div className="container">
      <Head>
        {globals.googleAnalyticsId && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${globals.googleAnalyticsId}`}
          ></script>
        )}
        {globals.googleAnalyticsId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('globals', '${globals.googleAnalyticsId}');
            `,
            }}
          ></script>
        )}
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};

export default appWithTranslation(App);
