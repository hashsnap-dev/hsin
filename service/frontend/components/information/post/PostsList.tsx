import { createPaginationIndex, dateFormat } from '@/helper/utils';
import { Gray200, Gray300, Gray400 } from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { Spacer } from '../../Flex';
import Link from '../../Link';
import Pagination from '../../Pagination';
import Image from 'next/image';
import { mobile } from '@/styles/utils';

const Container = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;

  .card {
    margin-top: 16px;
    width: 288px;
    border-radius: 4px;
    box-shadow: 0 0 0 1px ${Gray300};
    overflow: hidden;
  }
  .c1 {
    padding: 16px 16px 24px 16px;

    h4 {
      font-weight: 500;
      height: 3em;
      overflow: hidden;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
    }
    time {
      display: block;
      margin-top: 24px;
      font-size: 14px;
      font-weight: 400;
      color: ${Gray400};
    }
  }
  .card.invisible {
    visibility: hidden;
  }

  ${mobile(css`
    margin-top: 20px;
    a {
      width: 50%;
      padding: 4px;
    }
    .card {
      margin-top: 0;
      width: 100%;
    }
    .c1 {
      padding: 8px 12px;

      h4 {
        font-size: 14px;
        height: 40px;
      }
      time {
        margin-top: 15px;
        font-size: 13px;
      }
    }
  `)}
`;

const PostsList: FC<{
  page: number;
  total: number;
  limit: number;
  data: any[];
}> = ({ page, total, limit, data }) => {
  return (
    <>
      <Container className="font-notosans">
        {data?.map(({ thumbnail, title, created_at, id, href }, i) => {
          if (id === undefined) {
            return (
              <div className="card invisible" key={`post-card-${i}`}></div>
            );
          } else
            return (
              <Link
                href={`/information/post/${id}${globalThis.location?.search}`}
                key={`post-card-${i}`}
              >
                <div className="card">
                  {thumbnail && (
                    <Image
                      alt="게시글 썸네일 이미지"
                      src={thumbnail.url}
                      width="288"
                      height="288"
                    />
                  )}
                  <div className="c1">
                    <h4>{title}</h4>
                    <time>{dateFormat(created_at)}</time>
                  </div>
                </div>
              </Link>
            );
        })}
      </Container>
    </>
  );
};

export default PostsList;
