import {
  Functionalities,
  FunctionalityMaterials,
  IntegrationFoodList,
} from '@/../../@types/hsin';
import Content, {
  DupDetail,
  IntakeBox,
  Material,
} from '@/components/calculator/intake/Content';
import FoodCard, { FoodItem } from '@/components/calculator/intake/FoodCard';
import ContentSection from '@/components/ContentSection';
import { Spacer } from '@/components/Flex';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SectionTitle from '@/components/SectionTitle';
import {
  backTracking,
  hslToHex,
  obj2params,
  useDebounce,
  useStateByEffect,
} from '@/helper/utils';
import Flex, { Column, Item, Row } from '@/layouts/flex-utils';
import type { NextPage } from 'next';
import { useRef, useEffect, useState, FormEventHandler } from 'react';
import useSWR from 'swr';
// import Color from 'color';
import { useUserData } from '@/store/user-data';
import classNames from 'classnames';
import Link from '@/components/Link';
import {
  AquaBlue,
  AquaBlue150,
  AquaBlue500,
  Gray300,
  Gray400,
  Gray500,
  Gray600,
} from '@/styles/variables';
import DesktopSearchPanel from '@/components/calculator/intake/DesktopSearchPanel';
import DesktopSelectedPanel from '../../components/calculator/intake/DesktopSelectedPanel';
import MobileSearchPanel from '@/components/calculator/intake/MobileSearchPanel';

export type SelectedFood = {
  food: IntegrationFoodList;
  visible: boolean;
};
export type IntakeSearchType = 'foods' | 'recent' | 'heart';

const idx2hex = (i: number) => hslToHex(15 + 105 * i, 70, 55);

// const warnList = {
//   '2-25': 'e1',
//   '2-6': 'e1',
//   '2-7': 'e1',
//   '2-7': 'e2',
// };
const warnCase = [
  ['사례 1', 'e1.pdf', ['2-25', '2-6', '2-7']],
  ['사례 3', 'e3.pdf', ['2-25', '2-6', '2-7']],
  ['사례 2', 'e2.png', ['2-6', '2-7', '1-14']],
  ['사례 3', 'e2.png', ['2-6', '2-25']],
  ['사례 4', 'e3.pdf', [['2015-9', '2019-21', '2020-9', '2021-6'], '2-6', '2-7', '2-25'], ],
  ['사례 5', 'e4.pdf', [['2013-8'], '2-6', '2-52']]
] as [string, string, string[]][];
const wc = warnCase.flatMap(([name, fileName, mats]) =>
  [
    ...backTracking(
      ...mats.map((item) => (Array.isArray(item) ? item : [item]))
    ),
  ].map((mats) => [mats, { name, fileName }])
) as [string[], { name: string; fileName: string }][];
const computedWarnCase = new Map(wc);

