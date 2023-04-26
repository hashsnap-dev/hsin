import { useMutation, useQueryClient } from 'react-query';
import { updateUser } from '../network/api';
import { UpdateUserRequest } from '../types';

const wrapUpdateUser = (updateUserRequest: UpdateUserRequest) => {
  const { id, ...rest } = updateUserRequest;

  return updateUser(id, rest);
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(wrapUpdateUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('users');
    },
    onError: (error) => {},
  });
};

export default useUpdateUser;
