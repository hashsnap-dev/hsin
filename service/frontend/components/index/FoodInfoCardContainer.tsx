import { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import Link from '@/components/Link';
import { desktop, mobile } from '@/styles/utils';
const Container = styled.div`
  display: flex;

  ${mobile(css`
    flex-direction: column;
  `)}
`;
const Card = styled(Link)<{
  icon: string;
  bgColor: string;
  borderColor: string;
  hoverColor: string;
}>`
  position: relative;
  display: block;
  flex: 1;
  color: white;
  background: url(${({ icon }) => icon}) ${({ bgColor }) => bgColor} no-repeat
    right 24px top 24px;
  border: 1px solid ${({ borderColor }) => borderColor};

  &:hover {
    background: url(${({ icon }) => icon})
      ${({ bgColor, hoverColor }) => hoverColor || bgColor} no-repeat right 24px
      top 24px;
  }

  ${desktop(css`
    height: 268px;
    padding: 72px 0 64px 20px;

    .content {
      h2 {
        font-size: 24px;
        font-weight: 500;
      }

      h3 {
        margin-top: 20px;
        font-size: 20px;
        font-weight: 500;
      }
      p {
        margin-top: 20px;
      }
      .a {
        position: absolute;
        font-weight: 500;
        right: 24px;
        bottom: 20px;
        width: 37px;
        height: 24px;
        color: transparent;
        background: url(/assets/icon_goto_arrow.svg) no-repeat 0 0 / 37px 24px;
      }
    }
  `)}

  ${mobile(css`
    min-height: 140px;
    padding: 47px 0 0 26px;

    h2 {
      font-size: 18px;
      font-weight: 600;
      line-height: 1em;
    }
    h3 {
      margin-top: 8px;
      font-size: 18px;
      font-weight: 700;
      line-height: 1em;
    }
    p {
      margin-top: 8px;
      font-size: 14px;
      line-height: 1em;

      br {
        display: none;
      }
    }
    .a {
      display: none;
    }
  `)}
`;

export const MainFoodInfoCard: FC<{
  icon: string;
  no: string;
  title: string;
  description: ReactNode;
  bgColor: string;
  borderColor: string;
  hoverColor: string;
  href: string;
}> = ({
  icon,
  no,
  title,
  description,
  bgColor,
  borderColor,
  hoverColor,
  href,
}) => {
  return (
    <Card
      className="font-notosans"
      href={href}
      icon={icon}
      bgColor={bgColor}
      borderColor={borderColor}
      hoverColor={hoverColor}
    >
      <div className="content">
        <h2 className="font-poppins">{no}</h2>
        <h3>{title}</h3>
        {description}
        <div className="a">보러가기</div>
      </div>
    </Card>
  );
};
const MainFoodInfoCardContainer: FC<{}> = Container;

export default MainFoodInfoCardContainer;
