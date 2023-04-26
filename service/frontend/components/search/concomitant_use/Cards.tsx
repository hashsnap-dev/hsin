import { EatTogether } from '@/../../@types/hsin';
import EmptyResult from '@/components/EmptyResult';
import { Spacer } from '@/components/Flex';
import Link from '@/components/Link';
import Pagination from '@/components/Pagination';
import { useQuery } from '@/helper/utils';
import { Column, Row } from '@/layouts/flex-utils';
import { flexCenter, mobile } from '@/styles/utils';
import { Gray300 } from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';

const CardContainer = styled.div`
  width: ${100 / 5}%;
  padding: 8px;

  .wrapper {
    height: 280px;
    border: 1px solid ${Gray300};
    border-radius: 10px;
    ${flexCenter()}
  }
  .icon {
    width: 150px;
    height: 150px;
    background: no-repeat center / 120%;
  }
  p {
    margin-top: 30px;
    font-size: 18px;
    font-weight: 500;
  }

  ${mobile(css`
    width: ${100 / 2}%;
    .wrapper {
      height: 200px;
    }
    p {
      font-size: 16px;
    }

    .icon {
      width: 100px;
      height: 100px;
    }
  `)}
`;

export const Card: FC<{
  name: string;
  icon: string;
}> = ({ name, icon }) => {
  return (
    <CardContainer>
      <Link
        href={`/search/concomitant_use/${encodeURIComponent(name)}${
          globalThis.location?.search
        }`}
      >
        <Column className="wrapper" alignItems="center">
          <div
            className="icon"
            style={{
              // backgroundImage: `url(/assets/icon_concomitant_use_1.svg)`,
              backgroundImage: `url('${icon}')`,
            }}
          />
          <p>{name}</p>
        </Column>
      </Link>
    </CardContainer>
  );
};

const CardsContainer = styled.div``;

const Cards: FC<{
  data: EatTogether[];
  page: number;
  limit: number;
  total: number;
  params: any;
  search: string;
}> = ({ data, page, limit, total, params, search }) => {
  return (
    <CardsContainer>
      <Row flexWrap="wrap">
        {data.length ? (
          data.map((item, i) => {
            if (item) {
              const { name, thumbnail } = item;
              return (
                <Card
                  name={name}
                  icon={`https://health-functional-food.s3.ap-northeast-2.amazonaws.com/concomitant_use/${name.replace(
                    /\//g,
                    '_'
                  )}.svg`}
                  key={`concomitant-${i}`}
                />
              );
            } else <></>;
          })
        ) : (
          <EmptyResult search={search} />
        )}
      </Row>
      <Spacer size={64} />
      <Pagination params={params} page={page} total={total} limit={limit} />
    </CardsContainer>
  );
};

export default Cards;
