import { applyMiddleware, createStore } from 'redux';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware) => {


  return applyMiddleware(...middleware);
};

function configureStore(reducer) {
  const persistConfig = {
    key: 'root',
    storage,
    blacklist: []
  }
  const persistedReducer = persistReducer(persistConfig, reducer)
  // const persistedState = loadState();
  const store = createStore(
    persistedReducer,
    bindMiddleware([sagaMiddleware]),
  );

  let persistor = persistStore(store)

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();

  return {store,persistor};
}

export default configureStore;
