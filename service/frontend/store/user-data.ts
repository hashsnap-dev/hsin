import { IntegrationFoodList } from '@/../../@types/hsin';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import localforage from 'localforage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export type UserData = {
  recent: IntegrationFoodList[];
  heart: IntegrationFoodList[];
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    recent: [],
    heart: [],
  } as UserData,
  reducers: {
    setUserData(
      state,
      payload: {
        payload: {
          data: Partial<UserData>;
          withoutSync?: boolean;
        };
        type: string;
      }
    ) {
      Object.assign(state, payload.payload.data);
      !payload.payload.withoutSync &&
        localforage.setItem('user-data', payload.payload.data);
    },
  },
});

export const { setUserData } = userDataSlice.actions;

export default userDataSlice;

let isInit = false;

export const useUserData = () => {
  const userData = useSelector<{ userData: UserData }, UserData>((state) => {
    return state.userData;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (isInit) return;
      isInit = true;
      localforage
        .getItem<UserData>('user-data')
        .then((data) => {
          if (!data)
            return localforage.setItem('user-data', {
              recent: [],
              heart: [],
            });
          else
            dispatch(
              setUserData({
                data,
                withoutSync: false,
              })
            );
        })
        .catch((err: any) => {});
    })();
  }, []);

  return [
    userData,
    (data: Partial<UserData>) =>
      dispatch(setUserData({ data: { ...userData, ...data } })),
  ] as const;
};
