// articleDetailsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const articleDetailsSlice = createSlice({
  name: 'articleDetails',
  initialState,
  reducers: {
    setArticleDetails: (state, action) => {
      const { title, details } = action.payload;
      state[title] = details;
    },
  },
});

export const { setArticleDetails } = articleDetailsSlice.actions;

// Selector to retrieve article details based on the title parameter
export const selectArticleDetails = (state, title) => state.article[title];

export default articleDetailsSlice.reducer;
