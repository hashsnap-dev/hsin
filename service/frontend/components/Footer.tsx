import { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  ContentWidth,
  Gray200,
  Gray400,
  Gray500,
  Gray550,
  Gray600,
} from '@/styles/variables';
import Link from '@/components/Link';
import Image from 'next/image';
import { alignItems, desktop, flex, flexCenter, mobile } from '@/styles/utils';

const Container = styled.footer`
  border-top: 1px solid ${Gray200};
  .w1 {
    width: 1232px;
    padding: 0 16px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .c1 {
      font-weight: 800;
    }
    .c2 {
      font-size: 14px;
      font-weight: 500;
      a {
        display: inline-block;
        margin-left: 20px;
      }
    }
  }
  img {
    height: 34px;
  }
  ${desktop(css`
    min-width: 1232px;

    .HHr {
      border-top: 1px solid ${Gray200};
    }
    .VHr {
      height: 34px;
      border-left: 1px solid ${Gray200};
    }

    .w2 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      width: ${ContentWidth};

      a {
        /* width: 240px; */
        height: 60px;
      }
    }
    .w3 {
      background: ${Gray550};
      width: 100%;
      /* height: 104px; */

      .c1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: ${ContentWidth};
        padding: 36px 27px 36px 77px;
      }
      .c1 div {
        font-size: 13px;
        color: ${Gray500};
      }
    }
    .w4 {
      width: 100%;
      color: ${Gray500};
      font-size: 12px;
      background: ${Gray600};
      height: 40px;
    }
  `)}

  ${mobile(css`
    .w1 {
      ${flex('start', 'center', { direction: 'column-reverse' })}
      width: 100%;
      height: unset;
      padding: 0;
      .c2 {
        width: 100%;
        min-height: 56px;

        ${flex('center')}
      }
      .c1 {
        cursor: pointer;
        width: 100%;
        border-top: 1px solid ${Gray200};
        min-height: 56px;
        padding: 0 20px;
        ${flex('center')}
        background: url(/assets/icon_footer_arrow_down.svg) no-repeat right 24px center;

        &.is-open {
          background-image: url(/assets/icon_footer_arrow_up.svg);
        }
      }
    }
    .w2 {
      display: none;
    }
    .w2.is-open {
      ${flexCenter()}
      flex-wrap: wrap;
      width: 100%;
      margin-bottom: 16px;

      a {
        margin: 5px;
        img {
          height: 24px;
        }
      }
    }
    .w3 {
      width: 100%;
      background: ${Gray550};
      color: ${Gray500};
      font-size: 12px;
      padding: 40px 24px 25px 24px;

      a {
        display: block;
        margin-bottom: 28px;
      }
    }
    .w4 {
      width: 100%;
      height: 40px;
      background: ${Gray600};
      color: ${Gray500};
      font-size: 10px;
    }

    .footer-shortcut {
      position: absolute;
      right: 20px;
      transform: translateY(3px);
      ${alignItems('center')}
      a {
        margin-left: 7px !important;
      }
    }
    .VHr {
      height: 22px;
      border-left: 1px solid ${Gray200};
    }
  `)}
`;

const Footer: FC<{}> = () => {
  const [isOpenQuickService, setIsOpenQuickService] = useState(false);

  return (
    <Container className="font-notosans">
      <div className="w1 margin-center">
        <div
          className={
            'c1 font-nanumsquare ' + (isOpenQuickService ? 'is-open' : '')
          }
          onClick={() => setIsOpenQuickService((val) => !val)}
        >
          QUICK SERVICE
        </div>
        <div className="c2">
          <Link href="/hsin/terms">이용약관</Link>
          <Link href="/hsin/introduce">HS-IN소개</Link>

          <div className="mobile footer-shortcut">
            <Link href="https://www.khsa.or.kr/" target="_blank">
              <Image src="/assets/icon_nav_s1.png" width="33" height="20" alt="" />
            </Link>
            <Link href="https://m.post.naver.com/khsa_info" target="_blank">
              <Image
                src="/assets/HSIN_Icon(SNS)_32x32-03.svg"
                width="32"
                height="32"
                quality={100}
                alt=""
              />
            </Link>
            {/* <Link href="https://www.khsa.or.kr/" target="_blank">
            <Image
              src="/assets/HSIN_Icon(SNS)_32x32-01.svg"
              width="32"
              height="32"
            />
          </Link>
          <Link href="https://m.post.naver.com/khsa_info" target="_blank">
            <Image
              src="/assets/HSIN_Icon(SNS)_32x32-02.svg"
              width="32"
              height="32"
            />
          </Link> */}
          </div>
        </div>
      </div>
      <div className="HHr" />
      <div
        className={'w2 margin-center ' + (isOpenQuickService ? 'is-open' : '')}
      >
        <Link
          className="flex-center"
          href="https://www.khsa.or.kr"
          target="_blank"
        >
          <img
            alt="KHSI 한국건강기능식품협회"
            src="/assets/HSIN_QS_logo(footer)-01.svg"
          />
        </Link>
        <div className="VHr" />
        <Link
          className="flex-center"
          href="https://www.hsff.co.kr"
          target="_blank"
        >
          <img
            alt="HSFF 건강기능식품미래포럼"
            src="/assets/HSIN_QS_logo(footer)-02.png"
          />
        </Link>
        <div className="VHr" />
        <Link
          className="flex-center"
          href="https://www.mfds.go.kr"
          target="_blank"
        >
          <img
            alt="식품의약품안전처"
            src="/assets/HSIN_QS_logo(footer)-03.svg"
          />
        </Link>
        <div className="VHr" />
        <Link
          className="flex-center"
          href="https://www.foodsafetykorea.go.kr"
          target="_blank"
        >
          <img alt="식품안전나라" src="/assets/HSIN_QS_logo(footer)-04.svg" />
        </Link>
        <div className="VHr" />
        <Link
          className="flex-center"
          href="https://impfood.mfds.go.kr"
          target="_blank"
        >
          <img
            alt="수입식품정보마루"
            src="/assets/HSIN_QS_logo(footer)-05.png"
          />
        </Link>
      </div>
      <div className="w3 flex-center">
        <div className="c1">
          <Link href="/">
            <Image
              alt="HSIN Logo"
              src="/assets/logo_hsin_footer.svg"
              width="283"
              height="31"
            />
          </Link>
          <div>
            (사)한국건강기능식품협회 | 13488 경기도 성남시 분당구 대왕판교로 700
            B동 102호(삼평동, 코리아바이오파크)
            <br />
            법인등록번호 115021-0001687 | 사업자번호 114-82-07991{' '}
            <span className="desktop">|</span>
            <br className="mobile" /> 대표자 정명수 | TEL 031) 628-2300 | FAX
            031) 628-2349
          </div>
        </div>
      </div>
      <div className="w4 flex-center">
        Copyrightⓒ 2021 Korea Health Supplements Association, All rights
        reserved.
      </div>
    </Container>
  );
};

export default Footer;
