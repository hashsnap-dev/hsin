import { useMutation, useQueryClient } from 'react-query';
import { logout } from '../network/api';

const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation(logout, {
    onSuccess: (data) => {
      // localStorage.setItem("token", data.token);
      // queryClient.invalidateQueries('users/self');
    },
    onError: (error) => {},
  });
};

export default useLogout;
