import glob from "glob";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { FC } from "react";

import { BlogPost } from "../../components/BlogPost";
import { loadPost } from "../../loader";

const Post: FC = (props: any) => {
  const { post } = props;

  return <BlogPost post={post} />;
};

export const getStaticPaths = (props?: any) => {
  const { locales } = props;
  const blogs = glob.sync("./md/blog/*.md");
  const slugs = blogs.map((file: string) => {
    const popped = file.split("/").pop();
    if (!popped) throw new Error(`Invalid blog path: ${file}`);
    return popped.slice(0, -3).trim();
  });

  const paths = slugs.flatMap((slug) =>
    locales.map((locale: string) => ({ params: { blog: slug }, locale }))
  );

  return { paths, fallback: true };
};

export const getStaticProps = async ({ locale, params }: any) => {
  const post = await loadPost(`blog/${params.blog}.md`, locale);

  const props = {
    post,
    ...(await serverSideTranslations(locale, ["common"])),
  };

  return { props };
};

export default Post;
