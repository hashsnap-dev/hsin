import { Item, Row } from '@/layouts/flex-utils';
import { UserData } from '@/store/user-data';
import { FC, FormEventHandler, useRef } from 'react';
import { FoodItem } from './FoodCard';
import { IntegrationFoodList } from 'hsin';
import { IntakeSearchType } from '@/pages/calculator/intake';
import EmptyResult from '@/components/EmptyResult';

const DesktopSearchPanel: FC<{
  search: string;
  searchType: IntakeSearchType;
  onChangeSearchType: (type: IntakeSearchType) => void;
  onSearchChange: FormEventHandler<HTMLInputElement>;
  userData: UserData;
  data:
    | {
        data: IntegrationFoodList[];
      }
    | undefined;
  error: any;
  onAddFood: (food: IntegrationFoodList) => void;
}> = ({
  search,
  searchType,
  onChangeSearchType,
  onSearchChange,
  userData,
  data,
  error,
  onAddFood,
}) => {
  const i1 = useRef<HTMLInputElement>(null);

  return (
    <div className="search-panel">
      <Row className="tab-desktop" justifyContent="center">
        <div
          onClick={() => {
            onChangeSearchType('foods');
            if (i1.current) i1.current.value = '';
          }}
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
        className={`input-wrapper ` + (searchType !== 'foods' ? 'hide' : '')}
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
  );
};

export default DesktopSearchPanel;