const getWarnCases = (strs: string[]) => {
  const result: { name: string; fileName: string }[] = [];
  for (const [mats, item] of computedWarnCase) {
    mats.every((mat) => strs.includes(mat)) &&
      !result.find(({ name }) => name === item.name) &&
      result.push(item);
  }

  return result;
};
const Intake: NextPage = () => {
  const [userData, setUserData] = useUserData();

  const [searchType, setSearchType] = useState<'foods' | 'recent' | 'heart'>(
    'foods'
  );

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const params = obj2params({
    query: debouncedSearch,
    limit: 30,
  });

  const { data, error } = useSWR<{ data: IntegrationFoodList[] }>(
    searchType === 'foods' && search ? `/api/foods/brief?${params}` : null
  );

  const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);

  const [visibleFoods] = useStateByEffect(
    () => selectedFoods.filter(({ visible }) => visible),
    [selectedFoods],
    [] as SelectedFood[]
  );

  const [dupData, setDupData] = useState<{
    materials: { [key: string]: number };
    functionalities: { [key: string]: number };
  }>({
    materials: {},
    functionalities: {},
  });

  const warnCases = getWarnCases(Object.keys(dupData.materials));

  useStateByEffect(
    () => {
      const foods = visibleFoods.map(({ food }) => food);
      const matCount = {} as { [key: string]: number };
      const funcCount = {} as { [key: string]: number };

      foods.forEach((food) => {
        food.materials.forEach((str) => {
          str in matCount ? matCount[str]++ : (matCount[str] = 0);
        });
        food.functionalities.forEach((str) => {
          str in funcCount ? funcCount[str]++ : (funcCount[str] = 0);
        });
      });

      setDupData({
        materials: matCount,
        functionalities: funcCount,
      });
    },
    [visibleFoods],
    {} as any
  );

  const { data: matData, error: matError } = useSWR<FunctionalityMaterials[]>(
    Object.keys(dupData.materials).length
      ? `/api/materials/brief/${Object.keys(dupData.materials).join(',')}`
      : null
  );

  const [computedMats] = useStateByEffect(
    () => {
      if (!matData) return null;
      const data = Object.entries(dupData.materials)
        .filter(([key, count]) => {
          return (
            key.indexOf('1-') !== 0 && // 영양소 제외
            count
          );
        })
        .sort((a, b) => b[1] - a[1])
        .map(([no, count]) => {
          return [
            count,
            matData?.find((mat) =>
              mat.no.includes(no)
            ) as FunctionalityMaterials,
          ] as [number, FunctionalityMaterials];
        });
      return data.reduce((acc, [n, item]) => {
        const prevData = acc.find(([number]) => number === n);
        if (prevData) {
          prevData[1].push(item);
          return acc;
        } else {
          return [...acc, [n, [item]]] as any;
        }
      }, [] as [number, FunctionalityMaterials[]][]);
    },
    [dupData.materials, matData],
    null
  );

  const { data: funcData, error: funcError } = useSWR<Functionalities[]>(
    Object.keys(dupData.functionalities).length
      ? `/api/functionalities/brief/${Object.keys(dupData.functionalities).join(
          ','
        )}`
      : null
  );
  const [computedFuncs] = useStateByEffect(
    () => {
      if (!matData) return;

      const funcCount: [
        string,
        { food: IntegrationFoodList; materials: string[] }[]
      ][] = [];

      Object.entries(dupData.functionalities)
        .filter(([no, count]) => {
          return (
            no[0] !== '2' && // 영양소 기능 제외
            count
          );
        })
        .map(([no, count]) => {
          const targetMaterials = matData.filter(({ functionality }) =>
            functionality.includes(no)
          );

          const c = visibleFoods
            .filter(({ food }) => {
              return food.functionalities.includes(no);
            })
            .map(({ food }) => {
              const currentMaterials = food.materials.filter((no) => {
                return targetMaterials.some((mat) => mat.no.includes(no));
              });

              return {
                food,
                materials: currentMaterials,
              };
            });

          funcCount.push([no, c]);
        });
      return funcCount;
    },
    [dupData.functionalities, matData, funcData],
    undefined
  );

  const [resultTab, setResultTab] = useState<'mats' | 'funcs'>('mats');

  const changeSearchTypeHandler = (val: 'foods' | 'recent' | 'heart') => {
    if (val === searchType) return;
    setSearchType(val);
    setSearch('');
  };

  const searchChangeHandler: FormEventHandler<HTMLInputElement> = (ev) => {
    setSearch((ev.target as HTMLInputElement).value);
  };

  const addFoodHandler = (food: IntegrationFoodList) => {
    if (
      selectedFoods.find(
        ({ food: { report_no } }) => report_no === food.report_no
      )
    )
      return;
    setSelectedFoods((data) => [...data, { food, visible: true }]);
  };

  const deleteHandler = (i: number) => {
    if (!confirm('해당 건강기능식품을 삭제하시겠습니까?')) return;
    setSelectedFoods((data) => data.filter((_, idx) => idx !== i));
  };
  const visibleHandler = (i: number) => {
    setSelectedFoods((data) =>
      data.map((item, idx) =>
        idx === i ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const resetHandler = () => {
    if (confirm('모든 제품을 삭제하시겠습니까?')) setSelectedFoods([]);
  };

  // ---------- mobile

  const [tab, setTab] = useState<'' | 'add' | 'manage'>('');

  return (
    <>
      <Nav breadcrumb />
      <ContentSection className={`font-notosans`}>
        <Spacer size={64} mobileSize={0} />
        <SectionTitle className="desktop" label="건강기능식품 중복섭취 확인" />
      </ContentSection>
      <ContentSection className={`font-notosans`}>
        <Content>
          <Row justifyContent="space-between">
            <Item className="search-container desktop" width="440px">
              <DesktopSearchPanel
                search={search}
                searchType={searchType}
                onChangeSearchType={changeSearchTypeHandler}
                onSearchChange={searchChangeHandler}
                userData={userData}
                data={data}
                error={error}
                onAddFood={addFoodHandler}
              />
              <DesktopSelectedPanel
                onReset={resetHandler}
                selectedFoods={selectedFoods}
                onDelete={deleteHandler}
                onVisible={visibleHandler}
              />
            </Item>
            <Item className="result">
              <div className="box font-nanumsquare">확인하세요:)</div>
              <h1>
                현재 섭취하고 있는 건강기능식품의
                <br />
                <b>중복되는 원료와 기능성</b>을 알려드립니다.
              </h1>
              <h2>
                {`'`}생리활성기능{`'`}, {`'`}질병발생위험감소기능{`'`} 중복
                확인이 가능
              </h2>
              {selectedFoods.length > 0 && (
                <div className="mobile">
                  <button
                    className={classNames('add-product')}
                    onClick={() => {
                      setTab('add');
                    }}
                  >
                    제품 추가하기
                  </button>
                  <div
                    className="check-added-product"
                    onClick={() => {
                      setTab('manage');
                    }}
                  >
                    추가한 제품 확인
                  </div>
                </div>
              )}
              {selectedFoods.filter(({ visible }) => visible).length >= 1 ? (
                <>
                  <div className="warn">
                    <div className="image" />
                    {warnCases.length ? (
                      <div>
                        <p className="p1">
                          섭취 시 주의해야 하는 사례가 있습니다.
                        </p>
                        <p className="p2">※ 개인 체질에 따라 다를 수 있음</p>
                        {warnCases.map(({ fileName }, i) => (
                          <Link
                            href={`https://health-functional-food.s3.ap-northeast-2.amazonaws.com/docs/warn-cases/${fileName}`}
                            target="_blank"
                            key={`warn-case-${i}`}
                          >
                            사례 {i + 1}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      '섭취 시 주의해야 하는 사례가 없습니다.'
                    )}
                  </div>
                  <Row className="tab font-nanumsquare" justifyContent="center">
                    <div
                      onClick={() => setResultTab('mats')}
                      className={resultTab === 'mats' ? 'current' : ''}
                    >
                      중복 섭취 원료
                    </div>
                    <div
                      onClick={() => setResultTab('funcs')}
                      className={resultTab === 'funcs' ? 'current' : ''}
                    >
                      중복 기능성
                    </div>
                  </Row>
                  {resultTab === 'mats' && (
                    <>
                      <h4 className="font-nanumsquare">중복 섭취 원료</h4>
                      <div className="dup-mats">
                        {computedMats && computedMats.length ? (
                          computedMats.map(([n, mats], i) => (
                            <div key={`mat-dup-${i}`}>
                              <span className="dup-mats-title">
                                {n + 1}개 중복된 원료는
                              </span>
                              <div className="mats-list">
                                {mats.map(({ name, no }) => {
                                  const color = idx2hex(i);
                                  return (
                                    <Material
                                      target="_blank"
                                      href={`/search/raw_material/${no[0]}`}
                                      borderColor={color}
                                      color={color}
                                      key={`mat-color-${name}`}
                                    >
                                      {name}
                                    </Material>
                                  );
                                })}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="empty">
                            중복 섭취 원료가 없습니다.
                          </div>
                        )}
                        {computedMats && computedMats.length ? (
                          <div className="recommended-intake">
                            <Row
                              className="title"
                              justifyContent="space-between"
                            >
                              <h5 className="font-nanumsquare">
                                중복 섭취 원료의 일일권장섭취량
                              </h5>
                              <span>※ 정보제공 : 공전/소비자 리포트</span>
                            </Row>
                            {computedMats?.map(([n, mats], i) =>
                              mats.map(({ name, unit }, j) => (
                                <IntakeBox
                                  no={i + 1}
                                  name={name}
                                  capacity={unit ?? ''}
                                  key={`intake-${i}-${j}`}
                                />
                              ))
                            )}
                          </div>
                        ) : null}
                      </div>
                      {computedMats && computedMats.length ? (
                        <>
                          <h4 className="font-nanumsquare">
                            중복 섭취 원료 상세
                          </h4>
                          <div className="dup-mats-detail">
                            {computedMats?.map(([n], i) => (
                              <DupDetail
                                color={idx2hex(i)}
                                key={`dup-color-${i}`}
                              >
                                {n + 1}개 중복
                              </DupDetail>
                            ))}
                          </div>
                          <div className="dup-mats-detail-list">
                            {selectedFoods
                              .filter(({ visible }) => visible)
                              .map(({ food: { name, materials } }, i) => {
                                return (
                                  <div key={`dup-mat-detail-${i}`}>
                                    <h5>{i + 1 + '. ' + name}</h5>
                                    {materials.map((no, j) => {
                                      const idx = computedMats?.findIndex(
                                        ([n, mats]) =>
                                          mats.find((item) =>
                                            item.no.includes(no)
                                          )
                                      );
                                      return (
                                        <Material
                                          target="_blank"
                                          href={`/search/raw_material/${no}`}
                                          key={`dup-mat-list-${i}-${j}`}
                                          color={
                                            idx === -1
                                              ? Gray600
                                              : idx2hex(idx as any)
                                          }
                                          borderColor={
                                            idx === -1
                                              ? Gray300
                                              : idx2hex(idx as any)
                                          }
                                        >
                                          {
                                            matData?.find((item) =>
                                              item.no.includes(no)
                                            )?.name
                                          }
                                        </Material>
                                      );
                                    })}
                                  </div>
                                );
                              })}
                          </div>
                        </>
                      ) : null}
                    </>
                  )}
                  {resultTab === 'funcs' && (
                    <>
                      <div className="dup-func">
                        {computedFuncs?.length ? (
                          <>
                            선택한 제품에서 중복된 기능성은
                            <b>
                              {computedFuncs
                                ?.map(
                                  ([func, mats], i) =>
                                    funcData?.find(({ id }) => func === id)
                                      ?.functionality
                                )
                                .join('/')}
                            </b>
                            입니다.
                          </>
                        ) : (
                          '중복된 기능성이 없습니다'
                        )}
                      </div>
                      {computedFuncs && computedFuncs?.length > 1 && (
                        <h4 className="font-nanumsquare">
                          중복 기능 원료 제품
                        </h4>
                      )}
                      <Column className="dup-func-detail-list">
                        {computedFuncs?.map(([no, foodList], i) => {
                          const func = funcData?.find(({ id }) => no === id);
                          const url =
                            func?.type === '질병발생위험감소기능'
                              ? '/assets/HSIN_Icon(extra)_100x100.svg'
                              : `https://health-functional-food.s3.ap-northeast-2.amazonaws.com/physiology/HSIN_Icon_functionality_100x100-${func?.id
                                  .split('-')
                                  .pop()
                                  ?.padStart(2, '0')}.svg`;

                          return (
                            <Row className="func-detail-item" key={`fdi-${i}`}>
                              <div
                                className="thumbnail"
                                style={{
                                  backgroundImage: `url("${url}")`,
                                }}
                              />
                              <Column width="100%">
                                <div className="title">
                                  {func?.functionality}
                                </div>
                                <div className="foods">
                                  {foodList.map(({ food, materials }, i) => {
                                    return (
                                      <Link
                                        target="_blank"
                                        href={`/search/product/${
                                          food.type === 'domestic' ? 'd' : 'o'
                                        }${food.report_no}`}
                                        key={`food-intake-${i}`}
                                      >
                                        <button>
                                          {food.name}
                                          <span>
                                            {materials
                                              .map((no) => {
                                                const mat = matData?.find(
                                                  (item) => item.no.includes(no)
                                                );

                                                return mat?.name;
                                              })
                                              .join('/')}
                                          </span>
                                        </button>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </Column>
                            </Row>
                          );
                        })}
                      </Column>
                    </>
                  )}
                </>
              ) : (
                <div className="placeholder">
                  <p>최소 두개 이상의 제품을 추가해주세요.</p>
                  <span>
                    ※ 섭취시 주의 사례는 하나의 제품도 확인 가능합니다.
                  </span>
                </div>
              )}
              {selectedFoods.length <= 1 && (
                <button
                  className={classNames('mobile', 'add-product')}
                  onClick={() => setTab('add')}
                >
                  제품 추가하기
                </button>
              )}
            </Item>
            {tab && (
              <MobileSearchPanel
                search={search}
                data={data}
                error={error}
                selectedFoods={selectedFoods}
                onClose={() => setTab('')}
                searchType={searchType}
                onChangeSearchType={changeSearchTypeHandler}
                onSearchChange={searchChangeHandler}
                onAddFood={addFoodHandler}
                userData={userData}
                tab={tab}
                onChangeTab={setTab}
                onReset={resetHandler}
                onDelete={deleteHandler}
                onVisible={visibleHandler}
              />
            )}
            <button
              className="mobile open-list"
              onClick={() => setTab('manage')}
            >
              {selectedFoods.length ? (
                <span>{selectedFoods.length}</span>
              ) : null}
            </button>
          </Row>
        </Content>
      </ContentSection>
      <Spacer size={180} mobileSize={100} />
      <Footer />
    </>
  );
};

export default Intake;
