import { FC } from 'react';

import classes from './Tag.module.css';

type Props = {
  tag: string;
};

export const Tag: FC<Props> = ({ tag }) => {
  return <div className={classes.tag}>{tag}</div>;
};
