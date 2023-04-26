import styled, { css } from 'styled-components';
import {
  AquaBlue100,
  AquaBlue300,
  AquaBlue50,
  AquaBlue500,
  AquaBlue600,
  Gray400,
  Gray600,
} from '@/styles/variables';
import Link from '@/components/Link';
import Select from 'react-select';
import { FC, useEffect, useRef, useState } from 'react';
import { alignItems, desktop, mobile, flexCenter, flex } from '@/styles/utils';
import {
  obj2params,
  useDebounce,
  useLocalForge,
  useOutsideClick,
  useStateByEffect,
} from '@/helper/utils';
import useSWR from 'swr';
import {
  Functionalities,
  FunctionalityMaterials,
  IntegrationFoodList,
} from '@/../../@types/hsin';
import router from 'next/router';

const Container = styled.section`
  .custom__control {
    border: 0;
    box-shadow: none;
    background: url(/assets/icon_index_dropdown.svg) no-repeat right 11px center;
    font-weight: 500;
    min-height: 100%;

    .custom__indicator-separator {
      opacity: 0;
    }
    .custom__indicator {
      opacity: 0;
      padding: 0;
    }
    .custom__value-container {
      padding-left: 0;
    }
    /* .custom__indicator-separator {
      display: none;
    }
    .custom__indicator {
      display: none;
    }
    .custom__value-container {
      display: flex;
      padding: 0;
    }
    .custom__single-value {
      margin: 0;
    } */
  }

  .recent-search {
    position: absolute;
    background: white;
    border-radius: 4px;
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.25);
    width: 100%;
    z-index: 1;
    top: 48px;
    ${alignItems('stretch', { direction: 'column' })}

    .off {
      flex: 1;
      width: 100%;
      height: 220px;
      min-height: 220px;
      color: ${Gray400};
      ${flexCenter()}
    }
    .cache-search-list {
      /* flex: 1; */
    }
    .footer {
      height: 40px;
      ${flex('center', 'end')}
      background: ${AquaBlue100};
      padding: 0 20px;

      button {
        font-size: 14px;
        color: ${AquaBlue600};
      }
    }

    .autocomplete-item {
      cursor: pointer;
      width: 100%;
      height: 32px;
      padding: 0 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      ${alignItems('center')}

      &:hover {
        background: ${AquaBlue50};
      }

      span {
        margin-left: 16px;
        font-size: 14px;
        color: ${AquaBlue300};
      }
    }
    .auto-complete-list,
    .cache-search-list {
      width: 100%;
      padding: 8px 0;

      h4 {
        padding: 0 20px;
      }
    }
  }
  ${mobile(css`
    .custom__indicators {
      position: absolute;
    }
  `)}
  .custom__menu {
    background: ${AquaBlue500};
    color: white;
    text-align: center;

    .custom__option--is-focused {
      background: #0454df;
    }
    .custom__option:active {
      background: #0862ff;
    }
    .custom__option--is-selected {
      background: ${AquaBlue600};
    }
  }

  ${desktop(css`
    ${flex('center')}
    min-width: 1200px;
    background: ${AquaBlue600};
    height: 96px;

    .content {
      width: 1200px;
      flex-shrink: 0;
      margin: 0 auto;
      ${flexCenter()}
    }

    .Search {
      position: relative;
      ${alignItems()}
      width: 780px;
      height: 48px;
      border-radius: 100px;
      background: white;
      /* overflow: hidden; */
    }
    .SelectWrapper {
      width: 150px;
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 28px;
    }
    .SelectContent {
      width: 124px;
      color: #2c2f31;
      font-family: 'Noto Sans KR';
      font-weight: 500;
      border: 0;
      outline: none;
    }

    .VHr {
      margin-top: 8px;
      height: 32px;
      border-left: 1px solid #ebeeef;
    }
    .InputWrapper {
      flex: 1;
      display: flex;
      align-items: center;
      height: 100%;
      cursor: text;

      input {
        width: 100%;
        border: 0;
        background: transparent;
        outline: none;
        padding-left: 16px;
      }
    }
    .Button {
      width: 150px;
      height: 100%;
      box-shadow: 0 0 0 0.1px ${AquaBlue500};
      background: ${AquaBlue500};
      color: white;
      border-top-right-radius: 9999px;
      border-bottom-right-radius: 9999px;
    }

    .ButtonContent {
      font-size: 16px;
      font-weight: 700;
      /* width: 103px; */
      height: 28px;
      padding-left: 37px;
      background: url(/assets/icon_search_white.svg) no-repeat;
    }

    .custom__control {
      width: 124px;
    }
  `)}

  ${mobile(css`
    background: ${AquaBlue600};
    height: 80px;
    padding: 0 16px;
    padding-top: 16px;
    .content {
      width: 100%;
    }
    .Search {
      position: relative;
      ${flexCenter()}
      background: white;
      border-radius: 4px;
    }
    .SelectWrapper {
      font-size: 12px;
      font-weight: 500;
      color: ${Gray600};
    }
    .custom__control {
      width: 72px;
      padding-left: 14px;
      background-size: 12px 12px;
      background-position: right 10px center;
    }
    .VHr {
      height: 24px;
      border-left: 1px solid #ebeeef;
    }
    .InputWrapper {
      flex: 1;

      input {
        width: 100%;
        font-size: 14px;
        padding-left: 12px;
      }
    }

    .Button {
      color: transparent;
      width: 40px;
      height: 48px;
      background: url(/assets/icon_search_white.svg) ${AquaBlue500} no-repeat
        center;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  `)}
`;

const AutoCompleteList: FC<{
  searchType: string;
  list: any[];
  onClick: Function;
}> = ({ searchType, list, onClick }) => {
  return list.length ? (
    <div className="auto-complete-list">
      <h4>자동완성 결과</h4>
      {list.map((item, i) => {
        const key = `search-list-${i}`;
        if (searchType === 'foods')
          return (
            <div
              className="autocomplete-item"
              key={key}
              onClick={() =>
                onClick({
                  label: item.name,
                  href: `/search/product/${
                    item.type === 'domestic' ? 'd' : 'o'
                  }${item.report_no}`,
                })
              }
            >
              {item.name}
            </div>
          );
        else if (searchType === 'materials') {
          return (
            <div
              className="autocomplete-item"
              key={key}
              onClick={() =>
                onClick({
                  label: item.name,
                  href: `/search/raw_material/${item.no[0]}`,
                })
              }
            >
              {item.name}
              <span>{item.company}</span>
            </div>
          );
        } else if (searchType === 'functionality')
          return (
            <div
              className="autocomplete-item"
              key={key}
              onClick={() =>
                onClick({
                  label: item.functionality,
                  href: `/search/functionality/${item.id}`,
                })
              }
            >
              {item.functionality}
            </div>
          );
        return null;
      })}
    </div>
  ) : (
    <div className="empty">검색어를 입력해주세요.</div>
  );
};

const CacheSearchList: FC<{
  list: { type: string; label: string; href: string }[];
  onClick: (item: { type: string; label: string; href: string }) => void;
}> = ({ list, onClick }) => {
  return (
    <div className="cache-search-list">
      <h4>최근 검색목록</h4>
      {list.map((item, i) => {
        const { type, label, href } = item;
        return (
          <div
            className="autocomplete-item"
            onClick={() => onClick(item)}
            key={`cache-search-item-${i}`}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

const options = [
  { value: 'foods', label: '제품' },
  { value: 'materials', label: '원료' },
  { value: 'functionality', label: '기능성' },
];

const MainSearch = () => {
  const [currentOption, setCurrentOption] = useState(options[0]);

  const [recentSearchOpen, setRecentSearchOpen] = useState(false);

  const rs1 = useRef(null);
  useOutsideClick(() => setRecentSearchOpen(false), rs1);

  const [searchList, setSearchList] = useLocalForge('main-search-list', {
    cacheSearch: true,
    autoComplete: true,
    list: [] as { type: string; label: string; href: string }[],
  });

  const [searchType, setSearchType] = useStateByEffect(
    () => currentOption.value,
    [currentOption],
    'foods'
  );
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 1000);

  const [autoCompleteList, setAutoCompleteList] = useState<any[]>([]);

  const { data: foodData, error: foodError } = useSWR<{
    data: IntegrationFoodList[];
  }>(
    searchType === 'foods' && searchText
      ? `/api/foods/brief?${obj2params({
          limit: 5,
          query: debouncedSearch,
        })}`
      : null
  );
  useEffect(() => {
    if (searchType === 'foods' && !foodData) return setAutoCompleteList([]);
    if (!foodData) return;
    setAutoCompleteList(foodData.data);
  }, [foodData]);

  const { data: matData, error: matError } = useSWR<{
    data: FunctionalityMaterials[];
  }>(
    searchType === 'materials' && searchText
      ? `/api/materials?${obj2params({
          page: 1,
          limit: 5,
          name: debouncedSearch,
        })}`
      : null
  );
  useEffect(() => {
    if (searchType === 'materials' && !matData) return setAutoCompleteList([]);
    if (!matData) return;
    setAutoCompleteList(matData.data);
  }, [matData]);

  const { data: funcData, error: funcError } = useSWR<{
    data: Functionalities[];
  }>(
    searchType === 'functionality' && searchText
      ? `/api/functionalities?${obj2params({
          functionality: debouncedSearch,
        })}`
      : null
  );
  useEffect(() => {
    if (searchType === 'functionality' && !funcData)
      return setAutoCompleteList([]);
    if (!funcData) return;
    setAutoCompleteList(funcData.data.slice(0, 5));
  }, [funcData]);

  const gotoSearchHandler = (item: {
    type: string;
    label: string;
    href: string;
  }) => {
    setSearchList((data) => ({
      ...data,
      list: [item, ...data.list.filter(({ href }) => href !== item.href)].slice(
        0,
        5
      ),
    }));
    router.push(item.href);
  };

  const searchByTextHandler = () => {
    const item = {
      type: searchType,
      label: searchText,
      href: '',
    };

    const params = obj2params({ query: searchText });

    if (searchType === 'foods') {
      item.href = `/search/product?${params}`;
    } else if (searchType === 'materials') {
      item.href = `/search/raw_material?${params}`;
    } else if (searchType === 'functionality') {
      item.href = `/search/functionality?${params}`;
    }

    setSearchList((data) => ({
      ...data,
      list: [item, ...data.list.filter(({ href }) => href !== item.href)].slice(
        0,
        5
      ),
    }));
    router.push(item.href);
  };

  return (
    <Container>
      <div className="content">
        <div className="Search font-notosans">
          {recentSearchOpen && (
            <div className="recent-search" ref={rs1}>
              {searchList.cacheSearch &&
                searchList.autoComplete &&
                (autoCompleteList.length ? (
                  <AutoCompleteList
                    searchType={searchType}
                    list={autoCompleteList}
                    onClick={gotoSearchHandler}
                  />
                ) : (
                  <CacheSearchList
                    list={searchList.list}
                    onClick={gotoSearchHandler}
                  />
                ))}
              {!searchList.cacheSearch &&
                searchList.autoComplete &&
                (autoCompleteList.length ? (
                  <AutoCompleteList
                    searchType={searchType}
                    list={autoCompleteList}
                    onClick={gotoSearchHandler}
                  />
                ) : null)}
              {searchList.cacheSearch && !searchList.autoComplete && (
                <CacheSearchList
                  list={searchList.list}
                  onClick={gotoSearchHandler}
                />
              )}
              {!searchList.cacheSearch && !searchList.autoComplete && (
                <div className="off">검색어 저장 기능이 꺼져있습니다.</div>
              )}
              <div className="footer">
                <button
                  onClick={() =>
                    setSearchList((data) => ({
                      ...data,
                      cacheSearch: !data.cacheSearch,
                    }))
                  }
                >
                  자동저장 {searchList.cacheSearch ? '끄기' : '켜기'}
                </button>
                <button
                  onClick={() =>
                    setSearchList((data) => ({
                      ...data,
                      autoComplete: !data.autoComplete,
                    }))
                  }
                >
                  자동완성 {searchList.autoComplete ? '끄기' : '켜기'}
                </button>
              </div>
            </div>
          )}
          <div className="SelectWrapper">
            <Select
              className="font-notosans"
              classNamePrefix="custom"
              isSearchable={false}
              value={currentOption}
              onChange={(val) => {
                setCurrentOption(val as NonNullable<typeof val>);
              }}
              options={options}
            />
          </div>
          <div className="VHr" />
          <label className="InputWrapper">
            <input
              className="font-default-size"
              placeholder="검색어를 입력하세요."
              onChange={(ev) => {
                setRecentSearchOpen(true);
                setSearchText(ev.target.value);
              }}
              onClick={() => setRecentSearchOpen(true)}
            />
          </label>
          <button onClick={searchByTextHandler} className="Button flex-center">
            <div className="ButtonContent flex-center font-nanumsquare">
              검색하기
            </div>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default MainSearch;
