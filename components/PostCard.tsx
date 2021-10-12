import { format } from 'fecha';
import Link from 'next/link';
import { FC } from 'react';

import { PostData } from '../loader';

type Props = {
  post: PostData;
};

export const PostCard: FC<Props> = ({ post }) => {
  const { datePublished, description, path, subtitle, title, thumbnailPhoto } =
    post;

  return (
    <Link href={`/${path}`}>
      <a className="post-card">
        <div className="post-card-inner">
          {thumbnailPhoto && (
            <div
              className="post-card-thumbnail"
              style={{ backgroundImage: `url(${thumbnailPhoto})` }}
            />
          )}
          <div className="post-card-title">
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
            <p>
              {datePublished
                ? format(new Date(datePublished), 'MMMM Do, YYYY')
                : ''}
            </p>
            <div className="flex-spacer">
              {description?.substring(0, 92)}
              {description && description?.length > 80 && '...'}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
