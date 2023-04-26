import { useMutation, useQueryClient } from 'react-query';
import { deleteUser } from '../network/api';

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('users');
    },
    onError: (error) => {},
  });
};

export default useDeleteUser;
