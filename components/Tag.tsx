import { FC } from 'react';

type Props = {
  tag: string;
};

export const Tag: FC<Props> = ({ tag }) => {
  return <div className="tag">{tag}</div>;
};
