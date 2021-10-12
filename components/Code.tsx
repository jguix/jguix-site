import { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type Props = {
  language: string;
  value?: string;
};

export const Code: FC<Props> = ({ language, value }) => {
  return (
    <SyntaxHighlighter
      language={(language === 'ts' ? 'typescript' : language) || 'typescript'}
      style={darcula}
    >
      {value}
    </SyntaxHighlighter>
  );
};
