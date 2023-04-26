import { alignItems, mobile } from '@/styles/utils';
import { AquaBlue, AquaBlue550, Gray300, Gray500 } from '@/styles/variables';
import { FC, MouseEventHandler, useState } from 'react';
import styled, { css } from 'styled-components';
import Link from '../../Link';

const Container = styled.ul`
  margin-top: 32px;
  padding: 0;
`;

const ItemContainer = styled.li<{ thumbnail: string; isOpen?: boolean }>`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${({ isOpen }) => (isOpen ? AquaBlue : Gray300)};
  transition: border 0.3s;

  h4 {
    user-select: none;
    width: 100%;
    cursor: pointer;

    font-size: 16px;
    font-weight: 500;
    color: ${AquaBlue550};
    padding: 0 77px;
    ${alignItems('center')}
    height: 56px;
    background-image: url(/assets/icon_guide_accordion_title.svg),
      url(/assets/icon_guide_accordion_arrow_${({ isOpen }) =>
        isOpen ? 'up' : 'down'}.svg);
    background-repeat: no-repeat, no-repeat;
    background-position: 36px center, right 34px center;
  }

  .HHr {
    display: block;
    width: 1160px;
    border-top: 1px solid ${Gray300};
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
    width: 100%;
    min-height: 281px;
    padding: 32px 32px 32px 428px;
    background: url(${({ thumbnail }) => thumbnail}) no-repeat 40px center /
      360px 213px;

    font-size: 16px;
    color: ${Gray500};

    p {
      width: 100%;
    }
  }
  .comment {
    margin-top: 30px;
    font-size: 14px;
    color: ${AquaBlue};

    b {
      font-weight: 700;
    }
  }

  ${mobile(css`
    h4 {
      font-size: 15px;
      padding: 18px 52px;
      background-position: 18px center, right 18px center;
      background-size: 16px, 16px;
    }
    .HHr {
      display: block;
      width: 95%;
      border-top: 1px solid ${Gray300};
    }
    .content {
      flex-direction: column;
      padding: 244px 20px 24px 20px;
      background-position: center 24px;
      background-size: 80%;
      font-size: 14px;
      height: unset;
    }
  `)}

  ${({ isOpen }) =>
    isOpen
      ? ''
      : css`
          .HHr,
          .content {
            display: none;
          }
        `}
`;

export const AccordionLink = styled(Link)`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 500;
  color: ${AquaBlue};
  padding: 12px 10px;
  border: 1px solid ${Gray300};
  border-radius: 4px;

  ${mobile(css`
    font-size: 14px;
    margin-top: 30px;
    width: 100%;
    text-align: center;
    padding: 8px 10px;
  `)}
`;

export const AccordionItem: FC<{ thumbnail: string }> = ({
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler: MouseEventHandler<HTMLElement> = (ev) => {
    if ((ev.target as HTMLElement).tagName !== 'H4') return;
    setIsOpen((val) => !val);
  };

  return (
    <ItemContainer {...props} onClick={toggleHandler} isOpen={isOpen}>
      {children}
    </ItemContainer>
  );
};

const AccordionGroup: FC<{ className?: string }> = (props) => {
  return <Container {...props} />;
};

export default AccordionGroup;
