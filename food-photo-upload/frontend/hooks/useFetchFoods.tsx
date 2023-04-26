import { useQuery } from 'react-query';
import { fetchFoods } from '../network/api';
import { FoodSearchOptions } from '../types';

const useFetchFoods = (foodSearchOptions: FoodSearchOptions) => {
  return useQuery(
    ['foods', foodSearchOptions],
    () => fetchFoods(foodSearchOptions),
    { enabled: false }
  );
};

export default useFetchFoods;
