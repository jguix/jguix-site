import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AboutPhoto } from '../../components/AboutPhoto';
import { Markdown } from '../../components/Markdown';
import { globals } from '../../globals';
import { loadMarkdownFile } from '../../loader';

type Props = { resume: string };

const Resume: FC<Props> = ({ resume }) => {
  const { t } = useTranslation('resume', { useSuspense: false });

  return (
    <div className="content">
      <Head>
        <title>{`${t('title')} - ${globals.siteName}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="introduction">
        <AboutPhoto
          name="Juangui Jordán"
          photoSrc="/img/authors/jguix.jpeg"
        ></AboutPhoto>
        <Markdown source={resume} />
      </div>
    </div>
  );
};

export default Resume;

export const getStaticProps = async ({ locale }: any) => {
  const resume = (await loadMarkdownFile('resume/resume.md', locale)).contents;

  const props: Props = {
    resume,
    ...(await serverSideTranslations(locale, ['common', 'resume'])),
  };

  return { props };
};
