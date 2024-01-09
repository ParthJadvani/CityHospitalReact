import { applyMiddleware, createStore } from "redux"
import { rootReducer } from "./Reducer"
import thunk from "redux-thunk"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for we

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['medicine', 'cart']
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configStore = () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk));

    let persistor = persistStore(store)

    return {store, persistor};
}
