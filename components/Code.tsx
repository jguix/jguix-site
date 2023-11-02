import { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type Props = {
  language: string;
  value?: string;
};

export const Code: FC<Props> = ({ language, value }) => {
  return (
    // @ts-ignore fixing 'SyntaxHighlighter' cannot be used as a JSX component
    <SyntaxHighlighter
      language={(language === 'ts' ? 'typescript' : language) || 'typescript'}
      style={darcula}
    >
      {value || ''}
    </SyntaxHighlighter>
  );
};
