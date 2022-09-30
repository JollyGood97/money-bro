import {configureStore} from '@reduxjs/toolkit';
import {baseApi} from '../api/BaseApi';
import {setupListeners} from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(baseApi.middleware),
});

setupListeners(store.dispatch);
