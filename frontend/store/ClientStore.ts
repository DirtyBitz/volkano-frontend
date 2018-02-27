import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers'
import storage from 'localforage'
import { persistStore, persistReducer } from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['form'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default initialState => {
  const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )

  persistStore(store)

  return store
}
