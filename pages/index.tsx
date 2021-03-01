import Head from "next/head";
import { FC } from "react";
import { Markdown } from "../components/Markdown";
import { globals } from "../globals";
import { loadMarkdownFile } from "../loader";

const AboutPhoto: React.FC<{ name: string; photoSrc: string }> = (props) => {
  return (
    <>
      <div className="about-author-container">
        <div className="about-author">
          <img src={props.photoSrc} className="about-author-image" />
        </div>
      </div>
      <h2 className="about-author-name">{props.name}</h2>
    </>
  );
};

type Props = { about: string; resume: string };

const Home: FC<Props> = ({ about, resume }) => {
  return (
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
        <Markdown source={"---"} />
        <Markdown source={resume} />
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const about = (await loadMarkdownFile("about/about.md")).contents;
  const resume = (await loadMarkdownFile("about/resume.md")).contents;

  const props: Props = {
    about,
    resume,
  };

  return { props };
};
