import { useMutation, useQueryClient } from 'react-query';
import { addFoodUrl } from '../network/api';
import { AddFoodUrlRequest } from '../types';

const wrapAddFoodUrl = (addFoodUrlRequest: AddFoodUrlRequest) => {
  return addFoodUrl(addFoodUrlRequest.report_no, addFoodUrlRequest.url);
};

const useAddFoodUrl = () => {
  const queryClient = useQueryClient();

  return useMutation(wrapAddFoodUrl, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('foods');
    },
    onError: (error) => {},
  });
};

export default useAddFoodUrl;
