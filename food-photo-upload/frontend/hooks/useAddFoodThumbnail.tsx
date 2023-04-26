import { useMutation, useQueryClient } from 'react-query';
import { addFoodThumbnail } from '../network/api';
import { AddFoodThumbnailRequest } from '../types';

const wrapAddFoodThumbnail = (
  addFoodThumbnailRequest: AddFoodThumbnailRequest
) => {
  return addFoodThumbnail(
    addFoodThumbnailRequest.report_no,
    addFoodThumbnailRequest.file
  );
};

const useAddFoodThumbnail = () => {
  const queryClient = useQueryClient();

  return useMutation(wrapAddFoodThumbnail, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('foods');
    },
    onError: (error) => {},
  });
};

export default useAddFoodThumbnail;
