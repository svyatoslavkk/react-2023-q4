import { createSlice } from '@reduxjs/toolkit';
import { Character } from '../../interfaces/interfaces';

const initialState = {
  searchResults: <Character[]>[],
};

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
  },
});

export const { setSearchResults } = resultsSlice.actions;
export default resultsSlice.reducer;
