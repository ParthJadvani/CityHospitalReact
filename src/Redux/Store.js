import { applyMiddleware, createStore } from "redux"
import { rootReducer } from "./Reducer"
import thunk from "redux-thunk"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for we
import createSagaMiddleware from 'redux-saga'
import { rootsaga } from "./Saga/rootSaga"

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['', 'cart', 'auth']
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const sagaMiddleware = createSagaMiddleware()

  const middlewares = [thunk, sagaMiddleware]

const configStore = () => {
    let store = createStore(persistedReducer, applyMiddleware(...middlewares));

    sagaMiddleware.run(rootsaga);

    return store;
}

export let store = configStore();
export let persistor = persistStore(store)

