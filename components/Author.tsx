import { FC } from 'react';

import { AuthorLines } from './AuthorLines';

type Props = {
  author?: string;
  authorPhoto?: string;
  authorTwitter?: string;
  datePublished: number;
};

export const Author: FC<Props> = ({
  author,
  authorPhoto,
  authorTwitter,
  datePublished,
}) => {
  return (
    <div className="author-container">
      <div className="author">
        {authorPhoto && <img src={authorPhoto} className="author-image" />}
        <AuthorLines
          author={author}
          authorTwitter={authorTwitter}
          datePublished={datePublished}
        />
      </div>
    </div>
  );
};
