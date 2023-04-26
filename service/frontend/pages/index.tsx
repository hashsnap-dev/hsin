import type { NextPage } from 'next';
import ContentSection from '@/components/ContentSection';
import Flex, { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import FunctionalityShortcut from '@/components/index/FunctionalityShortcut';
import HealthInfoShortcut from '@/components/index/HealthInfoShortcut';
import MainFoodInfoCardContainer, {
  MainFoodInfoCard,
} from '@/components/index/FoodInfoCardContainer';
import MainImageSection from '@/components/index/ImageSection';
import MainSearch from '@/components/index/Search';
import Nav from '@/components/Nav';
import SectionTitle from '@/components/SectionTitle';
import ServiceShortcut from '@/components/index/ServiceShortcut';
import { AquaBlue50, AquaBlue600 } from '@/styles/variables';
import BackgroundSection from '@/components/BackgroundSection';
import ColorBackground from '@/components/ColorBackground';
// import HomePopup from '@/components/HomePopup';
import { obj2params } from '@/helper/utils';
import useSWR from 'swr';

const Home: NextPage = () => {
  const paramsObj = {
    _start: 0,
    _limit: 4,
    _sort: 'created_at:DESC',
  };
  const params = obj2params(paramsObj);

  const { data: posts, error: postsError } = useSWR(
    `/board/information-posts?${params}`
  );

  return (
    <>
      <Nav />
      {/* <HomePopup /> */}
      <MainImageSection />
      <MainSearch />
      <ContentSection>
        <Spacer size={80} mobileSize={40} />
        <SectionTitle label="건강기능식품 알아보기" />
        <Spacer size={18} />
        <MainFoodInfoCardContainer>
          <MainFoodInfoCard
            icon="/assets/icon_food_info_01.png"
            no="01"
            title="건강기능식품 정의"
            description={
              <p>
                건강기능식품이란
                <br />
                무엇일까요?
              </p>
            }
            href="/information/health-functional-food#food-info-1"
            bgColor="#217FEF"
            borderColor="#0349C3"
            hoverColor="#4D99F2"
          />
          <MainFoodInfoCard
            icon="/assets/icon_food_info_02.png"
            no="02"
            title="기능성 정의"
            description={
              <p>
                내 몸에 필요한 기능성을
                <br />
                확인해볼까요?
              </p>
            }
            href="/information/health-functional-food#food-info-2"
            bgColor="#25C9EF"
            borderColor="#0096B7"
            hoverColor="#43d8fa"
          />
          <MainFoodInfoCard
            icon="/assets/icon_food_info_03.png"
            no="03"
            title="기능성 원료 분류"
            description={
              <p>
                건강기능식품의
                <br />
                원료 분류를 확인해볼까요?
              </p>
            }
            href="/information/health-functional-food#food-info-3"
            bgColor="#8162FF"
            borderColor="#4624CB"
            hoverColor="#967cff"
          />
          <MainFoodInfoCard
            icon="/assets/icon_food_info_04.png"
            no="04"
            title="건강기능식품 인정 과정"
            description={
              <p>
                안전성 및 기능성에 대한 철저한
                <br />
                심사과정을 확인하세요.
              </p>
            }
            href="/information/health-functional-food#food-info-4"
            bgColor="#0349C3"
            borderColor={AquaBlue600}
            hoverColor="#2062d4"
          />
        </MainFoodInfoCardContainer>
        <ServiceShortcut />
        <Spacer size={64} />
        <SectionTitle label="기능성 정보 찾기" />
        <FunctionalityShortcut />
        <Spacer size={64} />
      </ContentSection>
      <BackgroundSection>
        <ContentSection>
          <SectionTitle label="쏙쏙 건강 정보" more="/information/post" />
        </ContentSection>
        <HealthInfoShortcut data={posts ?? []} />
        <ContentSection padding={0}>
          <Spacer size={100} />
        </ContentSection>
        <ColorBackground color={AquaBlue50} height={369} />
      </BackgroundSection>
      <Footer />
    </>
  );
};

export default Home;
