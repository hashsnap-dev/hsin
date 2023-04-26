import { Spacer } from '@/components/Flex';
import Link from '@/components/Link';
import MultiSelect, { MultiSelectContainer } from '@/components/MultiSelect';
import Radio, { RadioBox } from '@/components/Radio';
import { obj2params, omit } from '@/helper/utils';
import { desktop, flexCenter, mobile } from '@/styles/utils';
import {
  AquaBlue,
  AquaBlue500,
  AquaBlue600,
  ContentWidth,
  Gray100,
  Gray200,
  Gray300,
} from '@/styles/variables';
import { useRouter } from 'next/router';
import qs from 'qs';
import { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import useSWR from 'swr';
import DropDownTab from './product/DropDownTab';
import Searchbar, { SearchbarContainer } from './product/Searchbar';
import { Functionalities, FunctionalityMaterials } from 'hsin';
import { Row } from '@/layouts/flex-utils';
const Container = styled.div`
  margin: 0 auto;
  margin-top: 16px;
  width: ${1232}px;
  padding: 0 16px;

  .p1 {
    position: relative;
    z-index: 2;
    background: ${Gray100};
    padding: 20px 36px;
    box-shadow: inset 0 0 0 1px ${Gray300};
    display: flex;
    flex-direction: column;
  }
  /* height: 218px; */
  .options {
    width: 888px;
  }
  dl {
    display: flex;
    align-items: center;
    font-size: 14px;
    height: 30px;
  }
  .tags {
    height: auto;
  }
  dt {
    display: inline-flex;
    width: 164px;
    align-items: center;
    justify-content: start;
    padding-left: 48px;
    font-weight: 500;
  }
  dd {
    margin: 0;
    flex: 1;
  }
  .mode {
    width: 325px;

    dd {
      display: flex;
    }
  }
  .mode .info {
    cursor: pointer;
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: 4px;
    background: url(/assets/icon_search_detail_info.svg) no-repeat right center;
    position: relative;

    div {
      display: none;
    }
    span {
      color: ${AquaBlue};
    }
    &:hover div {
      position: absolute;
      display: block;
      z-index: 2;
      width: 300px;
      transform: translate(20px, 20px);
      font-weight: 400;
      background: ${Gray100};
      border: 1px solid ${Gray300};
      padding: 10px 20px;
    }
  }
  .type {
    width: 360px;
  }
  .type dt {
    padding: 0;
    width: 113px;
    padding-right: 20px;
    display: inline-block;
    text-align: center;
  }
  ${RadioBox} {
    margin-right: 32px;
  }

  .i2 {
    width: 720px;
    height: 56px;
    box-shadow: inset 0 0 0 1px ${Gray300};
    border: 0;
    border-radius: 4px;
    padding: 0 16px;
    outline: none;
  }

  .consonants {
    display: inline-block;

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      background: white;
      box-shadow: 0 0 0 1px ${Gray300};
    }
    button:first-child {
      border-left: 0;
    }

    .selected {
      position: relative;
      color: white;
      background: ${AquaBlue500};
      box-shadow: 0 0 0 1px ${AquaBlue600};
    }
  }
  dl:last-child dd {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .find {
      width: 200px;
      height: 40px;
      background: ${AquaBlue};
      border: 1px solid ${AquaBlue500};
      color: white;
      border-radius: 4px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  ${MultiSelectContainer} {
    width: 720px;

    .custom__control {
      box-shadow: none;
      font-weight: 500;
      border-color: ${Gray300};
      border-radius: 0;
      min-height: 30px;
      align-items: start;
      /* height: 30px; */
    }
    .custom__value-container {
      padding: 0 8px;
    }
    .custom__indicators {
      min-height: 100%;
    }
    .custom__indicator {
      padding: 0 8px;
      min-height: 100%;
      ${flexCenter()}
    }
    .custom__input {
      font-size: 14px;
    }
    .custom__placeholder {
      font-weight: 400;
    }
  }

  ${mobile(css`
    margin-top: 0;
    width: 100%;
    box-shadow: 0 0 0 1px ${Gray300};
    padding: 0;
    .p1 {
      padding: 16px;
    }
    .options {
      width: 100%;
      flex-direction: column;

      .mode,
      .type {
        margin-top: 12px;
        width: 100%;

        dt {
          width: 91px;
          text-align: left;
        }
        dd {
          padding: 0;
          justify-content: start;
        }

        .info:hover div {
          width: 200px;
        }
      }
    }
    dl {
      margin-top: 12px;
      flex-direction: column;
      align-items: flex-start;
      height: unset;
    }
    dt {
      justify-content: start;
      padding-left: 0;
    }
    dd {
      margin-top: 14px;
      width: 100%;
    }

    dl:first-child {
      margin-top: 0;
      flex-direction: row;

      dt {
        width: 0;
      }
      dd {
        margin-top: 0;
        padding-left: 0;
        width: 100%;
      }
    }
    dl.type {
      flex-direction: row;

      dt {
        width: 66px;
      }
      dd {
        margin-top: 0;
        padding-left: 30px;
      }
    }

    ${RadioBox} {
      margin-right: 10px;
    }

    ${MultiSelectContainer} {
      width: 100%;

      .custom__control {
        min-height: 40px;
        align-items: center;
      }
      .custom__placeholder {
        font-weight: 400;
        font-size: 14px;
      }
    }

    dl:last-child dd .find {
      width: 150px;
    }

    .consonants {
      width: 230px;
    }
    .find {
      width: unset;
      flex: 1;
    }
  `)}
`;
const consonants = 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ'.split('');

const textOption = { value: '[text]', label: '' };

export type MaterialOption = {
  type: string;
  value: string;
  label: string;
  company?: string;
};

export const mat2matOptions = (
  mats: FunctionalityMaterials[]
): MaterialOption[] => {
  const saved: string[] = [];

  return mats
    .map<MaterialOption | undefined>(({ no, type, name, company }) => {
      if (saved.includes(name)) return undefined;
      saved.push(name);
      return {
        type,
        value: name,
        label: name,
        company,
      };
    })
    .filter((i) => i) as MaterialOption[];
};

const SearchDetails: FC<{
  useCountryType?: boolean;
  useMaterial?: boolean;
  search: string;
  searchOptions: { value: string; label: string }[];
  onSearchChange: (str: string) => void;
  searchType: any;
  onSearchTypeChange: (type: any) => void;
  mode?: string;
  onModeChange?: (mode: string) => void;
  type?: string;
  onTypeChange?: (type: string) => void;
  materials?: MaterialOption[];
  onMaterialsChange?: (mats: MaterialOption[]) => void;
  functionalities: Functionalities[];
  onFunctionalitiesChange: (func: Functionalities[]) => void;
  consonant: string;
  onConsonantChange: (char?: string) => void;
  onClick: () => void;
}> = ({
  useCountryType,
  useMaterial,
  search,
  searchOptions,
  onSearchChange,
  searchType,
  onSearchTypeChange,
  mode,
  onModeChange,
  type,
  onTypeChange,
  materials = [],
  onMaterialsChange,
  functionalities,
  onFunctionalitiesChange,
  consonant,
  onConsonantChange,
  onClick,
}) => {
  const { query } = useRouter();
  const [selectedMaterials, setSelectedMaterials] = useState<MaterialOption[]>(
    []
  );
  const [materialTextSearch, setMaterialTextSearch] = useState('');

  const { data, error } = useSWR<{ data: FunctionalityMaterials[] }>(
    materialTextSearch
      ? `/api/materials?${obj2params({
          page: 1,
          limit: 20,
          type: '고시형원료-영양소,고시형원료-기능성원료,개별인정원료',
          name: materialTextSearch,
        })}`
      : null
  );

  const [materialOptions, setMaterialOptions] = useState(
    [] as { type: string; value: string; label: string; company?: string }[]
  );

  useEffect(() => {
    const options = materialTextSearch
      ? [
          ...mat2matOptions(data?.data ?? []),
          {
            value: `[${materialTextSearch}]`,
            type: 'string',
            label: `"${materialTextSearch}"`,
          },
        ]
      : [];
    setMaterialOptions(options);
  }, [data]);

  const changeTextOption = (str: string) => {
    setMaterialTextSearch(str);
  };

  return (
    <Container className="font-notosans">
      <div className="p1">
        <dl>
          <dt></dt>
          <dd>
            <Searchbar
              value={search}
              onChange={onSearchChange}
              type={searchType}
              options={searchOptions}
              onTypeChange={onSearchTypeChange}
              onEnter={onClick}
            />
          </dd>
        </dl>
        <Spacer size={8} mobileSize={0} />
        <Row className="options">
          <dl className="mode">
            <dt>
              검색 조건
              <span className="info">
                <div>
                  기본 : 검색설정을 모두 포함하고 있는 제품만 결과에
                  노출시킵니다.
                  <br />
                  <span>
                    ex) 장 건강, 면역기능개선 검색 {'->'} 장 건강, 면역기능개선,
                    그 외 기능 제품 리스트
                  </span>
                  <br />
                  <br />
                  일치 : 검색설정과 같은 제품만 결과에 노출시킵니다.
                  <br />
                  <span>
                    ex) 장 건강, 면역기능개선 검색 {'->'} 장 건강, 면역기능 개선
                    제품 리스트
                  </span>
                  <br />
                </div>
              </span>
            </dt>
            <dd>
              <Radio
                onClick={(ev) => onModeChange?.(ev)}
                name="mode"
                value=""
                defaultChecked={!mode}
                label="기본"
              />
              <Radio
                onClick={(ev) => onModeChange?.(ev)}
                name="mode"
                value="exactly"
                defaultChecked={mode === 'exactly'}
                label="일치"
              />
            </dd>
          </dl>
          {useCountryType && (
            <dl className="type">
              <dt>제품 구분</dt>
              <dd>
                <Radio
                  onClick={(ev) => onTypeChange?.(ev)}
                  name="type"
                  value=""
                  defaultChecked={!type}
                  label="통합"
                />
                <Radio
                  onClick={(ev) => onTypeChange?.(ev)}
                  name="type"
                  value="domestic"
                  defaultChecked={type === 'domestic'}
                  label="국내"
                />
                <Radio
                  onClick={(ev) => onTypeChange?.(ev)}
                  name="type"
                  value="foreign"
                  defaultChecked={type === 'foreign'}
                  label="수입"
                />
              </dd>
            </dl>
          )}
        </Row>
        {/* <Spacer size={24} /> */}
        <Spacer size={8} mobileSize={0} />
        {useMaterial && (
          <dl className="tags">
            <dt>원료 검색</dt>
            <dd>
              <MultiSelect
                value={materials}
                placeholder="원료 검색을 통해 제품을 확인해보세요."
                onInputChange={changeTextOption}
                onChange={(val: any) => {
                  onMaterialsChange?.(val);
                }}
                options={materialOptions}
                styles={{
                  option(styles, { data }) {
                    if (data.type === 'string')
                      return {
                        ...styles,
                        ':after': {
                          content: '" 검색"',
                        },
                      };
                    return styles;
                  },
                }}
              />
            </dd>
          </dl>
        )}
        <Spacer size={8} />
        <dl className="functionality">
          <dt>기능성 검색</dt>
          <dd>
            <DropDownTab
              value={functionalities}
              onChange={onFunctionalitiesChange}
            />
          </dd>
        </dl>
        <Spacer size={8} />
        <dl className="consonant">
          <dt>초성 검색</dt>
          <dd>
            <div className="consonants">
              {consonants.map((str) => {
                return (
                  <button
                    onClick={() =>
                      onConsonantChange(consonant === str ? undefined : str)
                    }
                    key={str}
                    className={consonant === str ? 'selected' : ''}
                  >
                    {str}
                  </button>
                );
              })}
            </div>
            <button className="find" onClick={onClick}>
              검색하기
            </button>
          </dd>
        </dl>
      </div>
    </Container>
  );
};

export default SearchDetails;
