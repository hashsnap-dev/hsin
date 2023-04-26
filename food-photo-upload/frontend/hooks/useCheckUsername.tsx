import { useMutation, useQueryClient } from 'react-query';
import { checkUsername } from '../network/api';

const useCheckUsername = () => {
  const queryClient = useQueryClient();

  return useMutation(checkUsername, {
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};

export default useCheckUsername;
