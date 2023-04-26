import { useMutation, useQueryClient } from 'react-query';
import { deleteFoodUrl } from '../network/api';

const useDeleteFoodUrl = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteFoodUrl, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('foods');
    },
    onError: (error) => {},
  });
};

export default useDeleteFoodUrl;
