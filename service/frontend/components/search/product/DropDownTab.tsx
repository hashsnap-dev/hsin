import { unique, useOutsideClick } from '@/helper/utils';
import { alignItems, fill, flex, flexCenter, justifyContent, mobile } from '@/styles/utils';
import { AquaBlue, AquaBlue500, CyanBlue, CyanBlue500, Gray100, Gray200, Gray300, Gray500, Gray600 } from '@/styles/variables';
import Checkbox, { CheckboxContainer } from '@/components/Checkbox';
import { FC, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Spacer } from '@/components/Flex';
import Image from 'next/image';
import { Functionalities } from 'hsin';
import { functionalityList as list } from '@/helper/functionality-list';

enum FunctionalityType {
  reduceDisease,
  nutrient,
  physiology,
};

const FunctionalityTypeName = {
  [FunctionalityType.reduceDisease]: '질병발생위험감소기능',
  [FunctionalityType.nutrient]: '영양소 기능',
  [FunctionalityType.physiology]: '생리활성 기능',
}

const Container = styled.div`
  position: relative;
  width: 720px;
  height: 30px;
  /* box-shadow: inset 0 0 0 1px ${Gray300}; */

  /* border-radius: 4px; */
  background: white;
  .buttons {
    display: flex;
    height: 100%;
    font-weight: 500;

    button {
      position: relative;
      cursor: pointer;
      flex: 1;
      ${flex('center', 'space-between')}
      height: 100%;
      border: 0;
      outline: none;
      text-align: left;
      background: url(/assets/icon_dropdowntab_dropdown.svg) white
        no-repeat right 8px center;
      padding: 0 30px 0 20px;
      box-shadow: 0 0 0 1px ${Gray300};
      /* border-left: 1px solid ${Gray300};
      border-right: 1px solid ${Gray300}; */
      transition: background 0.3s;

      span {
        display: inline-block;
        background: ${CyanBlue};
        font-size: 12px;
        font-weight: 500;
        border-radius: 4px;
        width: 20px;
        height: 20px;
        color: white;
        line-height: 20px;
        text-align: center;
        transition: background 0.3s;
      }
      .zero {
        background: ${Gray500};
      }
    }
    button.hide {
      background-color: ${Gray100};
      z-index: 1;
    }
    button.selected {
      z-index: 2;
    }
    button:first-child {
      border-left: 0;
    }
  }
  .buttons-mask {
    position: absolute;
    width: 100%;
    ${flex()}

    div {
      flex: 1;
    }
    .selected {
      height: 4px;
      background: white;
      transform: translateY(-2px);
      z-index: 3;
    }
  }
${mobile(css`
  width: 100%;
  height: 40px;
  .buttons button {
    width: 33%;
    padding: 0 10px;
  }
`)}
`;


