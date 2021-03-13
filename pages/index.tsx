import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { FC } from "react";

import { AboutPhoto } from "../components/AboutPhoto";
import { Markdown } from "../components/Markdown";
import { globals } from "../globals";
import { loadMarkdownFile } from "../loader";

type Props = { about: string };

const Home: FC<Props> = ({ about }) => (
  <div className="content">
    <Head>
      <title>{globals.siteName}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="introduction">
      <AboutPhoto
        name="Juangui Jordán"
        photoSrc="/img/authors/jguix.jpeg"
      ></AboutPhoto>
      <Markdown source={about} />
    </div>
  </div>
);

export default Home;

export const getStaticProps = async ({ locale }: any) => {
  const about = (await loadMarkdownFile("about/about.md")).contents;

  const props: Props = {
    about,
    ...(await serverSideTranslations(locale, ["common"])),
  };

  return { props };
};
