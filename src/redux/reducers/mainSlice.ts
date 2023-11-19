import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MainState {
  searchTerm: string;
  itemsPerPage: number;
  viewMode: string;
  loadingMain: boolean;
}

const initialState: MainState = {
  searchTerm: '',
  itemsPerPage: 10,
  viewMode: 'list',
  loadingMain: false,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setViewMode: (state, action: PayloadAction<string>) => {
      state.viewMode = action.payload;
    },
    setLoadingMain: (state, action: PayloadAction<boolean>) => {
      state.loadingMain = action.payload;
    },
  },
});

export const { setSearchTerm, setItemsPerPage, setViewMode, setLoadingMain } =
  mainSlice.actions;

export const selectMain = (state: { main: MainState }) => state.main;

export default mainSlice.reducer;
