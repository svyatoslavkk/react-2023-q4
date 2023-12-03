import { createSlice } from '@reduxjs/toolkit';
import { ValidationError } from 'yup';
import { ErrorState } from '../../interfaces/interfaces';

const initialState: ErrorState = {
  name: '',
  age: '',
  email: '',
  password: '',
  passwordRepeat: '',
  gender: '',
  accept: '',
  image: '',
  country: '',
};

const resetErrors = (state: ErrorState) => {
  for (const key in state) {
    state[key as keyof ErrorState] = '';
  }
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setValidationErrors(state, action) {
      resetErrors(state);
      const errors: ValidationError[] = action.payload;
      errors.forEach((el) => {
        const path = el.path?.split('.')[0];
        if (!state[path as keyof ErrorState]) {
          state[path as keyof ErrorState] = el.message;
        }
      });
    },
    removeValidationErrors(state) {
      resetErrors(state);
    },
  },
});

export const { setValidationErrors, removeValidationErrors } =
  errorSlice.actions;
export default errorSlice.reducer;
