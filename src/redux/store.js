import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from './userRedux';
import thunk from 'redux-thunk';
// import cartReducer from "./cartRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const rootReducer = combineReducers({
  user: userReducer,
});
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
export let persistor = persistStore(store);
