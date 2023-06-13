import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './phonebookSlice';
import { REGISTER, persistStore } from 'redux-persist';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [REGISTER],
      }, 
    }),
});
export const persistor = persistStore(store);  
