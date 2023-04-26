import { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  AquaBlue,
  AquaBlue150,
  AquaBlue50,
  Gray100,
  Gray200,
  Gray300,
  Gray600,
} from '@/styles/variables';
import Link from '@/components/Link';
import { desktop, flexCenter, mobile } from '@/styles/utils';

const CardContainer = styled(Link)<{ icon: string }>`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  text-align: center;
  background: url(${({ icon }) => icon}) no-repeat center 17px / 100px;
  background-position: center;
  font-weight: 500;
  transition: background-size 0.1s, color 0.3s;
  &:hover {
    background-size: 120px;
    color: ${AquaBlue};
  }
`;

const PrimaryFuncCard: FC<{ icon: string; title: string; href: string }> = ({
  icon,
  title,
  href,
}) => {
  return (
    <CardContainer href={href} icon={icon}>
      <p>{title}</p>
    </CardContainer>
  );
};

const Container = styled.div`
  margin-top: 18px;
  display: flex;
  box-shadow: 0 0 0 3px ${Gray200};
  font-size: 14px;

  ${desktop(css`
    .c1,
    .c2 {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      height: 100%;
    }

    .c1 {
      padding: 0 15px;
      background: white;
    }
    .c2 {
      box-shadow: inset 0 0 0 0.5px ${Gray200};
    }
    .c2 a {
      width: 25%;
      height: 50px;
      text-align: center;
      background: white;
      transition: color 0.3s, background 0.3s, box-shadow 0.3s;
      box-shadow: inset 0 0 0 0.5px ${Gray200}, 0 0 0 0.5px ${Gray200};

      &:hover {
        color: ${AquaBlue};
        font-weight: 500;
        position: relative;
        background: ${AquaBlue50};
        box-shadow: inset 0 0 0 0.5px ${AquaBlue150}, 0 0 0 0.5px ${AquaBlue150};
      }
    }
    ${CardContainer} {
      width: 20%;
      height: 150px;
      padding-bottom: 17px;
    }
    .more {
      display: none;
    }
  `)}

  ${mobile(css`
    flex-direction: column;

    .c1,
    .c2 {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      height: 100%;
    }
    ${CardContainer} {
      width: 25%;
      height: 135px;
      background-size: 80px 80px;

      p {
        height: 36px;
      }
    }
    .c2 {
      display: none;

      a {
        width: 50%;
        height: 50px;
        box-shadow: inset 0 0 0 0.5px ${Gray200}, 0 0 0 0.5px ${Gray200};
        font-size: 14px;

        &:hover {
          color: ${AquaBlue};
          font-weight: 500;
          position: relative;
          background: ${AquaBlue50};
          box-shadow: inset 0 0 0 0.5px ${AquaBlue150},
            0 0 0 0.5px ${AquaBlue150};
        }
      }
    }
    .more {
      ${flexCenter()}
      cursor: pointer;
      height: 40px;
      font-size: 14px;
      color: ${Gray600};
      background: ${Gray100};
    }
    .show_mobile {
      display: flex;
    }
  `)}
`;

