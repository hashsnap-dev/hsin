import { Row } from '@/layouts/flex-utils';
import { flexCenter, mobile } from '@/styles/utils';
import { AquaBlue, Gray200, Gray300 } from '@/styles/variables';
import { ComponentProps, FC } from 'react';
import styled, { css } from 'styled-components';

export const TabContentContainer = styled.div`
  display: none;

  &.current {
    display: block;
  }
  ${mobile(css`
    position: relative;

    table,
    tbody,
    tr {
      display: block;
      width: 100%;
    }
    td {
      ${flexCenter()}
      width: 100% !important;
      border-bottom: 0 !important;
    }
    tr:last-child td:last-child {
      border-bottom: 1px solid ${Gray300} !important;
    }
  `)}
`;

const TabSelectContainer = styled.div`
  margin: 0 auto;
  margin-top: 16px;
  margin-bottom: 40px;
  width: 1232px;
  padding: 0 16px;
  div {
    border-bottom: 1px solid ${Gray200};
  }
  a {
    position: relative;
    height: 52px;
    padding: 0 20px;
    ${flexCenter()}
  }
  .current {
    color: ${AquaBlue};
    font-weight: 500;
  }
  .current:before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: ${AquaBlue};
  }

  ${mobile(css`
    width: 100%;
    margin-top: 22px;
    padding: 0;
    overflow-x: auto;
    overflow-y: hidden;
    border-bottom: 1px solid #eef1f1;
    div {
      border-bottom: 0;
    }
    ::-webkit-scrollbar {
      height: 0px;
    }
    a {
      white-space: nowrap;
    }
    ${Row} {
      justify-content: start;
    }
  `)}
`;

export const TabSelect: FC<{
  hash: string;
  onChange(url: string): void;
}> = ({ hash, onChange }) => {
  const clickHandler = ({ target }: any) => {
    onChange(new URL(target.href).hash);
  };

  return (
    <TabSelectContainer className="font-notosans">
      <Row justifyContent="center">
        <a
          href="#tab-1"
          className={hash === '#tab-1' ? 'current' : ''}
          onClick={clickHandler}
        >
          이상사례 관리 및 신고
        </a>
        <a
          href="#tab-2"
          className={hash === '#tab-2' ? 'current' : ''}
          onClick={clickHandler}
        >
          보고현황
        </a>
        <a
          href="#tab-3"
          className={hash === '#tab-3' ? 'current' : ''}
          onClick={clickHandler}
        >
          성별·연령별
        </a>
        <a
          href="#tab-4"
          className={hash === '#tab-4' ? 'current' : ''}
          onClick={clickHandler}
        >
          제품유형별
        </a>
        <a
          href="#tab-5"
          className={hash === '#tab-5' ? 'current' : ''}
          onClick={clickHandler}
        >
          증상별
        </a>
        <a
          href="#tab-6"
          className={hash === '#tab-6' ? 'current' : ''}
          onClick={clickHandler}
        >
          의료기관 이용여부별
        </a>
        <a
          href="#tab-7"
          className={hash === '#tab-7' ? 'current' : ''}
          onClick={clickHandler}
        >
          구입처 구분별
        </a>
      </Row>
    </TabSelectContainer>
  );
};

const TabContent: FC<ComponentProps<any>> = (props) => {
  return <TabContentContainer {...props} />;
};

export default TabContent;
