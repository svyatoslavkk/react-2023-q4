import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { cardsApi } from './reducers/api';
import storage from 'redux-persist/lib/storage';
import detailsSlice from './reducers/detailsSlice';
import loaderSlice from './reducers/loaderSlice';
import paginationSlice from './reducers/paginationSlice';
import resultsSlice from './reducers/resultsSlice';
import searchSlice from './reducers/searchSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['search'],
};

const rootReducer = combineReducers({
  pagination: paginationSlice,
  search: searchSlice,
  loader: loaderSlice,
  results: resultsSlice,
  details: detailsSlice,
  [cardsApi.reducerPath]: cardsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(cardsApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
