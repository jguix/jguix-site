import React, { FC } from "react";

import { PostData } from "../loader";
import { Author } from "./Author";
import { Markdown } from "./Markdown";
import { PostMeta } from "./PostMeta";
import { Tag } from "./Tag";

export const BlogPost: FC<{ post: PostData }> = ({ post }) => {
  if (!post) return <></>;

  const { bannerPhoto, content, subtitle, tags, title } = post;

  return (
    <div className="blog-post">
      <PostMeta post={post} />
      {bannerPhoto && <img className="blog-post-image" src={bannerPhoto} />}

      <div className="blog-post-title">
        {title && <h1>{title}</h1>}
        {subtitle && <h2>{subtitle}</h2>}
        <br />
        <Author post={post} />
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
