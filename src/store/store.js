import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cardReducer from './cardSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cards: cardReducer,
  },
});

export default store;
