import { configureStore, combineReducers } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';
import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
  game: gameReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
