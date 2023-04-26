import { FC } from 'react';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { ContentWidth } from '@/styles/variables';
import { desktop, mobile } from '@/styles/utils';
import MainAnimation from './MainAnimation';

const Container = styled.section`
  ${desktop(css`
    height: 460px;

    .c1 {
      min-width: ${ContentWidth};
      height: 100%;
      background: #0d37a4;
    }
    .c2 {
      width: ${ContentWidth};
      height: 100%;
      margin: 0 auto;
      background: #0d37a4 no-repeat 112px 100px;
      video {
        position: absolute;
      }
    }
    .c3 {
      position: relative;
      padding-top: 134px;
      margin-left: 686px;
    }
    p {
      padding-left: 11px;
    }
    .t1 {
      margin-top: 37px;
      font-size: 20px;
    }
    .t2 {
      margin-top: 15px;
      font-size: 26px;
      font-weight: 500;
    }
    .t3 {
      margin-top: 32px;
      font-size: 16px;
    }
  `)}

  ${mobile(css`
    width: 100%;
    background: #11349e no-repeat center bottom / 100%;
    height: 100vh;
    text-align: center;
    overflow: hidden;

    .c1 {
      height: 100%;
    }
    .c2 {
      height: 100%;
      overflow: hidden;
      position: relative;
    }
    .c2 video {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    .c3 {
      position: relative;
      padding-top: 22vh;
    }
    .t1 {
      margin-top: 40px;
    }
    .t2 {
      margin-top: 12px;
      font-size: 30px;
    }
    .t3 {
      margin-top: 36px;
    }
  `)}
.small-display {
    display: none;
  }
  @media screen and (max-width: 375px) {
    .small-display {
      display: block;
    }
    .t1 {
      font-size: 14px;
    }
    .t3 {
      font-size: 14px;
      margin-top: 8px;
    }
    iframe {
      opacity: 0;
    }
  }
`;

const MainImageSection: FC<{}> = () => {
  return (
    <Container className="font-notosans">
      <div className="c1 margin-center white">
        <div className="c2">
          <MainAnimation />
          {/* <video src="/assets/main_infographic.webm" muted autoPlay loop /> */}
          <div className="c3">
            <Image
              src="/assets/logo_hsin_white.png"
              alt="HSIN (Health Supplements Information portal)"
              width="161"
              height="45"
            />
            <p className="t1">
              소비자에게 객관적이고
              <br className="small-display" /> 올바른 정보를 제공하는
            </p>
            <p className="t2">
              건강기능식품 <br className="small-display" /> 종합정보포털
            </p>
            <p className="t3 noto-sans-kr">
              <span className="MGreen">H</span>ealth{' '}
              <span className="MGreen">S</span>upplements{' '}
              <span className="MGreen">IN</span>formation portal
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MainImageSection;
