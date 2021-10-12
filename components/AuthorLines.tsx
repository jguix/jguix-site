import { format } from 'fecha';
import { FC } from 'react';

import classes from './AuthorLines.module.css';

type Props = {
  author?: string;
  authorTwitter?: string;
  datePublished: number;
};

export const AuthorLines: FC<Props> = ({
  author,
  authorTwitter,
  datePublished,
}) => {
  return (
    <div>
      <p className={classes.line}>
        {author && <span>{author}</span>}

        {authorTwitter && (
          <span>
            {' '}
            <a
              href={`https://twitter.com/${authorTwitter}`}
              target="new"
            >{`@${authorTwitter}`}</a>{' '}
          </span>
        )}
      </p>
      <p className={classes.lineSubtle}>
        {datePublished ? format(new Date(datePublished), 'MMMM Do, YYYY') : ''}
      </p>
    </div>
  );
};
