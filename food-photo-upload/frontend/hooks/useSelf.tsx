import { useQuery } from 'react-query';
import { fetchSelf } from '../network/api';

const useSelf = () => {
  return useQuery('users/self', fetchSelf, {
    retry: false,
  });
};

export default useSelf;
