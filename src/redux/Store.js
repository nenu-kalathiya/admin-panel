import { applyMiddleware, createStore } from 'redux'
import { RootReducer } from './reducer/Index';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import thunk from "redux-thunk";
import Counter from '../container/Counter/Counter';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['counter']
  }

export const configurestore = () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk))
    let persistor = persistStore(store)
    return { store, persistor };
}

const persistedReducer = persistReducer(persistConfig, RootReducer) 