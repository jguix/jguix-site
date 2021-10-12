import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';

import { Code } from './Code';
import classes from './Markdown.module.css';

export const Markdown: React.FC<{ source: string }> = (props) => {
  return (
    <div className={classes.markdown}>
      <ReactMarkdown
        key="content"
        source={props.source}
        renderers={{
          code: Code,
        }}
        escapeHtml={false}
      />
    </div>
  );
};
