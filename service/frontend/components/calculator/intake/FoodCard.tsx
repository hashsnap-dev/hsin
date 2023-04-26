import { IntegrationFoodList } from '@/../../@types/hsin';
import { Column, Row } from '@/layouts/flex-utils';
import { alignItems, mobile } from '@/styles/utils';
import { Gray100, Gray200, Gray300, Gray400 } from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';

export const FoodItemContainer = styled.div`
  cursor: pointer;
  padding: 4px 16px;

  .thumbnail {
    min-width: 64px;
    width: 64px;
    height: 64px;
    background: no-repeat center / contain;
  }
  .content {
    width: 0;
    flex: 1;
    padding-left: 16px;
    background: no-repeat right 5px center;

    h4 {
      margin-top: 0;
      font-size: 16px;
      font-weight: 400;
      padding-right: 25px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p {
      margin-top: 5px;
      font-size: 13px;
      color: ${Gray400};
      padding-right: 25px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &:hover {
    background: ${Gray100};

    .content {
      background-image: url(/assets/icon_calculator_add.svg);
    }
  }
`;

export const FoodItem: FC<{
  thumbnails?: string[];
  report_no: string;
  type: string;
  name: string;
  company: string;
  onClick: () => void;
}> = ({ thumbnails, report_no, type, name, company, onClick, ...props }) => {
  return (
    <FoodItemContainer {...props} onClick={onClick}>
      <Row>
        <div
          className="thumbnail"
          style={{
            backgroundImage: `url(${
              thumbnails?.length
                ? `https://health-functional-food.s3.ap-northeast-2.amazonaws.com/saved/${report_no}/${thumbnails[0]}`
                : ''
            }), url(${
              thumbnails?.length ? '' : '/assets/image_product_empty.svg'
            })`,
          }}
        />
        <Column className="content" justifyContent="center">
          <h4>
            {type === 'domestic'
              ? '[국내]'
              : type === 'foreign'
              ? '[수입]'
              : ''}{' '}
            {name}
          </h4>
          <p>{company}</p>
        </Column>
      </Row>
    </FoodItemContainer>
  );
};

export const FoodCardContainer = styled.div`
  cursor: pointer;
  padding: 14px 16px;
  border: 1px solid ${Gray300};
  border-radius: 4px;
  margin-bottom: 4px;
  position: relative;

  .thumbnail {
    width: 80px;
    height: 80px;
    background: no-repeat center / contain;
  }
  .content {
    flex: 1;
    padding-left: 20px;
    background: no-repeat right 34px center;
    width: 0;

    .close {
      position: absolute;
      right: 16px;
      top: 14px;
      width: 24px;
      height: 24px;
      background: url(/assets/icon_calculator_delete.svg) no-repeat center;
    }
    .visible {
      position: absolute;
      right: 16px;
      bottom: 14px;
      height: 24px;
      padding-left: 26px;
      font-size: 12px;
      ${alignItems('center')}
      background: url(/assets/icon_calculator_visible.svg) no-repeat 0 center;
    }

    h4 {
      margin-top: 0;
      font-size: 14px;
      font-weight: 400;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 40px;
    }
    p {
      font-size: 13px;
      color: ${Gray400};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 40px;
    }
  }
  &.invisible {
    border-color: ${Gray200};

    .thumbnail {
      filter: grayscale(1);
    }
    h4,
    p {
      opacity: 0.6;
    }
    .visible {
      background-image: url(/assets/icon_calculator_invisible.svg);
    }
  }

  ${mobile(css`
    width: 100%;
    h4 {
      font-size: 16px;
      font-weight: 400;
    }
    p {
      font-size: 13px;
      font-weight: 400;
    }
  `)}
`;

const FoodCard: FC<{
  thumbnails?: string[];
  report_no: string;
  type: string;
  name: string;
  company: string;
  visible: boolean;
  onDeleteClick: () => void;
  onVisibleClick: () => void;
}> = ({
  thumbnails,
  report_no,
  type,
  name,
  company,
  visible,
  onDeleteClick,
  onVisibleClick,
  ...props
}) => {
  return (
    <FoodCardContainer className={visible ? '' : 'invisible'} {...props}>
      <Row>
        <div
          className="thumbnail"
          style={{
            backgroundImage: `url(${
              thumbnails?.length
                ? `https://health-functional-food.s3.ap-northeast-2.amazonaws.com/saved/${report_no}/${thumbnails[0]}`
                : ''
            }), url(${
              thumbnails?.length ? '' : '/assets/image_product_empty.svg'
            })`,
          }}
        />
        <Column className="content" justifyContent="center">
          <button className="close" onClick={onDeleteClick}></button>
          <div className="visible" onClick={onVisibleClick}>
            {visible ? '포함' : '제외'}
          </div>
          <h4>
            {type === 'domestic'
              ? '[국내]'
              : type === 'foreign'
              ? '[수입]'
              : ''}{' '}
            {name}
          </h4>
          <p>{company}</p>
        </Column>
      </Row>
    </FoodCardContainer>
  );
};

export default FoodCard;
