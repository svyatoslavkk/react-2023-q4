import { configureStore, combineReducers } from '@reduxjs/toolkit';
import formSlice from './features/formSlice';
import countriesSlice from './features/countriesSlice';

const rootReducer = combineReducers({
  form: formSlice,
  countries: countriesSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
