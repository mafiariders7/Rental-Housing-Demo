import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userslice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key:'root',
    storage,
    version:1,
}

const rootReducer = combineReducers({
    user:userReducer,
})

const persist_Reducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer: persist_Reducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        })
    }
})

export const persistor = persistStore(store)
