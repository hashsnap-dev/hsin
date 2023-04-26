import { configureStore } from '@reduxjs/toolkit';
import userDataSlice from './user-data';

const store = configureStore({
  reducer: {
    userData: userDataSlice.reducer,
  },
});

export default store;
