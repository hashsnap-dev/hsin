import { useMutation, useQueryClient } from 'react-query';
import { deleteFoodThumbnail } from '../network/api';
import { DeleteFoodThumbnailRequest } from '../types';

const wrapDeleteFoodThumbnail = (
  deleteFoodThumbnailRequest: DeleteFoodThumbnailRequest
) => {
  return deleteFoodThumbnail(
    deleteFoodThumbnailRequest.report_no,
    deleteFoodThumbnailRequest.nid
  );
};

const useDeleteFoodThumbnail = () => {
  const queryClient = useQueryClient();

  return useMutation(wrapDeleteFoodThumbnail, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('foods');
    },
    onError: (error) => {},
  });
};

export default useDeleteFoodThumbnail;
