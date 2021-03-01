import Head from "next/head";
import { generateRSS } from "../../rssUtil";
import { PostData, loadBlogPosts, loadMarkdownFile } from "../../loader";
import { PostCard } from "../../components/PostCard";
import { globals } from "../../globals";

const Blog = (props: {
  introduction: string;
  features: string;
  readme: string;
  posts: PostData[];
}) => {
  return (
    <div className="content">
      <Head>
        <title>Blog - {globals.siteName}</title>
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

export default Blog;

export const getStaticProps = async () => {
  const readmeFile = await import(`../../${"README.md"}`);
  const readme = readmeFile.default;
  const posts = await loadBlogPosts();

  // comment out to turn off RSS generation during build step.
  await generateRSS(posts);

  const props = {
    readme: readme,
    posts,
  };

  return { props };
};
