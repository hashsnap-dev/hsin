import { FC } from 'react';
import styled, { css } from 'styled-components';
import { ContentWidth, ContentWidth2 } from '@/styles/variables';
import { desktop, mobile } from '@/styles/utils';

export const Content = styled.div<{
  padding?: string|number;
  mobilePadding?: string|number;
}>`
  margin: 0 auto;
${desktop(css`
  width: 1232px;
  `)}
  padding: ${({padding}) => padding !== undefined ? padding : '0 16px'};
  
${mobile(css`
  width: 100%;
  padding: ${({mobilePadding}: any) => mobilePadding !== undefined ? mobilePadding : '0 16px'};
`)}
`;

const ContentSection: FC<{ className?: string; padding?: number|string; mobilePadding?: number|string;}> = ({
  className,
  padding,
  mobilePadding,
  children,
}) => {
  return <Content className={className ?? ''} padding={padding} mobilePadding={mobilePadding}>{children}</Content>;
};

export default ContentSection;
