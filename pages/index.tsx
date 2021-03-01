import Head from "next/head";
import { generateRSS } from "../rssUtil";
import { PostData, loadBlogPosts, loadMarkdownFile } from "../loader";
import { PostCard } from "../components/PostCard";

const Home = (props: {
  introduction: string;
  features: string;
  readme: string;
  posts: PostData[];
}) => {
  return (
    <div className="content">
      <Head>
        <title>Juangui Jordán</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="section">
        <h1>Blog</h1>
        <p>This is my collection of blog posts at medium and mimacom.</p>
        <div className="post-card-container">
          {props.posts.map((post, j) => {
            return <PostCard post={post} key={j} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const introduction = await loadMarkdownFile("introduction.md");
  const features = await loadMarkdownFile("features.md");
  const readmeFile = await import(`../${"README.md"}`);
  const readme = readmeFile.default;
  const posts = await loadBlogPosts();

  // comment out to turn off RSS generation during build step.
  await generateRSS(posts);

  const props = {
    introduction: introduction.contents,
    features: features.contents,
    readme: readme,
    posts,
  };

  return { props };
};
