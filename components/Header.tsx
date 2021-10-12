import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { globals } from '../globals';

export const Header: FC = () => {
  const { t } = useTranslation('common', { useSuspense: false });
  const router = useRouter();

  return (
    <div className="header">
      <Link href="/">
        <a href="/">{globals.siteName}</a>
      </Link>
      <div className="flex-spacer" />
      <Link href="/blog">
        <a>{t('header_blog')}</a>
      </Link>
      <Link href="/resume">
        <a>{t('header_resume')}</a>
      </Link>
      <Link href={router.asPath} locale={router.locale === 'en' ? 'es' : 'en'}>
        <a>{router.locale === 'en' ? t('language_es') : t('language_en')}</a>
      </Link>
    </div>
  );
};
