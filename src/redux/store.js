import { configureStore } from '@reduxjs/toolkit';
import phonebookReducer from './phonebookSlice';

const store = configureStore({
  reducer: {
    contacts: phonebookReducer,
  },
});

export default store;
