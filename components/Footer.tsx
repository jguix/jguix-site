import { FC } from 'react';

import { globals } from '../globals';
import classes from './Footer.module.css';

export const Footer: FC = () => (
  <div className={classes.footer}>
    <p>{`© ${globals.yourName} ${new Date().getFullYear()}`}</p>
    <a href="/rss.xml">
      <img src="/img/rss-white.svg" alt="RSS Feed" height="30" width="30" />
    </a>
  </div>
);
