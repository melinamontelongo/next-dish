import { configureStore } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from "redux-persist";
import thunk from 'redux-thunk';

import userReducer from '../features/user/userSlice';

const persistConfig = {
    key: "user",
    storage,
    whitelist: ["user"]
  }

const rootReducer = combineReducers({
    user: userReducer
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
})