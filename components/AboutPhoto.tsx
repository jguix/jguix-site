import { FC } from 'react';

import classes from './AboutPhoto.module.css';

type Props = {
  name: string;
  photoSrc: string;
};

export const AboutPhoto: FC<Props> = ({ name, photoSrc }) => {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.imageContainer}>
          <img src={photoSrc} className={classes.image} />
        </div>
      </div>
      <h2 className={classes.name}>{name}</h2>
    </>
  );
};
