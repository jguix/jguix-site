import glob from "glob";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { FC } from "react";

import { BlogPost } from "../../components/BlogPost";
import { loadPost } from "../../loader";

const Post: FC = (props: any) => {
  const { post } = props;
  return <BlogPost post={post} />;
};

export const getStaticPaths = () => {
  const blogs = glob.sync("./md/blog/*.md");
  const slugs = blogs.map((file: string) => {
    const popped = file.split("/").pop();
    if (!popped) throw new Error(`Invalid blog path: ${file}`);
    return popped.slice(0, -3).trim();
  });

  const paths = slugs.map((slug) => `/blog/${slug}`);
  return { paths, fallback: false };
};

export const getStaticProps = async ({ locale, params }: any) => {
  const post = await loadPost(`blog/${params.blog}.md`);

  const props = {
    post,
    ...(await serverSideTranslations(locale, ["common"])),
  };

  return { props };
};

export default Post;
