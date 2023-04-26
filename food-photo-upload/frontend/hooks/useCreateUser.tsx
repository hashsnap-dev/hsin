import { useMutation, useQueryClient } from 'react-query';
import { createUser } from '../network/api';

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(createUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('users');
    },
    onError: (error) => {},
  });
};

export default useCreateUser;
