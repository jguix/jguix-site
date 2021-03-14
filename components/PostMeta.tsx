import React, { FC } from "react";

import { PostData } from "../loader";
import { Meta } from "./Meta";

export const PostMeta: FC<{ post: PostData }> = ({ post }) => {
  return (
    <Meta
      meta={{
        title: post?.title,
        desc: post?.description,
        link: post?.canonicalUrl,
        image: post?.bannerPhoto,
      }}
    />
  );
};
