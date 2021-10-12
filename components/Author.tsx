import { FC } from 'react';

import classes from './Author.module.css';
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
    <div className={classes.container}>
      <div className={classes.author}>
        {authorPhoto && <img src={authorPhoto} className={classes.image} />}
        <AuthorLines
          author={author}
          authorTwitter={authorTwitter}
          datePublished={datePublished}
        />
      </div>
    </div>
  );
};
