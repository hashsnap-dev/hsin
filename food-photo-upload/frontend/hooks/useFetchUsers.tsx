import { useQuery } from 'react-query';
import { fetchUsers } from '../network/api';
import { UserSearchOptions } from '../types';

const useFetchUsers = (userSearchOptions: UserSearchOptions) => {
  return useQuery(
    ['users', userSearchOptions],
    () => fetchUsers(userSearchOptions),
    { enabled: false }
  );
};

export default useFetchUsers;
