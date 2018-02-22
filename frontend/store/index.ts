import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import storage from 'redux-persist/lib/storage'
import reducers from '../reducers'
import { IStoreState } from './StoreState'
import { authInitialState } from '../reducers/authenticationReducer'
import { collectionInitialState } from '../reducers/collectionReducer'

export const initialState: IStoreState = {
  authentication: authInitialState,
  collection: collectionInitialState,
}

/**
 * Client state
 */
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['form'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const clientStore = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

persistStore(clientStore)

/**
 * Server state
 */
const serverStore = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export const store = (initialState, props) => {
  if (props.isServer) {
    return serverStore
  } else {
    return clientStore
  }
}
