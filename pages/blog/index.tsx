import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { FC } from "react";

import { PostCard } from "../../components/PostCard";
import { globals } from "../../globals";
import { loadBlogPosts, PostData } from "../../loader";
import { generateRSS } from "../../rssUtil";

type Props = {
  posts: PostData[];
};

const Blog: FC<Props> = ({ posts }) => {
  const { t } = useTranslation("blog");

  return (
    <div className="content">
      <Head>
        <title>
          {t("title")} - {globals.siteName}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="section">
        <h1>{t("title")}</h1>
        <p>{t("description")}</p>
        <div className="post-card-container">
          {posts.map((post, j) => {
            return <PostCard post={post} key={j} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Blog;

export const getStaticProps = async ({ locale }: any) => {
  const posts = await loadBlogPosts();

  // comment out to turn off RSS generation during build step.
  await generateRSS(posts);

  const props = {
    posts,
    ...(await serverSideTranslations(locale, ["common", "blog"])),
  };

  return { props };
};