const FunctionalityShortcut: FC<{}> = () => {
  const [showExtraMats, setShowExtraMats] = useState(false);

  return (
    <Container className="font-notosans">
      <div className="c1">
        <PrimaryFuncCard
          icon="https://health-functional-food.s3.ap-northeast-2.amazonaws.com/physiology/HSIN_Icon_functionality_100x100-06.svg"
          title="면역기능개선"
          href="/search/functionality/3-6"
        />
        <PrimaryFuncCard
          icon="https://health-functional-food.s3.ap-northeast-2.amazonaws.com/physiology/HSIN_Icon_functionality_100x100-11.svg"
          title="혈행개선"
          href="/search/functionality/3-11"
        />
        <PrimaryFuncCard
          icon="https://health-functional-food.s3.ap-northeast-2.amazonaws.com/physiology/HSIN_Icon_functionality_100x100-12.svg"
          title="기억력개선"
          href="/search/functionality/3-12"
        />
        <PrimaryFuncCard
          icon="https://health-functional-food.s3.ap-northeast-2.amazonaws.com/physiology/HSIN_Icon_functionality_100x100-24.svg"
          title="갱년기 여성 건강"
          href="/search/functionality/3-24"
        />
        <PrimaryFuncCard
          icon="https://health-functional-food.s3.ap-northeast-2.amazonaws.com/physiology/HSIN_Icon_functionality_100x100-05.svg"
          title="체지방 감소"
          href="/search/functionality/3-5"
        />
        <PrimaryFuncCard
          icon="https://health-functional-food.s3.ap-northeast-2.amazonaws.com/physiology/HSIN_Icon_functionality_100x100-14.svg"
          title="눈 건강"
          href="/search/functionality/3-14"
        />
        <PrimaryFuncCard
          icon="https://health-functional-food.s3.ap-northeast-2.amazonaws.com/physiology/HSIN_Icon_functionality_100x100-10.svg"
          title="혈중 중성지방 개선"
          href="/search/functionality/3-10"
        />
        <PrimaryFuncCard
          icon="https://health-functional-food.s3.ap-northeast-2.amazonaws.com/physiology/HSIN_Icon_functionality_100x100-01.svg"
          title="장 건강"
          href="/search/functionality/3-1"
        />
        <PrimaryFuncCard
          icon="https://health-functional-food.s3.ap-northeast-2.amazonaws.com/physiology/HSIN_Icon_functionality_100x100-08.svg"
          title="피부 건강"
          href="/search/functionality/3-8"
        />
        <PrimaryFuncCard
          icon="https://health-functional-food.s3.ap-northeast-2.amazonaws.com/physiology/HSIN_Icon_functionality_100x100-13.svg"
          title="간 건강"
          href="/search/functionality/3-13"
        />
      </div>
      {!showExtraMats && (
        <div className="more" onClick={() => setShowExtraMats(true)}>
          펼치기
        </div>
      )}
      <div className={'c2 ' + (showExtraMats ? 'show_mobile' : '')}>
        <Link className="flex-center" href="/search/functionality/3-7">
          항산화
        </Link>
        <Link className="flex-center" href="/search/functionality/3-22">
          피로개선
        </Link>
        <Link className="flex-center" href="/search/functionality/3-18">
          칼슘 흡수 촉진
        </Link>
        <Link className="flex-center" href="/search/functionality/3-4">
          혈중 콜레스테롤 개선
        </Link>
        <Link className="flex-center" href="/search/functionality/3-3">
          관절/뼈 건강
        </Link>
        <Link className="flex-center" href="/search/functionality/3-19">
          운동수행 능력
        </Link>
        <Link className="flex-center" href="/search/functionality/3-31">
          어린이 성장 발육
        </Link>
        <Link className="flex-center" href="/search/functionality/3-2">
          혈당 조절
        </Link>
        <Link className="flex-center" href="/search/functionality/3-34">
          구강 건강
        </Link>
        <Link className="flex-center" href="/search/functionality/3-17">
          전립선 건강
        </Link>
        <Link className="flex-center" href="/search/functionality/3-9">
          혈압 조절
        </Link>
        <Link className="flex-center" href="/search/functionality/3-30">
          월경전 상태 개선
        </Link>
        <Link className="flex-center" href="/search/functionality/3-29">
          여성 질 건강
        </Link>
        <Link className="flex-center" href="/search/functionality/3-27">
          위 건강/소화기능
        </Link>
        <Link className="flex-center" href="/search/functionality/3-15">
          긴장완화
        </Link>
        <Link className="flex-center" href="/search/functionality/3-16">
          인지능력 향상
        </Link>
        <Link className="flex-center" href="/search/functionality/3-32">
          수면질 개선
        </Link>
        <Link className="flex-center" href="/search/functionality/3-25">
          과민 피부 상태 개선
        </Link>
        <Link className="flex-center" href="/search/functionality/3-33">
          근력 개선
        </Link>
        <Link className="flex-center" href="/search/functionality/3-23">
          갱년기 남성 건강
        </Link>
        <Link className="flex-center" href="/search/functionality/3-20">
          요로 건강
        </Link>
        <Link className="flex-center" href="/search/functionality/3-26">
          배뇨기능개선
        </Link>
        <Link className="flex-center" href="/search/functionality/3-28">
          정자 운동성
        </Link>
        <Link className="flex-center" href="/search/functionality">
          더보기+
        </Link>
      </div>
    </Container>
  );
};

export default FunctionalityShortcut;
