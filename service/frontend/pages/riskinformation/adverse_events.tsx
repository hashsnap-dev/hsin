import { EatTogether, StopSelling, ForeignBlockFoodList } from 'hsin';
import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Content from '@/components/riskinformation/adverse_case/Content';
import SectionTitle from '@/components/SectionTitle';
import type { NextPage } from 'next';
import { Row } from '@/layouts/flex-utils';
import TabContent, { TabSelect, } from '@/components/riskinformation/adverse_case/TabContent';
import { useEffect, useState } from 'react';

const hashFilter = (str: string) => {
  if (
    [
      '#tab-1',
      '#tab-2',
      '#tab-3',
      '#tab-4',
      '#tab-5',
      '#tab-6',
      '#tab-7',
    ].includes(str)
  )
    return str;
  return '#tab-1';
};

const AdverseCase: NextPage = () => {
  const [hash, setHash] = useState<string>('');

  useEffect(() => {
    setHash(hashFilter(global.window && globalThis.location?.hash));
  }, []);

  const reportHandler = () => {
    window.open(
      'http://www.foodsafetykorea.go.kr/minwon/sideeffect/online.do',
      '_blank'
    );
  };

  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <Spacer size={64} mobileSize={0} />
        <SectionTitle className="desktop" label="이상사례 현황" emphasis />
      </ContentSection>
      <Spacer size={16} mobileSize={32} />
      <Content>
        <div className="font-notosans explanation">
          <Row alignItems="center" justifyContent="center">
            <p>
              <b>이상사례 보고 현황</b>을 제공합니다.
            </p>
            <button onClick={reportHandler}>이상사례 보고하기</button>
          </Row>
        </div>
      </Content>
      <TabSelect hash={hash} onChange={setHash} />
      <ContentSection className={`font-notosans`} mobilePadding={0}>
        <Content>
          <TabContent className={'t1 ' + (hash === '#tab-1' ? 'current' : '')}>
            <h1>이상사례 관리</h1>
            <p>
              건강기능식품은 유통되기 전 사전에 안전성 평가를 통해 안전성이
              확보되었음을 확인함에도 불구하고 사용자의 오남용, 위해성분
              혼입·오염 개인별 특이한 생리반응 등에 의하여 부작용이 나타날 수도
              있습니다. 그런데 부작용원인이 과학적으로 규명되기까지는
              부작용원인을 건강기능식품 때문인 것으로 단정하여 말하기 어려우므로
              ‘부작용’이라기보다 ‘이상사례’라고 말합니다. 즉 건강기능식품의
              이상사례는 신고자가 보고한 주관적 증상을 말하는 것입니다.
            </p>

            <p>이상사례에 대한 관리는 3단계로 나눌 수 있습니다.</p>

            <h2>(1) 이상사례 수집단계</h2>
            <p>
              식약처는 유통되고 있는 건강기능식품으로 인해 발생할 수 있는
              이상사례를 소비자, 영업자, 전문가로부터 체계적으로 수집합니다.
            </p>
            <h2>(2) 이상사례 원인분석 단계</h2>
            <p>
              그다음 수집된 이상사례 정보를 전산화된 통합 데이터베이스로
              관리하며 통계적방법 또는 추적조사 등을 통하여 이상사례원인을
              과학적으로 분석합니다.
            </p>
            <h2>(3) 결과 전파단계</h2>
            <p>
              이상사례 원인분석 결과를 일반대중에게 효율적으로 전파하기 위하여
              정보를 공개하고 있습니다.
            </p>

            <h1>이상사례 수집단계</h1>
            <p>
              식약처는 유통되고 있는 건강기능식품으로 인해 발생할 수 있는
              이상사례를 소비자, 영업자, 전문가로부터 체계적으로 수집합니다.
            </p>
            <p>
              * 진찰환자가 건강기능식품의 섭취에 따른 이상증상을 호소하는
              경우에는 담당의사가 직접 식약처에 그 사례를 신고할 수도 있고
              환자가 직접 ‘건강기능식품 이상사례 신고센터’에 신고할 수도
              있습니다.
            </p>

            <h1>이상사례 원인분석단계</h1>
            <p>
              이상사례는 그 증상의 경중에 따라 경미한 사례와 심각한 사례로
              구분됩니다.
            </p>
            <p>
              심각한 사례는 WHO에서 제시한 분류기준에 따르는데 ① 사망사례, ②
              생명을 위협하는 사례, ③ 입원을 요하는 사례, ④ 장애나 기능상실, ⑤
              선천적 결함이 발생하는 사례 등이 있습니다.
            </p>

            <p>
              경미한 사례에 대해서는 데이터마이닝(data mining)을 통하여
              통계적으로 의미있는 시그널을 찾아내고 알고리즘 분석으로
              건강기능식품의 섭취와 발생한 이상사례간의 인과성을 정량적으로
              평가합니다. 이 때에 각종제품정보, 즉 제품판매량 대비 이상사례
              발생분율 특정제품의 이상사례 신고편중여부, 사용자의 제품 섭취량 및
              오남용 여부 등을 종합적으로 고려하여 이상사례의 원인을 다각도로
              평가합니다.
            </p>

            <p>
              심각한 사례에 대해서는 신속히 그 원인을 규명하고 대처하기 위하여
              신고자 상담을 통한 개인병력, 병용약물, 의료기관치료여부 등
              신고자의 개인 건강정보 및 섭취한 제품정보를 파악할 뿐 아니라
              의료기관의 진료기록을 확보하고 임상전문의들의 소견을 얻어 이상사례
              원인을 과학적으로 규명하고 있습니다.
            </p>

            <h1>이상사례 원인분석 결과의 전파단계</h1>
            <p>
              이상사례의 원인분석 결과를 일반대중에게 효율적으로 전파하기 위하여
              식약처 식품안전정보포털 홈페이지 {'>'} 통합민원신고센터 {'>'}{' '}
              건강기능식품 이상사례 신고 또는 안전정보지 발간을 통해 그 결과를
              알립니다.
            </p>

            <h2>* 이상사례 분석결과</h2>
            <p>
              식약처는 2006년부터 유통되고 있는 건강기능식품에 대한 이상사례들을
              수집하여 통계학적 접근 또는 의료기록에 대한 임상적 평가를 통하여
              이상사례 원인분석에 필요한 의미있는 정보를 도출하고 있습니다. 즉,
              WHO의 기준에 따라 이상사례 증상의 심각도를 고려하여 통계분석 필요
              사례와 신속대응 필요 사례를 구분하고 통계분석 필요 사례에 대해서는
              통계학적 분석을, 신속대응 필요 사례에 대해서는 의료기록에 대한
              임상적 평가를 통하여 분석합니다.
            </p>

            <h2>통계분석 필요 사례의 분석결과</h2>
            <p>
              148건에 대한 통계분석 결과, 모두 통계적으로 의미 있는 정보는
              없었습니다.
            </p>

            <h2>신속대응 필요 사례의 분석결과</h2>
            <p>
              신속대응이 필요한 사례 7건에 대해서 개별 사례별로 의료기록에 대한
              임상적 평가를 실시하고, 의사 등 전문가들의 평가를 실시한 결과 기존
              보유질환의 악화, 병용 약물의 영향 또는 신고자의 자진 신고취하
              등으로 밝혀졌습니다.
            </p>

            <h1>이상사례가 생기면?</h1>
            <h2>1) 이상사례 유형으로 다음과 같은 것들이 있습니다.</h2>
            <p>
              가려움, 두드러기, 여드름, 피부발진, 탈모, 구토, 매스꺼움, 복통,
              설사, 소화불량, 변비, 위염, 위통, 두통, 어지러움, 부종, 황달,
              발한, 고열, 호흡이상, 생리이상, 안구통증, 체중감소
            </p>
            <p>
              * 이상사례란 소비자가 신고한 주관적 증상으로 그 원인이 과학적으로
              규명된 것은 아님
            </p>

            <h2>2) 이상사례가 의심된다면 다음을 먼저 확인하세요!</h2>
            <h3>(1) 평소 앓던 질환은 없었나요?</h3>
            <p>
              평소 앓던 질환 또는 건강기능식품 복용 중 앓았던 질환이 악화되어
              몸에 이상이 생긴 경우 일 수도 있습니다. 보유질환이 있는 경우
              건강기능식품 섭취 전에 반드시 의사와 상담하여야 하며
              건강기능식품은 의약품이 아니기 때문에 질병을 치료하기 위한
              목적으로 섭취하는 것은 잘못된 생각입니다.
            </p>
            <h3>(2) 1일 적정 섭취량을 섭취하셨나요?</h3>
            <p>
              건강기능식품을 섭취한 후 이상사례를 호소하는 사례 대부분은
              과다섭취가 원인인 경우가 많습니다. 따라서 이상사례를 의심하기 전
              스스로 권장 복용량을 섭취하였는지를 먼저 확인해 보세요.
            </p>
            <h3>(3) 다른 의약품과 함께 섭취하지는 않았나요?</h3>
            <p>
              건강기능식품은 과다섭취뿐만 아니라 다른 의약품과 병용하여 섭취할
              경우에도 이상사례가 나타날 수 있습니다. 특히 건강기능식품은
              의약품이 아니므로 복용하고 있는 약물의 효과를 높이기 위해 함께
              섭취하지 말아야 합니다.
            </p>

            <h2>3) 이상사례가 생기면 어떻게 해결하나요?</h2>
            <p>
              일단 건강기능식품 섭취도중 불편함을 느꼈다면 당장 섭취를 중단하고,
              병원을 찾아 전문가의 도움을 받아야 합니다. 만약 이 증상이
              건강기능식품의 이상사례에 의한 것이라면 의사의 진단과 확인을 거쳐
              구입가 환급과 치료비 및 경비 지급을 요구할 수 있습니다. 자가
              진단을 통해 부작용이 의심되면 섭취를 중단하고 의사의 진단 및
              치료를 받습니다.
            </p>

            <p>
              건강기능식품 섭취 이상사례에 대해 도움을 받고 싶다면{' '}
              <b>
                식품안전정보포털 홈페이지 {'>'} 통합민원신고센터 {'>'}{' '}
                건강기능식품 이상사례 신고
              </b>
              를 클릭하거나 <b>건강기능식품 이상사례 신고 핫라인(1577-2488)</b>
              로 신고하시고 소비자 피해구제를 요청하실 경우{' '}
              <b>1372 소비자상담센터</b>로 문의해주세요 이외 사항은 다음 번호로
              신고해주세요!
            </p>

            <table>
              <tbody>
                <tr>
                  <td>건강기능식품 이상사례신고 핫라인</td>
                  <td>1577-2488</td>
                </tr>
                <tr>
                  <td>식품안전소비자센터(부정ㆍ불량식품 등)</td>
                  <td>국번없이 1399</td>
                </tr>
                <tr>
                  <td>식약처 종합상담센터 허위ㆍ과대광고 신고</td>
                  <td>1577-1255</td>
                </tr>
                <tr>
                  <td>1372 소비자상담센터</td>
                  <td>1372</td>
                </tr>
              </tbody>
            </table>

            <h2>4) 신고할 때 알아야 할 사항</h2>
            <p>제품정보 (제품명, 제조사, 판매사)</p>
            <p>이상사례정보 (섭취량, 섭치기간, 보유질환 증상 등)</p>
            <p>기타 정보 (구입방법, 유통기한 등)</p>
          </TabContent>
          <TabContent className={'t2 ' + (hash === '#tab-2' ? 'current' : '')}>
            <div className="mobile-wrapper">
              <div
                className="graph desktop"
                style={{ backgroundImage: 'url(/assets/image_adverse_case_i1.svg)', }}
              />
              <div
                className="graph mobile"
                style={{ backgroundImage: 'url(/assets/image_mobile_adverse_case_i1.svg)', }}
              />
            </div>
            <p>(22년 11월 기준 업데이트)</p>
          </TabContent>
          <TabContent className={'t3 ' + (hash === '#tab-3' ? 'current' : '')}>
            <div className="mobile-wrapper">
              <div
                className="graph desktop"
                style={{ backgroundImage: `url(/assets/image_adverse_case_i2.svg)`, }}
              />
              <div
                className="graph mobile"
                style={{ backgroundImage: `url(/assets/image_mobile_adverse_case_i2.svg)`, }}
              />
            </div>
            <p>(22년 11월 기준 업데이트)</p>
          </TabContent>
          <TabContent className={'t4 ' + (hash === '#tab-4' ? 'current' : '')}>
            <div className="mobile-wrapper">
              <div
                className="graph desktop"
                style={{ backgroundImage: `url(/assets/image_adverse_case_i3.svg)`, }}
              />
              <div
                className="graph mobile"
                style={{ backgroundImage: `url(/assets/image_mobile_adverse_case_i3.svg)`, }}
              />
            </div>
            <div className="extra">
              - 건강기능식품 재평가 결과, 기능성 입증 자료 불충분으로
              건강기능식품에서 제외
              <br />※ 섭취 제품이 2개 이상인 경우가 있어 신고건수와는 상이함
            </div>
            <p>(22년 11월 기준 업데이트)</p>
          </TabContent>
          <TabContent className={'t5 ' + (hash === '#tab-5' ? 'current' : '')}>
            <div className="mobile-wrapper">
              <div
                className="graph desktop"
                style={{ backgroundImage: `url(/assets/image_adverse_case_i4.svg)`, }}
              />
              <div
                className="graph mobile"
                style={{ backgroundImage: `url(/assets/image_mobile_adverse_case_i4.svg)`, }}
              />
            </div>
            <div className="extra">
              ※ 발생 증상이 2개 이상인 경우가 있어 신고건수와는 상이함
            </div>
            <p>(22년 11월 기준 업데이트)</p>
          </TabContent>
          <TabContent className={'t6 ' + (hash === '#tab-6' ? 'current' : '')}>
            <div className="mobile-wrapper">
              <div
                className="graph desktop"
                style={{ backgroundImage: `url(/assets/image_adverse_case_i5.svg)`, }}
              />
              <div
                className="graph mobile"
                style={{ backgroundImage: `url(/assets/image_mobile_adverse_case_i5.svg)`, }}
              />
            </div>
            <p>(22년 11월 기준 업데이트)</p>
          </TabContent>
          <TabContent className={'t7 ' + (hash === '#tab-7' ? 'current' : '')}>
            <div className="mobile-wrapper">
              <div
                className="graph desktop"
                style={{ backgroundImage: `url(/assets/image_adverse_case_i6.svg)`, }}
              />
              <div
                className="graph mobile"
                style={{ backgroundImage: `url(/assets/image_mobile_adverse_case_i6.svg)`, }}
              />
            </div>
            <p>(22년 11월 기준 업데이트)</p>
          </TabContent>
        </Content>
      </ContentSection>
      <Spacer size={180} mobileSize={100} />
      <Footer />
    </>
  );
};

export default AdverseCase;
