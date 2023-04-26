import { useQuery } from 'react-query';
import { fetchUserDetail } from '../network/api';

const useFetchUserDetail = (id: string) => {
  return useQuery(`users/${id}`, () => fetchUserDetail(id), {
    enabled: !!id,
  });
};

export default useFetchUserDetail;
