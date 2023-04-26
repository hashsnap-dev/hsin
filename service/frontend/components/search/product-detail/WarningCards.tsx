import { desktop, flex, mobile } from '@/styles/utils';
import { AquaBlue100, AquaBlue50, Gray500 } from '@/styles/variables';
import { FC } from 'react';
import styled, { css } from 'styled-components';

const WarningCardContainer = styled.div`
  margin-top: 4px;
  width: 180px;
  height: 64px;

  ${flex('center', 'start')}
  .image-wrapper {
    display: inline-block;
    width: 64px;
    min-width: 64px;
    height: 64px;
    min-height: 64px;
    padding: 0px;
    border-radius: 9999px;
    background: ${AquaBlue50} no-repeat center;
    border: 1px solid ${AquaBlue100};
  }
  p {
    display: inline-block;
    font-size: 12px;
    color: ${Gray500};
    padding: 0 20px 0 8px;
  }

  ${mobile(css`
    .image-wrapper {
      display: inline-block;
      width: 64px;
      min-width: 64px;
      height: 64px;
      min-height: 64px;
      padding: 0px;
      border-radius: 9999px;
      background: ${AquaBlue50} no-repeat center;
      border: 1px solid ${AquaBlue100};
    }
    p {
      display: inline-block;
      font-size: 12px;
      color: ${Gray500};
      padding: 0 20px 0 8px;
    }
  `)}
`;

const WarningCardsContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  ${flex('initial', 'initial', { wrap: 'wrap' })}
  /* gap: 4px; */

  ${mobile(css`
    display: block;
    width: 100%;
    white-space: nowrap;
    overflow-x: auto;
    > * {
      white-space: initial;
    }
    &::-webkit-scrollbar {
      height: 0;
    }
    ${WarningCardContainer} {
      display: inline-flex;
      vertical-align: top;
      margin-top: 4px;
      margin-right: 10px;
    }
  `)}
`;

type WarningCardProps = { icon: string; label: string };
const WarningCard: FC<WarningCardProps> = ({ icon, label }) => {
  return (
    <WarningCardContainer>
      <div
        className="image-wrapper"
        style={{ backgroundImage: `url(${icon})` }}
      >
        {/* <img src={icon} /> */}
      </div>
      <p>{label}</p>
    </WarningCardContainer>
  );
};

const WarningCards: FC<{ data: WarningCardProps[] }> = ({ data }) => {
  return (
    <WarningCardsContainer>
      {data.map(({ icon, label }, i) => (
        <WarningCard icon={icon} label={label} key={`warning-card-${i}`} />
      ))}
    </WarningCardsContainer>
  );
};

export default WarningCards;
