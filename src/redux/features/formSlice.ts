import { createSlice } from '@reduxjs/toolkit';
import { FormState } from '../../interfaces/interfaces';

const initialState: FormState = {
  formTiles: [],
  newFormAdded: false,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setForm(state, action) {
      state.newFormAdded = true;
      const { name, age, email, password, gender, image, country } =
        action.payload;
      state.formTiles.unshift({
        name,
        age,
        email,
        password,
        gender,
        image,
        country,
      });
    },
    setNewFormAdded(state, action) {
      state.newFormAdded = action.payload;
    },
  },
});

export const { setForm, setNewFormAdded } = formSlice.actions;
export default formSlice.reducer;
