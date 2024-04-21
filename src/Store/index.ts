import {configureStore} from "@reduxjs/toolkit";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from "../Users/reducer";

const persistConfig = {
  key: 'root',
  storage,
}

const userReducer = persistReducer(persistConfig, rootReducer);

export interface UserState {
  userReducer: {
    user: any;
  }
}

const store = configureStore({
  reducer: {
    userReducer
  }
});

const persistor = persistStore(store);

export default {store, persistor};