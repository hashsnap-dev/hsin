import { Column, Item, Row } from '@/layouts/flex-utils';
import { IntakeSearchType, SelectedFood } from '@/pages/calculator/intake';
import { FC, FormEventHandler, useRef, useState } from 'react';
import FoodCard, { FoodItem } from './FoodCard';
import { IntegrationFoodList } from 'hsin';
import { UserData } from '@/store/user-data';
import classNames from 'classnames';
import EmptyResult from '@/components/EmptyResult';

const MobileSearchPanel: FC<{
  selectedFoods: SelectedFood[];
  searchType: IntakeSearchType;
  onChangeSearchType: (type: IntakeSearchType) => void;
  onSearchChange: FormEventHandler<HTMLInputElement>;
  search: string;
  onClose: () => void;
  userData: UserData;
  data:
    | {
        data: IntegrationFoodList[];
      }
    | undefined;
  error: any;
  onAddFood: (food: IntegrationFoodList) => void;
  tab: '' | 'add' | 'manage';
  onChangeTab: (name: 'add' | 'manage') => void;
  onReset: () => void;
  onDelete: (index: number) => void;
  onVisible: (index: number) => void;
}> = ({
  selectedFoods,
  onClose,
  searchType,
  onChangeSearchType,
  onSearchChange,
  search,
  userData,
  data,
  error,
  onAddFood,
  tab,
  onChangeTab,
  onReset,
  onDelete,
  onVisible,
}) => {
  const i1 = useRef<HTMLInputElement>(null);

  return (
    <Column className="mobile-search-panel">
      <h1>중복 섭취 확인</h1>
      <Item>
        <button
          className={classNames(`product-list`, tab === 'add' && 'current')}
          onClick={() => onChangeTab('add')}
        >
          제품목록
        </button>
        <button
          className={classNames(
            `product-manage`,
            tab === 'manage' && 'current'
          )}
          onClick={() => onChangeTab('manage')}
        >
          추가 제품 관리
          {selectedFoods.length ? (
            <span className="number">{selectedFoods.length}</span>
          ) : null}
        </button>
      </Item>
      <Item className="search-container" width="440px">
        {tab === 'add' && (
          <div className="search-panel">
            <Row className="tab-mobile" justifyContent="center">
              <div
                onClick={() => onChangeSearchType('foods')}
                className={searchType === 'foods' ? 'current' : ''}
              >
                건강기능식품 검색
              </div>
              <div
                onClick={() => onChangeSearchType('recent')}
                className={searchType === 'recent' ? 'current' : ''}
              >
                최근 본 제품 목록
              </div>
              <div
                onClick={() => onChangeSearchType('heart')}
                className={searchType === 'heart' ? 'current' : ''}
              >
                찜 제품 목록
              </div>
            </Row>
            <div
              className={
                `input-wrapper ` + (searchType !== 'foods' ? 'hide' : '')
              }
            >
              <input
                ref={i1}
                onInput={onSearchChange}
                placeholder="검색할 제품명 또는 제조사명을 입력하세요."
              />
            </div>
            <div className="search-result">
              {searchType === 'foods' &&
                (search && !error && !data ? (
                  <div className="empty">데이터 불러오는 중</div>
                ) : data?.data?.length ? (
                  data.data.map((food, i) => {
                    const { name, report_no, thumbnails, type, company } = food;
                    return (
                      <FoodItem
                        thumbnails={thumbnails}
                        report_no={report_no}
                        type={type}
                        name={name}
                        company={company}
                        onClick={() => onAddFood(food)}
                        key={`food-item-${i}`}
                      />
                    );
                  })
                ) : !search ? (
                  <div className="empty">검색어를 입력해주세요.</div>
                ) : (
                  <EmptyResult search={search} />
                ))}
              {searchType === 'recent' &&
                userData.recent.map((food, i) => {
                  const { name, report_no, thumbnails, type, company } = food;
                  return (
                    <FoodItem
                      thumbnails={thumbnails}
                      report_no={report_no}
                      type={type}
                      name={name}
                      company={company}
                      onClick={() => onAddFood(food)}
                      key={`food-item-recent-${i}`}
                    />
                  );
                })}
              {searchType === 'heart' &&
                userData.heart.map((food, i) => {
                  const { name, report_no, thumbnails, type, company } = food;
                  return (
                    <FoodItem
                      thumbnails={thumbnails}
                      report_no={report_no}
                      type={type}
                      name={name}
                      company={company}
                      onClick={() => onAddFood(food)}
                      key={`food-item-heart-${i}`}
                    />
                  );
                })}
            </div>
          </div>
        )}
        {tab === 'manage' && (
          <div className="mobile-list">
            <div className="clear-list">
              {selectedFoods.length ? (
                <button onClick={onReset}>전체삭제</button>
              ) : null}
            </div>
            <div className="list">
              {selectedFoods.length ? (
                <>
                  {selectedFoods.map((food, i) => {
                    const {
                      food: { name, report_no, thumbnails, type, company },
                      visible,
                    } = food;

                    return (
                      <FoodCard
                        thumbnails={thumbnails}
                        report_no={report_no}
                        type={type}
                        name={name}
                        company={company}
                        visible={visible}
                        onDeleteClick={() => onDelete(i)}
                        onVisibleClick={() => onVisible(i)}
                        key={`food-card-${i}`}
                      />
                    );
                  })}
                </>
              ) : (
                <button onClick={() => onChangeTab('add')}>
                  + 제품 추가하기
                </button>
              )}
            </div>
          </div>
        )}
        <div className="search-end">
          <button onClick={onClose}>결과확인</button>
        </div>
      </Item>
    </Column>
  );
};

export default MobileSearchPanel;
