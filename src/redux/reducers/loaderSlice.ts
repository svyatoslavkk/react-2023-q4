import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchLoader: false,
  detailsLoader: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoadingStatus(state, action) {
      switch (action.payload.loader) {
        case 'search':
          state.searchLoader = action.payload.value;
          break;
        case 'details':
          state.detailsLoader = action.payload.value;
          break;
      }
    },
  },
});

export const { setLoadingStatus } = loaderSlice.actions;
export default loaderSlice.reducer;
