import Script from 'next/script';
import React, { FC, HTMLAttributes, ReactNode } from 'react';

const Markdownit: FC<{ text?: any } & HTMLAttributes<HTMLDivElement>> = ({
  text,
}) => {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/markdown-it@12.3.0/dist/markdown-it.min.js" />
      <div
        dangerouslySetInnerHTML={{
          __html:
            globalThis.markdownit?.({ html: true }).render(text ?? '') ?? '',
        }}
      />
    </>
  );
};

export default Markdownit;
