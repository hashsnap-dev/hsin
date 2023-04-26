import Link from '@/components/Link';
import { alignItems, desktop, flexCenter, mobile } from '@/styles/utils';
import { AquaBlue, Gray200, Gray600 } from '@/styles/variables';
import { FC, MouseEvent, MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  ${desktop(css`
    display: none;
  `)}
  color: ${Gray600};
  width: 100%;
  ${alignItems('center')};
  height: 64px;
  flex-wrap: nowrap;
  padding: 0 6px;
  border-bottom: 1px solid ${Gray200};

  a {
    position: relative;
    margin: 0 10px;
    white-space: nowrap;
    height: 100%;
    ${flexCenter()}
  }
  a.current {
    color: ${AquaBlue};
    font-weight: 500;
  }
  a.current:before {
    content: '';
    position: absolute;
    display: block;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: ${AquaBlue};
  }
  overflow-x: auto;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    height: 0px;
  }
`;
export const TabContent = styled.div<{ visible?: boolean }>`
  ${mobile(css`
    display: none;

    &.mobile-show {
      display: block;
    }
    /* ${({ visible }: any) =>
      visible
        ? css`
            display: block;
          `
        : ''}; */
  `)}
`;

const MobileTab: FC<{
  hash: string;
  onChange: (
    hash: string,
    ev: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) => void;
}> = ({ hash, onChange }) => {
  const clickHandler: MouseEventHandler<HTMLAnchorElement> = (ev) => {
    const { target } = ev;
    onChange(new URL((target as HTMLAnchorElement).href).hash, ev);
  };

  return (
    <Container className="font-notosans">
      <a
        href="#food-info-1"
        className={hash === '#food-info-1' ? 'current' : ''}
        onClick={clickHandler}
      >
        건강기능식품 정의{' '}
      </a>
      <a
        href="#food-info-2"
        className={hash === '#food-info-2' ? 'current' : ''}
        onClick={clickHandler}
      >
        기능성 정의
      </a>
      <a
        href="#food-info-3"
        className={hash === '#food-info-3' ? 'current' : ''}
        onClick={clickHandler}
      >
        기능성 원료 분류
      </a>
      <a
        href="#food-info-4"
        className={hash === '#food-info-4' ? 'current' : ''}
        onClick={clickHandler}
      >
        건강기능식품 인정 과정
      </a>
    </Container>
  );
};

export default MobileTab;
