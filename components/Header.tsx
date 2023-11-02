import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { globals } from '../globals';
import classes from './Header.module.css';

export const Header: FC = () => {
  const { t } = useTranslation('common', { useSuspense: false });
  const router = useRouter();

  return (
    <div className={classes.header}>
      <Link href="/">{globals.siteName}</Link>
      <div className="flex-spacer" />
      <Link href="/blog">{t('header_blog')}</Link>
      <Link href="/resume">{t('header_resume')}</Link>
      <Link href={router.asPath} locale={router.locale === 'en' ? 'es' : 'en'}>
        {router.locale === 'en' ? t('language_es') : t('language_en')}
      </Link>
    </div>
  );
};