export const DropDownTabModalContainer = styled.div`
  position: absolute;
  width: 960px;
  padding: 22px 30px 16px 30px;
  background: white;
  border: 1px solid ${Gray300};
  border-radius: 4px;
  z-index: 2;
  transform: translate(-120px, -1px);
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.125);
  ${flex('start', 'center', {direction: 'column'})};
  transition: background 0.3s;

  .reset {
    position: absolute;
    color: white;
    border-radius: 4px;
    background: url(/assets/icon_product_func_reset.svg) ${AquaBlue} no-repeat right 11px center;
    width: 68px;
    height: 28px;
    text-align: left;
    padding-left: 10px;
    font-size: 12px;
    font-weight: 500;
    right: 30px;
    top: 16px;
  }

  h1 {
    font-size: 16px;
    font-weight: 500;
    color: ${Gray600};
  }

  .content {
    margin-top: 12px;
    width: 100%;
    ${flex('center', 'start', {wrap: 'wrap'})};
  }
  .physiology ${CheckboxContainer} {
    width: ${100 / 5}%;
  }
  ${CheckboxContainer} {
    width: ${100 / 3}%;
    min-height: 20px;
    font-size: 12px;
    ${flex('center')}
    input {
      margin-right: 7px;
    }
  }

${mobile(css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  transform: unset;
  padding: 0;
  ${flex('flex-start', 'start', {direction: 'column'})}

  .header {
    width: 100%;
    height: 60px;
    ${flexCenter()}
    
    color: ${Gray600};
  }
  .tabs {
    width: 100%;
    height: 33px;
    border-bottom: 1px solid ${Gray200};
    ${justifyContent('space-between')}
    padding: 0 25px;


    button {
      height: 33px;
      position: relative;
      font-size: 14px;
      padding: 0;
      color: ${Gray600};
      ${alignItems('flex-start')}
    }
    .current {
      color: ${AquaBlue};
      font-weight: 500;
    }
    .current:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background: ${AquaBlue};
      bottom: 0;
      left: 0;
    }
  }
  .content {
    margin-top: 0;
    flex: 1;
    padding: 24px 16px;
    flex-direction: column;
    flex-wrap: nowrap;
    overflow-y: scroll;

    ${CheckboxContainer} {
      width: 100%;
      min-height: 26px;
      
    }
  }
  .footer {
    width: 100%;
    height: 80px;
    background: white;
    padding: 16px;
    ${flex()}

    button {
      flex: 1;
      position: static;
      border: 1px solid ${AquaBlue500};
      border-radius: 4px;
      height: 48px;
      text-align: center;
    }
    .reset {
      font-weight: 500;
      color: ${AquaBlue500};
      background: white;
      ${flexCenter()}

      gap: 4px;
    }
    .close {
      font-weight: 500;
      color: white;
      background: ${AquaBlue};
    }
  }
`)}
`;

const group1Items = list.filter(({group}) => group === FunctionalityType.reduceDisease);
const group2Items = list.filter(({group}) => group === FunctionalityType.nutrient);
const group3Items = list.filter(({group}) => group === FunctionalityType.physiology);

const DropDownTabModal: FC<{
  type: FunctionalityType;
  onChange?: (values: typeof list) => void;
  onReset?: Function; 
  onClose?: Function;
  onChangeType: (type: FunctionalityType) => void;
  value: (typeof list);
}> = ({type, onChange, onChangeType, value, onReset, onClose}) => {
  const items = type === FunctionalityType.reduceDisease ? group1Items
    : type === FunctionalityType.nutrient? group2Items
    : type === FunctionalityType.physiology ? group3Items : null;

  return <DropDownTabModalContainer>
    <button className="desktop reset" onClick={() => (onReset ?? onChange)?.([])}>Reset</button>
    <h1 className="desktop">{FunctionalityTypeName[type as FunctionalityType]}</h1>
    <div className="mobile header">
      <h1>기능성 추가</h1>
    </div>
    <div className="mobile tabs">
      <button className={type === FunctionalityType.nutrient ? 'current': ''} onClick={() => onChangeType(FunctionalityType.nutrient)}>영양소 기능</button>
      <button className={type === FunctionalityType.physiology ? 'current': ''} onClick={() => onChangeType(FunctionalityType.physiology)}>생리활성 기능</button>
      <button className={type === FunctionalityType.reduceDisease ? 'current': ''} onClick={() => onChangeType(FunctionalityType.reduceDisease)}>질병발생위험감소기능</button>
    </div>
    <div className={'content ' + (type === FunctionalityType.physiology ? 'physiology' : '')}>
      {items?.map((item, i) => {
        const {no: reportNo, label} = item;
        return <Checkbox key={`dropdowntab-${i}`} label={label} value={value.map(({no}) => no).includes(reportNo)} onChange={(val) => onChange?.(val ? unique(value.concat([item])) : value.filter(({no}) => no !== reportNo))} />
      })}
    </div>
    <div className="mobile footer">
      <button className="reset" onClick={() => (onChange)?.([])}>Reset<Image alt="리셋 아이콘" src="/assets/icon_mobile_product_func_reset.svg" width="16" height="16" /></button>
      <Spacer size={4} />
      <button className="close" onClick={() => onClose?.()}>확인</button>
    </div>
  </DropDownTabModalContainer>;
};

const func2tabOptions = (value: Functionalities[]) => value?.map(({id, type, functionality}) => {
  return {
    group: type === '질병발생위험감소기능' ? FunctionalityType.reduceDisease
      : type === '영양소 기능' ? FunctionalityType.nutrient
      : type === '생리활성기능' ? FunctionalityType.physiology : '' as never,
    no: id,
    label: functionality,
  };
}) ?? [];

const tabOptions2func = (value: typeof list) => value?.map(({group, no, label}) => {
  return {
    type: group === FunctionalityType.reduceDisease ? '질병발생위험감소기능'
      : group === FunctionalityType.nutrient ? '영양소 기능'
      : group === FunctionalityType.physiology ? '생리활성기능' : '' as never,
    id: no,
    functionality: label,
  } as Functionalities;
}) ?? [];

const DropDownTab: FC<{
  value: Functionalities[];
  onChange: (func: Functionalities[]) => void;
}> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(FunctionalityType.physiology);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const computedValue = func2tabOptions(value);
  const changeValueHandler = (val: typeof list) => {
    onChange(tabOptions2func(val));
  };
  const resetHandler = () => {
    onChange(tabOptions2func(computedValue.filter(({group}) => group !== currentTab)));
  };
  
  const [tabLengths, setTabLengths] = useState({
    nutrientLength: 0,
    physiologyLength: 0,
    reduceDiseaseLength: 0,
    totalLength: 0,
  });

  const nutrientLength = computedValue.filter(({group}) => group === FunctionalityType.nutrient).length
  const physiologyLength = computedValue.filter(({group}) => group === FunctionalityType.physiology).length
  const reduceDiseaseLength = computedValue.filter(({group}) => group === FunctionalityType.reduceDisease).length
  const totalLength = nutrientLength + physiologyLength + reduceDiseaseLength;

  useOutsideClick(() => setIsOpen(false), modalRef);
  
  const toggleTabHandler = (type: FunctionalityType) => {
    if (type === currentTab && isOpen) return setIsOpen(false);
    setIsOpen(true);
    setCurrentTab(type);
  };

  const getClassName = (type: FunctionalityType) => {
    if (!isOpen) return '';
    if (currentTab === type) return 'selected';
    else return 'hide';
  };

  const nutrientButtonClassName = getClassName(FunctionalityType.nutrient);
  const physiologyButtonClassName = getClassName(FunctionalityType.physiology);
  const reduceDiseaseButtonClassName = getClassName(FunctionalityType.reduceDisease);

  return (
    <Container ref={modalRef}>
      <div className="buttons desktop">
        <button className={nutrientButtonClassName} onClick={() => toggleTabHandler(FunctionalityType.nutrient)}>
          영양소 기능
          <span className={nutrientLength ? '' : 'zero'}>{nutrientLength}</span>
        </button>
        <button className={physiologyButtonClassName} onClick={() => toggleTabHandler(FunctionalityType.physiology)}>
          생리활성 기능
          <span className={physiologyLength ? '' : 'zero'}>{physiologyLength}</span>
        </button>
        <button className={reduceDiseaseButtonClassName} onClick={() => toggleTabHandler(FunctionalityType.reduceDisease)}>
          질병발생위험감소기능
          <span className={reduceDiseaseLength ? '' : 'zero'}>{reduceDiseaseLength}</span>
        </button>
      </div>
      <div className="buttons-mask desktop">
        <div className={nutrientButtonClassName}></div>
        <div className={physiologyButtonClassName}></div>
        <div className={reduceDiseaseButtonClassName}></div>
      </div>
      <div className="buttons mobile">
        <button onClick={() => setIsOpen(true)}>기능성 추가<span className={totalLength ? '' : 'zero'}>{totalLength}</span></button>
      </div>
      {isOpen && <DropDownTabModal 
        type={currentTab} 
        value={computedValue}
        onChange={changeValueHandler} 
        onChangeType={setCurrentTab}
        onReset={resetHandler}
        onClose={() => setIsOpen(false)} />}
    </Container>
  );
};

export default DropDownTab;
