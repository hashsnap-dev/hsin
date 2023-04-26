import {
  AquaBlue600,
  Gray100,
  Gray200,
  Gray300,
  Gray500,
  Gray600,
} from '@/styles/variables';
import { FC, useRef } from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import { Spacer } from '@/components/Flex';
import Link from '@/components/Link';
import { alignItems, desktop, flexCenter, mobile } from '@/styles/utils';
import { FunctionalityMaterials } from 'hsin';
import { functionalityList } from '@/helper/functionality-list';
import EmptyResult from '@/components/EmptyResult';

const Container = styled.div`
  margin-top: 25px;

  .row {
    width: 100%;
  }
  .func_list {
    display: none;
    position: absolute;
    z-index: 2;
    background: white;
    border-radius: 4px;
    border: 1px solid ${Gray300};
    padding: 16px;
    width: 260px;
    transform: translate(-85%, 30px);
    box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.125);

    h4 {
      font-size: 14px;
      font-weight: 500;
      background: url(/assets/icon_raw_material_functionality_preview.svg)
        no-repeat left center;
      padding-left: 18px;
      margin-bottom: 10px;
    }
    p {
      font-size: 13px;
      color: ${Gray500};
    }
  }
  .c4 {
    position: relative;
  }
  .c4:hover .func_list {
    display: block;
  }
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    /* Enter your style code */
    .c4:hover .func_list {
      display: block;
      transform: translate(-107%, -15px);
    }
  }
  ${desktop(css`
    .row:not(.header) {
      cursor: pointer;
      ${alignItems('stretch')}
      border-bottom: 1px solid ${Gray300};
      a {
        flex: 1;
        ${alignItems('center')}
      }
      > div {
        ${alignItems('center')}
        height: 80px;
        font-size: 14px;
      }
    }
    .row {
      .c1 {
        width: 160px;
        height: unset;
      }
      .c2 {
        flex: 1;
        justify-content: start;

        .abolished:before,
        .canceled:before {
          display: inline-block;
          font-size: 10px;
          font-weight: 500;
          color: ${AquaBlue600};
          border-radius: 2px;
          border: 1px solid ${AquaBlue600};
          padding: 1px 2px;
          margin-right: 8px;
        }
        .abolished:before {
          content: '인정폐지';
        }
        .canceled:before {
          content: '인정취소';
        }
      }
      .c3 {
        width: 180px;
      }
      .c4 {
        width: 100px;
        background: url(/assets/icon_raw_material_functionality.svg) no-repeat
          center;
      }
      .c4.disabled {
        background-image: none;
      }
      > div {
        ${flexCenter()}
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

      > div {
        text-align: center;
      }
      .c2 {
        justify-content: center;
      }
      .c4 {
        background-image: none;
      }
    }
  `)}

  ${mobile(css`
    a .row {
      border-bottom: 1px solid ${Gray200};
    }
    a:nth-of-type(1) .row {
      border-top: 1px solid ${Gray600};
    }
    .items {
      .row {
        cursor: pointer;
        position: relative;
        display: flex;
        font-size: 14px;

        border-bottom: 1px solid ${Gray300};

        a {
          flex: 1;
          padding: 18px 0;
        }
        .c1 {
          display: inline-block;
          font-size: 10px;
          font-weight: 500;
          color: ${Gray600};
          border-radius: 2px;
          border: 1px solid ${Gray600};
          padding: 1px 2px;
          margin-right: 8px;
        }
        .c2 {
          display: inline-block;
        }
        .c3 {
          width: 100%;
        }
        .c4 {
          width: 50px;
          background: url(/assets/icon_raw_material_functionality.svg) no-repeat
            center;
        }
        .c4.disabled {
          background-image: none;
        }
      }
      .row:first-child {
        border-top: 1px solid ${Gray600};
      }
      .row:last-child {
        border-bottom: 1px solid ${Gray600};
      }
    }
    .header {
      display: none;
    }
  `)}
`;

export type BoardListItem = {
  thumbnail: string;
  title: string;
  functionality: string;
  company: string;
  reportNo: string;
};

const BoardList: FC<{
  page: number;
  total: number;
  limit: number;
  data: FunctionalityMaterials[];
  params: any;
  search: string;
}> = ({ page, total, limit, data = [], params, search }) => {
  return (
    <Container className="font-notosans">
      <div className="header row">
        <div className="c1">카테고리</div>
        <div className="c2">원료명</div>
        <div className="c3">업체명</div>
        <div className="c4">기능성</div>
      </div>
      {data?.length ? (
        <>
          <div className="items">
            {data.map(
              (
                { no, type, name, company, functionality, abolished, canceled },
                i
              ) => (
                <div className="row" key={`board-content-row-${i}`}>
                  <Link
                    href={
                      type === '사용불가원료'
                        ? '/search/raw_material/' +
                          name.replace(/ /g, '_') +
                          globalThis.location?.search
                        : '/search/raw_material/' +
                          no +
                          globalThis.location?.search
                    }
                  >
                    <div className="c1">{type.split('-').pop()}</div>
                    <div className="c2">
                      <span
                        className={
                          abolished ? 'abolished' : canceled ? 'canceled' : ''
                        }
                      />
                      {name}
                    </div>
                    <div className="c3">{company || '-'}</div>
                  </Link>
                  <div
                    className={
                      'c4 ' + (type === '사용불가원료' ? 'disabled' : '')
                    }
                  >
                    {type !== '사용불가원료' && (
                      <div className="func_list">
                        <h4>기능성 내용</h4>
                        {functionality.map((id, i) => (
                          <p key={i}>
                            {functionalityList.find(({ no }) => no === id)
                              ?.label ?? ''}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
          <Spacer size={64} mobileSize={16} />
          <Pagination params={params} page={page} total={total} limit={limit} />
        </>
      ) : (
        <EmptyResult search={search} />
      )}
    </Container>
  );
};

export default BoardList;
