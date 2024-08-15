// src/app/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';
// import userReducer from '../features/user/userSlice';
// import followReducer from '../features/follow/followSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // auth 상태만 유지
};

const rootReducer = combineReducers({
  auth: authReducer,
  // user: userReducer,
  // follow: followReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;