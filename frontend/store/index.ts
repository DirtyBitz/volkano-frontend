import { IStoreState } from './StoreState'
import { collectionInitialState } from '../reducers/collection'
import reducers from '../reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { INITIAL_NOTIFICATION_STATE } from '../reducers/notifications'
import { INITIAL_USER_STATE } from '../reducers/user'

export const initialStore: IStoreState = {
  collection: collectionInitialState,
  notifications: INITIAL_NOTIFICATION_STATE,
  user: INITIAL_USER_STATE,
}

export default (initialState = initialStore) => {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
