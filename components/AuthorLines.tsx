import { format } from 'fecha';
import { FC } from 'react';

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
      <p className="author-line">
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
      <p className="author-line subtle">
        {datePublished ? format(new Date(datePublished), 'MMMM Do, YYYY') : ''}
      </p>
    </div>
  );
};
