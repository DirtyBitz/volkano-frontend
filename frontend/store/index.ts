import { IStoreState } from './StoreState'
import { collectionInitialState } from '../reducers/collectionReducer'
import reducers from '../reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

export const initialStore: IStoreState = {
  collection: collectionInitialState,
}

export default (initialState = initialStore) => {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
