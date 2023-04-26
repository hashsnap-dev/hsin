import {
  Gray100,
  Gray200,
  Gray300,
  Gray500,
  Gray600,
} from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import { Spacer } from '@/components/Flex';
import Link from '@/components/Link';
import { desktop, flexCenter, mobile } from '@/styles/utils';
import { Functionalities, IntegrationFoodList } from 'hsin';
import useSWR from 'swr';
import EmptyResult from '@/components/EmptyResult';

const Container = styled.div`
  margin-top: 16px;

  .thumbnail {
    background: no-repeat center / contain;
  }

  ${desktop(css`
    .row:not(.header) {
      cursor: pointer;
      display: flex;
      align-items: center;
      border-bottom: 1px solid ${Gray300};
      > div {
        display: flex;
        align-items: center;
        /* height: 80px; */
        font-size: 14px;
      }
    }
    .row {
      .thumbnail {
        width: 120px;
        justify-content: center;
        height: 80px;
      }
      .c {
        width: 100%;
        ${flexCenter()}
        > div {
          display: inline-block;
        }
      }
      .title {
        width: 244px;
        padding-left: 20px;
      }
      .functionality {
        flex: 1;
        padding: 10px 20px;
        /* padding-left: 20px; */
      }
      .company {
        width: 300px;
        padding-left: 20px;
        text-align: center;
      }
    }
    .header {
      display: flex;
      align-items: center;
      height: 28px;
      background: ${Gray100};
      border-top: 1px solid ${Gray600};
      border-bottom: 1px solid ${Gray300};

      font-size: 12px;
      font-weight: 400;

      > div > * {
        text-align: center;
      }

      .thumbnail {
        text-align: center;
        width: 120px;
        height: unset;
      }
    }
  `)}

  ${mobile(css`
    .items {
      a .row {
        border-bottom: 1px solid ${Gray200};
      }
      a:first-child .row {
        border-top: 1px solid ${Gray600};
      }
      a:last-child .row {
        border-bottom: 1px solid ${Gray600};
      }
    }
    .row {
      position: relative;
      display: flex;
    }
    .header {
      display: none;
    }
    .c {
      position: relative;
      flex: 1;
      min-height: 100%;
      padding: 12px 17px;
      overflow: hidden;
    }
    .thumbnail {
      width: 148px;
      height: 130px;
    }
    .company {
      font-size: 12px;
      color: ${Gray500};

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .title {
      font-size: 17px;
      font-weight: 500;
      color: ${Gray600};

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .functionality {
      position: absolute;
      font-size: 13px;
      color: ${Gray600};
      bottom: 17px;
      max-height: 3em;
      overflow: hidden;

      /* overflow: hidden; */
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  `)}
`;

export type BoardListItem = IntegrationFoodList;

const BoardList: FC<{
  page: number;
  total: number;
  limit: number;
  data: IntegrationFoodList[];
  params: string;
  search: string;
}> = ({ page, total, limit, data = [], params, search }) => {
  const { data: funcData, error: funcError } =
    useSWR<{ total: number; data: Functionalities[] }>(`/api/functionalities`);

  const computeFunctionalities = (funcs: string[]) => {
    if (!funcData || !funcs) return [];
    const { data } = funcData;
    return funcs.map((func) => {
      return data?.find(({ id }) => func === id)?.functionality ?? '';
    });
  };

  return (
    <Container className="font-notosans">
      <div className="header row">
        <div className="thumbnail">제품사진</div>
        <div className="c">
          <div className="title">제품명</div>
          <div className="functionality">기능성</div>
          <div className="company">제조사명</div>
        </div>
      </div>
      {data?.length ? (
        <>
          <div className="items">
            {data.map(
              (
                {
                  type,
                  thumbnail,
                  thumbnails,
                  name,
                  functionalities,
                  company,
                  report_no,
                },
                i
              ) => {
                return (
                  <Link
                    href={
                      '/search/product/' +
                      (type === 'domestic'
                        ? 'd'
                        : type === 'foreign'
                        ? 'o'
                        : '') +
                      report_no +
                      '?' +
                      params
                    }
                    key={`board-content-row-${i}`}
                  >
                    <div className="row">
                      <div
                        className="thumbnail"
                        style={{
                          backgroundImage: !thumbnails?.length
                            ? `url(/assets/image_search_sample.svg)`
                            : `url(https://health-functional-food.s3.ap-northeast-2.amazonaws.com/saved/${report_no}/${thumbnails?.[0]})`,
                        }}
                      />
                      <div className="c">
                        <div className="title">{name}</div>
                        <div className="functionality">
                          {computeFunctionalities(functionalities).join(', ')}
                        </div>
                        <div className="company">{company}</div>
                      </div>
                    </div>
                  </Link>
                );
              }
            )}
          </div>
        </>
      ) : (
        <EmptyResult search={search} />
      )}
    </Container>
  );
};

export default BoardList;
