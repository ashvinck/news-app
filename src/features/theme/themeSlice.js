import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
  gridView: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,

  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleCardsView: (state) => {
      state.gridView = !state.gridView;
    },
  },
});

export const { toggleTheme, toggleCardsView } = themeSlice.actions;

export const selectTheme = (state) => state.theme.darkMode;
export const selectToggleCardsView = (state) => state.theme.gridView;

export default themeSlice.reducer;
