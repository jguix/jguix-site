import '../styles/base.css';

import { I18nSettings, setGlobalDateI18n } from 'fecha';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { globals } from '../globals';

const localeOpts: { [key: string]: Partial<I18nSettings> } = {
  en: {
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    amPm: ['am', 'pm'],
    // D is the day of the month, function returns something like...  3rd or 11th
    DoFn: (D: number) => {
      return (
        D +
        ['th', 'st', 'nd', 'rd'][D % 10 > 3 || D - (D % 10) !== 10 ? 0 : D % 10]
      );
    },
  },
  es: {
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    dayNames: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ],
    monthNamesShort: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    amPm: ['am', 'pm'],
    // D is the day of the month, function returns something like...  3rd or 11th
    DoFn: (D: number) => {
      return `${D}`;
    },
  },
};

const setLocale = (locale: string) => {
  console.log(`Setting locale to ${locale}`);
  setGlobalDateI18n(localeOpts[locale]);
};

const App: FC = ({ Component, pageProps }: any) => {
  const router = useRouter();
  const locale = router.locale || 'en';

  useEffect(() => {
    setLocale(locale);
  }, [locale]);

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
