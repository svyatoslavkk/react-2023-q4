import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './reducers/mainReducer';

const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});

export default store;
