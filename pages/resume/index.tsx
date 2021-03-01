import Head from "next/head";
import { FC } from "react";
import { Markdown } from "../../components/Markdown";
import { globals } from "../../globals";
import { loadMarkdownFile } from "../../loader";
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

type Props = { resume: string };

const Resume: FC<Props> = ({ resume }) => {
  return (
    <div className="content">
      <Head>
        <title>Resume - {globals.siteName}</title>
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

export const getStaticProps = async () => {
  const resume = (await loadMarkdownFile("resume/resume.md")).contents;

  const props: Props = {
    resume,
  };

  return { props };
};
