import React, { FC } from 'react';

import { PostData } from '../loader';
import { Author } from './Author';
import { Markdown } from './Markdown';
import { Meta } from './Meta';
import { Tag } from './Tag';

type Props = {
  post: PostData;
};

export const BlogPost: FC<Props> = ({ post }) => {
  if (!post) return <></>;

  const {
    author,
    authorPhoto,
    authorTwitter,
    bannerPhoto,
    content,
    datePublished,
    subtitle,
    tags,
    title,
  } = post;

  return (
    <div className="blog-post">
      <Meta
        title={post?.title}
        desc={post?.description}
        link={post?.canonicalUrl}
        image={post?.bannerPhoto}
      />
      {bannerPhoto && <img className="blog-post-image" src={bannerPhoto} />}

      <div className="blog-post-title">
        {title && <h1>{title}</h1>}
        {subtitle && <h2>{subtitle}</h2>}
        <br />
        <Author
          author={author}
          authorPhoto={authorPhoto}
          authorTwitter={authorTwitter}
          datePublished={datePublished}
        />
        <br />
        {
          <div className="tag-container">
            {tags && (tags || []).map((tag) => <Tag key={tag} tag={tag} />)}
          </div>
        }
      </div>

      <div className="blog-post-content">
        <Markdown source={content} />
      </div>
    </div>
  );
};
