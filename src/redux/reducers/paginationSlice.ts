import { createSlice } from '@reduxjs/toolkit';

const page = Number(new URLSearchParams(window.location.search).get('page'));

const totalPages = 10;

const initialState = {
  pageNumber: page ? page - 1 : 0,
  totalPages: totalPages,
  paginationButtonsValue: Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  ),
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPageNumber(state, action) {
      state.pageNumber = action.payload;
    },
    setTotalPage(state, action) {
      state.totalPages = action.payload;
    },
    setPaginationButtonsValue(state, action) {
      state.paginationButtonsValue = action.payload;
    },
    setFirstPage(state) {
      state.pageNumber = 0;
      state.paginationButtonsValue = [1, 2, 3];
    },

    clickNextPrevButton(state, action) {
      const increaseDecreaseNumber = action.payload == 'next' ? 1 : -1;
      const newPageNumber = state.pageNumber + increaseDecreaseNumber;
      if (state.paginationButtonsValue.includes(newPageNumber + 1))
        state.pageNumber = newPageNumber;
      else {
        state.paginationButtonsValue = state.paginationButtonsValue.map(
          (el) => el + increaseDecreaseNumber,
        );
        const newPageNumber =
          action.payload == 'next'
            ? state.paginationButtonsValue[
                state.paginationButtonsValue.length - 1
              ]
            : state.paginationButtonsValue[0];

        state.pageNumber = newPageNumber - 1;
      }
    },

    clickLastPage(state) {
      if (state.totalPages > state.paginationButtonsValue.length)
        state.paginationButtonsValue = state.paginationButtonsValue.map(
          (_, ind) =>
            state.totalPages - state.paginationButtonsValue.length + ind,
        );
      state.pageNumber = state.totalPages - 1;
    },
  },
});

export const {
  setPageNumber,
  setTotalPage,
  setPaginationButtonsValue,
  setFirstPage,
  clickNextPrevButton,
  clickLastPage,
} = paginationSlice.actions;

export default paginationSlice.reducer;
