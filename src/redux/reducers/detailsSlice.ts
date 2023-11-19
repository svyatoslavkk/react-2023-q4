import { createSlice } from '@reduxjs/toolkit';
import { Character } from '../../interfaces/interfaces';

const initialState = {
  detailsName: new URLSearchParams(window.location.search).get('details') || '',
  detailsData: <Character>{},
};

export const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setDetailsName(state, action) {
      state.detailsName = action.payload;
    },
    setDetailsData(state, action) {
      state.detailsData = action.payload;
    },
  },
});

export const { setDetailsName, setDetailsData } = detailsSlice.actions;
export default detailsSlice.reducer;
