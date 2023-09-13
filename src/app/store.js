import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import userReducer from '../features/users/userSlice';
import articleReducer from '../features/articles/articleDetailsSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    article: articleReducer,
  },
});
