import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../interfaces/interfaces';

export interface MainState {
  searchTerm: string;
  allCharacters: Character[];
}

const initialState: MainState = {
  searchTerm: '',
  allCharacters: [],
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setAllCharacters: (state, action: PayloadAction<Character[]>) => {
      state.allCharacters = action.payload;
    },
  },
});

export const { setSearchTerm, setAllCharacters } = mainSlice.actions;
export default mainSlice.reducer;
