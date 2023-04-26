import EmptyResult from '@/components/EmptyResult';
import Link from '@/components/Link';
import { Column, Row } from '@/layouts/flex-utils';
import { flex, flexCenter, mobile } from '@/styles/utils';
import {
  AquaBlue,
  AquaBlue50,
  CyanBlue,
  CyanBlue50,
  Gray100,
  Gray200,
  Gray300,
  Gray400,
  Purple,
  Purple50,
} from '@/styles/variables';
import { Functionalities } from 'hsin';
import { FC } from 'react';
import styled, { css } from 'styled-components';

export const CategoryCardContainer = styled.div`
  .wrapper {
    position: relative;
    width: 230px;
    height: 300px;
    border: 1px solid ${Gray300};
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
  }

  > .wrapper a {
    height: 100%;
  }

  h4 {
    display: inline-block;
    color: white;
    font-size: 13px;
    font-weight: 500;
  }
  p {
    width: 100%;
  }
  hr {
    border: 0;
    margin-top: 12px;
    margin-bottom: 5px;
  }
  &.category-1 {
    h4 {
      background: ${Purple};
    }
    hr {
      border-top: 2px solid ${Purple};
    }
    .goto a:hover {
      color: ${Purple};
      background: ${Purple50};
    }
  }
  &.category-2 {
    h4 {
      background: ${CyanBlue};
    }
    hr {
      border-top: 2px solid ${CyanBlue};
    }
    .goto a:hover {
      color: ${CyanBlue};
      background: ${CyanBlue50};
    }
  }
  &.category-3 {
    h4 {
      background: ${AquaBlue};
    }
    hr {
      border-top: 2px solid ${AquaBlue};
    }
    &:hover .details {
      color: ${AquaBlue};
      background: ${AquaBlue50};
    }
  }
  &.category-1,
  &.category-2,
  &.category-3 {
    h4 {
      height: 30px;
      ${flexCenter()}
      padding: 0 16px;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    p {
      margin-top: 50px;
      font-size: 18px;
      font-weight: 700;
      padding: 0 30px;
      text-align: center;
    }
    hr {
      width: 40px;
    }
    .materials {
      flex: 1;
      font-size: 14px;
      font-weight: 500;
      color: ${Gray400};
    }
    .goto {
      position: absolute;
      bottom: 0;
      width: 100%;
      border-top: 1px solid ${Gray200};

      a {
        flex: 1;
        height: 48px;
        background: ${Gray100};
        ${flexCenter()}
        transition: background 0.25s, color 0.25s;
      }
      a:first-child {
        border-right: 1px solid white;
      }
    }
    .icon {
      margin-top: 30px;
      width: 100px;
      height: 100px;
      background-repeat: no-repeat;
      background-position: center;
    }
    .details {
      position: absolute;
      bottom: 0;
      background: ${Gray100};
      border-top: 1px solid ${Gray200};
      width: 100%;
      height: 48px;
      ${flexCenter()}
    }
  }

  &.category-1,
  &.category-2 {
    .icon,
    .details {
      display: none;
    }
  }
  &.category-3 {
    p {
      margin-top: 20px;
    }
    hr,
    .goto {
      display: none;
    }
  }
  &.category- {
    visibility: hidden;
  }

  ${mobile(css`
    width: 50%;
    padding: 0 4px;
    .wrapper {
      width: 100%;
      height: 240px;
      margin-bottom: 8px;
    }
    .icon {
      width: 60px !important;
      height: 60px !important;
      background-size: 140%;
    }
    p {
      margin-top: 16px !important;
      font-size: 16px !important;
    }
    &.category- {
      display: none;
    }
  `)}
`;

const typeToClassName = (type: string) => {
  return type === '질병발생위험감소기능'
    ? 1
    : type === '영양소 기능'
    ? 2
    : type === '생리활성기능'
    ? 3
    : '';
};

export const CategoryCard: FC<{
  type: Functionalities['type'];
  id: string;
  label: string;
  materials?: string[];
}> = ({ type, id, label, materials }) => {
  const url =
    type === '질병발생위험감소기능'
      ? '/assets/HSIN_Icon(extra)_100x100.svg'
      : `https://health-functional-food.s3.ap-northeast-2.amazonaws.com/physiology/HSIN_Icon_functionality_100x100-${id
          .split('-')
          .pop()
          ?.padStart(2, '0')}.svg`;

  return (
    <CategoryCardContainer className={`category-${typeToClassName(type)}`}>
      <div className="wrapper">
        <Link
          href={
            type === '생리활성기능'
              ? `/search/functionality/${id}` + globalThis.location?.search
              : '#'
          }
        >
          {/* <Link href={`#`}> */}
          <Column className="content" alignItems="center">
            <h4>{type}</h4>
            <div
              className="icon"
              style={{
                backgroundImage: `url("${url}")`,
              }}
            />
            <p className="font-nanumsquare">{label}</p>
            <hr />
            <div className="materials">{materials?.join(', ')}</div>
          </Column>
        </Link>
        <Row className="goto">
          <Link href={`/search/product?functionalities=${id}`}>관련 제품</Link>
          <Link href={`/search/raw_material?functionalities=${id}`}>
            관련 원료
          </Link>
        </Row>
        <button className="details">상세정보</button>
      </div>
    </CategoryCardContainer>
  );
};

export const CategoryCardsContainer = styled.div`
  margin-top: 64px;

  ${mobile(css`
    margin-top: 20px;
  `)}
`;

const CategoryCards: FC<{
  data: (Functionalities & { materials?: string[] })[];
  search: string;
}> = ({ data, search }) => {
  return (
    <CategoryCardsContainer>
      <Row flexWrap="wrap" justifyContent="space-between">
        {data.length ? (
          data.map(({ type, id, functionality, materials }, i) => {
            return (
              <CategoryCard
                key={`category-card-${i}`}
                type={type}
                id={id}
                label={functionality?.replace(/\(.+?\)/, '')}
                materials={materials}
              />
            );
          })
        ) : (
          <EmptyResult search={search} />
        )}
      </Row>
    </CategoryCardsContainer>
  );
};

export default CategoryCards;
