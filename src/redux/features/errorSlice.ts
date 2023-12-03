import { createSlice } from '@reduxjs/toolkit';
import { ValidationError } from 'yup';
import { AllFields } from '../../interfaces/interfaces';

const initialState: AllFields = {
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

const resetErrors = (state: AllFields) => {
  for (const key in state) {
    state[key as keyof AllFields] = '';
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
        if (!state[path as keyof AllFields]) {
          state[path as keyof AllFields] = el.message;
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
