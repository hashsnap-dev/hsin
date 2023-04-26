import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionTitle from '@/components/SectionTitle';
import { Column, Row } from '@/layouts/flex-utils';
import type {NextPage} from 'next';
import React from 'react';
import Content, {Card} from '@/components/hsin/introduce/Content';
import { AquaBlue, CyanBlue, Purple } from '@/styles/variables';
import navConfig, { flattenNavConfig } from '@/nav.config';

const Introduce: NextPage = () => {
  return <>
  <Nav breadcrumb />
  <ContentSection className={`font-notosans`}>
    <Spacer size={64} mobileSize={0} />
  </ContentSection>
  <ContentSection className={`font-notosans`}>
    <Content>
      <Row className="header" justifyContent="center">
        <div className="i1" />
        <div className="r">
          <div className="i2" />
          <p className="p1 font-nanumsquare"><b>H</b>ealth <b>S</b>upplements <b>IN</b>formation portal</p>
          <p className="p2">허위과대광고, 오인혼동구매, 섭취 이상사례 발생 등 소비자 피해를<br />
          예방하고 소비자에게 객관적이고 올바른 건강기능식품 정보를 제공하는<br />
          건강기능식품 종합정보포털입니다.</p>
        </div>
      </Row>
      <div className="content">
        <h1>주요 서비스</h1>
        <Column className="sub-title">
          <h2>핵심 정보</h2>
          <p>건강기능식품 주요 개념 및 선택 요령, 건강기능식품과 관련된 읽을 거리 등을 제공합니다.</p>
        </Column>
        <Row className="cards">
          <Card href={flattenNavConfig[0][0]} no={1} name="건강기능식품이란?" color={AquaBlue} />
          <Card href={flattenNavConfig[0][1]} no={2} name="안전한 건강기능식품 선택요령" color={AquaBlue} />
          <Card href={flattenNavConfig[0][2]} no={3} name="쏙쏙 건강 정보" color={AquaBlue} />
        </Row>
        <Column className="sub-title">
          <h2>건강기능식품 검색</h2>
          <p>건강기능식품 제품·원료·기능성·의약품 병용섭취 정보를 검색할 수 있습니다.</p>
        </Column>
        <Row className="cards">
          <Card href={flattenNavConfig[1][0]} no={1} name="제품 검색" color={'#00B09F'} />
          <Card href={flattenNavConfig[1][1]} no={2} name="원료 검색" color={'#00B09F'} />
          <Card href={flattenNavConfig[1][2]} no={3} name="기능성 검색" color={'#00B09F'} />
          <Card href={flattenNavConfig[1][3]} no={4} name="의약품 병용섭취 정보" color={'#00B09F'} />
        </Row>
        <Column className="sub-title">
          <h2>위해 정보</h2>
          <p>건강기능식품의 허위, 과대 광고 현황, 국내 및 해외 위해 식품 회수 정보 등을 확인할 수 있습니다.</p>
        </Column>
        <Row className="cards">
          <Card href={flattenNavConfig[2][0]} no={1} name="회수 판매 중지 제품 정보" color={CyanBlue} />
          <Card href={flattenNavConfig[2][1]} no={2} name="해외직구 위해 식품 차단 정보" color={CyanBlue} />
          <Card href={flattenNavConfig[2][2]} no={3} name="허위과대광고 현황" color={CyanBlue} />
          <Card href={flattenNavConfig[2][3]} no={4} name="이상사례 현황" color={CyanBlue} />
        </Row>
        <Column className="sub-title">
          <h2>건강 계산기</h2>
          <p>건강기능식품 중복 섭취 계산기, BMI 계산기, 칼로리 사전 등 건강 관련 계산기를 이용할 수 있습니다.</p>
        </Column>
        <Row className="cards">
          <Card href={flattenNavConfig[3][0]} no={1} name="건강기능식품 중복섭취 확인" color={Purple} />
          <Card href={flattenNavConfig[3][1]} no={2} name="BMI 계산기" color={Purple} />
          <Card href={flattenNavConfig[3][2]} no={3} name="칼로리 사전" color={Purple} />
          {/* <Card href={flattenNavConfig[3][3]} no={4} name="운동 칼로리 계산기" color={Purple} /> */}
        </Row>
        <h1>데이터 활용</h1>
        <Row className="data">
          <div className="i3" />
          <table>
            <thead>
              <tr>
                <th>민간데이터</th>
                <th>공공데이터(식약처 데이터활용서비스 등)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>- 제품 이미지 정보</p>
                  <p>- 건강 정보 콘텐츠</p>
                  <p>- 뉴스 등</p>
                </td>
                <td>
                  <p>- 건강기능식품 제품 정보<span>(품목제조신고 사항 현황 등)</span></p>
                  <p>- 건강기능식품 원료 정보<span>(기능성 원료 인정 현황 등)</span></p>
                  <p>- 위해 정보 등<span>(회수판매 중지 정보, 과대광고 및 모니터링 적발 및 조치정보 등)</span></p>
                </td>
              </tr>
            </tbody>
          </table>
        </Row>
      </div>
    </Content>
  </ContentSection>
  <Spacer size={180} mobileSize={100} />
  <Footer />
</>;
};

export default Introduce;