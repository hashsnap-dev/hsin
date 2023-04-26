import { useMutation, useQueryClient } from 'react-query';
import { login } from '../network/api';

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation(login, {
    onSuccess: (data) => {
      // localStorage.setItem("token", data.token);
      // queryClient.invalidateQueries('users/self');
    },
    onError: (error) => {},
  });
};

export default useLogin;
