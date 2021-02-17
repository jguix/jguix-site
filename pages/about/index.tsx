import Head from "next/head";
import { FC } from "react";
import { Markdown } from "../../components/Markdown";
import { loadMarkdownFile } from "../../loader";

type Props = { about: string };

const About: FC<Props> = ({ about }) => {
  return (
    <div className="content">
      <Head>
        <title>About me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="introduction">
        <h1>Juangui Jordán</h1>
        <Markdown source={about} />
      </div>
    </div>
  );
};

export default About;

export const getStaticProps = async () => {
  const about = await loadMarkdownFile("about.md");

  const props: Props = {
    about: about.contents,
  };

  return { props };
};
