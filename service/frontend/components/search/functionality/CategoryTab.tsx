import Link from "@/components/Link";
import { FunctionalityType } from "@/helper/enums";
import { omit, useQuery } from "@/helper/utils";
import { flexCenter, mobile } from "@/styles/utils";
import { AquaBlue, Gray200 } from "@/styles/variables";
import qs from "qs";
import { FC } from "react";
import styled, { css } from "styled-components";

const CategoryTabContainer = styled.ul`
  margin-top: 40px;
  ${flexCenter()}
  border-bottom: 1px solid ${Gray200};

  li {
    width: 206px;
    height: 48px;

    font-size: 18px;

    a {
      cursor: pointer;
      width: 100%;
      height: 100%;
      ${flexCenter()}
    }

    &.current {
      position: relative;
      font-weight: 500;
      color: ${AquaBlue};
    }
    &.current:before {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 2px;
      background: ${AquaBlue};

    }
  }

${mobile(css`
justify-content: space-between;
  li {
    font-size: 14px;
    width: unset;
  }
`)}
`;

const CategoryTab: FC<{
  value: FunctionalityType;
  onChange: (type: FunctionalityType) => void;
}> = ({onChange, value}) => {
  const query = useQuery();
  const {type} = query;

  const mergeUrl = (val: any) => {
    return '?' + qs.stringify({...query, type: val});
  };

  return <CategoryTabContainer>
    <li className={typeof type !== 'number' && !type ? 'current' : ''}><a onClick={() => onChange(FunctionalityType.all)}>전체</a></li>
    <li className={type === FunctionalityType.physiology ? 'current' : ''}><a onClick={() => onChange(FunctionalityType.physiology)}>생리활성기능</a></li>
    <li className={type === FunctionalityType.nutrient ? 'current' : ''}><a onClick={() => onChange(FunctionalityType.nutrient)}>영양소 기능</a></li>
    <li className={type === FunctionalityType.reduceDisease ? 'current' : ''}><a onClick={() => onChange(FunctionalityType.reduceDisease)}>질병발생위험감소기능</a></li>
  </CategoryTabContainer>
};

export default CategoryTab;