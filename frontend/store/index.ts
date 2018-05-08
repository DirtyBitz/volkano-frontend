import { IStoreState } from './StoreState'
import { collectionInitialState } from '../reducers/collection'
import reducers from '../reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { INITIAL_NOTIFICIATION_STATE } from '../reducers/notifications'

export const initialStore: IStoreState = {
  collection: collectionInitialState,
  notifications: INITIAL_NOTIFICIATION_STATE,
}

export default (initialState = initialStore) => {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
