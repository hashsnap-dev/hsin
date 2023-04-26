import { useMutation, useQueryClient } from 'react-query';
import { updateMyProfile } from '../network/api';

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation(updateMyProfile, {
    onSuccess: (data) => {
      // queryClient.invalidateQueries('users/self');
    },
    onError: (error) => {},
  });
};

export default useUpdateProfile;
