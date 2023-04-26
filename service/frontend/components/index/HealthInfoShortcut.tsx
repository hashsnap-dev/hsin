import { FC } from "react";
import styled, { css } from "styled-components";
import Flex from "@/components/Flex";
import Link from "@/components/Link";
import Image from 'next/image';
import HealthInfoCarousel from "./HealthInfoCarousel";
import { desktop, justifyContent, mobile } from "@/styles/utils";

const Container = styled.div`
  margin-top: 18px;
  
  .desktop, .mobile {
    display: none;
  }

  ${desktop(css`  
  .desktop {
    ${justifyContent('center')}
  }
`)}

${mobile(css`
  .mobile {
    display: block;
  }
`)}
`;

const DesktopContainer = styled(Flex)`
  font-size: 18px;
  font-weight: 500;
`;

const HealthInfoItemContainer = styled(Link)`
  width: 288px;
  /* height: 390px; */

  .img {
    width: 100%;
    padding-bottom: 100%;
    border-radius: 20px;
    background: no-repeat center / cover;
  }
  p {
    margin-top: 16px;
    width: 288px;
  }

${mobile(css`
  width: 100%;
  
  p {
    width: 100%;
  }
`)}
`;

const HealthInfoItem: FC<{ href: string; thumbnail: string; title: string; description: string }> = ({ thumbnail, title, description, href }) => {

  return <HealthInfoItemContainer href={href}>
    <div className="img" style={{
      backgroundImage: `url(${thumbnail})`
    }} />
    <p>{title}</p>
  </HealthInfoItemContainer>
};

const HealthInfoShortcut: FC<{data: any[]}> = ({data}) => {
  return <Container>
    <div className="desktop">
      <DesktopContainer spacing={16} className="font-notosans">
        {data.length ? data.map(({title, thumbnail, id}, i) => <HealthInfoItem href={`/information/post/${id}`} thumbnail={thumbnail?.url ?? ''} title={title} description="" key={`information-post-${i}`}/>) : null}
        {/* <HealthInfoItem href="/" thumbnail={`https://picsum.photos/500/500?${Date.now() + 1}`} title="[홈메이드 빙수 레시피] 수박빙수, 망고빙수, 녹차빙수" description="" />
        <HealthInfoItem href="/" thumbnail={`https://picsum.photos/500/500?${Date.now() + 2}`} title="돌외잎과 의약품 함께 섭취 시 주의사항" description="" />
        <HealthInfoItem href="/" thumbnail={`https://picsum.photos/500/500?${Date.now() + 3}`} title="여름철 매끈한 '발' 관리법" description="" />
        <HealthInfoItem href="/" thumbnail={`https://picsum.photos/500/500?${Date.now() + 4}`} title="<건기식협회X빨강머리N> 건강제품 살 땐 건강기능식품이 맞는지.." description="" /> */}
      </DesktopContainer>
    </div>
    <div className="mobile">
      <HealthInfoCarousel>
        {data.length ? data.map(({title, thumbnail, id}, i) => <HealthInfoItem href={`/information/post/${id}`} thumbnail={thumbnail?.url ?? ''} title={title} description="" key={`information-post-mobile-${i}`}/>) : null}
        {/* <HealthInfoItem href="/" thumbnail={`https://picsum.photos/500/500?${Date.now() + 1}`} title="[홈메이드 빙수 레시피] 수박빙수, 망고빙수, 녹차빙수" description="" />
        <HealthInfoItem href="/" thumbnail={`https://picsum.photos/500/500?${Date.now() + 2}`} title="돌외잎과 의약품 함께 섭취 시 주의사항" description="" />
        <HealthInfoItem href="/" thumbnail={`https://picsum.photos/500/500?${Date.now() + 3}`} title="여름철 매끈한 '발' 관리법" description="" />
        <HealthInfoItem href="/" thumbnail={`https://picsum.photos/500/500?${Date.now() + 4}`} title="<건기식협회X빨강머리N> 건강제품 살 땐 건강기능식품이 맞는지.." description="" /> */}
      </HealthInfoCarousel>
    </div>
  </Container>
};

export default HealthInfoShortcut;