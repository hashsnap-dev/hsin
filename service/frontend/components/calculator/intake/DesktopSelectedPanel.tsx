import { SelectedFood } from '@/pages/calculator/intake';
import { FC } from 'react';
import FoodCard from './FoodCard';

const DesktopSelectedPanel: FC<{
  onReset: () => void;
  selectedFoods: SelectedFood[];
  onDelete: (index: number) => void;
  onVisible: (index: number) => void;
}> = ({ onReset, selectedFoods, onDelete, onVisible }) => {
  return (
    <>
      <h4 className="font-nanumsquare">
        추가한 제품 리스트
        <button onClick={onReset}>전체삭제</button>
      </h4>
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
        <div className="list">추가한 제품이 없습니다.</div>
      )}
    </>
  );
};

export default DesktopSelectedPanel;
