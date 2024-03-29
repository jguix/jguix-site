import glob from 'glob';
import matter from 'gray-matter';

import { globals } from './globals';

export type PostData = {
  path: string;
  title: string;
  subtitle?: string;
  content: string;
  description?: string;
  canonicalUrl?: string;
  published: boolean;
  datePublished: number;
  author?: string;
  authorPhoto?: string;
  authorTwitter?: string;
  tags?: string[];
  bannerPhoto?: string;
  thumbnailPhoto?: string;
};

type RawFile = { path: string; contents: string };

export const loadMarkdownFile = async (
  path: string,
  locale?: string
): Promise<RawFile> => {
  const localePath = !locale || locale === 'en' ? '' : `${locale}/`;
  const mdFile = await import(`./md/${localePath}${path}`);
  return { path, contents: mdFile.default };
};

export const mdToPost = (file: RawFile): PostData => {
  const metadata = matter(file.contents);
  const path = file.path.replace('.md', '');
  const post = {
    path,
    title: metadata.data.title,
    subtitle: metadata.data.subtitle || null,
    published: metadata.data.published || false,
    datePublished: new Date(metadata.data.datePublished)?.getTime() || null,
    tags: metadata.data.tags || null,
    description: metadata.data.description || null,
    canonicalUrl: metadata.data.canonicalUrl || `${globals.url}/${path}`,
    author: metadata.data.author || null,
    authorPhoto: metadata.data.authorPhoto || null,
    authorTwitter: metadata.data.authorTwitter || null,
    bannerPhoto: metadata.data.bannerPhoto || null,
    thumbnailPhoto: metadata.data.thumbnailPhoto || null,
    content: metadata.content,
  };

  if (!post.title) throw new Error(`Missing required field: title.`);

  if (!post.content) throw new Error(`Missing required field: content.`);

  if (!post.datePublished)
    throw new Error(`Missing required field: datePublished.`);

  return post as PostData;
};

export const loadMarkdownFiles = async (path: string, locale?: string) => {
  const blogPaths = glob.sync(`./md/${path}`);
  const postDataList = await Promise.all(
    blogPaths.map((blogPath) => {
      const modPath = blogPath.slice(blogPath.indexOf(`md/`) + 3);
      return loadMarkdownFile(`${modPath}`, locale);
    })
  );
  return postDataList;
};

export const loadPost = async (
  path: string,
  locale?: string
): Promise<PostData> => {
  const file = await loadMarkdownFile(path, locale);
  return mdToPost(file);
};

export const loadBlogPosts = async (locale?: string): Promise<PostData[]> => {
  return await (
    await loadMarkdownFiles(`blog/*.md`, locale)
  )
    .map(mdToPost)
    .filter((p) => p.published)
    .sort((a, b) => (b.datePublished || 0) - (a.datePublished || 0));
};
