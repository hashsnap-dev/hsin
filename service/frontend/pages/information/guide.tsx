import type { NextPage } from 'next';
import Image from 'next/image';
import ContentSection from '@/components/ContentSection';
import Flex, { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionTitle from '@/components/SectionTitle';
import GuideBanner from '@/components/information/guide/GuideBanner';
import AccordionGroup, {
  AccordionItem,
  AccordionLink,
} from '@/components/information/guide/AccordionGroup';

const Information: NextPage = () => {
  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <Spacer size={64} mobileSize={0} />
        <SectionTitle
          className="desktop"
          label="안전한 건강기능식품 선택 요령"
          emphasis
        />

        <GuideBanner>
          <h4 className="font-nanumsquare">
            보다 안전한 <br />
            건강기능식품 선택 요령
          </h4>
          <p>우리는 건강기능식품을 어떻게 구매하고 섭취해야 할까요?</p>
        </GuideBanner>

        <AccordionGroup className="font-notosans">
          <AccordionItem thumbnail="/assets/image_guide_accordion_1.svg">
            <h4>건강기능식품 문구와 인정 도안 확인하기</h4>
            <div className="HHr" />
            <div className="content">
              <p>
                식약처가 인정한 모든 건강기능식품에는 ‘건강기능식품’이라는
                문구와 도안이 표시되어 있으니 꼭 확인하세요.
                <br />
                수입제품의 경우, 정식 통관 검사를 거친 제품은 한글 표시사항이
                있습니다.
              </p>
            </div>
          </AccordionItem>
          {/* <AccordionItem thumbnail="/assets/image_guide_accordion_2.svg">
            <h4>우수건강기능식품 제조기준(GMP) 도안 확인하기</h4>
            <div className="HHr" />
            <div className="content">
              <p>
                우수건강기능식품제조 및 품질관리기준 GMP는 Good Manufacturing
                Practice의 약자로 우수건강기능식품 제조기준을 나타냅니다.
                <br />
                식품의약품안전처는 소비자에게 신뢰받는 안전하고 우수한 품질의
                건강기능식품을 제조하도록 전 공정에 걸쳐 생산과 품질의 관리에
                관한 체계적인 기준을 인증하고 있습니다.
                <br />
                구매 시, GMP 도안도 함께 확인하세요!
              </p>
            </div>
          </AccordionItem> */}
          <AccordionItem thumbnail="/assets/image_guide_accordion_3.png">
            <h4>제품 뒷면의 영양 · 기능정보 표시 확인하기</h4>
            <div className="HHr" />
            <div className="content">
              <p>
                모든 건강기능식품의 제품 뒷면에는 섭취량 및 섭취방법, 섭취 시
                주의사항이 기입되어 있습니다.
                <br />각 표시사항을 확인하고 이를 준수하여 섭취해야 합니다.
              </p>
            </div>
          </AccordionItem>
          <AccordionItem thumbnail="/assets/image_guide_accordion_4.svg">
            <h4>허위 · 과대광고 주의하기</h4>
            <div className="HHr" />
            <div className="content">
              <p>
                건강기능식품은 질병을 치료할 수 있는 ‘의약품’이 아닙니다.
                <br className="desktop" />
                질병의 예방‧치료 효능, 의약품을 표방하는 허위·과대광고에
                현혹되지 않도록 주의해야합니다.
              </p>
              <AccordionLink href="/riskinformation/false_advertising">
                허위·과대광고 사례 알아보기
              </AccordionLink>
            </div>
          </AccordionItem>
          <AccordionItem thumbnail="/assets/image_guide_accordion_5.png">
            <h4>올바른 섭취방법 준수하기</h4>
            <div className="HHr" />
            <div className="content">
              <p>
                건강기능식품은 올바른 섭취방법을 지킨다면 건강 유지 및 증진에
                도움을 줄 수 있습니다.
                <br />
                여러 제품을 함께 섭취할 경우 일일 섭취량에 맞게 섭취하고 있는지
                확인해야 합니다.
              </p>
              <AccordionLink href="/calculator/intake">
                건강기능식품 중복 섭취 확인하기
              </AccordionLink>
            </div>
          </AccordionItem>
          <AccordionItem thumbnail="/assets/image_guide_accordion_6.svg">
            <h4>의약품 병용 섭취 주의하기</h4>
            <div className="HHr" />
            <div className="content">
              <p>
                건강기능식품과 특정 의약품을 함께 섭취할 때 바람직하지 않은
                효과가 나타날 수 있습니다.
                <br />
                의약품 병용섭취 정보를 섭취 전 확인하세요!
              </p>
              <AccordionLink href="/search/concomitant_use">
                의약품 병용섭취 정보 확인하기
              </AccordionLink>
            </div>
          </AccordionItem>
          <AccordionItem thumbnail="/assets/image_guide_accordion_7.png">
            <h4>건강기능식품 이상사례 신고센터</h4>
            <div className="HHr" />
            <div className="content">
              <p>
                건강기능식품은 안전성이 확인되었음에도 불구하고 과다 섭취하거나
                개인의 건강체질에 따라 이상사례가 발생할 수 있습니다.
                <br />
                섭취 후 이상증상이 나타나면 즉시 섭취 중단 후 의사 및 전문가의
                도움을 받으세요!
                <br />
                식품의약품안전처는 건강기능식품으로 인해 발생할 수 있는
                이상사례를 체계적으로 수집하고 있습니다.
              </p>
              <p className="comment">
                <b>이상사례란?</b> 부작용원인이 과학적으로 규명되기까지는
                부작용원인을 건강기능식품 때문인 것으로 단정하여 말하기
                어려우므로 ‘부작용’이라기보다는 보통 ‘이상사례’라고 말합니다.
              </p>
              <AccordionLink
                href="https://www.foodsafetykorea.go.kr/minwon/sideeffect/online.do"
                target="_blank"
              >
                건강기능식품 이상사례 신고센터 확인
              </AccordionLink>
            </div>
          </AccordionItem>
        </AccordionGroup>
        <Spacer size={180} mobileSize={100} />
      </ContentSection>
      <Footer />
    </>
  );
};

export default Information;
