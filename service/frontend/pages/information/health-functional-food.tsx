import type { NextPage } from 'next';
import Image from 'next/image';
import ContentSection from '@/components/ContentSection';
import Flex, { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionTitle from '@/components/SectionTitle';
import {
  AquaBlue,
  AquaBlue100,
  AquaBlue200,
  AquaBlue50,
  AquaBlue500,
  AquaBlue550,
  AquaBlue600,
  CyanBlue,
  CyanBlue50,
  CyanBlue500,
  CyanBlue600,
  Gray100,
  Gray200,
  Gray500,
  Gray600,
  Purple,
  Purple50,
  Purple500,
  Purple600,
} from '@/styles/variables';
import styled, { css } from 'styled-components';
import BackgroundSection from '@/components/BackgroundSection';
import Slider from 'react-slick';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import FunctionalityCarousel, {
  FunctionalityCarouselCard,
  FunctionalityCarouselComment,
} from '@/components/information/health-functional-food/FunctionalityCarousel';
import Link from '@/components/Link';
import RawMaterial from '@/components/information/health-functional-food/RawMaterial';
import ApprovalProcess, {
  ApprovalProcessHeader,
} from '@/components/information/health-functional-food/ApprovalProcess';
import HealthFoodInfoTable from '@/components/information/health-functional-food/HealthFoodInfoTable';
import ColorBackground from '@/components/ColorBackground';
import { alignItems, desktop, fill, flexCenter, mobile } from '@/styles/utils';
import MobileTab, {
  TabContent,
} from '@/components/information/health-functional-food/MobileTab';
import { Column, Row } from '@/layouts/flex-utils';
import ShortcutButton from '@/components/information/health-functional-food/ShortcutButton';

const InformationContent = styled.div<{ primaryColor: string }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;

  b {
    color: ${({ primaryColor }) => primaryColor};
  }

  h3 {
    font-size: 28px;
    font-weight: 700;
    color: ${Gray600};

    b {
      font-weight: 800;
    }
  }

  p {
    margin-top: 16px;
    color: ${Gray500};

    b {
      font-weight: 500;
    }
  }

  .p1 {
    margin-top: 32px;
    color: ${Gray600};
  }
  video {
    margin-top: 56px;
    width: 900px;
  }
  ${mobile(css`
    h3 {
      font-size: 20px;
    }
    p {
      font-size: 14px;
    }
    video {
      margin-top: 42px;
      width: 100%;
      height: auto;
    }
  `)}
`;

const InformationSubject = styled.div<{ bgColor: string; borderColor: string }>`
  height: 36px;
  ${alignItems('center')}
  border-radius: 9999px;
  color: white;
  background: ${({ bgColor }) => bgColor};
  border: 1px solid ${({ borderColor }) => borderColor};
  padding: 0 20px;

  ${mobile(css`
    font-size: 14px;
  `)}
`;

const RuleTag = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: ${Gray500};
  background: ${Gray100};
  border: 1px solid ${Gray200};
  padding: 8px 10px;
  border-radius: 9999px;

  ${mobile(css`
    font-size: 13px;
  `)}
`;

const MockVideo = styled.div`
  position: relative;
  margin-top: 56px;
  width: 100%;
  padding-bottom: 54%;
  background: ${Gray600};
  color: ${Gray500};

  &:before {
    content: '';
    display: block;
    position: absolute;
    ${fill}
    ${flexCenter()}
    content: '영상영역';
    top: 0;
  }

  ${mobile(css`
    margin-top: 42px; ;
  `)}
`;

const hashFilter = (str: string) => {
  if (
    ['#food-info-1', '#food-info-2', '#food-info-3', '#food-info-4'].includes(
      str
    )
  )
    return str;
  return '#food-info-1';
};

const Information: NextPage = () => {
  const [hash, setHash] = useState<string>('');
  const fcRef = useRef(null);

  useEffect(() => {
    setHash(hashFilter(global.window && globalThis.location?.hash));
  }, []);

  useEffect(() => {
    if (hash !== '#food-info-2') return;
    (fcRef.current as any)?.redraw();
  }, [hash]);

  const tabChangeHandler = (
    name: string,
    ev: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) => {
    ev.preventDefault();
    setHash(name);
  };

  return (
    <>
      <Nav breadcrumb />
      <MobileTab hash={hash} onChange={tabChangeHandler} />
      <TabContent className={hash === '#food-info-1' ? 'mobile-show' : ''}>
        <BackgroundSection>
          <ContentSection className={`font-notosans`}>
            <Spacer size={64} mobileSize={16} />
            <SectionTitle
              label="건강기능식품이란?"
              emphasis
              className="desktop"
            />
            <Spacer id="food-info-1" size={80} mobileSize={64} />
            <InformationContent primaryColor={AquaBlue}>
              <InformationSubject bgColor={AquaBlue} borderColor={AquaBlue500}>
                01 건강기능식품 정의
              </InformationSubject>
              <Spacer size={20} />
              <h3 className="font-nanumsquare">
                <b>건강기능식품</b>은 식품의약품안전처가
                <br className="mobile" /> 과학적으로 인정한 식품입니다
              </h3>
              <p>
                건강기능식품이란{' '}
                <b>
                  일상에서 결핍되기 쉬운 영양소 또는 인체에 유용한
                  &apos;기능성&apos;을 가진 원료나 성분을 사용
                </b>
                하여
                <br className="desktop" />
                &nbsp;정제, 캡슐, 액상 등 여러가지 제형으로 제조가공한
                식품입니다.
              </p>
              <RuleTag>
                *근거 법령 : 건강기능식품에 관한 법률 제3조제1호
              </RuleTag>
              <video
                src="https://health-functional-food.s3.ap-northeast-2.amazonaws.com/assets/2021+campaign_30sec.mp4.mp4"
                poster="/assets/hsin_information_video_thumbnail.jpg"
                controls
              />
              <p className="p1">
                식품의약품안전처가 동물시험, 인체적용시험 등 과학적 근거를
                평가하여 기능성원료를 인정하고 있으며&nbsp;
                <br className="desktop" />
                인정 받은 기능성원료를 가지고 만든 제품이 바로{' '}
                <b>건강기능식품</b>
                입니다.
              </p>
              <Spacer size={140} mobileSize={80} />
              <h3 className="font-nanumsquare">
                <b>건강기능식품</b>과 일반식품의 차이, <br className="mobile" />{' '}
                알고 있나요?
              </h3>
              <p>
                일반적으로 건강에 좋다고 알려진 건강식품, 천연식품 등으로 불리는
                일반 식품은 <br className="desktop" />
                섭취량 기준이 없으며, 기능성에 대한 과학적이고 체계적인
                인정절차를 거치지 않습니다.
              </p>
              <HealthFoodInfoTable className="font-notosans desktop">
                <thead>
                  <tr>
                    <th>분류</th>
                    <th>건강기능식품</th>
                    <th>일반식품</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>소관법률</td>
                    <td>건강기능식품에 관한 법률</td>
                    <td>식품위생법, 축산물위생관리법</td>
                  </tr>
                  <tr>
                    <td>제조허가</td>
                    <td>허가</td>
                    <td>등록</td>
                  </tr>
                  <tr>
                    <td rowSpan={2}>기능성·안전성 심사</td>
                    <td>
                      인체적용시험, 동물시험등을 수행해
                      <br />
                      식약처로부터 <b>인체기능성</b>을 과학적으로 인정받음
                    </td>
                    <td rowSpan={2}>X</td>
                  </tr>
                  <tr>
                    <td className="t1">
                      유해물질검사, 독성시험 등을 수행해
                      <br />
                      식약처로부터 <b>안전성</b>을 과학적으로 인정받음
                    </td>
                  </tr>
                  <tr>
                    <td>섭취량 기준</td>
                    <td>제품에 표시된 1일 섭취량에 따라 섭취</td>
                    <td>기준없음</td>
                  </tr>
                </tbody>
              </HealthFoodInfoTable>
              <HealthFoodInfoTable className="font-notosans mobile">
                <tbody>
                  <tr>
                    <th colSpan={2}>건강기능식품</th>
                  </tr>
                  <tr>
                    <th>소관법률</th>
                    <td>건강기능식품에 관한 법률</td>
                  </tr>
                  <tr>
                    <th>제조허가</th>
                    <td>허가</td>
                  </tr>
                  <tr>
                    <th rowSpan={2}>
                      기능성·
                      <br className="mobile" />
                      안전성 심사
                    </th>
                    <td>
                      인체적용시험,동물시험 등을 수행
                      <br />
                      식약처로부터 <b>인체기능성</b>을<br className="mobile" />{' '}
                      과학적으로 인정받음
                    </td>
                  </tr>
                  <tr>
                    <td>
                      유해물질검사, 독성시험 등을 <br />
                      수행해 식약처로부터 <b>안전성</b>을 <br />
                      과학적으로 인정받음
                    </td>
                  </tr>
                  <tr>
                    <th>섭취량 기준</th>
                    <td>제품에 표시된 1일 섭취량에 따라 섭취</td>
                  </tr>
                  <tr>
                    <th colSpan={2} className="t1">
                      일반식품
                    </th>
                  </tr>
                  <tr>
                    <th>소관법률</th>
                    <td>식품위생법, 축산물위생관리법</td>
                  </tr>
                  <tr>
                    <th>제조허가</th>
                    <td>등록</td>
                  </tr>
                  <tr>
                    <th>
                      기능성·
                      <br className="mobile" />
                      안전성 심사
                    </th>
                    <td>X</td>
                  </tr>
                  <tr>
                    <th>섭취량 기준</th>
                    <td>기준없음</td>
                  </tr>
                </tbody>
              </HealthFoodInfoTable>
              <Spacer size={160} mobileSize={100} />
            </InformationContent>
          </ContentSection>
          <ColorBackground
            pattern={true}
            color={AquaBlue100}
            height={1369}
            mobileHeight={1200}
          />
        </BackgroundSection>
      </TabContent>
      <TabContent className={hash === '#food-info-2' ? 'mobile-show' : ''}>
        <BackgroundSection>
          <Spacer id="food-info-2" size={200} mobileSize={64} />
          <ContentSection>
            <InformationContent primaryColor={CyanBlue500}>
              <InformationSubject
                bgColor={CyanBlue500}
                borderColor={CyanBlue600}
              >
                02 기능성 정의
              </InformationSubject>
              <Spacer size={20} />
              <h3 className="font-nanumsquare">
                내 몸에 필요한 기능성을 확인하고
                <br className="mobile" /> <b>건강기능식품</b>을 섭취하세요!
              </h3>
              <p>
                기능성이란 인체의 정상적인 기능을 유지하거나 생리기능 활성화를
                통하여
                <br className="desktop" />
                건강을 유지하고 개선하는 것을 말합니다. 아래와 같이 총 3가지로
                구분합니다.
              </p>
              <RuleTag>*근거 법령: 건강기능식품에 관한 법률 제3조제2호</RuleTag>
            </InformationContent>
          </ContentSection>
          <FunctionalityCarousel className="font-notosans" ref={fcRef as any}>
            <FunctionalityCarouselCard>
              <div className="header font-nanumsquare">
                <h4>생리활성기능</h4>
                <p>
                  인체의 정상기능이나 생물학적 활동에 특별한 효과가 있어
                  건강상의 기여나 기능향상 또는 건강유지·개선을 나타내는 기능
                </p>
              </div>
              <Column className="content" alignItems="center">
                <Row>
                  <div className="c1">
                    <h5>기능성 표시</h5>
                    <Spacer size={17} mobileSize={13} />
                    <img
                      className="i1"
                      src="/assets/HSIN_IMG_info02_440x286-01.svg"
                      alt="[기능성표시] ㅇㅇ에 도움을 줄 수 있음"
                    />
                  </div>
                  <hr className="mobile" />
                  <div className="c1">
                    <h5>기능성 내용</h5>
                    <Spacer size={17} mobileSize={13} />
                    <img
                      className="i2"
                      src="/assets/HSIN_IMG_info02_440x286-02.svg"
                      alt="인체의 구조 및 기능에 대하여 생리학적 작용 등과 같은 보건용도에 유용한 효과로, 총 34개의 기능성이 있습니다."
                    />
                    <p className="t1">
                      인체의 구조 및 기능에 대하여 생리학적 작용 등과 같은
                      <br />
                      보건 용도에 유용한 효과
                    </p>
                  </div>
                </Row>
                <Spacer size={34} />
                <ShortcutButton
                  href="/search/functionality?type=2"
                  color={CyanBlue500}
                  bgColor={'white'}
                  borderColor={CyanBlue600}
                >
                  생리활성기능 검색하기
                </ShortcutButton>
              </Column>
            </FunctionalityCarouselCard>
            <FunctionalityCarouselCard>
              <div className="header font-nanumsquare">
                <h4>질병발생위험감소기능</h4>
                <Row alignItems="center">
                  <p>질병의 발생 또는 건강상태 위험감소와 관련한 기능</p>
                  <Spacer size={8} />
                  <p className="comment">
                    ※ 확보된 기능성 자료의 과학적 근거자료의 수준이 과학적
                    합의에 이를 수 있을 정도로 높을 경우 인정
                  </p>
                </Row>
              </div>
              <Column className="content" alignItems="center">
                <Row justifyContent="center">
                  <div className="c1">
                    <h5>기능성 표시</h5>
                    <Spacer size={16} mobileSize={13} />
                    <img
                      className="i1"
                      src="/assets/HSIN_IMG_info02_440x286-03.svg"
                      alt="[기능성표시] ㅇㅇ에 도움을 줄 수 있음"
                    />
                  </div>
                  <hr className="mobile" />
                  <div className="c1">
                    <h5>기능성 내용</h5>
                    <Spacer size={16} mobileSize={23} />
                    <img
                      className="i4"
                      src="/assets/HSIN_IMG_info02_0405.svg"
                      alt="골다공증 발생 위험 감소에 도움을 줌 / 충치발생 위험 감소에 도움을 줌"
                    />
                  </div>
                </Row>
                <ShortcutButton
                  href="/search/functionality?type=0"
                  color={CyanBlue500}
                  bgColor={'white'}
                  borderColor={CyanBlue600}
                >
                  질병발생위험감소기능 검색하기
                </ShortcutButton>
              </Column>
            </FunctionalityCarouselCard>
            <FunctionalityCarouselCard>
              <div className="header font-nanumsquare">
                <h4>영양소 기능</h4>
                <p>
                  인체의 정상적인 기능이나 생물학적 활동에 대한 영양소의
                  생리학적 작용
                </p>
              </div>
              <div className="content flex-column items-center-ns image_info_5">
                <h5>기능성 내용</h5>
                <p>
                  비타민 및 무기질, 단백질, 식이섬유,
                  <br className="mobile" /> 필수지방산의 기능이 있습니다.
                </p>
                <ShortcutButton
                  href="/search/functionality?type=1"
                  color={CyanBlue500}
                  bgColor={'white'}
                  borderColor={CyanBlue600}
                >
                  영양소기능 검색하기
                </ShortcutButton>
              </div>
            </FunctionalityCarouselCard>
          </FunctionalityCarousel>
          <ContentSection>
            <div className="flex flex-column items-center">
              <FunctionalityCarouselComment>
                *모든 건강기능식품에는
                <br className="mobile" /> 기능성원료의 <b>[기능성]</b>이
                표시되어 있습니다.
              </FunctionalityCarouselComment>
              <Spacer size={40} />
            </div>
            <Spacer size={0} mobileSize={100} />
          </ContentSection>
          <ColorBackground
            pattern={true}
            color={CyanBlue50}
            height={340}
            bottom={150}
            mobileHeight={800}
            mobileBottom={0}
          />
        </BackgroundSection>
      </TabContent>
      <TabContent className={hash === '#food-info-3' ? 'mobile-show' : ''}>
        <BackgroundSection>
          <ContentSection className={`font-notosans`}>
            <Spacer id="food-info-3" size={200} mobileSize={64} />
            <InformationContent primaryColor={Purple}>
              <InformationSubject bgColor={Purple} borderColor={Purple500}>
                03 기능성 원료 분류
              </InformationSubject>
              <Spacer size={20} />
              <h3 className="font-nanumsquare">
                <b>건강기능식품</b>의<br className="mobile" /> 다양한 원료를
                확인하세요!
              </h3>
              <p>
                기능성 원료는 식약처장이 「건강기능식품 공전」에 기준 및 규격을
                고시하여 누구나 사용할 수 있는&nbsp;
                <br className="desktop" />
                <b>고시형 원료</b>와 개별적으로 식약처장의 심사를 거쳐 인정받은
                영업자만이 사용할 수 있는 <b>개별인정형 원료</b>로 나눌 수
                있습니다.
              </p>
              <RawMaterial>
                <Row>
                  <div className="c1">
                    <h5>고시형 원료</h5>
                    <img
                      src="/assets/HSIN_IMG_info04.png.jpg"
                      alt="건강기능식품 공전 이미지"
                    />
                    <p>
                      「건강기능식품 공전」에 등재되어 있는 원료로
                      <br />
                      <b>제조기준, 기능성 등 요건에 적합할 경우 누구나 사용</b>
                      이 가능합니다.
                    </p>
                    <p className="small">
                      <b>*건강기능식품 공전이란?</b> 건강기능식품에 관한 법률에
                      따라
                      <br />
                      건강기능식품의 기준ㆍ규격과 원료ㆍ성분 및 정하여진
                      표시기준 수록
                    </p>
                  </div>
                  <hr className="mobile" />
                  <Spacer size={30} mobileSize={0} />
                  <div className="c1">
                    <h5>개별인정형 원료</h5>
                    <img
                      src="/assets/HSIN_IMG_info03_440x286-09.svg"
                      alt="약 검사 인포그래픽"
                    />
                    <p>
                      「건강기능식품 공전」에 등재되어 있지 않은 원료로 영업자가
                      <br className="desktop" />
                      원료의 안전성, 기능성, 기준 및 규격 등의 자료를 제출하여{' '}
                      <b>
                        식약처장
                        <br className="desktop" />
                        으로부터 인정을 받아야 하며, 인정받은 업체만이
                        사용&nbsp;
                      </b>
                      가능합니다.
                    </p>
                  </div>
                </Row>
                <div className="flex flex-column items-center">
                  <Spacer size={40} />
                  <ShortcutButton
                    href="/search/raw_material"
                    bgColor={'white'}
                    borderColor={Purple}
                    color={Purple}
                  >
                    원료 검색하기
                  </ShortcutButton>
                </div>
              </RawMaterial>
            </InformationContent>
            <Spacer size={0} mobileSize={100} />
          </ContentSection>
          <ColorBackground
            pattern={true}
            color={Purple50}
            height={340}
            mobileHeight={800}
            bottom={70}
            mobileBottom={0}
          />
        </BackgroundSection>
      </TabContent>
      <TabContent className={hash === '#food-info-4' ? 'mobile-show' : ''}>
        <BackgroundSection>
          <ContentSection className={`font-notosans`}>
            <Spacer id="food-info-4" size={200} mobileSize={64} />
            <InformationContent primaryColor={AquaBlue500}>
              <InformationSubject
                bgColor={AquaBlue550}
                borderColor={AquaBlue600}
              >
                04 건강기능식품 인정 과정
              </InformationSubject>
              <Spacer size={20} mobileSize={0} />
              <p>
                건강기능식품은 건강기능식품에 관한 법률에 따라 안전하고 철저하게
                만들어지는 제품으로서&nbsp;
                <br className="desktop" />
                식품의약품안전처는 건강기능식품의 안전성 및 기능성에 대해
                과학적인 근거로 철저히 심사하여 인정합니다.
              </p>
              <ApprovalProcess className="font-notosans">
                <h4>[식품의약품안전처의 건강기능식품 인정과정]</h4>
                <div className="c1">
                  <div className="c2">
                    <Image
                      alt="기능성 원료 평가"
                      src="/assets/HSIN_IMG_info04_132x132-11.svg"
                      width="132"
                      height="132"
                    />
                    <h5>기능성 원료 평가</h5>
                    <p>
                      원료, 제조방법, 기능(지표)
                      <br />
                      성분, 유해물질, 시험방법 등
                    </p>
                  </div>
                  <div className="c2">
                    <Image
                      alt="안정성 심사"
                      src="/assets/HSIN_IMG_info04_132x132-12.svg"
                      width="132"
                      height="132"
                    />
                    <h5>안정성 심사</h5>
                    <ul>
                      <li>
                        섭취근거, 원료(성분) 안전
                        <br />성 정보, 섭취량 평가
                      </li>
                      <li>인체적용시험, 독성시험 등</li>
                    </ul>
                  </div>
                  <div className="c2">
                    <Image
                      alt="기능성 심사"
                      src="/assets/HSIN_IMG_info04_132x132-13.svg"
                      width="132"
                      height="132"
                    />
                    <h5>기능성 심사</h5>
                    <ul>
                      <li>
                        인체적용시험, 동물시험,
                        <br />
                        시험관 시험
                      </li>
                      <li>
                        바이오마커의 적절성, 결과
                        <br />의 일관성 등
                      </li>
                    </ul>
                  </div>
                  <div className="c2">
                    <Image
                      alt="건강기능식품 인정"
                      src="/assets/HSIN_IMG_info04_132x132-14.svg"
                      width="132"
                      height="132"
                    />
                    <h5>건강기능식품 인정</h5>
                    <p>
                      건강기능식품 제조 허가 및<br />
                      인증마크 사용
                    </p>
                  </div>
                </div>
              </ApprovalProcess>
              <Spacer size={48} />
              <ApprovalProcessHeader>
                <Column textAlign="center">
                  <h3 className="font-nanumsquare">
                    <b>건강기능식품</b> 인정도안을
                    <br className="mobile" /> 꼭 확인하세요!
                  </h3>
                  <Spacer size={0} mobileSize={16} />
                  <Row textAlign="left">
                    <Image
                      alt="식약처 건강기능식품 인정도안"
                      src="/assets/HSIN_IMG_guide_360x220-02.svg"
                      width="103"
                      height="103"
                    />
                    <Spacer size={32} mobileSize={16} />
                    <p>
                      일상에서 부족한 영양소를 보충하거나, 인체에 유용한 기능을
                      가진 식품을&nbsp;
                      <br className="desktop" />
                      섭취하는 개념으로 건강기능식품을 받아들이고 올바른
                      섭취방법을 지킨다면&nbsp;
                      <br className="desktop" />
                      <b>건강기능식품은 건강 유지 및 증진</b>에 많은 도움을 줄
                      수 있습니다.
                    </p>
                  </Row>
                </Column>
              </ApprovalProcessHeader>
            </InformationContent>
            <Spacer size={180} mobileSize={100} />
          </ContentSection>
          <ColorBackground pattern={true} color={AquaBlue100} height={556} />
        </BackgroundSection>
      </TabContent>
      <Footer />
    </>
  );
};

export default Information;
